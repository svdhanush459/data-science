# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(a): Load and inspect numeric data for clustering
import pandas as pd
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({
        "hours": [2, 3, 4, 5, 6, 7, 8, 9],
        "score": [52, 58, 63, 69, 73, 81, 86, 92],
        "attendance": [60, 65, 70, 72, 78, 84, 88, 95],
    })
print("First five rows:")
print(df.head())
print()
print("Shape:", df.shape)
print("Numeric columns:", list(df.select_dtypes(include="number").columns))
print("Missing values:")
print(df.isna().sum())
