# Use an official lightweight Python image.
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose a port
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
