# Experiment 1(c): Summary statistics and histograms
import pandas as pd
import matplotlib.pyplot as plt

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
numeric_columns = df.select_dtypes(include="number").columns
print("Summary statistics:")
print(df.describe(include="all"))

if len(numeric_columns):
    df[numeric_columns].hist(figsize=(10, 6))
    plt.tight_layout()
    plt.show()
else:
    print("No numeric columns are available for histograms.")
