# Experiment 4(c): Validate and export the cleaned dataset
import pandas as pd

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
clean_df = df.drop_duplicates().copy()
numeric_columns = clean_df.select_dtypes(include="number").columns
text_columns = clean_df.select_dtypes(include="object").columns
clean_df[numeric_columns] = clean_df[numeric_columns].fillna(clean_df[numeric_columns].median())
for column in text_columns:
    clean_df[column] = clean_df[column].astype("string").str.strip().fillna("Unknown")
print("Validation — duplicate rows:", clean_df.duplicated().sum())
print("Validation — missing values:")
print(clean_df.isna().sum())
clean_df.to_csv("cleaned_data.csv", index=False)
print("\nSaved cleaned_data.csv with", len(clean_df), "rows and", len(clean_df.columns), "columns.")
