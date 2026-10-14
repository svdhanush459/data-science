(() => {
  const defaults = {
    "1a": window.partCompilerDefaults?.["1a"] || `# Notebook source: exp1.ipynb
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
    "1b": window.partCompilerDefaults?.["1b"] || `# Notebook source: exp1.ipynb
# Experiment 1(b): Create and export student data as a text/CSV file
import pandas as pd

student_data = pd.DataFrame({"Roll_no": [10, 11, 12, 13], "name": ["Ganesh", "mani", "nithin", "Chandhu"], "Dept": ["CSE", "IT", "ECE", "CSE"]})
student_data.to_csv("Student_output.txt")
print("Student data written successfully to Student_output.txt")
print(pd.read_csv("Student_output.txt"))`,
    "1c": window.partCompilerDefaults?.["1c"] || `# Notebook source: exp1.ipynb
# Experiment 1(c): Write and read student data in JSON and Excel formats
import pandas as pd
import openpyxl

student_data = pd.DataFrame({"Roll_no": [10, 11, 12, 13], "name": ["Ganesh", "mani", "nithin", "Chandhu"], "Dept": ["CSE", "IT", "ECE", "CSE"]})
student_data.to_json("Students.json", orient="records", indent=4)
print(pd.read_json("Students.json"))
student_data.to_excel("Student.xlsx", sheet_name="Student details", index=False)
print(pd.read_excel("Student.xlsx", sheet_name="Student details"))`,
  };
  function selectPart(key) {
    requestAnimationFrame(() => {
      try {
        const experimentId = Number.parseInt(key, 10);
        const item = labs.find((entry) => Number(entry.id) === experimentId);
        if (!item) return;
        item.partCodes = item.partCodes || {};
        let code = item.partCodes[key] || defaults[key] || window.partCompilerDefaults?.[key] || `# Experiment ${key}\n# Write this part's Python code here.`;
        const expectedHeader = `# Experiment ${experimentId}(${key.slice(-1)})`;
        const savedHeader = code.match(/^#\s*Experiment\s+\d+\([a-z]\)/im)?.[0];
        if (savedHeader && savedHeader.toLowerCase() !== expectedHeader.toLowerCase()) code = defaults[key] || `# Experiment ${key}\n# Write this part's Python code here.`;
        item.partCodes[key] = code;
        item.partCodeVersion = experimentId === 1 ? 4 : 2;
        save();
        const editor = $("labCodeInput");
        editor.value = code;
        editor.dataset.activePart = key;
        const panel = editor.closest(".panel");
        if (panel) panel.style.display = "block";
        document.querySelectorAll(".part-compiler").forEach((partPanel) => {
          const active = partPanel.id === `compilerPanel${key}`;
          partPanel.hidden = !active;
          partPanel.style.display = active ? "block" : "none";
        });
        document.querySelectorAll("[data-select-part]").forEach((button) => {
          const active = button.dataset.selectPart === key;
          button.classList.toggle("active", active);
          button.setAttribute("aria-selected", String(active));
        });
        editor.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (error) {
        console.error("Could not open the selected experiment part", error);
      }
    });
  }
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-part], [data-part], [data-select-part]");
    if (!button) return;
    const key = button.dataset.openPart || button.dataset.part || button.dataset.selectPart;
    if (key) selectPart(key);
  }, true);
  const editor = $("labCodeInput");
  editor.addEventListener("input", () => {
    const key = editor.dataset.activePart;
    if (!key) return;
    const item = labs.find((entry) => Number(entry.id) === Number.parseInt(key, 10));
    if (!item) return;
    item.partCodes = item.partCodes || {};
    item.partCodes[key] = editor.value;
    save();
    const partEditor = $(`partCompiler${key}`);
    if (partEditor) partEditor.value = editor.value;
  });
})();
