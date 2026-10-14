# Experiment 2(b): Train, predict, and evaluate Linear Regression
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

# Upload your regression CSV as dataset.csv, or change this filename.
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
X_train, X_test, y_train, y_test = train_test_split(clean_df[feature_columns], clean_df[target_column], test_size=0.25, random_state=42)
model = LinearRegression().fit(X_train, y_train)
predictions = model.predict(X_test)
print("Predicted values:", predictions)
print("Actual values:", list(y_test))
print("Mean Absolute Error:", mean_absolute_error(y_test, predictions))
if len(y_test) > 1:
    print("R-squared:", r2_score(y_test, predictions))
else:
    print("R-squared needs at least two test rows; increase your dataset size.")
