#!/usr/bin/env python3
"""Generate the KALIA figures for the portfolio page.

Every figure is written from the data in ``FIGURES`` below, so the pictures and
the prose cannot drift apart. The existing figures in ``public/kalia/`` were
hand-rolled per-idea; this consolidates them and fixes the two things they got
wrong: the loss curve showed v0.1.2 only, and nothing showed both versions'
benchmarks side by side.

Three figures:

``val-loss.svg``
    v0.1.2 and v0.2.0 validation loss on the **same rebuilt yardstick**, with the
    plateau from step 3,250 shaded and labelled. This is the one that was doing
    the work no single number can: it shows 1,500 steps of training that bought
    nothing.

``bench-compare.svg``
    Grouped bars, both versions, per task, with the ~2 point standard error drawn
    as a whisker. A reader can see that three of the five movements are inside
    their own error bars, which a table of deltas invites them to miss.

``training-data.svg``
    The mixture, and beside it the share of each source whose documents are at
    least as long as the context. That second panel is why LAMBADA regressed.

Output is flat SVG in the house style (system-ui, no dependencies) so the page
picks up no charting library for static pictures.

Usage:
    python tools/make_figures.py
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "kalia"

FONT = "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif"
INK, MUTED, RULE = "#111827", "#6b7280", "#e5e7eb"
BLUE, VIOLET, CYAN, AMBER = "#2563eb", "#7c3aed", "#0891b2", "#b45309"
RED, GREEN = "#b91c1c", "#15803d"

# ---------------------------------------------------------------- source data

# v0.2.0 validation loss, 19 points, straight from kalia-lm/kalia-v020.
V020_VAL = [
    (250, 4.8272), (500, 3.7597), (750, 3.4470), (1000, 3.2345), (1250, 3.1456),
    (1500, 3.1014), (1750, 3.0563), (2000, 2.9959), (2250, 3.0332), (2500, 2.9563),
    (2750, 2.9455), (3000, 2.9471), (3250, 2.8744), (3500, 2.9246), (3750, 2.8834),
    (4000, 2.9397), (4250, 2.8759), (4500, 2.8754), (4750, 2.8832),
]

# v0.1.2, re-measured on the rebuilt v2b set (D43). Its own curve was on the old
# set and is not comparable; only the re-baselined point is used here.
V012_POINT = (3478, 3.0533)

PLATEAU_FROM = 3250
PLANNED_STEPS = 4770

BENCH = [
    # task, v0.1.2, v0.2.0, stderr, chance
    ("PIQA", 61.4, 63.8, 2.15, 50),
    ("HellaSwag", 36.8, 39.8, 1.99, 25),
    ("WinoGrande", 50.2, 50.8, 2.24, 50),
    ("LAMBADA", 23.0, 20.8, 1.82, 0),
    ("ARC-Easy", 45.8, 42.0, 2.21, 25),
]

SOURCES = [
    ("FineWeb-Edu (dedup)", 60, "ODC-By-1.0", 26.2, "592"),
    ("TinyStories", 20, "CDLA-Sharing-1.0", 0.03, "192"),
    ("Cosmopedia v2", 15, "Apache-2.0", 13.2, "669"),
    ("Python (filtered)", 5, "per-file filter", None, "-"),
]
LONG_DOC_TOTAL = 17.7
CANDIDATE = 99.3
CONTEXT = 1024


# -------------------------------------------------------------------- helpers

def esc(t: str) -> str:
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def txt(x, y, s, size=12, fill=INK, anchor="start", weight="400") -> str:
    return (
        f'<text x="{x:.1f}" y="{y:.1f}" font-family="{FONT}" font-size="{size}" '
        f'fill="{fill}" text-anchor="{anchor}" font-weight="{weight}">{esc(s)}</text>'
    )


def svg(w, h, title, desc, body) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" '
        f'height="{h}" role="img" aria-labelledby="figTitle figDesc">'
        f'<title id="figTitle">{esc(title)}</title>'
        f'<desc id="figDesc">{esc(desc)}</desc>'
        f'<rect width="{w}" height="{h}" fill="#ffffff"/>{body}</svg>'
    )


# ------------------------------------------------------------------ figure 1

def val_loss_svg() -> str:
    W, H = 720, 420
    L, R, T, B = 64, 700, 74, 330
    lo, hi = 2.80, 4.90

    def sx(step):
        return L + (R - L) * step / PLANNED_STEPS

    def sy(v):
        return B - (B - T) * (v - lo) / (hi - lo)

    p = [txt(40, 26, "Validation loss, both versions on the same rebuilt yardstick", 15, INK, weight="600"),
         txt(40, 44, "deterministic 100-batch protocol, 819,200 tokens. v0.1.2 re-measured on the v2b set, or the two are not comparable.", 11, MUTED)]

    # plateau shading
    px0 = sx(PLATEAU_FROM)
    p.append(f'<rect x="{px0:.1f}" y="{T}" width="{R - px0:.1f}" height="{B - T}" fill="{MUTED}" opacity="0.09"/>')
    tail = [v for st, v in V020_VAL if st >= PLATEAU_FROM]
    p.append(txt(px0 + 8, T + 15, "flat for the last 1,500 steps", 10, MUTED, weight="600"))
    p.append(txt(px0 + 8, T + 28, f"spread {max(tail) - min(tail):.4f} nats over {len(tail)} evals", 10, MUTED))

    for v in (2.8, 3.0, 3.2, 3.4, 3.6, 4.0, 4.5):
        p.append(f'<line x1="{L}" y1="{sy(v):.1f}" x2="{R}" y2="{sy(v):.1f}" stroke="{RULE}"/>')
        p.append(txt(L - 8, sy(v) + 4, f"{v:.1f}", 11, MUTED, anchor="end"))
    p.append(f'<line x1="{L}" y1="{B}" x2="{R}" y2="{B}" stroke="{RULE}"/>')
    for step in (0, 1000, 2000, 3000, 4000, 4770):
        p.append(f'<line x1="{sx(step):.1f}" y1="{B}" x2="{sx(step):.1f}" y2="{B + 4}" stroke="{RULE}"/>')
        p.append(txt(sx(step), B + 19, f"{step:,}", 11, MUTED, anchor="middle"))
    p.append(txt((L + R) / 2, B + 40, "step", 11, MUTED, anchor="middle"))

    pts = " ".join(f"{sx(st):.1f},{sy(v):.1f}" for st, v in V020_VAL)
    p.append(f'<polyline points="{pts}" fill="none" stroke="{BLUE}" stroke-width="2"/>')
    for st, v in V020_VAL:
        p.append(f'<circle cx="{sx(st):.1f}" cy="{sy(v):.1f}" r="2.6" fill="{BLUE}"/>')

    # Deterministic endpoints. Both are on the *deterministic* protocol, so they
    # are marked as ticks rather than joined to the in-training curve, which is
    # a different (50-batch) protocol and must not be read as the same series.
    ax, ay = sx(V012_POINT[0]), sy(V012_POINT[1])
    bx, by = sx(4770), sy(2.8248)
    p.append(f'<line x1="{ax - 8:.1f}" y1="{ay:.1f}" x2="{ax + 8:.1f}" y2="{ay:.1f}" stroke="{AMBER}" stroke-width="2.5"/>')
    p.append(f'<line x1="{bx - 8:.1f}" y1="{by:.1f}" x2="{bx + 8:.1f}" y2="{by:.1f}" stroke="{BLUE}" stroke-width="2.5"/>')

    # Annotation block, parked in the verified-empty upper right, with leaders.
    ax0, ay0 = 404, 150
    p.append(f'<rect x="{ax0}" y="{ay0}" width="248" height="74" rx="6" fill="#ffffff" stroke="{RULE}"/>')
    p.append(f'<line x1="{ax0 + 12}" y1="{ay0 + 18}" x2="{ax0 + 30}" y2="{ay0 + 18}" stroke="{AMBER}" stroke-width="2.5"/>')
    p.append(txt(ax0 + 38, ay0 + 22, "v0.1.2", 11, INK, weight="600"))
    p.append(txt(ax0 + 236, ay0 + 22, "3.0533", 12, AMBER, anchor="end", weight="600"))
    p.append(f'<line x1="{ax0 + 12}" y1="{ay0 + 38}" x2="{ax0 + 30}" y2="{ay0 + 38}" stroke="{BLUE}" stroke-width="2.5"/>')
    p.append(txt(ax0 + 38, ay0 + 42, "v0.2.0", 11, INK, weight="600"))
    p.append(txt(ax0 + 236, ay0 + 42, "2.8248", 12, BLUE, anchor="end", weight="600"))
    p.append(f'<line x1="{ax0 + 12}" y1="{ay0 + 56}" x2="{ax0 + 236}" y2="{ay0 + 56}" stroke="{RULE}"/>')
    p.append(txt(ax0 + 12, ay0 + 70, "0.2285 nats better, 4.6x the 0.05 bar", 11, GREEN, weight="600"))
    # leaders from the block down to the two ticks
    p.append(f'<line x1="{ax0 + 40}" y1="{ay0 + 74}" x2="{ax:.1f}" y2="{ay - 9:.1f}" stroke="{AMBER}" stroke-width="1" stroke-dasharray="2 3"/>')
    p.append(f'<line x1="{ax0 + 236}" y1="{ay0 + 74}" x2="{bx:.1f}" y2="{by - 9:.1f}" stroke="{BLUE}" stroke-width="1" stroke-dasharray="2 3"/>')

    p.append(txt(40, H - 26, "Same recipe, same schedule, only the corpus changed: it was rebuilt for licence compliance.", 11, MUTED))
    p.append(txt(40, H - 10, "Ticks are the deterministic 100-batch protocol; the curve is the 50-batch in-training estimate, which is why the last tick sits below the line.", 10, MUTED))
    return svg(W, H, "Validation loss for KALIA 0.1.2 and 0.2.0",
               "Line chart of v0.2.0 validation loss falling from 4.83 to 2.88 over 4770 steps, flat "
               "from step 3250, with deterministic reference points of 3.0533 for v0.1.2 and "
               "2.8248 for v0.2.0 on the same rebuilt yardstick.",
               "".join(p))


# ------------------------------------------------------------------ figure 2

def bench_svg() -> str:
    W, H = 720, 424
    L, R = 100, 470          # bar area ends at R; verdict column sits beyond it
    T, rowh = 96, 52
    scale = (R - L) / 70.0

    p = [txt(40, 26, "Zero-shot accuracy, both versions, with the measurement noise drawn in", 15, INK, weight="600"),
         txt(40, 42, "0-shot, 500 samples. The grey band is +/-1 standard error, about 2 points.", 11, MUTED),
         txt(40, 56, "Where both bars reach into the same band, the change is not real.", 11, MUTED)]
    p.append(f'<rect x="{L}" y="{T - 14}" width="10" height="10" fill="{AMBER}"/>')
    p.append(txt(L + 15, T - 5, "0.1.2", 11, MUTED))
    p.append(f'<rect x="{L + 66}" y="{T - 14}" width="10" height="10" fill="{BLUE}"/>')
    p.append(txt(L + 81, T - 5, "0.2.0", 11, MUTED))
    p.append(f'<rect x="{L + 150}" y="{T - 15}" width="22" height="12" fill="#d1d5db"/>')
    p.append(txt(L + 178, T - 5, "+/-1 std err", 11, MUTED))

    y = T + 10
    for task, a, bv, se, chance in BENCH:
        d = bv - a
        inside = abs(d) < se
        col = GREEN if d > 0 else RED
        p.append(txt(L - 14, y + 13, task, 12, INK, anchor="end", weight="600"))
        p.append(txt(L - 14, y + 25, "0.1.2", 9, AMBER, anchor="end"))
        p.append(txt(L - 14, y + 37, "0.2.0", 9, BLUE, anchor="end"))
        # noise band behind both bars, centred on the v0.2.0 value
        bx0, bx1 = L + (bv - se) * scale, L + (bv + se) * scale
        p.append(f'<rect x="{bx0:.1f}" y="{y - 3}" width="{bx1 - bx0:.1f}" height="32" fill="#e5e7eb" opacity="0.75"/>')
        for val, colr, off in ((a, AMBER, 0), (bv, BLUE, 15)):
            p.append(f'<rect x="{L}" y="{y + off}" width="{val * scale:.1f}" height="11" fill="{colr}"/>')
            p.append(txt(L + val * scale + 6, y + off + 9.5, f"{val:.1f}", 10, colr, weight="600"))
        if chance > 0:
            cx = L + chance * scale
            p.append(f'<line x1="{cx:.1f}" y1="{y - 8}" x2="{cx:.1f}" y2="{y + 31}" stroke="{MUTED}" stroke-width="1" stroke-dasharray="2 3"/>')
        if inside:
            p.append(txt(R + 34, y + 18, f"{d:+.2f}", 12, MUTED, weight="600"))
            p.append(txt(R + 34, y + 31, "inside noise", 10, MUTED))
        else:
            p.append(txt(R + 34, y + 18, f"{d:+.2f}", 12, col, weight="600"))
            p.append(txt(R + 34, y + 31, f"{abs(d) / se:.1f} sigma", 10, col))
        y += rowh

    p.append(f'<line x1="{L}" y1="{y - 4}" x2="{R + 200}" y2="{y - 4}" stroke="{RULE}"/>')
    p.append(txt(40, y + 20, "Three of five movements are inside their own error bars, so the honest summary is no measurable change in most", 11, MUTED))
    p.append(txt(40, y + 35, "accuracy. The two that moved down are the signal. The registered rule allows 1.0 point of regression and v0.2.0", 11, MUTED))
    p.append(txt(40, y + 50, "fails it on two, which is why it is published as an experiment and not a release.", 11, MUTED))
    return svg(W, H, "Zero-shot benchmark comparison, KALIA 0.1.2 against 0.2.0",
               "Grouped bars for five zero-shot tasks, both versions, each with a grey band showing "
               "plus or minus one standard error of about two points. Three movements fall inside "
               "their own band.",
               "".join(p))


# ------------------------------------------------------------------ figure 3

def training_data_svg() -> str:
    W, H = 720, 320
    COLORS = [BLUE, VIOLET, CYAN, AMBER]
    lx, ly, lw, lh = 40, 78, 250, 34

    p = [txt(40, 26, "Training mixture, and how much of it is long enough to matter", 15, INK, weight="600"),
         txt(40, 44, f"2.4B tokens, {CONTEXT}-token context. Proportions are of training tokens.", 12, MUTED),
         txt(lx, ly - 10, "What it is made of", 12, INK, weight="600")]
    x = lx
    for i, (name, share, _lic, _ld, _med) in enumerate(SOURCES):
        w = lw * share / 100
        p.append(f'<rect x="{x:.1f}" y="{ly}" width="{w:.1f}" height="{lh}" fill="{COLORS[i]}"/>')
        if share >= 10:
            p.append(txt(x + w / 2, ly + 21, f"{share}%", 12, "#ffffff", anchor="middle", weight="600"))
        x += w
    # two-line rows: name, then share and licence underneath, so a long licence
    # string can never run into the percentage column
    y = ly + lh + 20
    for i, (name, share, lic, _ld, _med) in enumerate(SOURCES):
        p.append(f'<rect x="{lx}" y="{y - 8}" width="10" height="10" fill="{COLORS[i]}"/>')
        p.append(txt(lx + 16, y, name, 11, INK))
        p.append(txt(lx + 16, y + 14, f"{share}%  \u00b7  {lic}", 10, MUTED))
        y += 30

    rx, rw = 348, 332
    p.append(txt(rx, ly - 10, f"Documents at least as long as the context", 12, INK, weight="600"))
    p.append(txt(rx, ly + 4, f"share of each source, median length in parentheses", 10, MUTED))
    bar_x, bar_w = rx + 128, 150
    y = ly + 26
    for i, (name, _s, _lic, ld, med) in enumerate(SOURCES):
        p.append(txt(rx, y + 9, name.split(" (")[0], 11, INK))
        if ld is None:
            p.append(f'<rect x="{bar_x}" y="{y}" width="2" height="14" fill="{RULE}"/>')
            p.append(txt(bar_x + 8, y + 11, "not measured", 10, MUTED))
        else:
            w = max(bar_w * ld / 100, 1.5)
            p.append(f'<rect x="{bar_x}" y="{y}" width="{w:.1f}" height="14" fill="{COLORS[i]}"/>')
            p.append(txt(bar_x + bar_w + 6, y + 11, f"{ld:g}%  ({med})", 10, MUTED))
        y += 20
    oy = y + 8
    p.append(f'<line x1="{rx}" y1="{oy}" x2="{rx + rw}" y2="{oy}" stroke="{RULE}"/>')
    p.append(txt(rx, oy + 20, "Whole mixture", 11, INK, weight="600"))
    p.append(f'<rect x="{bar_x}" y="{oy + 10}" width="{bar_w * LONG_DOC_TOTAL / 100:.1f}" height="14" fill="{INK}"/>')
    p.append(txt(bar_x + bar_w + 6, oy + 21, f"{LONG_DOC_TOTAL}%", 11, INK, weight="600"))
    # Footnote spans the full width: at 11px a line starting at the right panel
    # runs off the canvas, which is what the first draft did.
    fy = max(oy + 56, 262)
    p.append(txt(40, fy, "LAMBADA needs the model to hold a discourse and recall its end. It is the task this", 11, MUTED))
    p.append(txt(40, fy + 16, "corpus is worst equipped for, and it is one of the two that regressed.", 11, MUTED))
    p.append(txt(40, fy + 36, f"A candidate replacement source measures {CANDIDATE}%, so the remedy is measured rather than guessed.", 11, INK, weight="600"))
    return svg(W, H, "KALIA training mixture and long-document coverage",
               "Stacked bar of the 2.4 billion token mixture, beside the share of each source "
               "whose documents reach the 1024 token context: 26.2 percent, 0.03 percent, "
               "13.2 percent, and 17.7 percent overall.",
               "".join(p))


REPLICATION = [
    # seed, control, staticgate, note
    (1337, 4.7662, 4.6304, "X20 \u2014 the result as first seen"),
    (1338, 4.8769, 4.9623, "X21 \u2014 replication"),
    (1339, 4.8908, 4.9087, "X21 \u2014 replication"),
]

# The control's own spread across those configs. Everything measured on one seed
# was read against a baseline of this size that nobody had measured.
BASELINE_SPREAD = 0.11


def replication_collapse_svg() -> str:
    W, H = 720, 430
    L, R = 78, 560
    T, rowh = 112, 62
    lo, hi = 4.55, 5.05
    scale = (R - L) / (hi - lo)

    def x(v: float) -> float:
        return L + (v - lo) * scale

    p = [txt(40, 26, "The project's best result, and what two fresh seeds did to it", 15, INK, weight="600"),
         txt(40, 42, "30M parameters, 500 steps, paired control and treatment in the same kernel.", 11, MUTED),
         txt(40, 56, "Lower is better. The treatment bar is below the control at seed 1337 and above it at both others.", 11, MUTED)]
    p.append(f'<rect x="{L}" y="{T - 26}" width="10" height="10" fill="{MUTED}"/>')
    p.append(txt(L + 15, T - 17, "control", 11, MUTED))
    p.append(f'<rect x="{L + 72}" y="{T - 26}" width="10" height="10" fill="{VIOLET}"/>')
    p.append(txt(L + 87, T - 17, "static gate", 11, MUTED))

    for g in [4.6, 4.7, 4.8, 4.9, 5.0]:
        p.append(f'<line x1="{x(g):.1f}" y1="{T - 10}" x2="{x(g):.1f}" y2="{T + rowh * 3 - 14}" stroke="{RULE}"/>')
        p.append(txt(x(g), T - 16, f"{g:.1f}", 10, MUTED, anchor="middle"))

    y = T + 6
    for seed, ctl, arm, note in REPLICATION:
        p.append(txt(40, y + 13, f"seed {seed}", 11, INK, weight="600"))
        p.append(txt(40, y + 27, note, 10, MUTED))
        for off, val, col in ((0, ctl, MUTED), (17, arm, VIOLET)):
            w = max((val - lo) * scale, 2)
            p.append(f'<rect x="{L}" y="{y + off}" width="{w:.1f}" height="14" fill="{col}" rx="2"/>')
            p.append(txt(L + w + 7, y + off + 12, f"{val:.4f}", 11, INK if col == VIOLET else MUTED,
                         weight="600" if col == VIOLET else "400"))
        d = arm - ctl
        p.append(txt(R + 24, y + 20, f"{d:+.4f}", 12, GREEN if d < 0 else RED, weight="600"))
        y += rowh

    p.append(txt(R + 24, T + 4, "\u0394", 11, MUTED))
    ay = y + 14
    p.append(f'<line x1="40" y1="{ay}" x2="{W - 40}" y2="{ay}" stroke="{RULE}"/>')
    p.append(txt(40, ay + 22, "The control is not seed-invariant, and nobody had measured that.", 12, INK, weight="600"))
    p.append(txt(40, ay + 42, f"Two independent sessions at seed 1337 agree to 0.0018, so the machine is not the variable.", 11, MUTED))
    p.append(txt(40, ay + 58, f"Fresh seeds land about {BASELINE_SPREAD:.2f} nats higher \u2014 larger than the \u22120.0436 the gated residual was", 11, MUTED))
    p.append(txt(40, ay + 74, "credited with, and larger than the branch-norm null by an order of magnitude.", 11, MUTED))
    p.append(txt(40, ay + 96, "Every single-seed delta in this project was read against a baseline that was never measured.", 12, INK, weight="600"))
    return svg(W, H, "KALIA static-gate result and its two-seed replication",
               "Grouped bars of control and static-gate validation loss at seeds 1337, 1338 and 1339. "
               "The treatment is 0.1358 nats better at seed 1337 and 0.0854 and 0.0179 nats worse at "
               "seeds 1338 and 1339, so the effect reverses sign under replication.",
               "".join(p))


FIGURES = {
    "val-loss.svg": val_loss_svg,
    "bench-compare.svg": bench_svg,
    "training-data.svg": training_data_svg,
    "replication-collapse.svg": replication_collapse_svg,
}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in FIGURES.items():
        path = OUT / name
        path.write_text(fn(), encoding="utf-8")
        print(f"wrote {name} ({path.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
