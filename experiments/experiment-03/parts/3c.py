# Experiment 3(c): Bar chart for category comparison
import pandas as pd
import matplotlib.pyplot as plt

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
numeric_columns = list(df.select_dtypes(include="number").columns)
categorical_columns = list(df.select_dtypes(exclude="number").columns)
if categorical_columns and numeric_columns:
    category, value = categorical_columns[0], numeric_columns[0]
    chart_data = df.groupby(category, dropna=False)[value].mean().sort_values()
    chart_data.plot(kind="bar", title=f"Average {value} by {category}")
    plt.ylabel(f"Average {value}")
else:
    if not numeric_columns:
        raise ValueError("A bar chart needs at least one numeric column.")
    df[numeric_columns].mean().plot(kind="bar", title="Average of numeric columns")
    plt.ylabel("Mean")
plt.xlabel("Category / column")
plt.tight_layout()
plt.show()
