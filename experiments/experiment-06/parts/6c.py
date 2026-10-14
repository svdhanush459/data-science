# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(c): Scale numeric features for fair distance comparisons
import pandas as pd
from sklearn.preprocessing import StandardScaler
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({"hours": [2, 3, 4, 5, 6, 7, 8, 9], "score": [52, 58, 63, 69, 73, 81, 86, 92], "attendance": [60, 65, 70, 72, 78, 84, 88, 95]})
features = df.select_dtypes(include="number").dropna()
scaler = StandardScaler()
scaled = scaler.fit_transform(features)
scaled_df = pd.DataFrame(scaled, columns=features.columns, index=features.index)
print("Scaled feature means (approximately zero):")
print(scaled_df.mean().round(2))
print()
print("Scaled sample:")
print(scaled_df.head())
