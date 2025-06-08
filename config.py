import os

# Flask secret key
SECRET_KEY = os.environ.get("SECRET_KEY", "your-secret-key")

# USDA Nutrition API settings (Replace with your actual keys and endpoints if needed)
USDA_API_KEY = os.environ.get("USDA_API_KEY", "your-usda-api-key")
USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search"
