# Experiment 5(a): Inspect labelled data and target classes
import pandas as pd
from pathlib import Path

csv_path = Path("dataset.csv")
if not csv_path.exists():
    other_csv_files = sorted(set(Path(".").glob("*.csv")) | set(Path("/").glob("*.csv")))
    csv_path = other_csv_files[0] if other_csv_files else None
if csv_path:
    df = pd.read_csv(csv_path)
    print("Using uploaded dataset:", csv_path)
else:
    print("No CSV uploaded; using built-in classification sample.")
    df = pd.DataFrame({"study_hours": [1, 2, 2, 3, 4, 5, 6, 7], "attendance": [50, 55, 60, 62, 70, 78, 85, 92], "result": ["Support", "Support", "Support", "Support", "Pass", "Pass", "Pass", "Pass"]})

target_column = "label" if "label" in df.columns else df.columns[-1]
print("First rows:")
print(df.head())
print("\nShape:", df.shape)
print("\nTarget column:", target_column)
print("Class counts:")
print(df[target_column].value_counts(dropna=False))
