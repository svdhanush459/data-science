# Experiment 3(b): Line chart for a trend
import pandas as pd
import matplotlib.pyplot as plt

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
numeric_columns = list(df.select_dtypes(include="number").columns)
if len(numeric_columns) < 2:
    raise ValueError("A line chart needs at least two numeric columns.")
x_column, y_column = numeric_columns[:2]
df.plot(x=x_column, y=y_column, kind="line", marker="o", title=f"{y_column} by {x_column}")
plt.xlabel(x_column)
plt.ylabel(y_column)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
