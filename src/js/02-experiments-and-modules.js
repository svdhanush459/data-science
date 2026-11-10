(() => {
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const form = $("form");
  const expForm = $("expform");
  const addButton = $("add");
  let editingId = null;
  const persistMigration = () => { try { save(); } catch (error) { console.warn("Could not persist the lab migration", error); } };

  if ((student.name || "").trim().toLowerCase() === "dhanush sv") {
    student.name = "dhanush sv";
    persistMigration();
  }

  const videosToRemove = new Set([
    "https://www.youtube.com/watch?v=Liv6eeb1VfE",
    "https://www.youtube.com/watch?v=ukZn2RJb7TU",
    "https://www.youtube.com/watch?v=UO98lJQ3QGI",
    "https://www.youtube.com/watch?v=bDhvCp3_lYw",
    "https://www.youtube.com/watch?v=_L39rN6gz7Y",
  ]);
  let removedExperimentVideos = false;
  labs.forEach((item) => {
    if (videosToRemove.has(item.video) || videosToRemove.has(item.videoUrl)) {
      item.video = "";
      item.videoUrl = "";
      removedExperimentVideos = true;
    }
  });
  if (removedExperimentVideos) persistMigration();

  const experimentVideoTutorials = {
    1: "https://www.youtube.com/watch?v=ZyhVh-qRZPA",
    2: "https://www.youtube.com/watch?v=PaFPbb66DxQ",
    3: "https://www.youtube.com/watch?v=qqwf4Vuj8oM",
    4: "https://www.youtube.com/watch?v=EaGbS7eWSs0",
    5: "https://www.youtube.com/watch?v=q90UDEgYqeI",
  };
  let addedExperimentVideos = false;
  labs.forEach((item) => {
    const tutorial = experimentVideoTutorials[Number(item.id)];
    if (tutorial && !item.video && !item.videoUrl) {
      item.video = tutorial;
      item.videoUrl = tutorial;
      addedExperimentVideos = true;
    }
  });
  if (addedExperimentVideos) persistMigration();

  const experimentOne = labs.find((item) => item.id === 1);
  if (experimentOne) {
    const experimentOneParts = [
      "1(a) Load the dataset and inspect its rows, columns, and data types.",
      "1(b) Check missing values and duplicates, then clean the dataset.",
      "1(c) Display summary statistics and plot numeric columns as histograms.",
    ];
    if (!Array.isArray(experimentOne.parts) || experimentOne.parts.length === 0) {
      experimentOne.parts = experimentOneParts;
    }
    if ((experimentOne.code || "").includes('df.hist(figsize=(10, 6))')) {
      experimentOne.code = `# Experiment 1(a): Load and inspect the dataset
import pandas as pd
import matplotlib.pyplot as plt

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
print("First five rows:")
print(df.head())
print("\\nDataset shape:", df.shape)
print("\\nColumn types and non-null counts:")
df.info()

# Experiment 1(b): Check and clean missing values and duplicates
print("\\nMissing values before cleaning:")
print(df.isna().sum())
print("\\nDuplicate rows:", df.duplicated().sum())
clean_df = df.drop_duplicates().copy()
numeric_columns = clean_df.select_dtypes(include="number").columns
clean_df[numeric_columns] = clean_df[numeric_columns].fillna(
    clean_df[numeric_columns].median()
)
print("\\nMissing values after numeric median fill:")
print(clean_df.isna().sum())

# Experiment 1(c): Summary statistics and histograms
print("\\nSummary statistics:")
print(clean_df.describe(include="all"))
if len(numeric_columns):
    clean_df[numeric_columns].hist(figsize=(10, 6))
    plt.tight_layout()
    plt.show()
else:
    print("No numeric columns are available for histograms.")`;
    }
    persistMigration();
  }
  const experimentTwo = labs.find((item) => Number(item.id) === 2);
  if (experimentTwo) {
    if (!Array.isArray(experimentTwo.parts) || experimentTwo.parts.length === 0) {
      experimentTwo.parts = [
        "2(a) Prepare numeric feature and target columns, then split the data into training and testing sets.",
        "2(b) Train a Linear Regression model, make predictions, and calculate evaluation metrics.",
      ];
      persistMigration();
    }
  }
  const experimentThree = labs.find((item) => Number(item.id) === 3);
  if (experimentThree && (!Array.isArray(experimentThree.parts) || experimentThree.parts.length === 0)) {
    experimentThree.parts = [
      "3(a) Load the dataset and identify numeric columns for plotting.",
      "3(b) Create a labelled line chart to show a trend between two numeric columns.",
      "3(c) Create a bar chart to compare values by category, or compare numeric averages.",
      "3(d) Create a labelled scatter plot to inspect the relationship between two numeric columns.",
    ];
    persistMigration();
  }
  const experimentFour = labs.find((item) => Number(item.id) === 4);
  if (experimentFour && (!Array.isArray(experimentFour.parts) || experimentFour.parts.length === 0)) {
    experimentFour.parts = [
      "4(a) Load the raw dataset and profile missing values, duplicates, and data types.",
      "4(b) Remove duplicate rows, fill numeric missing values, and standardize text values.",
      "4(c) Validate the cleaned data and export it as cleaned_data.csv.",
    ];
    persistMigration();
  }
  const experimentFive = labs.find((item) => Number(item.id) === 5);
  if (experimentFive && (!Array.isArray(experimentFive.parts) || experimentFive.parts.length === 0)) {
    experimentFive.parts = [
      "5(a) Load the labelled dataset and inspect its features and target classes.",
      "5(b) Prepare features and labels, then train a Decision Tree classifier.",
      "5(c) Predict test labels and review accuracy and classification metrics.",
      "5(d) Print the learned tree rules and inspect feature importance.",
    ];
    persistMigration();
  }
  if (experimentFive && experimentFive.parts.length < 5) {
    experimentFive.parts = [
      "5(a) Explore the Iris dataset with line, scatter, histogram, box, and pair plots.",
      "5(b) Compare monthly sales and expenses; make grouped and stacked student-marks bar charts.",
      "5(c) Plot marks with a histogram and density curve.",
      "5(d) Plot study hours against marks and calculate correlation.",
      "5(e) Compare department marks with a box plot.",
    ];
    persistMigration();
  }

  const experimentsSevenToTen = [
    { id: 7, title: "Pandas GroupBy and Aggregation", desc: "Group student and Iris data to calculate marks, attendance, and summary statistics.", summary: "Use Pandas groupby and aggregate functions to summarize student performance across departments, years, and Iris species.", parts: ["7(a) Group departments and years; calculate average marks.", "7(b) Aggregate marks and attendance with sum, mean, and standard deviation.", "7(c) Summarize Iris measurements and counts by species."], video: "https://www.youtube.com/watch?v=M6HaL2UBmWQ", videoUrl: "https://www.youtube.com/watch?v=M6HaL2UBmWQ", architecture: ["CSV data", "Pandas DataFrame", "Group by category", "Aggregate statistics", "Interpret results"], steps: ["Load the student or Iris data with Pandas.", "Inspect category and numeric columns.", "Group by one or more categories.", "Apply aggregation functions and compare results.", "Interpret the grouped summaries."], objectives: ["Use groupby with one or multiple columns.", "Apply multiple aggregate functions.", "Interpret grouped summaries."], requirements: ["Python 3", "Jupyter Notebook", "Pandas", "Student and Iris datasets"], code: "", input: "", output: "", result: "Grouped summary tables for marks, attendance, and Iris measurements.", conclusion: "Grouping and aggregation reveal differences across categories." },
    { id: 8, title: "Web Scraping and Review Sentiment Analysis", desc: "Collect product reviews and analyze their sentiment and frequently used terms.", summary: "Use BeautifulSoup to extract review text, then apply VADER sentiment analysis and visualize common review terms.", parts: ["8(a) Scrape review text and ratings from a webpage using BeautifulSoup.", "8(b) Analyze product reviews with VADER and visualize terms with a word cloud."], video: "https://www.youtube.com/watch?v=bUpj7bSs-e0", videoUrl: "https://www.youtube.com/watch?v=bUpj7bSs-e0", architecture: ["Review webpage", "Requests + BeautifulSoup", "Clean review text", "VADER sentiment", "Word cloud and findings"], steps: ["Inspect the webpage structure and review elements.", "Fetch and parse the page with Requests and BeautifulSoup.", "Extract and clean review text.", "Calculate VADER sentiment scores.", "Visualize frequent terms and summarize sentiment."], objectives: ["Extract review text from HTML.", "Prepare text for sentiment analysis.", "Interpret sentiment scores and common terms."], requirements: ["Python 3", "Jupyter Notebook", "Requests and BeautifulSoup", "NLTK VADER", "WordCloud"], code: "", input: "", output: "", result: "Collected product reviews with sentiment scores and a word cloud.", conclusion: "Review scraping and sentiment analysis turn unstructured feedback into useful summaries." },
    { id: 9, title: "Customer Segmentation with K-Means", desc: "Cluster marketing customers and assess the quality of the resulting segments.", summary: "Prepare customer features, standardize them, build K-Means clusters, and evaluate separation with a silhouette score.", parts: [], video: "https://www.youtube.com/watch?v=lP7TOc1DnaI", videoUrl: "https://www.youtube.com/watch?v=lP7TOc1DnaI", architecture: ["Marketing data", "Feature selection", "Standardization", "K-Means clustering", "Silhouette evaluation"], steps: ["Load and inspect the marketing campaign dataset.", "Select customer features and handle missing values.", "Standardize numeric features.", "Fit K-Means and assign cluster labels.", "Evaluate the clusters with a silhouette score and describe each segment."], objectives: ["Prepare data for clustering.", "Apply K-Means to customer data.", "Evaluate and interpret customer segments."], requirements: ["Python 3", "Jupyter Notebook", "Pandas and NumPy", "Scikit-learn", "marketing_campaign.csv"], code: "", input: "", output: "", result: "Customer records labelled with clusters and an evaluation score.", conclusion: "K-Means groups customers with similar feature patterns for further analysis." },
    { id: 10, title: "Emotion Classification with TF-IDF and Logistic Regression", desc: "Train a text classifier to predict emotion labels from short messages.", summary: "Transform text into TF-IDF features, train a Logistic Regression pipeline, and review classification metrics.", parts: [], video: "https://www.youtube.com/watch?v=XzKAXoAkbUk", videoUrl: "https://www.youtube.com/watch?v=XzKAXoAkbUk", architecture: ["Emotion-labelled text", "Train/test split", "TF-IDF features", "Logistic Regression", "Classification metrics"], steps: ["Prepare the emotion-labelled text samples.", "Split examples into training and test sets.", "Build a TF-IDF and Logistic Regression pipeline.", "Train the classifier and predict emotion labels.", "Review precision, recall, F1-score, and misclassified examples."], objectives: ["Convert text into TF-IDF features.", "Train a supervised text classifier.", "Evaluate predictions with classification metrics."], requirements: ["Python 3", "Jupyter Notebook", "Pandas", "Scikit-learn", "Emotion-labelled text data"], code: "", input: "", output: "", result: "Predicted emotion labels and classification metrics.", conclusion: "TF-IDF with Logistic Regression provides a useful baseline for emotion classification." },
  ];
  let appendedExperimentsSevenToTen = false;
  for (const experiment of experimentsSevenToTen) {
    if (!labs.some((item) => Number(item.id) === experiment.id)) {
      labs.push(experiment);
      appendedExperimentsSevenToTen = true;
    }
  }
  if (appendedExperimentsSevenToTen) persistMigration();

  const style = document.createElement("style");
  style.textContent = `
    @media(min-width:801px){.layout,.dgrid{grid-template-columns:minmax(0,1fr) 300px}}
    @media(min-width:621px) and (max-width:800px){.layout,.dgrid{grid-template-columns:minmax(0,1fr) 250px}}
    @media(max-width:620px){.layout,.dgrid{grid-template-columns:1fr}.fields{grid-template-columns:1fr 1fr}.field{grid-template-columns:85px minmax(0,1fr);gap:5px}}
    .thumb-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
    .thumb{height:auto;aspect-ratio:16/9}
    .video{aspect-ratio:16/9}
    .thumb .playicon,.thumb small{z-index:2}
    .thumb.has-video-thumbnail::before,.thumb.has-video-thumbnail::after,.thumb.has-video-thumbnail small{display:none}
    .thumb.has-video-thumbnail .playicon{background:#fff;color:#e62117;box-shadow:0 2px 12px #0007}
    .video-thumbnail-link{display:block;position:relative;width:100%;height:100%}
    .video-thumbnail-link img{display:block;width:100%;height:100%;object-fit:cover;object-position:center}
    .video-thumbnail-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:#fff;color:#315fc4;font-size:18px;box-shadow:0 2px 12px #0005}
    .video-link-fallback{display:grid;place-items:center;width:100%;height:100%;color:#fff;background:#14264b;font-weight:700;text-decoration:none}
    .module-view{padding:18px 0 30px}
    .module-view[hidden],.module-detail[hidden],.module-grid[hidden]{display:none!important}
    .module-intro{background:#fff;border:1px solid var(--line);border-radius:10px;padding:18px;margin-bottom:13px}
    .module-intro h2{font-size:18px;color:var(--navy);margin:0 0 6px}
    .module-intro p,.module-detail>p{font-size:10px;color:var(--muted);margin:0}
    .module-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
    .module-card{display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:8px;background:#fff;border:1px solid var(--line);border-radius:10px;padding:15px;cursor:pointer}
    .module-card:hover{border-color:#9db4e9;box-shadow:0 6px 16px #14264b12}
    .module-number{display:inline-block;font-size:8px;font-weight:700;color:#3862bc;background:#edf2ff;border-radius:5px;padding:5px 7px}
    .module-card strong,.module-detail h3{font-size:12px;color:var(--navy)}
    .module-card>span:last-child{font-size:9px;line-height:1.6;color:var(--muted)}
    .module-detail{position:relative;display:grid;grid-template-columns:156px minmax(0,1fr);align-items:center;gap:38px;min-height:320px;padding:54px 5%;overflow:hidden;background:#182333;border:1px solid #2d3d52;border-radius:22px;color:#e6edf7;box-shadow:0 18px 50px #07111d35}
    .module-detail h3{margin:0 0 10px;color:#e6edf7;font-size:clamp(32px,4vw,52px);line-height:1.05;letter-spacing:-1.5px}
    .module-back{position:absolute;top:18px;left:20px;z-index:1;border:1px solid #3b506c;background:transparent;color:#dce5f2;border-radius:8px;padding:8px 12px;font-size:11px;cursor:pointer}
    .module-emblem{display:grid;place-items:center;width:156px;aspect-ratio:1;border:1px solid #45668e;border-radius:34px;background:linear-gradient(145deg,#29466c,#1e3451);color:#9bc6ff;font-size:38px;font-weight:800;letter-spacing:-1px}
    .module-material-content{min-width:0}
    .module-eyebrow{margin-bottom:18px;color:#dfbd68;font-size:13px;font-weight:800;letter-spacing:2px}
    .module-description{margin:0 0 12px;color:#aab7c9;font-size:16px;line-height:1.55}
    .module-upload-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:22px 0 12px}
    #modulePdfUpload{display:none}
    .module-add-pdf,.module-pdf a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border:1px solid #36465c;border-radius:12px;background:transparent;color:#e6edf7;font-size:15px;font-weight:750;text-decoration:none;cursor:pointer;transition:background .16s ease,border-color .16s ease,transform .16s ease}
    .module-add-pdf{border-color:#dfbd68;background:#dfbd68;color:#182333}
    .module-add-pdf:hover{background:#edcb79;border-color:#edcb79;transform:translateY(-1px)}
    .module-pdf a:hover{background:#24364e;border-color:#6684aa}
    .module-upload-row .module-add-pdf{min-height:48px;padding:0 22px}
    #moduleUploadStatus,.module-empty{display:block;margin:10px 0;color:#aab7c9;font-size:13px}
    .module-pdf-list{display:grid;gap:12px;margin-top:18px}
    .module-pdf{display:grid;gap:14px;min-width:0}
    .module-pdf span{overflow-wrap:anywhere;color:#e6edf7;font-size:16px;font-weight:750}
    .module-pdf-actions{display:flex;gap:12px;flex-wrap:wrap}
    .module-pdf a{min-height:48px;padding:0 20px}
    .module-pdf a:first-child{background:#203047}
    .module-pdf a:last-child{color:#dfbd68}
    html:not([data-theme="dark"]) .module-detail{background:linear-gradient(120deg,#fff 0%,#fffafa 58%,#fbf1f3 100%);border-color:#eed9de;color:#17283d;box-shadow:0 16px 40px #80233310}
    html:not([data-theme="dark"]) .module-detail h3,html:not([data-theme="dark"]) .module-pdf span{color:#17283d}
    html:not([data-theme="dark"]) .module-back{background:#fff7f8;border-color:#ead1d7;color:#9f2334}
    html:not([data-theme="dark"]) .module-emblem{background:linear-gradient(145deg,#edf4ff,#dce9ff);border-color:#c7d9f5;color:#315fae}
    html:not([data-theme="dark"]) .module-eyebrow{color:#bd2032}
    html:not([data-theme="dark"]) .module-description,html:not([data-theme="dark"]) #moduleUploadStatus,html:not([data-theme="dark"]) .module-empty{color:#65758a}
    html:not([data-theme="dark"]) .module-add-pdf{background:#bd2032;border-color:#bd2032;color:#fff}
    html:not([data-theme="dark"]) .module-add-pdf:hover{background:#a91c2d;border-color:#a91c2d}
    html:not([data-theme="dark"]) .module-pdf a:first-child{background:#fff;border-color:#e8cbd2;color:#9f2334}
    html:not([data-theme="dark"]) .module-pdf a:last-child{background:#fff7f8;border-color:#e8cbd2;color:#9f2334}
    html:not([data-theme="dark"]) .module-pdf a:hover{background:#fbe9ed;border-color:#d99eaa}
    @media(max-width:620px){.module-grid{grid-template-columns:1fr}.module-intro,.module-detail{padding:22px}.module-detail{grid-template-columns:1fr;gap:18px;padding-top:70px}.module-emblem{width:92px;border-radius:24px;font-size:28px}.module-eyebrow{margin-bottom:10px}.module-detail h3{font-size:36px}.module-description{font-size:14px}.module-pdf-actions{gap:8px}.module-add-pdf,.module-pdf a{min-height:44px;padding:0 14px;font-size:13px}}
    @media(max-width:620px){.module-intro{padding:14px}}
    .profile{padding:18px}
    .profile h3{font-size:10px;margin-bottom:12px}
    .fields{gap:13px;padding:16px 0}
    .phead .avatar{width:56px;height:56px}
    .phead{display:flex;flex-direction:row;align-items:center;gap:12px}
    .phead b{font-size:15px}
    .phead>div:last-child{min-width:0;flex:1}
    .phead b{white-space:nowrap}
    .fields{display:grid;grid-template-columns:1fr;gap:9px}
    .field{display:grid;grid-template-columns:112px minmax(0,1fr);align-items:baseline;gap:8px;min-width:0}
    .field span{display:inline;margin:0;min-width:0;font-size:10px}
    .field span::after{content:":"}
    .field b{display:inline;min-width:0;font-size:12px}
    .lab-actions{display:flex;gap:6px;flex-wrap:wrap;margin-top:9px}
    .detail-actions{display:flex;align-items:center;gap:10px;margin-bottom:12px}
    .detail-actions .back{margin:0}
    .delete-detail{border:1px solid #e6aeb5;border-radius:7px;padding:6px 9px;background:#fff1f2;color:#a52335;font-size:9px;font-weight:700;cursor:pointer}
    .delete-detail:hover{background:#ffe2e5;border-color:#d78590}
    .lab-actions button{border:1px solid #dce3ef;border-radius:6px;padding:6px 9px;background:#f7f9fd;color:#315fc4;font-size:9px;cursor:pointer}
    .lab-actions .delete{color:#a52335;background:#fff1f2;border:1px solid #e6aeb5;border-radius:8px;padding:8px 12px;font-size:10px;font-weight:700}
    .lab-actions .delete:hover,.ctop .delete:hover{background:#ffe2e5;border-color:#d78590}
    .ctop .delete{border:1px solid #e6aeb5;border-radius:7px;padding:5px 8px;background:#fff1f2;color:#a52335;font-size:8px;font-weight:700;cursor:pointer}
    .upload-note{font-size:8px;color:#77839a;margin-top:3px}
    #partsList{display:grid;gap:6px}
    #partsList .step{margin:0}
    #datasetLinks{display:grid;gap:7px}
    #datasetLinks a{display:block;overflow-wrap:anywhere;padding:8px;border:1px solid #dce3ef;border-radius:6px;color:#315fc4;background:#fafbfe;text-decoration:none;font-size:9px}
    #eCode,#eInput,#eOutput{font:10px/1.5 Consolas,monospace}
    .compiler-bar{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-top:7px}
    .compiler-run{border:0;border-radius:6px;padding:8px 13px;background:#14264b;color:white;font-weight:bold;font-size:10px;cursor:pointer}
    .compiler-run:disabled{opacity:.6;cursor:wait}
    .compiler-status{font-size:9px;color:#77839a}
    .compiler-output{margin-top:8px;min-height:42px;max-height:220px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;background:#101d3b;color:#e3ebff;border-radius:7px;padding:10px;font:10px/1.5 Consolas,monospace}
    .compiler-hint{font-size:8px;color:#77839a;margin-top:4px}
    #videoUrlLink[hidden]{display:none!important}
    .part-compiler{margin-top:11px;padding:11px;border:1px solid #dce3ef;border-radius:8px;background:#fbfcff}
    .part-compiler h4{margin:0 0 8px;color:#14264b;font-size:11px}
    .part-code{width:100%;min-height:125px;resize:vertical;padding:10px;border:1px solid #dce3ef;border-radius:7px;background:#fff;color:#1e2b45;font:10px/1.5 Consolas,monospace}
    .compiler-experiment-picker{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin:8px 0}
    .compiler-experiment-picker label{font-size:9px;font-weight:800;letter-spacing:.7px;color:#65718a}
    .compiler-experiment-picker select{width:min(380px,100%);height:36px;padding:0 10px;border:1px solid #dce3ef;border-radius:7px;background:#fff;color:#1e2b45;font:600 10px "Segoe UI",Arial,sans-serif}
    .card-subparts,.part-switcher{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
    .card-subparts button,.part-switcher button{border:1px solid #dce3ef;border-radius:6px;padding:6px 10px;background:#f4f7ff;color:#315fc4;font-size:9px;font-weight:700;cursor:pointer}
    .card-subparts button:hover,.part-switcher button:hover,.part-switcher button.active{background:#315fc4;color:#fff;border-color:#315fc4}
    .lab-nav{position:sticky;top:0;z-index:5;display:flex;justify-content:center;gap:8px;padding:8px 12px;background:#fff;border-bottom:1px solid #dce3ef;box-shadow:0 3px 10px #14264b0b}
    .lab-nav button{border:0;border-radius:7px;background:transparent;color:#53627e;padding:8px 14px;font:600 10px "Segoe UI",Arial,sans-serif;cursor:pointer}
    .lab-nav button:hover,.lab-nav button.active{background:#edf2ff;color:#315fc4}
    .theme-toggle{position:absolute;right:232px;top:22px;border:1px solid #dce5e9;border-radius:9px;background:#fff;color:#35465c;padding:8px 11px;font:600 11px "Segoe UI",Arial,sans-serif;cursor:pointer;box-shadow:0 2px 8px #10243b08}
    .theme-toggle:hover{border-color:#176b63;color:#176b63}
    html[data-theme="dark"]{--navy:#e6edf7;--blue:#72a8ff;--red:#d9717c;--gold:#e2bb68;--ink:#e3eaf4;--muted:#a4b1c3;--line:#344258;--bg:#101722;color-scheme:dark}
    html[data-theme="dark"] body{background:linear-gradient(180deg,#111a26 0,#0d141e 420px);color:var(--ink)}
    html[data-theme="dark"] .head,html[data-theme="dark"] .lab-nav,html[data-theme="dark"] .card,html[data-theme="dark"] .profile,html[data-theme="dark"] .panel,html[data-theme="dark"] .tabs,html[data-theme="dark"] .tabs button,html[data-theme="dark"] .back,html[data-theme="dark"] .modal,html[data-theme="dark"] .menu,html[data-theme="dark"] .menu button,html[data-theme="dark"] .userbtn,html[data-theme="dark"] .subject{background:#182333;color:var(--ink);border-color:var(--line)}
    html[data-theme="dark"] .intro{background:linear-gradient(115deg,#1b3038,#1b2732 60%,#302b22);border-color:#334b50;box-shadow:0 8px 24px #0003}
    html[data-theme="dark"] .intro p{color:#bac7d4}
    html[data-theme="dark"] .sectionhead{border-color:#344258}
    html[data-theme="dark"] .identity h1,html[data-theme="dark"] .intro h2,html[data-theme="dark"] .dtitle h2,html[data-theme="dark"] .panel h3,html[data-theme="dark"] .sectionhead h3,html[data-theme="dark"] .video-note-parts button strong,html[data-theme="dark"] .part-compiler h4{color:#e6edf7}
    html[data-theme="dark"] .search,html[data-theme="dark"] .search input,html[data-theme="dark"] .github,html[data-theme="dark"] .part-code,html[data-theme="dark"] .inputfield input,html[data-theme="dark"] .inputfield textarea{background:#111b29;color:var(--ink);border-color:var(--line)}
    html[data-theme="dark"] .compiler-experiment-picker label{color:#aab7c9}
    html[data-theme="dark"] .compiler-experiment-picker select{background:#111b29;color:var(--ink);border-color:var(--line)}
    html[data-theme="dark"] .lab-nav button,html[data-theme="dark"] .lab-nav button:hover,html[data-theme="dark"] .lab-nav button.active{color:#c3d0e2}
    html[data-theme="dark"] .lab-nav button:hover,html[data-theme="dark"] .lab-nav button.active,html[data-theme="dark"] .edit,html[data-theme="dark"] .card-subparts button,html[data-theme="dark"] .part-switcher button,html[data-theme="dark"] .video-note-parts button{background:#223249;color:#a9c8ff;border-color:#3b506c}
    html[data-theme="dark"] .video-note-parts button small,html[data-theme="dark"] .card p,html[data-theme="dark"] .panel p,html[data-theme="dark"] .field span,html[data-theme="dark"] .field b{color:#aab7c9}
    html[data-theme="dark"] .analysis div,html[data-theme="dark"] .node,html[data-theme="dark"] .step,html[data-theme="dark"] .part-compiler{background:#131e2c;color:#dce5f2;border-color:#344258}
    html[data-theme="dark"] .module-intro,html[data-theme="dark"] .module-card{background:#182333;color:var(--ink);border-color:#344258}
    html[data-theme="dark"] .module-intro h2,html[data-theme="dark"] .module-card strong,html[data-theme="dark"] .module-detail h3{color:#e6edf7}
    html[data-theme="dark"] .module-intro p,html[data-theme="dark"] .module-card>span:last-child,html[data-theme="dark"] .module-detail>p,html[data-theme="dark"] .module-upload-label,html[data-theme="dark"] #moduleUploadStatus,html[data-theme="dark"] .module-empty{color:#aab7c9}
    html[data-theme="dark"] .module-number{background:#223249;color:#a9c8ff}
    html[data-theme="dark"] .module-back{background:#111b29;color:#dce5f2;border-color:#3b506c}
    html[data-theme="dark"] .progress{background:#2a3749}
    html[data-theme="dark"] .theme-toggle{background:#223249;color:#e7edf7;border-color:#43536a}
    .sectionhead{padding:0 0 14px;border-bottom:1px solid #e3eaf0}
    .sectionhead>div:last-child{align-items:center}
    .card{display:flex;flex-direction:column;min-height:100%;background:linear-gradient(180deg,#fff 0%,#fcfdfd 100%)}
    .card .foot{margin-top:auto}
    .card:focus-within,.module-card:focus-visible,.lab-nav button:focus-visible,.theme-toggle:focus-visible,.add:focus-visible,.edit:focus-visible{outline:3px solid #68a89c;outline-offset:3px}
    .add,.edit,.back,.theme-toggle,.card,.panel,.profile{transition:box-shadow .18s ease,border-color .18s ease,transform .18s ease}
    .search:focus-within{border-color:#72a99f;box-shadow:0 0 0 4px #176b6318,0 5px 16px #10243b0a}
    @media(max-width:1100px){.sectionhead{flex-wrap:wrap;gap:10px}.sectionhead>div:last-child{width:100%;justify-content:flex-start}}
    @media(max-width:620px){.theme-toggle{right:16px;top:75px;padding:6px 8px;font-size:10px}}
    @media(max-width:620px){.sectionhead>div:last-child{display:grid!important;grid-template-columns:1fr 1fr;gap:8px!important}.sectionhead>div:last-child .add{width:100%;min-height:42px}}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
    .lab-subtitle{margin:12px 0 0;color:#68788b;font-size:11px;font-weight:700;letter-spacing:2px;text-align:center}
    .video-note-parts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}
    .video-note-parts button{display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;gap:6px;min-width:0;min-height:126px;padding:11px;text-align:left;white-space:normal;background:#f4f7ff;border-color:#d6e0f4;color:#315fc4;opacity:1}
    .video-part-badge{display:grid;place-items:center;min-width:34px;height:34px;padding:0 6px;border:1px solid #d5ad51;border-radius:10px;background:#fff4d8;color:#805b0b;font-size:13px;font-weight:800}
    .video-note-parts button strong{font-size:12px;color:#3a4967}
    .video-note-parts button small{font-size:10px;line-height:1.45;color:#67748d;font-weight:400}
    @media(min-width:801px){.dgrid{grid-template-columns:minmax(0,1.05fr) minmax(380px,.95fr)}}
    @media(max-width:800px){.video-note-parts{grid-template-columns:repeat(2,minmax(0,1fr))}.video-note-parts button{min-height:108px}}
    @media(max-width:620px){.video-note-parts{grid-template-columns:1fr}.video-note-parts button{min-height:88px}}
    @media(max-width:620px){.lab-nav{gap:3px;padding:6px}.lab-nav button{padding:8px 11px;font-size:9px}}
  `;
  document.head.appendChild(style);

  const nav = document.createElement("nav");
  nav.className = "lab-nav";
  nav.setAttribute("aria-label", "Main navigation");
  nav.innerHTML = '<button type="button" data-nav="home" class="active">Home</button><button type="button" data-nav="experiments">Experiments</button><button type="button" data-nav="modules">Module</button><button type="button" data-nav="tools">Tools</button><button type="button" data-nav="compiler">Compiler</button>';
  document.querySelector(".head").after(nav);
  const searchRow = document.querySelector(".searchrow");
  const dataScienceIntro = document.querySelector(".intro");
  if (searchRow && dataScienceIntro) {
    dataScienceIntro.after(searchRow);
    searchRow.style.paddingTop = "0";
  }
  const themeButton = document.createElement("button");
  themeButton.type = "button";
  themeButton.className = "theme-toggle";
  themeButton.setAttribute("aria-label", "Switch color theme");
  const savedTheme = localStorage.getItem("digitalLabTheme") === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = savedTheme;
  const updateThemeButton = () => { themeButton.textContent = document.documentElement.dataset.theme === "dark" ? "☀ Light mode" : "☾ Dark mode"; };
  updateThemeButton();
  themeButton.onclick = () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("digitalLabTheme", nextTheme);
    updateThemeButton();
  };
  document.querySelector(".head").appendChild(themeButton);
  const labSubtitle = document.querySelector(".head .identity p");
  if (labSubtitle) {
    labSubtitle.classList.add("lab-subtitle");
    nav.after(labSubtitle);
  }
  const navButtons = [...nav.querySelectorAll("button")];
  const moduleItems = [
    { title: "Data Science Foundations", description: "Core concepts, workflow, and responsible use of data.", pdf: { name: "DS1.pdf", url: "modules/module-01/DS1.pdf" } },
    { title: "Python and Data Handling", description: "Python basics, Pandas DataFrames, and reading datasets.", pdf: { name: "DS2.pdf", url: "modules/module-02/DS2.pdf" } },
    { title: "Data Cleaning and Exploration", description: "Data quality, cleaning methods, and exploratory analysis.", pdf: { name: "DS3.pdf", url: "modules/module-03/DS3.pdf" } },
    { title: "Visualization and Regression", description: "Data visualization, relationships, and linear regression.", pdf: { name: "DS4.pdf", url: "modules/module-04/DS4.pdf" } },
    { title: "Classification and Decision Trees", description: "Classification workflow, decision trees, and evaluation.", pdf: { name: "DS5.pdf", url: "modules/module-05/DS5.pdf" } },
  ];
  const moduleSection = document.createElement("section");
  moduleSection.className = "module-view";
  moduleSection.id = "modulesView";
  moduleSection.hidden = true;
  moduleSection.innerHTML = `<div class="module-intro"><h2>DATA SCIENCE MODULES</h2><p>Choose a module to view its course materials.</p></div><div class="module-grid" id="moduleGrid">${moduleItems.map((module, index) => `<button class="module-card" type="button" data-open-module="${index + 1}"><span class="module-number">MODULE ${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(module.title)}</strong><span>${escapeHtml(module.description)}</span></button>`).join("")}</div><section class="module-detail" id="moduleDetail" hidden></section>`;
  document.querySelector("#dashboard").after(moduleSection);
  const toolItems = [
    { name: "Python", icon: "Py", category: "PROGRAMMING", description: "The core language for data analysis, automation, and machine learning.", url: "https://www.python.org/about/gettingstarted/" },
    { name: "NumPy", icon: "N", category: "NUMERICAL COMPUTING", description: "Fast arrays, mathematical operations, and scientific computing basics.", url: "https://numpy.org/doc/stable/user/quickstart.html" },
    { name: "Pandas", icon: "Pd", category: "DATA ANALYSIS", description: "Load, clean, explore, and transform tabular datasets with DataFrames.", url: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/" },
    { name: "Matplotlib", icon: "M", category: "VISUALIZATION", description: "Build charts and plots to communicate patterns in your data.", url: "https://matplotlib.org/stable/tutorials/" },
    { name: "Seaborn", icon: "S", category: "STATISTICAL VISUALIZATION", description: "Create clear statistical graphics using a high-level plotting interface.", url: "https://seaborn.pydata.org/tutorial.html" },
    { name: "Scikit-learn", icon: "sk", category: "MACHINE LEARNING", description: "Train and evaluate models for classification, regression, and clustering.", url: "https://scikit-learn.org/stable/getting_started.html" },
    { name: "Jupyter", icon: "J", category: "NOTEBOOKS", description: "Combine executable code, results, and explanations in interactive notebooks.", url: "https://docs.jupyter.org/en/latest/start/index.html" },
    { name: "SciPy", icon: "Σ", category: "SCIENTIFIC COMPUTING", description: "Use scientific algorithms for statistics, optimization, and signal processing.", url: "https://docs.scipy.org/doc/scipy/tutorial/" },
  ];
  const toolsSection = document.createElement("section");
  toolsSection.className = "tools-view";
  toolsSection.id = "toolsView";
  toolsSection.hidden = true;
  toolsSection.innerHTML = `<div class="tools-hero"><span class="tools-eyebrow">DATA SCIENCE TOOLKIT</span><h2>Tools for every step</h2><p>Explore the languages and libraries used to prepare data, find patterns, and build clear visualizations.</p></div><div class="tools-grid">${toolItems.map((tool) => `<article class="tool-card"><div class="tool-card-top"><span class="tool-icon" aria-hidden="true">${escapeHtml(tool.icon)}</span><span class="tool-category">${escapeHtml(tool.category)}</span></div><h3>${escapeHtml(tool.name)}</h3><p>${escapeHtml(tool.description)}</p><a href="${tool.url}" target="_blank" rel="noopener noreferrer">Official guide <span aria-hidden="true">↗</span></a></article>`).join("")}</div>`;
  moduleSection.after(toolsSection);
  let activeModuleId = 0;
  let modulePdfUrls = [];
  function showDashboard() {
    moduleSection.hidden = true;
    toolsSection.hidden = true;
    $("dashboard").classList.remove("hide");
  }
  function renderModulePdfs(pdfFiles, publishedPdf) {
    modulePdfUrls.forEach((url) => URL.revokeObjectURL(url));
    modulePdfUrls = [];
    const list = $("modulePdfList");
    const published = publishedPdf ? `<div class="module-pdf"><span>${escapeHtml(publishedPdf.name)}</span><div class="module-pdf-actions"><a href="${publishedPdf.url}" target="_blank" rel="noopener">Open PDF ↗</a><a href="${publishedPdf.url}" download="${escapeHtml(publishedPdf.name)}">↓ Download</a></div></div>` : "";
    const uploaded = (pdfFiles || []).filter((file) => file.name !== publishedPdf?.name).map((file) => {
      const url = URL.createObjectURL(file.blob);
      modulePdfUrls.push(url);
      return `<div class="module-pdf"><span>${escapeHtml(file.name)} · ${(file.size / 1024).toFixed(1)} KB</span><div class="module-pdf-actions"><a href="${url}" target="_blank" rel="noopener">Open PDF ↗</a><a href="${url}" download="${escapeHtml(file.name)}">↓ Download</a></div></div>`;
    }).join("");
    list.innerHTML = published + uploaded || '<p class="module-empty">No published PDF handout is available yet.</p>';
  }
  async function openModule(moduleId) {
    activeModuleId = Number(moduleId);
    const module = moduleItems[activeModuleId - 1];
    const detail = $("moduleDetail");
    $("moduleGrid").hidden = true;
    detail.hidden = false;
    detail.innerHTML = `<button class="module-back" type="button" id="moduleBack">← All modules</button><div class="module-emblem" aria-hidden="true">${String(activeModuleId).padStart(2, "0")}</div><div class="module-material-content"><div class="module-eyebrow">COURSE MATERIALS</div><h3>Module ${activeModuleId}</h3><p class="module-description">${escapeHtml(module.description)}</p><small id="moduleUploadStatus">Course handouts are managed by the site developer.</small><div class="module-pdf-list" id="modulePdfList"></div></div>`;
    $("moduleBack").onclick = () => { detail.hidden = true; $("moduleGrid").hidden = false; };
    const uploadId = `module-${activeModuleId}`;
    const saved = await readUploads(uploadId).catch(() => ({ modulePdfs: [] }));
    if (activeModuleId === Number(moduleId)) renderModulePdfs(saved.modulePdfs || [], module.pdf);
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  moduleSection.querySelectorAll("[data-open-module]").forEach((button) => button.addEventListener("click", () => openModule(button.dataset.openModule)));
  function selectNav(name) { navButtons.forEach((button) => button.classList.toggle("active", button.dataset.nav === name)); }
  navButtons.forEach((button) => button.addEventListener("click", () => {
    const name = button.dataset.nav;
    selectNav(name);
    if (name === "home") {
      if ($("detail").classList.contains("show")) $("back").click();
      showDashboard();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (name === "experiments") {
      $("detail").classList.remove("show");
      showDashboard();
      requestAnimationFrame(() => document.querySelector(".sectionhead")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } else if (name === "modules") {
      if ($("detail").classList.contains("show")) $("back").click();
      $("dashboard").classList.add("hide");
      moduleSection.hidden = false;
      toolsSection.hidden = true;
      $("moduleDetail").hidden = true;
      $("moduleGrid").hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (name === "tools") {
      if ($("detail").classList.contains("show")) $("back").click();
      $("dashboard").classList.add("hide");
      moduleSection.hidden = true;
      toolsSection.hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      showDashboard();
      if (!$("detail").classList.contains("show")) {
        if (labs.length) window.openLab(labs[0].id);
        else { toast("Create an experiment first to use the compiler."); return; }
      }
      const target = [1, 2, 3, 4, 5].includes(Number(currentId)) ? document.querySelector(`#partCompiler${currentId}a`) : document.querySelector("#labCodeInput")?.closest(".inputfield");
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }));

  const codeField = $("labCodeInput").closest(".inputfield");
  const compiler = document.createElement("div");
  compiler.className = "compiler-bar";
  compiler.innerHTML = '<button type="button" class="compiler-run" id="runPython">▶ Run Python</button><span class="compiler-status" id="compilerStatus">Browser Python compiler · click Run Python</span>';
  const compilerOutput = document.createElement("pre");
  compilerOutput.className = "compiler-output";
  compilerOutput.id = "compilerOutput";
  compilerOutput.textContent = "Output will appear here.";
  const compilerHint = document.createElement("div");
  compilerHint.className = "compiler-hint";
  compilerHint.textContent = "First run downloads the Python runtime and any imported packages. Run Python code in this browser.";
  codeField.append(compiler, compilerOutput, compilerHint);

  let pyodidePromise = null;
  let pyodide = null;
  const pyodideVersion = "314.0.7";
  function getPyodide() {
    if (pyodide) return Promise.resolve(pyodide);
    if (!pyodidePromise) {
      pyodidePromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/pyodide.js`;
        script.onload = async () => {
          try {
            pyodide = await window.loadPyodide({ indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/` });
            resolve(pyodide);
          } catch (error) { pyodidePromise = null; reject(error); }
        };
        script.onerror = () => { pyodidePromise = null; reject(new Error("Python runtime could not be downloaded. Check your internet connection and try again.")); };
        document.head.appendChild(script);
      });
    }
    return pyodidePromise;
  }
  $("runPython").onclick = async () => {
    const button = $("runPython");
    const status = $("compilerStatus");
    const source = $("labCodeInput").value;
    if (!source.trim()) { $("compilerOutput").textContent = "Write Python code first."; return; }
    button.disabled = true;
    status.textContent = "Starting Python…";
    $("compilerOutput").textContent = "";
    try {
      const runtime = await getPyodide();
      status.textContent = "Loading imported packages and datasets…";
      await runtime.loadPackagesFromImports(source);
      runtime.globals.set("lab_input", $("labInputData").value);
      const uploads = await readUploads(currentId);
      for (const file of uploads.datasets || []) {
        const safeName = file.name.replace(/[\\/]/g, "_");
        runtime.FS.writeFile(safeName, new Uint8Array(await file.blob.arrayBuffer()));
      }
      const csvSample=["feature,target,value,date,label,hours,score,group","1,50,2,2025-01-01,Support,1,50,A","2,55,3,2025-01-02,Support,2,55,B","3,65,4,2025-01-03,Support,3,65,A","4,,5,2025-01-04,Pass,4,70,B","5,75,6,2025-01-05,Pass,5,75,A","6,85,7,2025-01-06,Pass,6,85,B","3,65,4,2025-01-03,Support,3,65,A"].join(String.fromCharCode(10));const firstCsv=(uploads.datasets||[]).find(file=>file.name.toLowerCase().endsWith(".csv"));const fallbackBytes=firstCsv?new Uint8Array(await firstCsv.blob.arrayBuffer()):new TextEncoder().encode(csvSample);const sourceForCsv=typeof source==="string"?source:editor.value;const csvNames=new Set(["dataset.csv","raw_data.csv",...(sourceForCsv.match(/[A-Za-z0-9_.-]+\.csv/gi)||[]).map(name=>name.replace(/[\/]/g,"_"))]);csvNames.forEach(name=>{if(!runtime.FS.analyzePath(name).exists)runtime.FS.writeFile(name,fallbackBytes)});runtime.setStdin({ stdin: () => window.prompt("Python input() — enter a value:") });
      runtime.globals.set("_labmanual_source", source);
      status.textContent = "Running…";
      const result = await runtime.runPythonAsync(`
import io as _labmanual_io
import contextlib as _labmanual_contextlib
_labmanual_stdout = _labmanual_io.StringIO()
_labmanual_stderr = _labmanual_io.StringIO()
try:
    with _labmanual_contextlib.redirect_stdout(_labmanual_stdout), _labmanual_contextlib.redirect_stderr(_labmanual_stderr):
        exec(compile(_labmanual_source, "<labmanual>", "exec"), globals())
except Exception as _labmanual_error:
    print("{}: {}".format(type(_labmanual_error).__name__, _labmanual_error), file=_labmanual_stderr)
_labmanual_stdout.getvalue() + _labmanual_stderr.getvalue()
      `);
      const text = String(result || "").trim() || "Code finished successfully. (No output printed.)";
      $("compilerOutput").textContent = text;
      $("labOutputData").value = text;
      status.textContent = "Finished";
    } catch (error) {
      const message = error?.message || String(error);
      $("compilerOutput").textContent = message;
      $("labOutputData").value = message;
      status.textContent = "Could not run code";
    } finally {
      button.disabled = false;
    }
  };

  expForm.insertAdjacentHTML("beforeend", `
    <div class="inputfield"><label for="eParts">Experiment parts (one per line)</label><textarea id="eParts" placeholder="Part 1: Data collection&#10;Part 2: Analysis&#10;Part 3: Results"></textarea></div>
    <div class="formgrid">
      <div class="inputfield"><label for="eVideoFile">Upload video</label><input id="eVideoFile" type="file" accept="video/*"><small class="upload-note" id="videoFileNote">Optional. This video will be saved with this experiment.</small></div>
      <div class="inputfield"><label for="eDatasetFiles">Upload dataset files</label><input id="eDatasetFiles" type="file" multiple accept=".csv,.tsv,.txt,.json,.xlsx,.xls,.parquet"><small class="upload-note" id="datasetFileNote">Optional. You can select multiple files.</small></div>
    </div>
    <div class="inputfield"><label for="eCode">Experiment code</label><textarea id="eCode" rows="7" placeholder="Write or paste the experiment code here"></textarea></div>
    <div class="inputfield"><label for="eInput">Code input / dataset notes</label><textarea id="eInput" rows="3" placeholder="Describe the inputs or expected dataset columns"></textarea></div>
    <div class="inputfield"><label for="eOutput">Results / output</label><textarea id="eOutput" rows="3" placeholder="Describe the expected result or add output notes"></textarea></div>
  `);

  const memoryUploads = new Map();
  const dbPromise = new Promise((resolve) => {
    try {
      if (!window.indexedDB) { resolve(null); return; }
      const request = window.indexedDB.open("digitalLabmanualUploads", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("experiments", { keyPath: "id" });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch (_) { resolve(null); }
  });
  async function readUploads(id) {
    const db = await dbPromise;
    if (!db) return memoryUploads.get(id) || { id, video: null, datasets: [] };
    return new Promise((resolve, reject) => {
      const req = db.transaction("experiments", "readonly").objectStore("experiments").get(id);
      req.onsuccess = () => resolve(req.result || { id, video: null, datasets: [] });
      req.onerror = () => reject(req.error);
    });
  }
  async function writeUploads(record) {
    const db = await dbPromise;
    if (!db) { memoryUploads.set(record.id, record); return; }
    return new Promise((resolve, reject) => {
      const tx = db.transaction("experiments", "readwrite");
      tx.objectStore("experiments").put(record);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }
  async function deleteUploads(id) {
    const db = await dbPromise;
    if (!db) { memoryUploads.delete(id); return; }
    return new Promise((resolve, reject) => {
      const tx = db.transaction("experiments", "readwrite");
      tx.objectStore("experiments").delete(id);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }
  const lines = (id) => $(id).value.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
  let activePartKey = "1a";
  let pendingPartKey = "";
  const knownPartLetters = { 1: ["a", "b", "c"], 2: ["a", "b"], 3: ["a", "b", "c", "d"], 4: ["a", "b", "c"], 5: ["a", "b", "c", "d", "e"], 6: ["a", "b", "c", "d", "e", "f", "g"], 7: ["a", "b", "c"], 8: ["a", "b"], 9: [], 10: [] };
  function partLettersFor(item) {
    const id = Number(item.id);
    if (knownPartLetters[id]) return knownPartLetters[id];
    const count = Math.max(2, Math.min(26, (item.parts || []).length || 2));
    return Array.from({ length: count }, (_, index) => String.fromCharCode(97 + index));
  }
  function youtubeVideoId(url) {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      if (parsed.hostname.endsWith("youtu.be")) return parsed.pathname.split("/").filter(Boolean)[0] || "";
      if (parsed.hostname.endsWith("youtube.com") || parsed.hostname.endsWith("youtube-nocookie.com")) {
        return parsed.searchParams.get("v") || parsed.pathname.match(/\/(?:shorts|embed)\/([^/?]+)/)?.[1] || "";
      }
    } catch (_) {}
    return "";
  }

  function fillEditor(item) {
    $("eTitle").value = item.title || "";
    $("eDesc").value = item.desc || "";
    $("eVideo").value = item.videoUrl || item.video || "";
    $("eGithub").value = item.github || "";
    $("eSummary").value = item.summary || "";
    $("eArchitecture").value = (item.architecture || []).join("\n");
    $("eSteps").value = (item.steps || []).join("\n");
    $("eObjectives").value = (item.objectives || []).join("\n");
    $("eRequirements").value = (item.requirements || []).join("\n");
    $("eParts").value = (item.parts || []).join("\n");
    $("eCode").value = item.code || "";
    $("eInput").value = item.input || "";
    $("eOutput").value = item.output || item.result || "";
    $("eVideoFile").value = "";
    $("eDatasetFiles").value = "";
    $("videoFileNote").textContent = item.videoFileName ? `Current video: ${item.videoFileName}. Choose another to replace it.` : "Optional. This video will be saved with this experiment.";
    $("datasetFileNote").textContent = item.datasetNames?.length ? `Current files: ${item.datasetNames.join(", ")}. Select files to replace them.` : "Optional. You can select multiple files.";
  }
  function openEditor(id = null) {
    editingId = id;
    const base = window.modal;
    base("exp");
    $("mtitle").textContent = id === null ? "Create New Experiment" : "Edit Experiment";
    $("save").textContent = id === null ? "Create Experiment" : "Save Changes";
    if (id !== null) fillEditor(labs.find((item) => item.id === id) || {});
  }
  if (addButton) {
    addButton.textContent = "＋ Add Experiment";
    addButton.onclick = () => openEditor();
  }

  window.renderCards = function (query = "") {
    const cards = $("cards");
    cards.innerHTML = "";
    const filtered = labs.filter((item) => `${item.title} ${item.desc}`.toLowerCase().includes(query.toLowerCase()));
    if (!filtered.length) {
      cards.innerHTML = '<div class="panel">No experiments found.</div>';
      return;
    }
    filtered.forEach((item) => {
      const card = document.createElement("article");
      card.className = "card";
      card.tabIndex = 0;
      card.setAttribute("aria-label", `Open Experiment ${item.id}: ${item.title}`);
      const subpartKeys = partLettersFor(item).map((letter) => `${Number(item.id)}${letter}`);
      const subpartsMarkup = subpartKeys.length ? `<div class="card-subparts" aria-label="Experiment ${Number(item.id)} subparts">${subpartKeys.map((key) => `<button type="button" data-open-part="${key}">${key.toUpperCase()}</button>`).join("")}</div>` : "";
      const videoId = youtubeVideoId(item.video || item.videoUrl);
      const thumbnail = videoId ? `<img class="thumb-image" src="https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/maxresdefault.jpg" alt="${escapeHtml(item.title)} video thumbnail" loading="eager">` : "";
      card.innerHTML = `<div class="ctop"><span class="tag">EXPERIMENT ${String(item.id).padStart(2, "0")}</span><button type="button" class="delete" aria-label="Delete experiment ${Number(item.id)}: ${escapeHtml(item.title)}">Delete experiment</button></div><div class="thumb${videoId ? " has-video-thumbnail" : ""}">${thumbnail}<span class="playicon">▶</span><small>VIDEO OVERVIEW · DS LAB</small></div><h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.desc)}</p>${subpartsMarkup}<div class="foot"><span>▤ ${(item.steps || []).length} practical steps</span><b>OPEN LAB MANUAL →</b></div><div class="lab-actions"><button type="button" class="edit">Edit experiment</button></div>`;
      const thumbnailImage = card.querySelector(".thumb-image");
      if (thumbnailImage) {
        const fallbacks = ["hqdefault", "mqdefault", "default"];
        thumbnailImage.onerror = () => {
          const nextSize = fallbacks.shift();
          if (nextSize) thumbnailImage.src = `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/${nextSize}.jpg`;
          else thumbnailImage.remove();
        };
      }
      card.onclick = (event) => {
        if (event.target.closest("button, a")) return;
        window.openLab(item.id);
      };
      card.onkeydown = (event) => {
        if ((event.key === "Enter" || event.key === " ") && event.target === card) {
          event.preventDefault();
          window.openLab(item.id);
        }
      };
      card.querySelector(".foot").onclick = (event) => { event.stopPropagation(); window.openLab(item.id); };
      card.querySelectorAll("[data-open-part]").forEach((button) => button.onclick = (event) => {
        event.stopPropagation();
        window.openExperimentPartCompiler(button.dataset.openPart);
      });
      card.querySelector(".edit").onclick = (event) => { event.stopPropagation(); openEditor(item.id); };
      card.querySelector(".delete").onclick = async (event) => {
        event.stopPropagation();
        if (!confirm(`Delete “${item.title}”?`)) return;
        labs = labs.filter((candidate) => candidate.id !== item.id);
        delete progress[item.id];
        save();
        await deleteUploads(item.id).catch(() => {});
        if (currentId === item.id) { $("detail").classList.remove("show"); $("dashboard").classList.remove("hide"); }
        window.renderCards($("search").value);
        toast("Experiment deleted");
      };
      cards.appendChild(card);
    });
  };

  const detailDeleteButton = $("deleteCurrentExperiment");
  detailDeleteButton?.addEventListener("click", async (event) => {
    event.stopPropagation();
    const id = Number(currentId);
    const item = labs.find((candidate) => Number(candidate.id) === id);
    if (!item || !confirm(`Delete “${item.title}”?`)) return;
    labs = labs.filter((candidate) => Number(candidate.id) !== id);
    Object.keys(progress).forEach((key) => { if (key === String(id) || key.startsWith(`${id}-`)) delete progress[key]; });
    save();
    await deleteUploads(id).catch(() => {});
    $("detail").classList.remove("show");
    $("dashboard").classList.remove("hide");
    window.renderCards($("search").value);
    toast("Experiment deleted");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const partsPanel = document.createElement("div");
  partsPanel.className = "panel";
  partsPanel.id = "partsPanel";
  partsPanel.innerHTML = '<h3>EXPERIMENT PARTS</h3><div id="partsList"></div><div id="partCompilers"></div>';
  $("dTitle").after(partsPanel);
  const assetsPanel = document.createElement("div");
  assetsPanel.className = "panel";
  assetsPanel.id = "assetsPanel";
  assetsPanel.innerHTML = '<h3>UPLOADED DATASETS</h3><div id="datasetLinks">No dataset files uploaded.</div>';
  $("tabs").before(assetsPanel);

  let activeVideoUrl = "";
  let activeDataUrls = [];
  const partCompilerDefaults = {
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

student_data = pd.DataFrame({
    "Roll_no": [10, 11, 12, 13],
    "name": ["Ganesh", "mani", "nithin", "Chandhu"],
    "Dept": ["CSE", "IT", "ECE", "CSE"],
})
student_data.to_csv("Student_output.txt")
print("Student data written successfully to Student_output.txt")
print("\\nReading Student_output.txt:")
loaded_data = pd.read_csv("Student_output.txt")
print(loaded_data)`,
    "1c": `# Notebook source: exp1.ipynb
# Experiment 1(c): Write and read student data in JSON and Excel formats
import pandas as pd
import openpyxl

student_data = pd.DataFrame({
    "Roll_no": [10, 11, 12, 13],
    "name": ["Ganesh", "mani", "nithin", "Chandhu"],
    "Dept": ["CSE", "IT", "ECE", "CSE"],
})
student_data.to_json("Students.json", orient="records", indent=4)
print("JSON file created")
print("Student data from JSON:")
print(pd.read_json("Students.json"))
student_data.to_excel("Student.xlsx", sheet_name="Student details", index=False)
print("Data written successfully in Excel")
print("Data from Excel file:")
print(pd.read_excel("Student.xlsx", sheet_name="Student details"))`,
    "6a": `# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(a): Load and inspect numeric data for clustering
import pandas as pd
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({
        "hours": [2, 3, 4, 5, 6, 7, 8, 9],
        "score": [52, 58, 63, 69, 73, 81, 86, 92],
        "attendance": [60, 65, 70, 72, 78, 84, 88, 95],
    })
print("First five rows:")
print(df.head())
print()
print("Shape:", df.shape)
print("Numeric columns:", list(df.select_dtypes(include="number").columns))
print("Missing values:")
print(df.isna().sum())`,
    "6b": `# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(b): Select numeric features and clean missing values
import pandas as pd
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({"hours": [2, 3, 4, 5, 6, 7, 8, 9], "score": [52, 58, 63, 69, 73, 81, 86, 92], "attendance": [60, 65, 70, 72, 78, 84, 88, 95]})
features = df.select_dtypes(include="number")
clean_features = features.dropna().copy()
print("Selected features:", list(clean_features.columns))
print("Rows before cleaning:", len(features))
print("Rows after dropping incomplete values:", len(clean_features))
print(clean_features.head())`,
    "6c": `# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(c): Scale numeric features for fair distance comparisons
import pandas as pd
from sklearn.preprocessing import StandardScaler
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({"hours": [2, 3, 4, 5, 6, 7, 8, 9], "score": [52, 58, 63, 69, 73, 81, 86, 92], "attendance": [60, 65, 70, 72, 78, 84, 88, 95]})
features = df.select_dtypes(include="number").dropna()
scaler = StandardScaler()
scaled = scaler.fit_transform(features)
scaled_df = pd.DataFrame(scaled, columns=features.columns, index=features.index)
print("Scaled feature means (approximately zero):")
print(scaled_df.mean().round(2))
print()
print("Scaled sample:")
print(scaled_df.head())`,
    "6d": `# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(d): Compare cluster counts with the elbow method
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({"hours": [2, 3, 4, 5, 6, 7, 8, 9], "score": [52, 58, 63, 69, 73, 81, 86, 92], "attendance": [60, 65, 70, 72, 78, 84, 88, 95]})
features = df.select_dtypes(include="number").dropna()
scaled = StandardScaler().fit_transform(features)
max_k = min(6, len(scaled))
inertias = []
for k in range(1, max_k + 1):
    model = KMeans(n_clusters=k, random_state=42, n_init=10)
    model.fit(scaled)
    inertias.append(model.inertia_)
print("K values:", list(range(1, max_k + 1)))
print("Inertia:", [round(value, 3) for value in inertias])
plt.plot(range(1, max_k + 1), inertias, marker="o")
plt.xlabel("Number of clusters (K)")
plt.ylabel("Inertia")
plt.title("K-Means elbow method")
plt.tight_layout()
plt.show()`,
    "6e": `# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(e): Fit K-Means and assign cluster labels
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({"hours": [2, 3, 4, 5, 6, 7, 8, 9], "score": [52, 58, 63, 69, 73, 81, 86, 92], "attendance": [60, 65, 70, 72, 78, 84, 88, 95]})
features = df.select_dtypes(include="number").dropna()
scaled = StandardScaler().fit_transform(features)
k = min(3, len(features))
model = KMeans(n_clusters=k, random_state=42, n_init=10)
labels = model.fit_predict(scaled)
clustered = features.copy()
clustered["cluster"] = labels
print(clustered.head(10))
print()
print("Cluster counts:")
print(clustered["cluster"].value_counts().sort_index())
print()
print("Centres (scaled features):")
print(model.cluster_centers_.round(2))`,
    "6f": `# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(f): Evaluate cluster quality with silhouette score
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({"hours": [2, 3, 4, 5, 6, 7, 8, 9], "score": [52, 58, 63, 69, 73, 81, 86, 92], "attendance": [60, 65, 70, 72, 78, 84, 88, 95]})
features = df.select_dtypes(include="number").dropna()
scaled = StandardScaler().fit_transform(features)
k = min(3, len(features) - 1)
if k < 2:
    print("Add more rows to evaluate at least two clusters.")
else:
    labels = KMeans(n_clusters=k, random_state=42, n_init=10).fit_predict(scaled)
    if len(set(labels)) > 1:
        print("Silhouette score:", round(silhouette_score(scaled, labels), 3))
    else:
        print("A silhouette score needs at least two populated clusters.")`,
    "6g": `# DATASET FALLBACK: upload dataset.csv or use the built-in sample data
# Experiment 6(g): Plot clusters and interpret their centres
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from pathlib import Path

if Path("dataset.csv").exists():
    df = pd.read_csv("dataset.csv")
else:
    print("No dataset.csv uploaded; using built-in sample data.")
    df = pd.DataFrame({"hours": [2, 3, 4, 5, 6, 7, 8, 9], "score": [52, 58, 63, 69, 73, 81, 86, 92], "attendance": [60, 65, 70, 72, 78, 84, 88, 95]})
features = df.select_dtypes(include="number").dropna()
if features.shape[1] < 2:
    raise ValueError("Choose at least two numeric features to plot clusters.")
scaled = StandardScaler().fit_transform(features)
k = min(3, len(features))
model = KMeans(n_clusters=k, random_state=42, n_init=10)
labels = model.fit_predict(scaled)
plt.scatter(scaled[:, 0], scaled[:, 1], c=labels, cmap="viridis", s=50)
plt.scatter(model.cluster_centers_[:, 0], model.cluster_centers_[:, 1], c="red", marker="X", s=180, label="Centroids")
plt.xlabel(features.columns[0] + " (scaled)")
plt.ylabel(features.columns[1] + " (scaled)")
plt.title("K-Means cluster groups")
plt.legend()
plt.tight_layout()
plt.show()
print("Review each group using the cluster labels and scaled centroids.")`,
    "1a": `# Experiment 1(a): Load and inspect the dataset
import pandas as pd

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
print("First five rows:")
print(df.head())
print("\\nDataset shape:", df.shape)
print("\\nColumn types and non-null counts:")
df.info()
print("\\nSummary statistics:")
print(df.describe(include="all"))`,
    "1b": `# Experiment 1(b): Check and clean missing values and duplicates
import pandas as pd

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
print("Missing values before cleaning:")
print(df.isna().sum())
print("\\nDuplicate rows:", df.duplicated().sum())

clean_df = df.drop_duplicates().copy()
numeric_columns = clean_df.select_dtypes(include="number").columns
clean_df[numeric_columns] = clean_df[numeric_columns].fillna(
    clean_df[numeric_columns].median()
)
print("\\nMissing values after numeric median fill:")
print(clean_df.isna().sum())
print("\\nCleaned dataset shape:", clean_df.shape)`,
    "1c": `# Experiment 1(c): Summary statistics and histograms
import pandas as pd
import matplotlib.pyplot as plt

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
numeric_columns = df.select_dtypes(include="number").columns
print("Summary statistics:")
print(df.describe(include="all"))

if len(numeric_columns):
    df[numeric_columns].hist(figsize=(10, 6))
    plt.tight_layout()
    plt.show()
else:
    print("No numeric columns are available for histograms.")`,
    "2a": `# Experiment 2(a): Prepare features, target, and train/test data
import pandas as pd
from sklearn.model_selection import train_test_split

# Upload your regression CSV as dataset.csv, or change this filename.
from pathlib import Path
csv_path = Path("dataset.csv")
if not csv_path.exists():
    other_csv_files = sorted(set(Path(".").glob("*.csv")) | set(Path("/").glob("*.csv")))
    csv_path = other_csv_files[0] if other_csv_files else None
if csv_path:
    print(f"Using dataset: \${csv_path}")
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
print("Training rows:", len(X_train), "Testing rows:", len(X_test))`,
    "2b": `# Experiment 2(b): Train, predict, and evaluate Linear Regression
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
    print(f"Using dataset: \${csv_path}")
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
    print("R-squared needs at least two test rows; increase your dataset size.")`,
    "3a": `# Experiment 3(a): Load data and inspect columns for plotting
import pandas as pd

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
print("First five rows:")
print(df.head())
print("\\nDataset shape:", df.shape)
numeric_columns = list(df.select_dtypes(include="number").columns)
print("\\nNumeric columns available for charts:", numeric_columns)
print("\\nSummary statistics:")
print(df[numeric_columns].describe())`,
    "3b": `# Experiment 3(b): Line chart for a trend
import pandas as pd
import matplotlib.pyplot as plt

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
numeric_columns = list(df.select_dtypes(include="number").columns)
if len(numeric_columns) < 2:
    raise ValueError("A line chart needs at least two numeric columns.")
x_column, y_column = numeric_columns[:2]
df.plot(x=x_column, y=y_column, kind="line", marker="o", title=f"{y_column} by {x_column}")
plt.xlabel(x_column)
plt.ylabel(y_column)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`,
    "3c": `# Experiment 3(c): Bar chart for category comparison
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
plt.show()`,
    "3d": `# Experiment 3(d): Scatter plot for two numeric columns
import pandas as pd
import matplotlib.pyplot as plt

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
numeric_columns = list(df.select_dtypes(include="number").columns)
if len(numeric_columns) < 2:
    raise ValueError("A scatter plot needs at least two numeric columns.")
x_column, y_column = numeric_columns[:2]
plt.scatter(df[x_column], df[y_column], alpha=0.75)
plt.title(f"{y_column} vs {x_column}")
plt.xlabel(x_column)
plt.ylabel(y_column)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`,
    "4a": `# Experiment 4(a): Profile a raw dataset
import pandas as pd

# Upload your CSV as dataset.csv, or change this filename.
df = pd.read_csv("dataset.csv")
print("First five rows:")
print(df.head())
print("\\nShape:", df.shape)
print("\\nData types:")
print(df.dtypes)
print("\\nMissing values per column:")
print(df.isna().sum())
print("\\nDuplicate rows:", df.duplicated().sum())`,
    "4b": `# Experiment 4(b): Remove duplicates and clean missing values
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
print("\\nRemaining missing values:")
print(clean_df.isna().sum())
print("\\nCleaned sample:")
print(clean_df.head())`,
    "4c": `# Experiment 4(c): Validate and export the cleaned dataset
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
print("\\nSaved cleaned_data.csv with", len(clean_df), "rows and", len(clean_df.columns), "columns.")`,
    "5a": `# Experiment 5(a): Inspect labelled data and target classes
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
print("\\nShape:", df.shape)
print("\\nTarget column:", target_column)
print("Class counts:")
print(df[target_column].value_counts(dropna=False))`,
    "5b": `# Experiment 5(b): Prepare data and train a Decision Tree
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
print("Decision Tree model trained.")`,
    "5c": `# Experiment 5(c): Predict and evaluate classification results
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

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
predictions = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, predictions))
print("\\nConfusion matrix:")
print(confusion_matrix(y_test, predictions))
print("\\nClassification report:")
print(classification_report(y_test, predictions, zero_division=0))`,
    "5d": `# Experiment 5(d): Read tree rules and feature importance
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text

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
X_train, _, y_train, _ = train_test_split(X, y, test_size=0.25, random_state=42)
model = DecisionTreeClassifier(max_depth=3, random_state=42).fit(X_train, y_train)
print("Learned decision tree rules:")
print(export_text(model, feature_names=list(X.columns)))
print("Feature importance:")
print(pd.Series(model.feature_importances_, index=X.columns).sort_values(ascending=False))`,
  };
  Object.assign(partCompilerDefaults, {
    "1a": String.raw`# Notebook source: exp1.ipynb · 1A
import pandas as pd
import openpyxl

df = pd.read_csv("car_dataset_40x20.csv")
print("First rows:")
print(df.head())
print("\nShape:", df.shape)
print("\nColumns:")
print(df.columns)`,
    "1b": String.raw`# Notebook source: exp1.ipynb · 1B — CSV and JSON
import pandas as pd

student_data = {
    "Roll_no": [10, 11, 12, 13],
    "name": ["Ganesh", "mani", "nithin", "Chandhu"],
    "Dept": ["CSE", "IT", "ECE", "CSE"],
}
df = pd.DataFrame(student_data)

df.to_csv("Student_output.txt", index=False)
print("CSV file written successfully")
csv_data = pd.read_csv("Student_output.txt")
print("\nData read from CSV:")
print(csv_data)

df.to_json("Students.json", orient="records", indent=4)
print("\nJSON file written successfully")
json_data = pd.read_json("Students.json")
print("Data read from JSON:")
print(json_data)`,
    "1c": String.raw`# Notebook source: exp1.ipynb · 1C — Excel
import pandas as pd
import openpyxl

student_data = {
    "Roll_no": [10, 11, 12, 13],
    "name": ["Ganesh", "mani", "nithin", "Chandhu"],
    "Dept": ["CSE", "IT", "ECE", "CSE"],
}
df = pd.DataFrame(student_data)
df.to_excel("Student.xlsx", sheet_name="Student details", index=False)
print("Data written successfully to Excel")

excel_data = pd.read_excel("Student.xlsx", sheet_name="Student details")
print("\nData read from Excel:")
print(excel_data)`,
    "2a": String.raw`# Notebook source: exp2.ipynb · 2A — Fetch GitHub issues
import requests
import pandas as pd

url = "https://api.github.com/repos/pandas-dev/pandas/issues"
response = requests.get(url)
response.raise_for_status()
issues = response.json()
df_issues = pd.DataFrame(issues)
print(df_issues[["id", "title", "state"]].head())`,
    "2b": String.raw`# Notebook source: exp2.ipynb · 2B — SQLite and Pandas
import sqlite3
import pandas as pd

conn = sqlite3.connect("Students.db")
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS Students (id INTEGER, name TEXT)")
cursor.execute("INSERT INTO Students VALUES(1, 'ganesh')")
conn.commit()
cursor.execute("INSERT INTO Students VALUES(2, 'mani')")
conn.commit()

df = pd.read_sql_query("SELECT * FROM Students", conn)
print("Student records:")
print(df)

cursor.execute("DELETE FROM Students WHERE id=1")
cursor.execute("UPDATE Students SET name ='Alice' where id=1")
conn.commit()
conn.commit()
conn.close()`,
    "3a": String.raw`# Notebook source: exp3.ipynb · 3A — Missing values
import numpy as np
import pandas as pd

data = {"A": [1, 2, np.nan], "B": [4, np.nan, np.nan]}
df = pd.DataFrame(data)
print("Missing-value mask:")
print(df.isna())

df_clean = df.dropna()
df_filled = df.fillna(0)
print("\nRows after dropping missing values:")
print(df_clean)
print("\nValues after filling missing data with zero:")
print(df_filled)`,
    "3b": String.raw`# Notebook source: exp3.ipynb · 3B — Map values and rename columns
import pandas as pd

df = pd.DataFrame({"gender": ["male", "female"]})
df["gender_num"] = df["gender"].map({"male": 1, "female": 0})
df_renamed = df.rename(columns={"gender": "Gender"})
print(df_renamed)`,
    "3c": String.raw`# Notebook source: exp3.ipynb · 3C — Detect outliers
import numpy as np
import pandas as pd

data = pd.DataFrame(np.random.randn(100, 3), columns=["A", "B", "C"])
outliers = (data > 3) | (data < -3)
print("Outlier counts by column:")
print(outliers.sum())
print("\nData:")
print(data)`,
    "3d": String.raw`# Notebook source: exp3.ipynb · 3D — Split text with regular expressions
import re

text = "this is \t a \n test"
split_text = re.split(r"\st", text)
print(split_text)`,
    "4a": String.raw`# Notebook source: exp4.ipynb · 4A — MultiIndex selection
import pandas as pd

index = [
    ["Engineering", "Engineering", "Science", "Science"],
    ["CSE", "ECE", "Physics", "Chemistry"],
]
multi_index = pd.MultiIndex.from_arrays(index, names=["Department", "Branch"])
marks = pd.Series([85, 78, 92, 88], index=multi_index)

print("Original Series:")
print(marks)
print("\nEngineering data:")
print(marks.loc["Engineering"])
print("\nCSE data:")
print(marks.loc[("Engineering", "CSE")])
print("\nScience data:")
print(marks.loc["Science"])`,
    "4b": String.raw`# Notebook source: exp4.ipynb · 4B — Stack and unstack
import pandas as pd

index = pd.MultiIndex.from_tuples(
    [("Engineering", "CSE"), ("Engineering", "ECE"),
     ("Science", "Physics"), ("Science", "Chemistry")],
    names=["Department", "Branch"],
)
data = pd.DataFrame(
    {"2025": [85, 78, 92, 88], "2026": [90, 82, 95, 91]},
    index=index,
)
print("Original table:")
print(data)
unstacked_data = data.unstack()
print("\nAfter unstack:")
print(unstacked_data)
stacked_data = unstacked_data.stack()
print("\nAfter stack:")
print(stacked_data)`,
    "4c": String.raw`# Notebook source: exp4.ipynb · 4C — Merge and combine DataFrames
import pandas as pd

df1 = pd.DataFrame(
    {"Name": ["Ravi", "Sita", "Arun"], "Marks": [85, None, 78], "Grade": ["A", "B", None]},
    index=[101, 102, 103],
)
df2 = pd.DataFrame(
    {"Name": ["Ravi", "Sita", "Kiran"], "Marks": [90, 88, 82], "Grade": [None, "A", "B"]},
    index=[101, 102, 104],
)
print("First DataFrame:")
print(df1)
print("\nSecond DataFrame:")
print(df2)
merged = pd.merge(
    df1, df2, left_index=True, right_index=True, how="outer",
    suffixes=("_DF1", "_DF2"),
)
print("\nMerged DataFrame:")
print(merged)
combined = df1.combine_first(df2)
print("\nAfter combine_first:")
print(combined)`,
  });
  Object.assign(partCompilerDefaults, {
    "5a": String.raw`# Notebook source: exp5.ipynb · 5A — Iris plots
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

url = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"
df = pd.read_csv(url)
print("First five records:")
print(df.head())
print("\nDataset information:")
print(df.info())
print("\nStatistical summary:")
print(df.describe())

plt.figure(figsize=(8, 5))
plt.plot(df.index, df["sepal_length"], label="Sepal Length")
plt.plot(df.index, df["petal_length"], label="Petal Length")
plt.xlabel("Sample Index")
plt.ylabel("Length")
plt.title("Sepal Length and Petal Length")
plt.legend(); plt.grid(); plt.show()

plt.figure(figsize=(8, 5))
sns.scatterplot(data=df, x="sepal_length", y="petal_length", hue="species")
plt.title("Sepal Length vs Petal Length")
plt.show()

plt.figure(figsize=(8, 5))
sns.histplot(data=df, x="sepal_length", hue="species", kde=True)
plt.title("Distribution of Sepal Length")
plt.show()

plt.figure(figsize=(8, 5))
sns.boxplot(data=df, x="species", y="petal_length")
plt.title("Petal Length by Species")
plt.show()

sns.pairplot(df, hue="species")
plt.show()`,
    "5b": String.raw`# Notebook source: exp5.ipynb · 5B — Line and bar charts
import pandas as pd
import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
sales = [120, 150, 180, 160, 220, 250]
expenses = [80, 100, 120, 110, 140, 160]
fig, axes = plt.subplots(2, 1, figsize=(10, 8))
axes[0].plot(months, sales, marker="o", linewidth=2, label="Sales")
axes[0].set(title="Monthly Sales", xlabel="Month", ylabel="Sales")
axes[0].annotate("Highest Sales", xy=(5, 250), xytext=(3.5, 270), arrowprops=dict(arrowstyle="->"))
axes[0].legend(); axes[0].grid(True)
axes[1].plot(months, expenses, marker="s", linewidth=2, label="Expenses")
axes[1].set(title="Monthly Expenses", xlabel="Month", ylabel="Expenses")
axes[1].annotate("Highest Expense", xy=(5, 160), xytext=(3.5, 180), arrowprops=dict(arrowstyle="->"))
axes[1].legend(); axes[1].grid(True)
fig.suptitle("Monthly Sales and Expenses Analysis", fontsize=16)
plt.tight_layout(); plt.show()

marks = pd.DataFrame(
    {"Python": [85, 90, 78, 88], "Java": [75, 82, 80, 85], "C++": [80, 76, 85, 90]},
    index=["Student1", "Student2", "Student3", "Student4"],
)
print("Student marks:")
print(marks)
marks.plot(kind="bar", figsize=(8, 5), title="Student Marks by Language")
plt.xlabel("Students"); plt.ylabel("Marks"); plt.xticks(rotation=0)
plt.legend(title="Subjects"); plt.tight_layout(); plt.show()
marks.plot(kind="bar", stacked=True, figsize=(8, 5), title="Stacked Student Marks")
plt.xlabel("Students"); plt.ylabel("Total Marks"); plt.xticks(rotation=0)
plt.legend(title="Subjects"); plt.tight_layout(); plt.show()`,
    "5c": String.raw`# Notebook source: exp5.ipynb · 5C — Histogram and density plot
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

values = [45, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95]
df = pd.DataFrame({"Marks": values})
print("Observed data:")
print(df)

plt.figure(figsize=(8, 5))
sns.histplot(df["Marks"], bins=6, kde=False)
plt.title("Histogram of Marks"); plt.xlabel("Marks"); plt.ylabel("Frequency")
plt.tight_layout(); plt.show()

plt.figure(figsize=(8, 5))
sns.kdeplot(df["Marks"], fill=True)
plt.title("Density Plot of Marks"); plt.xlabel("Marks"); plt.ylabel("Density")
plt.tight_layout(); plt.show()`,
    "5d": String.raw`# Notebook source: exp5.ipynb · 5D — Scatter plot and correlation
import pandas as pd
import matplotlib.pyplot as plt

study_hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
marks = [45, 50, 55, 60, 65, 70, 72, 80, 85, 90]
df = pd.DataFrame({"Study_Hours": study_hours, "Marks": marks})
print("Data:")
print(df)

plt.figure(figsize=(8, 5))
plt.scatter(df["Study_Hours"], df["Marks"])
plt.title("Relationship Between Study Hours and Marks")
plt.xlabel("Study Hours"); plt.ylabel("Marks"); plt.grid(True)
plt.tight_layout(); plt.show()
correlation = df["Study_Hours"].corr(df["Marks"])
print("\nCorrelation Coefficient:", round(correlation, 2))`,
    "5e": String.raw`# Notebook source: exp5.ipynb · 5E — Box plot by department
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

data = {
    "Department": ["CSE"] * 5 + ["ECE"] * 5 + ["EEE"] * 5,
    "Marks": [78, 85, 90, 72, 88, 65, 70, 82, 75, 80, 60, 68, 72, 76, 85],
}
df = pd.DataFrame(data)
print("Data:")
print(df)
plt.figure(figsize=(8, 5))
sns.boxplot(x="Department", y="Marks", data=df)
plt.title("Marks Distribution by Department")
plt.xlabel("Department"); plt.ylabel("Marks")
plt.grid(axis="y", linestyle="--", alpha=0.5)
plt.tight_layout(); plt.show()`,
    "6a": String.raw`# Notebook source: exp6.ipynb · 6A — Time-indexed temperature series
import pandas as pd

dates = pd.to_datetime(["2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05"])
temperature = [28, 30, 29, 31, 32]
time_series = pd.Series(temperature, index=dates)
print(time_series)`,
    "6b": String.raw`# Notebook source: exp6.ipynb · 6B — Create a date range
import pandas as pd

date_index = pd.date_range(start="2026-01-01", periods=7, freq="D")
print(date_index)`,
    "6c": String.raw`# Notebook source: exp6.ipynb · 6C — Time zones
import pandas as pd

india_dates = pd.date_range(start="2026-01-01 09:00", periods=3, freq="h", tz="Asia/Kolkata")
print("1. Asia/Kolkata date range:")
print(india_dates)

dates = pd.date_range(start="2026-01-01 09:00", periods=3, freq="h")
print("\n2. Timezone-naive date range:")
print(dates)
localized_dates = dates.tz_localize("Asia/Kolkata")
print("\n3. Localized to Asia/Kolkata:")
print(localized_dates)
new_york_dates = localized_dates.tz_convert("America/New_York")
print("\n4. Converted to America/New_York:")
print(new_york_dates)

india_series = pd.Series([100, 200, 300], index=localized_dates)
new_york_series = pd.Series([400, 500, 600], index=new_york_dates)
print("\n5. India series:")
print(india_series)
print("\nNew York series:")
print(new_york_series)
print("\n6. Combined time series:")
print(pd.concat([india_series, new_york_series]))`,
    "6d": String.raw`# Notebook source: exp6.ipynb · 6D — Period arithmetic and ranges
import pandas as pd

period = pd.Period("2026-01", freq="M")
print("Original period:", period)
print("After adding 2:", period + 2)
print("After adding 5:", period + 5)
print("After subtracting 1:", period - 1)
print("After subtracting 3:", period - 3)
print("\nMonthly period range:")
print(pd.period_range(start="2026-01", periods=6, freq="M"))`,
    "6e": String.raw`# Notebook source: exp6.ipynb · 6E — Convert monthly periods to days
import pandas as pd

period = pd.Period("2026-01", freq="M")
print("Original period:", period)
print("\nMonthly period at daily start:")
print(period.asfreq("D", how="start"))
print("\nMonthly period at daily end:")
print(period.asfreq("D", how="end"))

period_index = pd.period_range(start="2026-01", periods=3, freq="M")
print("\nOriginal PeriodIndex:")
print(period_index)
print("\nPeriodIndex converted to daily start:")
print(period_index.asfreq("D", how="start"))
print("\nPeriodIndex converted to daily end:")
print(period_index.asfreq("D", how="end"))`,
    "6f": String.raw`# Notebook source: exp6.ipynb · 6F — Convert timestamps to monthly periods
import pandas as pd

dates = pd.to_datetime(["2026-01-10", "2026-02-15", "2026-03-20", "2026-04-25"])
sales = pd.Series([1000, 1500, 1800, 2200], index=dates)
print("Original sales series:")
print(sales)
print("\nConverted to monthly periods:")
print(sales.to_period("M"))

df = pd.DataFrame({"Sales": [1000, 1500, 1800, 2200], "Profit": [200, 300, 400, 500]}, index=dates)
print("\nOriginal DataFrame:")
print(df)
print("\nDataFrame converted to monthly periods:")
print(df.to_period("M"))`,
    "6g": String.raw`# Notebook source: exp6.ipynb · 6G — Resample time series
import pandas as pd

dates = pd.date_range(start="2026-01-01 00:00", periods=12, freq="h")
values = [10, 12, 15, 14, 18, 20, 22, 21, 25, 28, 30, 32]
time_series = pd.Series(values, index=dates)
print("Original hourly series:")
print(time_series)
print("\nThree-hour mean:")
print(time_series.resample("3h").mean())
print("\nFour-hour sum:")
print(time_series.resample("4h").sum())
print("\nThirty-minute upsampling:")
print(time_series.resample("30min").asfreq())
print("\nThirty-minute upsampling with forward fill:")
print(time_series.resample("30min").ffill())`,
  });
  Object.assign(partCompilerDefaults, {
    "7a": String.raw`# Notebook source: exp7.ipynb · 7A — Group students by department/year
import pandas as pd

data = {
    "Name": ["Ravi", "Sita", "Arun", "Priya", "Kiran", "Anil", "Lakshmi", "Rahul"],
    "Department": ["CSE", "CSE", "ECE", "ECE", "CSE", "ECE", "CSE", "ECE"],
    "Year": [2, 2, 3, 3, 2, 3, 3, 2],
    "Marks": [85, 90, 78, 88, 75, 82, 95, 70],
}
df = pd.DataFrame(data)
print("Original DataFrame:")
print(df)

for department, group in df.groupby("Department"):
    print("\nDepartment:", department)
    print(group)
print("\nAverage marks by department:")
print(df.groupby("Department")["Marks"].mean())

for key, group in df.groupby(["Department", "Year"]):
    print("\nGroup:", key)
    print(group)
print("\nAverage marks by department and year:")
print(df.groupby(["Department", "Year"])["Marks"].mean())`,
    "7b": String.raw`# Notebook source: exp7.ipynb · 7B — Aggregate marks and attendance
import pandas as pd

data = {
    "Department": ["CSE", "CSE", "CSE", "ECE", "ECE", "ECE", "EEE", "EEE", "EEE"],
    "Marks": [80, 75, 85, 70, 65, 75, 90, 85, 95],
    "Attendance": [90, 85, 95, 80, 75, 85, 95, 90, 100],
}
df = pd.DataFrame(data)
print("Original DataFrame:")
print(df)
result = df.groupby("Department").aggregate({
    "Marks": ["sum", "mean", "std"],
    "Attendance": ["sum", "mean", "std"],
})
print("\nSummary statistics:")
print(result)`,
    "7c": String.raw`# Notebook source: exp7.ipynb · 7C — Group Iris data by species
import pandas as pd

url = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"
df = pd.read_csv(url)
print("First five records:")
print(df.head())
print("\nDataset information:")
df.info()
print("\nStatistical summary:")
print(df.describe())

single = df.groupby("species")["sepal_length"].agg(["count", "sum", "mean", "std", "min", "max"])
print("\nSingle-column group summary:")
print(single)
multiple = df.groupby(["species", "sepal_width"])["sepal_length"].mean()
print("\nGrouped by species and sepal width:")
print(multiple.head(15))
summary = df.groupby("species").agg({
    "sepal_length": ["mean", "std", "min", "max"],
    "sepal_width": ["mean", "std", "min", "max"],
    "petal_length": ["mean", "std", "min", "max"],
    "petal_width": ["mean", "std", "min", "max"],
})
print("\nSummary by species:")
print(summary)
print("\nRecords per species:")
print(df["species"].value_counts())
print("\nAverage petal length:")
print(df.groupby("species")["petal_length"].mean())
print("\nAverage petal width:")
print(df.groupby("species")["petal_width"].mean())
print("\nMaximum sepal length:")
print(df.groupby("species")["sepal_length"].max())`,
    "8a": String.raw`# Notebook source: exp8.ipynb · 8A — Scrape local review HTML
from bs4 import BeautifulSoup
import pandas as pd
import os

folder = os.getcwd()
html_file = os.path.join(folder, "reviews.html")
with open(html_file, "r", encoding="latin-1") as file:
    html_content = file.read()

soup = BeautifulSoup(html_content, "html.parser")
records = []
for block in soup.select(".review"):
    review_element = block.select_one(".review-text")
    rating_element = block.select_one(".rating")
    title_element = block.select_one(".review-title")
    review_text = review_element.get_text(" ", strip=True) if review_element else ""
    rating_text = rating_element.get_text(" ", strip=True) if rating_element else ""
    title = title_element.get_text(" ", strip=True) if title_element else ""
    if review_text:
        records.append({"title": title, "review": review_text, "rating": rating_text})

df = pd.DataFrame(records)
csv_file = os.path.join(folder, "product_reviews.csv")
df.to_csv(csv_file, index=False, encoding="utf-8-sig")
print(df.head())
print("Total reviews extracted:", len(df))
print("Saved to product_reviews.csv")`,
    "8b": String.raw`# Notebook source: exp8.ipynb · 8B — Sentiment, word clouds, review stats (8B includes notebook C/D)
import re
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import nltk
from collections import Counter
from wordcloud import WordCloud
from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer as NLTKVADER
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer as StandaloneVADER

nltk.download("stopwords", quiet=True)
nltk.download("vader_lexicon", quiet=True)
df = pd.read_csv("product_reviews.csv")
df["review"] = df["review"].fillna("").astype(str)

analyzer = StandaloneVADER()
df["sentiment"] = df["review"].apply(
    lambda text: "Positive" if analyzer.polarity_scores(text)["compound"] >= 0.05
    else "Negative" if analyzer.polarity_scores(text)["compound"] <= -0.05
    else "Neutral"
)

def generate_wordcloud(text, title, filename):
    if not text.strip():
        print("No text available for:", title)
        return
    cloud = WordCloud(width=1200, height=600, background_color="white", max_words=150, collocations=False).generate(text)
    plt.figure(figsize=(12, 6)); plt.imshow(cloud, interpolation="bilinear")
    plt.axis("off"); plt.title(title); plt.tight_layout(); plt.savefig(filename, dpi=300, bbox_inches="tight"); plt.show()

all_text = " ".join(df["review"])
generate_wordcloud(all_text, "WordCloud - All Reviews", "wordcloud_all.png")
for label in ["Positive", "Negative"]:
    text = " ".join(df.loc[df["sentiment"] == label, "review"])
    generate_wordcloud(text, "WordCloud - " + label + " Reviews", "wordcloud_" + label.lower() + ".png")
df.to_csv("product_reviews_analyzed.csv", index=False)
print("\nSentiment counts:")
print(df["sentiment"].value_counts())

stop_words = set(stopwords.words("english"))
def review_statistics(text):
    tokens = re.findall(r"\b[\w']+\b", text.lower())
    words = re.findall(r"\b[A-Za-z]+\b", text)
    numbers = re.findall(r"\b\d+(?:\.\d+)?\b", text)
    stops = [token for token in tokens if token in stop_words]
    return pd.Series({
        "word_count": len(tokens), "character_count": len(text),
        "numeric_count": len(numbers), "stopword_count": len(stops),
        "average_word_length": sum(map(len, words)) / len(words) if words else 0,
    })

stats = df["review"].apply(review_statistics)
df = pd.concat([df, stats], axis=1)
df.to_csv("review_statistics.csv", index=False)
plot_columns = [("stopword_count", "Stopword Count"), ("numeric_count", "Numeric Token Count"), ("word_count", "Word Count"), ("character_count", "Character Count"), ("average_word_length", "Average Word Length")]
fig, axes = plt.subplots(3, 2, figsize=(14, 15)); axes = axes.flatten()
for index, (column, title) in enumerate(plot_columns):
    sns.histplot(data=df, x=column, kde=True, ax=axes[index], bins=20)
    axes[index].set_title(title); axes[index].set_xlabel(title); axes[index].set_ylabel("Number of Reviews")
axes[-1].axis("off"); plt.tight_layout(); plt.savefig("review_statistics_distributions.png", dpi=300); plt.show()
tokens = re.findall(r"\b[\w']+\b", " ".join(df["review"]).lower())
print("Top 10 stopwords:")
print(Counter(token for token in tokens if token in stop_words).most_common(10))
print("\nDescriptive statistics:")
print(df[["stopword_count", "numeric_count", "word_count", "character_count", "average_word_length"]].describe())

nltk_analyzer = NLTKVADER()
vader_analyzer = StandaloneVADER()
nltk_scores = df["review"].apply(nltk_analyzer.polarity_scores)
vader_scores = df["review"].apply(vader_analyzer.polarity_scores)
for prefix, scores in [("nltk", nltk_scores), ("vader", vader_scores)]:
    df[prefix + "_positive"] = scores.apply(lambda score: score["pos"])
    df[prefix + "_negative"] = scores.apply(lambda score: score["neg"])
    df[prefix + "_neutral"] = scores.apply(lambda score: score["neu"])
    df[prefix + "_compound"] = scores.apply(lambda score: score["compound"])
    df[prefix + "_sentiment"] = df[prefix + "_compound"].apply(
        lambda score: "Positive" if score >= 0.05 else "Negative" if score <= -0.05 else "Neutral"
    )
print("\nVADER comparison:")
print(df[["review", "nltk_compound", "nltk_sentiment", "vader_compound", "vader_sentiment"]].head(10).to_string(index=False))
print("\nNLTK sentiment counts:")
print(df["nltk_sentiment"].value_counts())
print("\nStandalone VADER sentiment counts:")
print(df["vader_sentiment"].value_counts())
df.to_csv("sentiment_analysis_results.csv", index=False)
print("Results saved to sentiment_analysis_results.csv")`,
    "9": String.raw`# Notebook source: exp9.ipynb — K-Means customer segmentation
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

df = pd.read_csv("marketing_campaign.csv", sep="\t")
features = ["Income", "MntWines", "MntFruits", "MntMeatProducts", "MntFishProducts", "MntSweetProducts", "MntGoldProds"]
data = df[features].copy()
data = data.fillna(data.median())
data = data.clip(lower=data.quantile(0.01), upper=data.quantile(0.99), axis=1)
X = StandardScaler().fit_transform(data)

inertias = []
scores = []
for k in range(2, 8):
    model = KMeans(n_clusters=k, random_state=42, n_init=10)
    labels = model.fit_predict(X)
    inertias.append(model.inertia_)
    scores.append(silhouette_score(X, labels))
plt.plot(range(2, 8), inertias, marker="o")
plt.xlabel("Number of Clusters (K)"); plt.ylabel("Inertia"); plt.title("Elbow Method"); plt.show()
print("Silhouette scores:", dict(zip(range(2, 8), scores)))

best_k = list(range(2, 8))[scores.index(max(scores))]
kmeans = KMeans(n_clusters=best_k, random_state=42, n_init=10)
df["Customer_Segment"] = kmeans.fit_predict(X)
summary = df.groupby("Customer_Segment")[features].mean().round(2)
print("\nCustomer segment summary:")
print(summary)
sns.scatterplot(data=df, x="Income", y="MntWines", hue="Customer_Segment", palette="Set2")
plt.title("Customer Segments by Income and Wine Spending"); plt.show()
df.to_csv("customer_segments.csv", index=False)
summary.to_csv("segment_summary.csv")`,
    "10": String.raw`# Notebook source: exp10.ipynb — Emotion classification
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

data = {
    "text": [
        "I am very happy today", "This is a wonderful day", "I feel cheerful and excited",
        "I am sad and lonely", "I feel very disappointed", "I miss my family so much",
        "I am angry with you", "This makes me furious", "I hate this situation",
        "I am scared of the dark", "I am afraid of losing", "I feel nervous and frightened",
        "I love you so much", "You mean everything to me", "I adore spending time with you",
        "Wow this is unbelievable", "I did not expect this surprise", "What an amazing unexpected gift",
    ],
    "emotion": ["happy"] * 3 + ["sadness"] * 3 + ["anger"] * 3 + ["fear"] * 3 + ["love"] * 3 + ["surprise"] * 3,
}
df = pd.DataFrame(data)
X_train, X_test, y_train, y_test = train_test_split(
    df["text"], df["emotion"], test_size=0.33, random_state=42, stratify=df["emotion"]
)
model = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(1, 2))),
    ("classifier", LogisticRegression(max_iter=1000)),
])
model.fit(X_train, y_train)
predictions = model.predict(X_test)
print("Test Accuracy:", round(accuracy_score(y_test, predictions) * 100, 2), "%")
print("\nClassification Report:")
print(classification_report(y_test, predictions, zero_division=0))

emoji_map = {"happy": ":)", "sadness": ":(", "anger": ">:(", "fear": ":o", "love": "<3", "surprise": ":O"}
def detect_emotion(text):
    emotion = model.predict([text])[0]
    print("Input Text:", text)
    print("Detected Emotion:", emotion)
    print("Relevant Emoji:", emoji_map[emotion])

detect_emotion("I am happy to see you")
detect_emotion("I feel lonely today")
detect_emotion("I love my family")`,
  });
  window.partCompilerDefaults = partCompilerDefaults;
  const csvFallbackLoader = `# DATASET FALLBACK: use dataset.csv, another uploaded CSV, or sample data
from pathlib import Path
csv_path = Path("dataset.csv")
if not csv_path.exists():
    other_csv_files = sorted(set(Path(".").glob("*.csv")) | set(Path("/").glob("*.csv")))
    csv_path = other_csv_files[0] if other_csv_files else None
if csv_path:
    print(f"Using dataset: \${csv_path}")
    df = pd.read_csv(csv_path)
else:
    print("No CSV uploaded; using built-in sample data.")
    df = pd.DataFrame({
        "student_id": [1, 2, 3, 3, 4],
        "hours": [2, 3, None, 3, 5],
        "score": [55, 67, 72, 72, None],
        "group": ["A", "B", "A", "A", "B"],
    })`;
  function addDatasetFallback(source) {
    if (source.includes("DATASET FALLBACK")) return source;
    return source.replace('df = pd.read_csv("dataset.csv")', csvFallbackLoader);
  }
  function renderPartCompilers(item) {
    const container = $("partCompilers");
    const experimentId = Number(item.id);
    if (Number.parseInt(activePartKey, 10) !== experimentId) activePartKey = experimentId === 9 || experimentId === 10 ? String(experimentId) : `${experimentId}a`;
    const savedCodes = item.partCodes || {};
    const definitions = experimentId === 1 ? [
      ["1a", "1(a) · Read and inspect the car dataset"],
      ["1b", "1(b) · Write and read CSV and JSON files"],
      ["1c", "1(c) · Write and read an Excel file"],
    ] : experimentId === 2 ? [
      ["2a", "2(a) · Fetch GitHub issues with Requests"],
      ["2b", "2(b) · Store and query records with SQLite"],
    ] : experimentId === 3 ? [
      ["3a", "3(a) · Find and handle missing values"],
      ["3b", "3(b) · Map values and rename columns"],
      ["3c", "3(c) · Detect outliers"],
      ["3d", "3(d) · Split text with regular expressions"],
    ] : experimentId === 4 ? [
      ["4a", "4(a) · Select values from a MultiIndex"],
      ["4b", "4(b) · Stack and unstack a DataFrame"],
      ["4c", "4(c) · Merge and combine DataFrames"],
    ] : experimentId === 5 ? [
      ["5a", "5(a) · Explore Iris charts"],
      ["5b", "5(b) · Compare sales and student marks"],
      ["5c", "5(c) · Histogram and density plot"],
      ["5d", "5(d) · Study-hours scatter plot and correlation"],
      ["5e", "5(e) · Marks box plot by department"],
    ] : experimentId === 9 ? [["9", "9 · K-Means customer segmentation"]]
      : experimentId === 10 ? [["10", "10 · Emotion classification"]]
      : partLettersFor(item).map((letter, index) => {
      const key = `${experimentId}${letter}`;
      const partDescription = item.parts?.[index] || `Experiment ${experimentId} part ${letter.toUpperCase()}`;
      return [key, `${experimentId}(${letter}) · ${partDescription}`];
    });
    const firstPartSavedCode = savedCodes[definitions[0]?.[0]] || item.code || "";
    const partCodeVersion = 6;
    const migratePartCodes = item.partCodeVersion !== partCodeVersion;
    const experimentOptions = labs.map((entry) => `<option value="${Number(entry.id)}" ${Number(entry.id) === experimentId ? "selected" : ""}>Experiment ${String(entry.id).padStart(2, "0")} · ${escapeHtml(entry.title)}</option>`).join("");
    container.innerHTML = `<div class="compiler-experiment-picker"><label for="compilerExperimentSelect">CHOOSE EXPERIMENT</label><select id="compilerExperimentSelect" aria-label="Choose experiment for compiler">${experimentOptions}</select></div><div class="part-switcher" role="tablist" aria-label="Choose Experiment ${experimentId} compiler">${definitions.map(([key]) => `<button type="button" role="tab" data-select-part="${key}">${key}</button>`).join("")}</div>` + definitions.map(([key, title], index) => {
      const customDefault = index === 0 && item.code ? item.code : `# ${title}\n# Write or paste the Python code for this part here.`;
      let savedCode = savedCodes[key];
      if (migratePartCodes && partCompilerDefaults[key]) savedCode = partCompilerDefaults[key];
      if (experimentId === 1 && !savedCode?.includes("# Notebook source: exp1.ipynb")) savedCode = partCompilerDefaults[key] || customDefault;
      const hasBrokenPythonString = savedCode && /print\("\s*(?:Shape:|Numeric columns:|Missing values:|Scaled sample:|Cluster counts:|Centres \(scaled features\):)/.test(savedCode);
      const hasNestedDatasetFallback = savedCode && /if Path\("dataset\.csv"\)\.exists\(\):\s+# DATASET FALLBACK/.test(savedCode);
      if (experimentId === 6 && (hasBrokenPythonString || hasNestedDatasetFallback)) savedCode = partCompilerDefaults[key];
      if (savedCode?.includes("# Write this part's Python code here.") && partCompilerDefaults[key]) savedCode = partCompilerDefaults[key];
      if (index > 0 && savedCode) {
        const expectedHeader = `# Experiment ${experimentId}(${key.slice(-1)})`;
        const savedHeader = savedCode.match(/^#\s*Experiment\s+\d+\([a-z]\)/im)?.[0];
        const copiedFromAnotherPart = firstPartSavedCode && savedCode.trim() === firstPartSavedCode.trim();
        const headerBelongsToAnotherPart = savedHeader && savedHeader.toLowerCase() !== expectedHeader.toLowerCase();
        if (migratePartCodes || copiedFromAnotherPart || headerBelongsToAnotherPart) savedCode = partCompilerDefaults[key] || customDefault;
      }
      if (index > 0 && migratePartCodes) savedCode = partCompilerDefaults[key] || customDefault;
      const code = addDatasetFallback(savedCode || partCompilerDefaults[key] || customDefault);
      item.partCodes = item.partCodes || {};
      item.partCodes[key] = code;
      return `<section class="part-compiler" id="compilerPanel${key}"><h4>${escapeHtml(title)} · Python Compiler</h4><textarea class="part-code" id="partCompiler${key}" spellcheck="false" aria-label="Code for ${escapeHtml(title)}">${escapeHtml(code)}</textarea><div class="compiler-bar"><button class="compiler-run" type="button" data-run-part="${key}">▶ Run ${key.toUpperCase()}</button><span class="compiler-status" id="partStatus${key}">Ready · runs separately</span></div><pre class="compiler-output" id="partOutput${key}">Output for ${key.toUpperCase()} will appear here.</pre></section>`;
    }).join("");
    $("compilerExperimentSelect").addEventListener("change", (event) => {
      const nextId = Number(event.currentTarget.value);
      const nextItem = labs.find((entry) => Number(entry.id) === nextId);
      if (!nextItem) return;
      activePartKey = nextId === 9 || nextId === 10 ? String(nextId) : `${nextId}${partLettersFor(nextItem)[0] || "a"}`;
      pendingPartKey = activePartKey;
      window.openLab(nextId);
      requestAnimationFrame(() => $("partsPanel")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    });
    item.partCodeVersion = partCodeVersion;
    save();
    definitions.forEach(([key]) => {
      const editor = $(`partCompiler${key}`);
      const runButton = container.querySelector(`[data-run-part="${key}"]`);
      editor.addEventListener("input", () => {
        item.partCodes = item.partCodes || {};
        item.partCodes[key] = editor.value;
        save();
      });
      runButton.onclick = async () => {
        const output = $(`partOutput${key}`);
        const status = $(`partStatus${key}`);
        item.partCodes = item.partCodes || {};
        item.partCodes[key] = editor.value;
        save();
        runButton.disabled = true;
        output.textContent = "";
        status.textContent = "Starting Python…";
        try {
          const runtime = await getPyodide();
          status.textContent = "Loading packages and datasets…";
          const importsForPyodide = key === "1c" ? editor.value.replace(/^import openpyxl\s*$/m, "") : editor.value;
          await runtime.loadPackagesFromImports(importsForPyodide);
          if (key === "1c" && editor.value.includes("to_excel(")) {
            status.textContent = "Loading Excel support…";
            await runtime.loadPackage("micropip");
            await runtime.runPythonAsync("import micropip\nawait micropip.install('openpyxl')");
          }
          runtime.globals.set("lab_input", $("labInputData").value);
          const uploads = await readUploads(idForCompiler);
          for (const file of uploads.datasets || []) {
            const safeName = file.name.replace(/[\\/]/g, "_");
            runtime.FS.writeFile(safeName, new Uint8Array(await file.blob.arrayBuffer()));
          }
          const csvSample=["feature,target,value,date,label,hours,score,group","1,50,2,2025-01-01,Support,1,50,A","2,55,3,2025-01-02,Support,2,55,B","3,65,4,2025-01-03,Support,3,65,A","4,,5,2025-01-04,Pass,4,70,B","5,75,6,2025-01-05,Pass,5,75,A","6,85,7,2025-01-06,Pass,6,85,B","3,65,4,2025-01-03,Support,3,65,A"].join(String.fromCharCode(10));const firstCsv=(uploads.datasets||[]).find(file=>file.name.toLowerCase().endsWith(".csv"));const fallbackBytes=firstCsv?new Uint8Array(await firstCsv.blob.arrayBuffer()):new TextEncoder().encode(csvSample);const sourceForCsv=typeof source==="string"?source:editor.value;const csvNames=new Set(["dataset.csv","raw_data.csv",...(sourceForCsv.match(/[A-Za-z0-9_.-]+\.csv/gi)||[]).map(name=>name.replace(/[\/]/g,"_"))]);csvNames.forEach(name=>{if(!runtime.FS.analyzePath(name).exists)runtime.FS.writeFile(name,fallbackBytes)});runtime.setStdin({ stdin: () => window.prompt("Python input() — enter a value:") });
          runtime.globals.set("_labmanual_source", editor.value);
          status.textContent = "Running…";
          const result = await runtime.runPythonAsync(`
import io as _labmanual_io
import contextlib as _labmanual_contextlib
_labmanual_stdout = _labmanual_io.StringIO()
_labmanual_stderr = _labmanual_io.StringIO()
try:
    with _labmanual_contextlib.redirect_stdout(_labmanual_stdout), _labmanual_contextlib.redirect_stderr(_labmanual_stderr):
        exec(compile(_labmanual_source, "<labmanual-part>", "exec"), globals())
except Exception as _labmanual_error:
    print("{}: {}".format(type(_labmanual_error).__name__, _labmanual_error), file=_labmanual_stderr)
_labmanual_stdout.getvalue() + _labmanual_stderr.getvalue()
          `);
          output.textContent = String(result || "").trim() || "Code finished successfully. (No text output.)";
          status.textContent = "Finished · separate output";
        } catch (error) {
          output.textContent = error?.message || String(error);
          status.textContent = "Could not run code";
        } finally {
          runButton.disabled = false;
        }
      };
    });
    container.querySelectorAll("[data-select-part]").forEach((button) => button.onclick = () => {
      activePartKey = button.dataset.selectPart;
      selectPartCompiler(activePartKey, false);
    });
    selectPartCompiler(activePartKey, false);
  }
  function selectPartCompiler(key, scroll) {
    const container = $("partCompilers");
    if (!container) return;
    container.querySelectorAll(".part-compiler").forEach((panel) => {
      const isSelected = panel.id === `compilerPanel${key}`;
      panel.hidden = !isSelected;
      panel.style.display = isSelected ? "block" : "none";
      panel.setAttribute("aria-hidden", String(!isSelected));
    });
    container.querySelectorAll("[data-select-part]").forEach((button) => {
      const selected = button.dataset.selectPart === key;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-selected", String(selected));
    });
    if (scroll) {
      const selectedPanel = $(`compilerPanel${key}`);
      if (selectedPanel) {
        selectedPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        $(`partCompiler${key}`)?.focus({ preventScroll: true });
      }
    }
  }
  function renderVideoNoteParts(item, selectedKey = null) {
    const container = $("videoNoteParts");
    if (!container) return;
    const keys = partLettersFor(item).map((letter) => `${Number(item.id)}${letter}`);
    const visibleKeys = selectedKey ? keys.filter((key) => key !== selectedKey) : keys;
    container.setAttribute("aria-label", `Choose Experiment ${Number(item.id)} part`);
    container.innerHTML = visibleKeys.map((key) => {
      const letter = key.slice(-1).toUpperCase();
      const index = key.charCodeAt(key.length - 1) - 97;
      const description = (item.parts?.[index] || `Open the ${letter} compiler and experiment video.`).replace(/^\d+\([a-z]\)\s*/i, "");
      return `<button type="button" data-open-part="${key}" aria-label="Open ${key.toUpperCase()} compiler and experiment video"><span class="video-part-badge">${key.toUpperCase()}</span><strong>Section ${letter}</strong><small>${escapeHtml(description)}</small></button>`;
    }).join("");
    if (selectedKey?.endsWith("c")) {
      container.insertAdjacentHTML("beforeend", '<button type="button" data-open-overview="true"><span class="video-part-badge">↗</span><strong>Overview</strong><small>Review the experiment summary and introduction.</small></button>');
    }
    container.querySelectorAll("[data-open-part]").forEach((button) => {
      button.addEventListener("click", () => window.openExperimentPartCompiler(button.dataset.openPart));
    });
    container.querySelector("[data-open-overview]")?.addEventListener("click", () => {
      document.querySelector('[data-tab="overview"]')?.click();
      document.querySelector('[data-content="overview"]')?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  window.openExperimentPartCompiler = (key) => {
    activePartKey = key;
    const experimentId = Number.parseInt(key, 10);
    if (currentId !== experimentId || !$("detail").classList.contains("show")) {
      pendingPartKey = key;
      window.openLab(experimentId);
    } else {
      const item = labs.find((candidate) => Number(candidate.id) === experimentId);
      if (item) renderVideoNoteParts(item, key);
    }
    requestAnimationFrame(() => selectPartCompiler(key, true));
  };
  let idForCompiler = 1;
  const baseOpenLab = window.openLab;
  window.openLab = function (id) {
    const noteItem = labs.find((candidate) => Number(candidate.id) === Number(id));
    if (noteItem) {
      const notePanel = $("videoNoteParts");
      if (notePanel) {
        try {
          renderVideoNoteParts(noteItem, pendingPartKey.startsWith(String(noteItem.id)) ? pendingPartKey : null);
        } catch (error) {
          const letters = partLettersFor(noteItem);
          notePanel.replaceChildren(...letters.map((letter) => {
            const key = `${Number(noteItem.id)}${letter}`;
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
            description.textContent = noteItem.parts?.[letters.indexOf(letter)] || `Open the ${letter.toUpperCase()} compiler and experiment video.`;
            button.append(badge, title, description);
            button.addEventListener("click", () => window.openExperimentPartCompiler?.(key));
            return button;
          }));
        }
      }
    }
    baseOpenLab(id);
    const item = labs.find((candidate) => candidate.id === id);
    idForCompiler = id;
    const videoUrlLink = $("videoUrlLink");
    if (videoUrlLink) {
      if (item.video && /^https?:\/\//i.test(item.video)) {
        videoUrlLink.href = item.video;
        videoUrlLink.querySelector("span").textContent = item.video;
        videoUrlLink.hidden = false;
      } else videoUrlLink.hidden = true;
    }
    const githubLink = $("github");
    const githubUrl = item.github || "https://github.com/svdhanush459/data-science";
    githubLink.href = githubUrl;
    $("ghText").textContent = githubUrl;
    githubLink.style.pointerEvents = "auto";
    githubLink.style.opacity = "1";
    const generalCodePanel = $("labCodeInput").closest(".panel");
    if (generalCodePanel) generalCodePanel.style.display = "none";
    $("partsList").innerHTML = (item.parts || []).length ? item.parts.map((part, index) => `<div class="step"><i class="num">${index + 1}</i><span>${escapeHtml(part)}</span></div>`).join("") : '<p>No parts added yet.</p>';
    renderPartCompilers(item);
    renderVideoNoteParts(item, pendingPartKey.startsWith(String(item.id)) ? pendingPartKey : null);
    pendingPartKey = "";
    $("assetsPanel").style.display = "block";
    $("datasetLinks").innerHTML = "No dataset files uploaded.";
    activeDataUrls.forEach((url) => URL.revokeObjectURL(url));
    activeDataUrls = [];
    if (activeVideoUrl) URL.revokeObjectURL(activeVideoUrl);
    activeVideoUrl = "";
    readUploads(id).then((upload) => {
      if (currentId !== id) return;
      if (upload.video?.blob) {
        activeVideoUrl = URL.createObjectURL(upload.video.blob);
        $("video").innerHTML = `<video controls playsinline style="width:100%;height:100%;max-height:420px" src="${activeVideoUrl}"></video>`;
      }
      if (upload.datasets?.length) {
        $("datasetLinks").innerHTML = upload.datasets.map((file, index) => {
          const url = URL.createObjectURL(file.blob);
          activeDataUrls.push(url);
          return `<a href="${url}" download="${escapeHtml(file.name)}">${escapeHtml(file.name)} · ${(file.size / 1024).toFixed(1)} KB — Download</a>`;
        }).join("");
      }
    }).catch(() => { if (currentId === id) $("datasetLinks").textContent = "Uploaded files could not be loaded in this browser."; });
  };

  form.addEventListener("submit", async (event) => {
    if (form.dataset.type !== "exp") return;
    event.preventDefault();
    event.stopImmediatePropagation();
    try {
    const id = editingId ?? (Math.max(0, ...labs.map((item) => item.id)) + 1);
    const existing = editingId === null ? { id, video: null, datasets: [] } : await readUploads(id);
    const videoFile = $("eVideoFile").files[0];
    const datasetFiles = [...$("eDatasetFiles").files];
    const savedVideo = videoFile ? { name: videoFile.name, type: videoFile.type, size: videoFile.size, blob: videoFile } : existing.video;
    const savedDatasets = datasetFiles.length ? datasetFiles.map((file) => ({ name: file.name, type: file.type, size: file.size, blob: file })) : existing.datasets;
    await writeUploads({ id, video: savedVideo || null, datasets: savedDatasets || [] });
    const item = {
      id, title: $("eTitle").value.trim(), desc: $("eDesc").value.trim() || $("eTitle").value.trim(),
      video: $("eVideo").value.trim(), videoUrl: $("eVideo").value.trim(), github: $("eGithub").value.trim(),
      summary: $("eSummary").value.trim(), architecture: lines("eArchitecture"), steps: lines("eSteps"),
      objectives: lines("eObjectives"), requirements: lines("eRequirements"), parts: lines("eParts"),
      code: $("eCode").value, input: $("eInput").value, output: $("eOutput").value, result: $("eOutput").value,
      videoFileName: savedVideo?.name || "", datasetNames: (savedDatasets || []).map((file) => file.name),
      analysis: ["Review input data and assumptions.", "Follow the experiment parts and inspect intermediate results.", "Evaluate the findings and note limitations.", "Summarize the evidence and learning outcome."],
    };
    const existingIndex = labs.findIndex((candidate) => candidate.id === id);
    if (existingIndex < 0) labs.push(item); else labs[existingIndex] = { ...labs[existingIndex], ...item };
    save();
    form.reset();
    $("modalbg").classList.remove("open");
    editingId = null;
    window.renderCards($("search").value);
    window.openLab(id);
    toast(existingIndex < 0 ? "Experiment created" : "Experiment updated");
    } catch (error) {
      console.error("Could not save experiment", error);
      toast("Could not save. Check browser storage or try smaller files.");
    }
  }, true);

  window.renderCards($("search").value);
  renderProfile();
})();
