# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(d): Compare cluster counts with the elbow method
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({"hours": [2, 3, 4, 5, 6, 7, 8, 9], "score": [52, 58, 63, 69, 73, 81, 86, 92], "attendance": [60, 65, 70, 72, 78, 84, 88, 95]})
features = df.select_dtypes(include="number").dropna()
scaled = StandardScaler().fit_transform(features)
max_k = min(6, len(scaled))
inertias = []
for k in range(1, max_k + 1):
    model = KMeans(n_clusters=k, random_state=42, n_init=10)
    model.fit(scaled)
    inertias.append(model.inertia_)
print("K values:", list(range(1, max_k + 1)))
print("Inertia:", [round(value, 3) for value in inertias])
plt.plot(range(1, max_k + 1), inertias, marker="o")
plt.xlabel("Number of clusters (K)")
plt.ylabel("Inertia")
plt.title("K-Means elbow method")
plt.tight_layout()
plt.show()
