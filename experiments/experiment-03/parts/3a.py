# Experiment 3(a): Load data and inspect columns for plotting
import pandas as pd

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
print("First five rows:")
print(df.head())
print("\nDataset shape:", df.shape)
numeric_columns = list(df.select_dtypes(include="number").columns)
print("\nNumeric columns available for charts:", numeric_columns)
print("\nSummary statistics:")
print(df[numeric_columns].describe())
