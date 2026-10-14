# Experiment 1(b): Check and clean missing values and duplicates
import pandas as pd

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
print("Missing values before cleaning:")
print(df.isna().sum())
print("\nDuplicate rows:", df.duplicated().sum())

clean_df = df.drop_duplicates().copy()
numeric_columns = clean_df.select_dtypes(include="number").columns
clean_df[numeric_columns] = clean_df[numeric_columns].fillna(
    clean_df[numeric_columns].median()
)
print("\nMissing values after numeric median fill:")
print(clean_df.isna().sum())
print("\nCleaned dataset shape:", clean_df.shape)
