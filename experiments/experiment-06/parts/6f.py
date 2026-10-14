# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(f): Evaluate cluster quality with silhouette score
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({"hours": [2, 3, 4, 5, 6, 7, 8, 9], "score": [52, 58, 63, 69, 73, 81, 86, 92], "attendance": [60, 65, 70, 72, 78, 84, 88, 95]})
features = df.select_dtypes(include="number").dropna()
scaled = StandardScaler().fit_transform(features)
k = min(3, len(features) - 1)
if k < 2:
    print("Add more rows to evaluate at least two clusters.")
else:
    labels = KMeans(n_clusters=k, random_state=42, n_init=10).fit_predict(scaled)
    if len(set(labels)) > 1:
        print("Silhouette score:", round(silhouette_score(scaled, labels), 3))
    else:
        print("A silhouette score needs at least two populated clusters.")
