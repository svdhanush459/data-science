# Experiment 3(d): Scatter plot for two numeric columns
import pandas as pd
import matplotlib.pyplot as plt

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
numeric_columns = list(df.select_dtypes(include="number").columns)
if len(numeric_columns) < 2:
    raise ValueError("A scatter plot needs at least two numeric columns.")
x_column, y_column = numeric_columns[:2]
plt.scatter(df[x_column], df[y_column], alpha=0.75)
plt.title(f"{y_column} vs {x_column}")
plt.xlabel(x_column)
plt.ylabel(y_column)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
