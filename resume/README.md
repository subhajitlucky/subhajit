# Resume redesign draft

This is an unlinked one-page redesign draft generated from `resume.json` with ReportLab.
It does not replace the attached resume. The attached `public/assets/Subhajit_ResumeV9.pdf`
is the canonical resume and remains the file used by the portfolio.

```bash
npm run build:resume
```

The command uses `uv` to provide ReportLab. Without `uv`, install the packages from `resume/requirements.txt` into a virtual environment and run `python resume/build_resume.py`.

Output: `resume/drafts/Subhajit_Resume_redesign.pdf`

The PDF is intentionally one page, searchable, linkable, and ATS-readable. After changing the source, render it with Poppler and inspect the PNG before publishing:

```bash
mkdir -p tmp/pdfs
pdftoppm -png -r 150 resume/drafts/Subhajit_Resume_redesign.pdf tmp/pdfs/resume-redesign
```
