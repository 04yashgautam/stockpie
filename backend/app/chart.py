from fastapi import APIRouter
import pandas as pd
import os

router = APIRouter()

@router.get("/chart-data")
def get_chart_data():
    csv_path = os.path.join(os.path.dirname(__file__), "data", "data.csv")
    df = pd.read_csv(csv_path, usecols=["Date", "Close"])
    df["Date"] = pd.to_datetime(df["Date"]).dt.strftime("%Y-%m-%d")
    return df.to_dict(orient="records")
