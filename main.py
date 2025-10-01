import uvicorn
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import pickle
import pandas as pd
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Serve static assets directly from the templates directory
app.mount("/assets", StaticFiles(directory="templates"), name="assets")

# Templates
templates = Jinja2Templates(directory="templates")

# Load model and preprocessors
with open('model_savings_new.pkl', 'rb') as f:
    saved_data = pickle.load(f)
    model = saved_data['model']
    scaler = saved_data['scaler']

class PlayerFeatures(BaseModel):
    pace: float
    shooting: float
    passing: float
    dribbling: float
    defending: float
    physic: float


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/predict")
async def predict(features: PlayerFeatures):
    # Create a DataFrame with the input features
    input_data = pd.DataFrame([features.model_dump()])

    # Apply standard scaling using the saved scaler
    input_scaled = scaler.transform(input_data)

    # Make prediction
    prediction = model.predict(input_scaled)[0]

    return {"predicted_price": float(prediction)}