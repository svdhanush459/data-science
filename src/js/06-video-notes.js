(() => {
  const root = document.getElementById("videoNoteParts");
  const detail = document.getElementById("detail");
  if (!root || !detail) return;
  const experimentOne = labs.find((candidate) => Number(candidate.id) === 1);
  if (experimentOne && !experimentOne.partCodes?.["1a"]?.includes("# Notebook source: exp1.ipynb")) {
    experimentOne.partCodes = {
      "1a": `# Notebook source: exp1.ipynb
# Experiment 1(a): Read and inspect the car dataset
import pandas as pd
from pathlib import Path

csv_path = Path("car_dataset_40x20.csv")
if not csv_path.exists():
    csv_files = sorted(Path(".").glob("*.csv"))
    if csv_files:
        csv_path = csv_files[0]
    else:
        print("CSV not uploaded; using a small sample dataset.")
        df = pd.DataFrame({"car": ["Car A", "Car B", "Car C"], "mpg": [25.0, 31.5, 28.0], "horsepower": [110, 95, 120]})
if csv_path.exists():
    df = pd.read_csv(csv_path)
print("First five rows:")
print(df.head())
print("\\nShape:", df.shape)
print("\\nColumns:", list(df.columns))
print("\\nColumn information:")
df.info()
print("\\nSummary statistics:")
print(df.describe(include="all"))`,
      "1b": `# Notebook source: exp1.ipynb
# Experiment 1(b): Create and export student data as a text/CSV file
import pandas as pd

Student_data = {
    "Roll_no": [10, 11, 12, 13],
    "name": ["Ganesh", "mani", "nithin", "Chandhu"],
    "Dept": ["CSE", "IT", "ECE", "CSE"],
}
df = pd.DataFrame(Student_data)
df.to_csv("Student_output.txt")
print("Succes")
nf = pd.read_csv("Student_output.txt")
print(nf)`,
      "1c": `# Notebook source: exp1.ipynb
# Experiment 1(c): Write and read student data in JSON and Excel formats
import pandas as pd
import openpyxl

Student_data = {
    "Roll_no": [10, 11, 12, 13],
    "name": ["Ganesh", "mani", "nithin", "Chandhu"],
    "Dept": ["CSE", "IT", "ECE", "CSE"],
}
df = pd.DataFrame(Student_data)
df.to_json("Students.json", orient="records", indent=4)
print("JSON file created")
print("Student Data")
print(pd.read_json("Students.json"))
df.to_excel("Student.xlsx", sheet_name="Student details", index=False)
print("Data written successfully in excel")
print("Data from excel file")
print(pd.read_excel("Student.xlsx", sheet_name="Student details"))`,
    };
    experimentOne.partCodeVersion = 4;
    save();
  }
  const expectedParts = { 1: ["a", "b", "c"], 2: ["a", "b"], 3: ["a", "b", "c", "d"], 4: ["a", "b", "c"], 5: ["a", "b", "c", "d"], 6: ["a", "b", "c", "d", "e", "f", "g"] };
  function ensureVideoNoteParts() {
    if (!detail.classList.contains("show")) return;
    const item = labs.find((candidate) => Number(candidate.id) === Number(currentId));
    if (!item) return;
    if (root.children.length && root.dataset.experimentId === String(item.id)) return;
    const letters = expectedParts[Number(item.id)] || ["a", "b"];
    const fragment = document.createDocumentFragment();
    letters.forEach((letter, index) => {
      const key = `${Number(item.id)}${letter}`;
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.openPart = key;
      button.setAttribute("aria-label", `Open ${key.toUpperCase()} compiler and experiment video`);
      const badge = document.createElement("span");
      badge.className = "video-part-badge";
      badge.textContent = key.toUpperCase();
      const title = document.createElement("strong");
      title.textContent = `Section ${letter.toUpperCase()}`;
      const description = document.createElement("small");
      description.textContent = item.parts?.[index] || `Open the ${letter.toUpperCase()} compiler and experiment video.`;
      button.append(badge, title, description);
      fragment.appendChild(button);
    });
    root.replaceChildren(fragment);
    root.dataset.experimentId = String(item.id);
  }
  const observer = new MutationObserver(ensureVideoNoteParts);
  observer.observe(detail, { attributes: true, attributeFilter: ["class"] });
  observer.observe(document.getElementById("dTitle"), { childList: true, characterData: true, subtree: true });
  document.addEventListener("click", (event) => {
    if (event.target.closest("#cards .card, [data-open-part], [data-part], [data-select-part]")) setTimeout(ensureVideoNoteParts, 0);
  }, true);
})();
