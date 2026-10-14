# Experiment 1(a): Load and inspect the dataset
import pandas as pd

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
print("First five rows:")
print(df.head())
print("\nDataset shape:", df.shape)
print("\nColumn types and non-null counts:")
df.info()
print("\nSummary statistics:")
print(df.describe(include="all"))
