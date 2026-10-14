# Experiment 2(a): Prepare features, target, and train/test data
import pandas as pd
from sklearn.model_selection import train_test_split

# Upload your regression CSV as dataset.csv, or change this filename.
from pathlib import Path
csv_path = Path("dataset.csv")
if not csv_path.exists():
    other_csv_files = sorted(set(Path(".").glob("*.csv")) | set(Path("/").glob("*.csv")))
    csv_path = other_csv_files[0] if other_csv_files else None
if csv_path:
    print(f"Using dataset: ${csv_path}")
    df = pd.read_csv(csv_path)
else:
    print("No CSV uploaded; using built-in regression sample data.")
    df = pd.DataFrame({"hours": [1, 2, 3, 4, 5, 6], "score": [50, 55, 65, 70, 75, 85]})

numeric_columns = list(df.select_dtypes(include="number").columns)
if len(numeric_columns) < 2:
    raise ValueError("Regression needs at least two numeric columns: one feature and one target.")
target_column = "target" if "target" in numeric_columns else numeric_columns[-1]
feature_columns = [column for column in numeric_columns if column != target_column]
clean_df = df[feature_columns + [target_column]].dropna()
X = clean_df[feature_columns]
y = clean_df[target_column]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
print("Feature columns:", feature_columns)
print("Target column:", target_column)
print("Training rows:", len(X_train), "Testing rows:", len(X_test))
