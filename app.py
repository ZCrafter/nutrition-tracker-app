from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from config import SECRET_KEY, USDA_API_KEY, USDA_API_URL
import requests
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/nutrition.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = "login"

### Database Models
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # In production, use proper password hashing

class Meal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    ingredients = db.Column(db.Text)  # JSON list of ingredients
    servings = db.Column(db.Integer, default=1)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    meal_id = db.Column(db.Integer, db.ForeignKey('meal.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

# Create tables if not present
with app.app_context():
    db.create_all()
    os.makedirs("data", exist_ok=True)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

### Routes

@app.route("/")
def index():
    if current_user.is_authenticated:
        return redirect(url_for("dashboard"))
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        user = User.query.filter_by(username=username, password=password).first()
        if user:
            login_user(user)
            return redirect(url_for("dashboard"))
        else:
            flash("Invalid credentials!")
    return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        if User.query.filter_by(username=username).first():
            flash("Username already exists!")
            return redirect(url_for("register"))
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        flash("Registration successful. Please log in!")
        return redirect(url_for("login"))
    return render_template("register.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))

@app.route("/dashboard")
@login_required
def dashboard():
    # For simplicity, we’re using dummy schedules.
    # In production, the schedule will be pulled from the DB and allow inline editing via AJAX.
    import datetime
    today = datetime.date.today()
    week_dates = {
        "last_week": [today + datetime.timedelta(days=i - 7) for i in range(7)],
        "current_week": [today + datetime.timedelta(days=i) for i in range(7)],
        "next_week": [today + datetime.timedelta(days=i + 7) for i in range(7)]
    }
    # Dummy statistics data. In a real app, calculate averages and totals.
    statistics = {
        "calories_total": 2000,
        "protein_avg": 30,
        "carbs_avg": 50,
        "fat_avg": 20
    }
    return render_template("dashboard.html", week_dates=week_dates, stats=statistics)

@app.route("/meal_creator", methods=["GET", "POST"])
@login_required
def meal_creator():
    if request.method == "POST":
        meal_name = request.form.get("meal_name")
        ingredients = request.form.get("ingredients")  # should be provided as a JSON string or structured input
        servings = int(request.form.get("servings", "1"))
        new_meal = Meal(name=meal_name, ingredients=ingredients, servings=servings, user_id=current_user.id)
        db.session.add(new_meal)
        db.session.commit()
        flash("Meal created successfully!")
        return redirect(url_for("dashboard"))
    return render_template("meal_creator.html")

@app.route("/api/nutrition", methods=["GET"])
@login_required
def api_nutrition():
    """
    Sample endpoint to import nutrition info from USDA API.
    Expects a query parameter 'query'.
    """
    query = request.args.get("query", "")
    if query:
        params = {
            "api_key": USDA_API_KEY,
            "query": query,
            "pageSize": 1
        }
        response = requests.get(USDA_API_URL, params=params)
        if response.ok:
            data = response.json()
            # Process the response and extract needed nutrition info.
            # This is a simplified example.
            return jsonify(data)
    return jsonify({"error": "No query provided."}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
