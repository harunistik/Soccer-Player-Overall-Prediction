# ⚽ Football Player Overall Prediction

This project predicts the **overall rating** of football players based on their key attributes using **regression models**.  
Multiple algorithms were compared, and the best-performing model (**LightGBM Regressor**) was deployed through a **FastAPI** backend and a simple web UI with a FIFA-style card.

---

## 🚀 Features
- Input features: `Pace`, `Shooting`, `Passing`, `Dribbling`, `Defending`, `Physic` (range: 0–99).
- Multiple regression models trained and compared.
- **LightGBM Regressor** achieved the best performance (R² = 0.968).
- REST API built with **FastAPI**:
  - `/predict` → returns model predictions
  - `/` → serves the HTML UI
- Interactive **web UI**:
  - Sliders + numeric inputs for attributes
- Model + scaler stored via `pickle` for reproducibility.

---

## 📊 Model Comparison (R² Score)

| Model                   | R² Score |
|--------------------------|----------|
| Linear Regression        | 0.776 |
| K Neighbors Regressor    | 0.944 |
| Support Vector Regressor | 0.966 |
| Decision Tree            | 0.931 |
| Random Forest Regressor  | 0.965 |
| AdaBoost Regressor       | 0.913 |
| Gradient Boost Regressor | 0.960 |
| XGBoost Regressor        | 0.966 |
| **LightGBM Regressor**   | **0.968** ✅ |

LightGBM Regressor was chosen for deployment due to its superior performance.
