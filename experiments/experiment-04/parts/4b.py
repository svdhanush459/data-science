# Experiment 4(b): Remove duplicates and clean missing values
import pandas as pd

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
clean_df = df.drop_duplicates().copy()
numeric_columns = clean_df.select_dtypes(include="number").columns
text_columns = clean_df.select_dtypes(include="object").columns
clean_df[numeric_columns] = clean_df[numeric_columns].fillna(clean_df[numeric_columns].median())
for column in text_columns:
    clean_df[column] = clean_df[column].astype("string").str.strip()
    if clean_df[column].isna().any():
        clean_df[column] = clean_df[column].fillna("Unknown")
print("Rows before:", len(df))
print("Rows after removing duplicates:", len(clean_df))
print("\nRemaining missing values:")
print(clean_df.isna().sum())
print("\nCleaned sample:")
print(clean_df.head())
