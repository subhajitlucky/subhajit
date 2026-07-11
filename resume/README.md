# Resume source

The canonical resume is generated from `resume.json` with ReportLab:

```bash
npm run build:resume
```

The command uses `uv` to provide ReportLab. Without `uv`, install the packages from `resume/requirements.txt` into a virtual environment and run `python resume/build_resume.py`.

Output: `public/assets/Subhajit_Resume.pdf`

The PDF is intentionally one page, searchable, linkable, and ATS-readable. After changing the source, render it with Poppler and inspect the PNG before publishing:

```bash
mkdir -p tmp/pdfs
pdftoppm -png -r 150 public/assets/Subhajit_Resume.pdf tmp/pdfs/resume
```
