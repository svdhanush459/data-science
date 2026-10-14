# MBU Data Science Laboratory

A static, browser-based laboratory website for the Data Science course. The site is published from the repository root, so `index.html` stays at the top level for GitHub Pages.

## Project folders

| Folder or file | Contents |
| --- | --- |
| `index.html` | Website page structure and entry point |
| `assets/css/` | Website styles |
| `src/js/` | Website behavior, experiment compiler logic, module view, and video notes |
| `experiments/experiment-01/` through `experiment-06/` | Individual Python compiler files, grouped by experiment and part |
| `modules/module-01/` through `module-05/` | Module descriptions and metadata |
| `videos/` | Experiment overview URLs and video reference metadata |

## Run locally

Open `index.html` in a browser. The folders and files are plain HTML, CSS, JavaScript, Python examples, JSON metadata, and Markdown documentation; no build step is required.

## Notes

- The website loads its stylesheet and JavaScript from the folders above while remaining compatible with GitHub Pages.
- Module PDFs uploaded through the site are stored in the current browser on the current device. They are not uploaded into this public repository.
- Experiment videos remain hosted by YouTube. The repository records their URLs; it does not redistribute video files.
- User-created experiment cards and browser uploads are browser-local unless an application backend is configured.
