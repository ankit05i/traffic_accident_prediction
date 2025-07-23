# Traffic_Accident_Prediction

## Setup

1. Create a virtual environment (recommended):
   ```bash
   python -m venv .venv
   source .venv/bin/activate      # Linux/Mac
   .venv\Scripts\activate       # Windows
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

```bash
python main.py
```

- Generates EDA plots (`severity_dist.png`, `heatmap.png`, `feature_importance.png`).
- Prints dataset shape, accuracy, classification report, confusion matrix.