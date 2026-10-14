# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(e): Fit K-Means and assign cluster labels
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({"hours": [2, 3, 4, 5, 6, 7, 8, 9], "score": [52, 58, 63, 69, 73, 81, 86, 92], "attendance": [60, 65, 70, 72, 78, 84, 88, 95]})
features = df.select_dtypes(include="number").dropna()
scaled = StandardScaler().fit_transform(features)
k = min(3, len(features))
model = KMeans(n_clusters=k, random_state=42, n_init=10)
labels = model.fit_predict(scaled)
clustered = features.copy()
clustered["cluster"] = labels
print(clustered.head(10))
print()
print("Cluster counts:")
print(clustered["cluster"].value_counts().sort_index())
print()
print("Centres (scaled features):")
print(model.cluster_centers_.round(2))
