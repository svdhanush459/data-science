# Experiment 5(b): Prepare data and train a Decision Tree
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

csv_path = Path("dataset.csv")
if not csv_path.exists():
    other_csv_files = sorted(set(Path(".").glob("*.csv")) | set(Path("/").glob("*.csv")))
    csv_path = other_csv_files[0] if other_csv_files else None
if csv_path:
    df = pd.read_csv(csv_path)
else:
    df = pd.DataFrame({"study_hours": [1, 2, 2, 3, 4, 5, 6, 7], "attendance": [50, 55, 60, 62, 70, 78, 85, 92], "result": ["Support", "Support", "Support", "Support", "Pass", "Pass", "Pass", "Pass"]})

target_column = "label" if "label" in df.columns else df.columns[-1]
work_df = df.dropna(subset=[target_column]).copy()
y = work_df[target_column].astype(str)
X = work_df.drop(columns=[target_column])
numeric_columns = X.select_dtypes(include="number").columns
text_columns = X.columns.difference(numeric_columns)
X[numeric_columns] = X[numeric_columns].fillna(X[numeric_columns].median())
for column in text_columns:
    X[column] = X[column].fillna("Unknown").astype(str)
X = pd.get_dummies(X, dummy_na=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
model = DecisionTreeClassifier(max_depth=3, random_state=42).fit(X_train, y_train)
print("Target:", target_column)
print("Features:", list(X.columns))
print("Training rows:", len(X_train), "Testing rows:", len(X_test))
print("Decision Tree model trained.")
