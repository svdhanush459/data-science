# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(g): Plot clusters and interpret their centres
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({"hours": [2, 3, 4, 5, 6, 7, 8, 9], "score": [52, 58, 63, 69, 73, 81, 86, 92], "attendance": [60, 65, 70, 72, 78, 84, 88, 95]})
features = df.select_dtypes(include="number").dropna()
if features.shape[1] < 2:
    raise ValueError("Choose at least two numeric features to plot clusters.")
scaled = StandardScaler().fit_transform(features)
k = min(3, len(features))
model = KMeans(n_clusters=k, random_state=42, n_init=10)
labels = model.fit_predict(scaled)
plt.scatter(scaled[:, 0], scaled[:, 1], c=labels, cmap="viridis", s=50)
plt.scatter(model.cluster_centers_[:, 0], model.cluster_centers_[:, 1], c="red", marker="X", s=180, label="Centroids")
plt.xlabel(features.columns[0] + " (scaled)")
plt.ylabel(features.columns[1] + " (scaled)")
plt.title("K-Means cluster groups")
plt.legend()
plt.tight_layout()
plt.show()
print("Review each group using the cluster labels and scaled centroids.")
