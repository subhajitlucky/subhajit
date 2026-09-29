"""Generate the training-data figure for the KALIA portfolio page.

Two panels answering the two questions a reader actually has about a corpus:

- **left** - the mixture, as proportions, each labelled with its licence
- **right** - the measurement that matters: the share of each source's documents
  that are at least as long as the model's 1,024-token context

The second panel is the one that explains the LAMBADA regression, and it is
invisible without a picture: TinyStories is a fifth of the tokens and
essentially none of the long documents. A reader who sees only the mixture
cannot tell that, and would reasonably conclude the corpus is fine.

Output is written in the same hand-rolled style as the existing figures in
`public/kalia/` (flat SVG, system-ui, no dependencies) so the page does not
gain a charting library for two static pictures.

Usage:
    python tools/make_training_data_svg.py
"""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "kalia" / "training-data.svg"

W, H = 720, 380
FONT = "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif"

INK = "#111827"
MUTED = "#6b7280"
RULE = "#e5e7eb"
# One hue per source, reused across both panels so a colour means one source.
COLORS = ["#2563eb", "#7c3aed", "#0891b2", "#b45309"]

SOURCES = [
    ("FineWeb-Edu (dedup)", 60, "ODC-By-1.0", 26.2),
    ("TinyStories", 20, "CDLA-Sharing-1.0", 0.03),
    ("Cosmopedia v2", 15, "Apache-2.0", 13.2),
    ("Python (filtered)", 5, "per-file filter", None),
]

LONG_DOC_TOTAL = 17.7
CONTEXT = 1024


def esc(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def text(x, y, s, size=12, fill=INK, anchor="start", weight="400") -> str:
    return (
        f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" '
        f'fill="{fill}" text-anchor="{anchor}" font-weight="{weight}">{esc(s)}</text>'
    )


def build() -> str:
    p: list[str] = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" '
        f'height="{H}" role="img" aria-labelledby="t d">',
        '<title id="t">KALIA training mixture and long-document coverage</title>',
        '<desc id="d">Left: the 2.4 billion token mixture by source and licence. '
        'Right: the share of each source whose documents are at least as long as '
        'the 1024 token context, which is 17.7 percent overall and 0.03 percent '
        'for TinyStories.</desc>',
        f'<rect width="{W}" height="{H}" fill="#ffffff"/>',
        text(40, 26, "Training mixture, and how much of it is long enough to matter", 15, INK, weight="600"),
        text(40, 44, "2.4B tokens, 1,024-token context. Proportions are of training tokens.", 12, MUTED),
    ]

    # --- left panel: the mixture as a single stacked bar --------------------
    lx, ly, lw, lh = 40, 74, 250, 34
    p.append(text(lx, ly - 8, "What it is made of", 12, INK, weight="600"))
    x = lx
    for i, (name, share, lic, _ld) in enumerate(SOURCES):
        w = lw * share / 100
        p.append(f'<rect x="{x:.1f}" y="{ly}" width="{w:.1f}" height="{lh}" fill="{COLORS[i]}"/>')
        if share >= 10:
            p.append(text(x + w / 2, ly + 21, f"{share}%", 12, "#ffffff", anchor="middle", weight="600"))
        x += w
    y = ly + lh + 18
    for i, (name, share, lic, _ld) in enumerate(SOURCES):
        p.append(f'<rect x="{lx}" y="{y - 8}" width="10" height="10" fill="{COLORS[i]}"/>')
        p.append(text(lx + 16, y, f"{name}", 11, INK))
        p.append(text(lx + 176, y, f"{share}%", 11, MUTED, anchor="end"))
        p.append(text(lx + lw, y, lic, 10, MUTED, anchor="end"))
        y += 15

    # --- right panel: long-document coverage --------------------------------
    rx = 348
    rw = 332
    p.append(text(rx, ly - 8, f"Documents at least as long as the context", 12, INK, weight="600"))
    p.append(text(rx, ly + 8, f"share of each source's documents, median length in parentheses", 10, MUTED))
    medians = ["592", "192", "669", "-"]
    bar_x, bar_w = rx + 128, 150
    y = ly + 30
    for i, (name, _share, _lic, ld) in enumerate(SOURCES):
        p.append(text(rx, y + 9, name.split(" (")[0], 11, INK))
        if ld is None:
            p.append(f'<rect x="{bar_x}" y="{y}" width="2" height="14" fill="{RULE}"/>')
            p.append(text(bar_x + 8, y + 11, "not measured", 10, MUTED))
        else:
            w = max(bar_w * ld / 100, 1.5)
            p.append(f'<rect x="{bar_x}" y="{y}" width="{w:.1f}" height="14" fill="{COLORS[i]}"/>')
            p.append(text(bar_x + bar_w + 6, y + 11, f"{ld:g}%  ({medians[i]})", 10, MUTED))
        y += 20

    # overall figure, and the point of the whole panel
    oy = y + 6
    p.append(f'<line x1="{rx}" y1="{oy}" x2="{rx + rw}" y2="{oy}" stroke="{RULE}"/>')
    p.append(text(rx, oy + 20, "Whole mixture, token-weighted", 11, INK, weight="600"))
    w = bar_w * LONG_DOC_TOTAL / 100
    p.append(f'<rect x="{bar_x}" y="{oy + 10}" width="{w:.1f}" height="14" fill="#111827"/>')
    p.append(text(bar_x + bar_w + 6, oy + 21, f"{LONG_DOC_TOTAL}%", 11, INK, weight="600"))
    p.append(
        text(
            rx,
            oy + 46,
            "LAMBADA needs the model to hold a discourse and recall its end.",
            11,
            MUTED,
        )
    )
    p.append(
        text(
            rx,
            oy + 62,
            "It is the task this corpus is worst equipped for, and it regressed.",
            11,
            MUTED,
        )
    )
    p.append(
        text(
            rx,
            oy + 78,
            "The probe found a replacement source at 99.3%.",
            11,
            "#111827",
            weight="600",
        )
    )
    p.append("</svg>")
    return "".join(p)


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(build(), encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
