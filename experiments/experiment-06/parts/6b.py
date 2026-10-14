# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(b): Select numeric features and clean missing values
import pandas as pd
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({"hours": [2, 3, 4, 5, 6, 7, 8, 9], "score": [52, 58, 63, 69, 73, 81, 86, 92], "attendance": [60, 65, 70, 72, 78, 84, 88, 95]})
features = df.select_dtypes(include="number")
clean_features = features.dropna().copy()
print("Selected features:", list(clean_features.columns))
print("Rows before cleaning:", len(features))
print("Rows after dropping incomplete values:", len(clean_features))
print(clean_features.head())
