#!/usr/bin/env python3
"""Build the canonical one-page resume PDF from resume.json."""

from __future__ import annotations

import html
import json
from pathlib import Path
from typing import Any

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "resume" / "resume.json"
OUTPUT_PATH = ROOT / "public" / "assets" / "Subhajit_Resume.pdf"
PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN_X = 0.52 * inch
TOP = PAGE_HEIGHT - 0.42 * inch
BOTTOM = 0.42 * inch
TEXT = colors.HexColor("#111111")
MUTED = colors.HexColor("#555555")
QUIET = colors.HexColor("#737373")
ACCENT = colors.HexColor("#0B5E55")
RULE = colors.HexColor("#D9DEDC")


def escaped(value: str) -> str:
    return html.escape(value, quote=True)


def link(label: str, href: str) -> str:
    return f'<link href="{escaped(href)}" color="#0B5E55">{escaped(label)}</link>'


def make_styles() -> dict[str, ParagraphStyle]:
    return {
        "summary": ParagraphStyle(
            "summary",
            fontName="Helvetica",
            fontSize=8.7,
            leading=11.2,
            textColor=TEXT,
            alignment=TA_LEFT,
            spaceAfter=0,
        ),
        "entry": ParagraphStyle(
            "entry",
            fontName="Helvetica",
            fontSize=8.25,
            leading=10.2,
            textColor=MUTED,
            alignment=TA_LEFT,
            spaceAfter=0,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            fontName="Helvetica",
            fontSize=7.85,
            leading=9.45,
            textColor=MUTED,
            leftIndent=8,
            firstLineIndent=-7,
            alignment=TA_LEFT,
            spaceAfter=1.5,
        ),
        "skill": ParagraphStyle(
            "skill",
            fontName="Helvetica",
            fontSize=7.75,
            leading=9.45,
            textColor=MUTED,
            alignment=TA_LEFT,
            spaceAfter=0,
        ),
        "education": ParagraphStyle(
            "education",
            fontName="Helvetica",
            fontSize=8.1,
            leading=10,
            textColor=MUTED,
            alignment=TA_LEFT,
            spaceAfter=0,
        ),
    }


def draw_paragraph(canvas: Canvas, text: str, style: ParagraphStyle, x: float, y: float, width: float) -> float:
    paragraph = Paragraph(text, style)
    _, height = paragraph.wrap(width, PAGE_HEIGHT)
    if y - height < BOTTOM:
        raise RuntimeError("Resume content exceeds one page")
    paragraph.drawOn(canvas, x, y - height)
    return y - height


def draw_section_heading(canvas: Canvas, title: str, y: float) -> float:
    if y - 16 < BOTTOM:
        raise RuntimeError("Resume content exceeds one page")
    canvas.setFont("Helvetica-Bold", 10.1)
    canvas.setFillColor(TEXT)
    canvas.drawString(MARGIN_X, y, title)
    line_y = y - 4
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.7)
    canvas.line(MARGIN_X, line_y, PAGE_WIDTH - MARGIN_X, line_y)
    return line_y - 9


def draw_right_text(canvas: Canvas, text: str, y: float, font: str = "Helvetica", size: float = 8.1) -> None:
    canvas.setFont(font, size)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_WIDTH - MARGIN_X, y, text)


def draw_entry_header(canvas: Canvas, left: str, right: str, y: float, size: float = 8.9) -> float:
    canvas.setFont("Helvetica-Bold", size)
    canvas.setFillColor(TEXT)
    canvas.drawString(MARGIN_X, y, left)
    if "<link " in right:
        right_width = 220
        style = ParagraphStyle(
            "entry-links",
            fontName="Helvetica",
            fontSize=size,
            leading=size + 1,
            textColor=ACCENT,
            alignment=2,
        )
        paragraph = Paragraph(right, style)
        _, height = paragraph.wrap(right_width, 30)
        paragraph.drawOn(canvas, PAGE_WIDTH - MARGIN_X - right_width, y - height + 2)
        return y - max(10.5, height + 1)
    draw_right_text(canvas, right, y, "Helvetica", size)
    return y - 10.5


def validate(data: dict[str, Any]) -> None:
    required = ["name", "role", "contact", "summary", "experience", "projects", "skills", "education"]
    missing = [key for key in required if not data.get(key)]
    if missing:
        raise ValueError(f"Missing resume fields: {', '.join(missing)}")
    if len(data["projects"]) != 4:
        raise ValueError("The one-page resume must contain exactly four selected projects")


def build() -> None:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    validate(data)
    styles = make_styles()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    canvas = Canvas(str(OUTPUT_PATH), pagesize=letter, pageCompression=1)
    canvas.setTitle(f"{data['name']} - Resume")
    canvas.setAuthor(data["name"])
    y = TOP

    canvas.setFillColor(TEXT)
    canvas.setFont("Helvetica-Bold", 23)
    canvas.drawString(MARGIN_X, y, data["name"])
    y -= 18
    canvas.setFillColor(ACCENT)
    canvas.setFont("Helvetica-Bold", 9.7)
    canvas.drawString(MARGIN_X, y, data["role"])
    y -= 14

    contact_parts = [link(item["label"], item["href"]) for item in data["contact"]]
    y = draw_paragraph(canvas, "  |  ".join(contact_parts), styles["entry"], MARGIN_X, y, PAGE_WIDTH - 2 * MARGIN_X)
    y -= 8
    y = draw_paragraph(canvas, escaped(data["summary"]), styles["summary"], MARGIN_X, y, PAGE_WIDTH - 2 * MARGIN_X)
    y -= 10

    y = draw_section_heading(canvas, "EXPERIENCE", y)
    for item in data["experience"]:
        y = draw_entry_header(canvas, item["organization"], item["period"], y)
        y = draw_paragraph(canvas, f'<i>{escaped(item["title"])}</i>', styles["entry"], MARGIN_X, y, PAGE_WIDTH - 2 * MARGIN_X)
        y -= 1
        for bullet in item["bullets"]:
            y = draw_paragraph(canvas, f"- {escaped(bullet)}", styles["bullet"], MARGIN_X + 2, y, PAGE_WIDTH - 2 * MARGIN_X - 2)
        y -= 8

    y = draw_section_heading(canvas, "SELECTED ENGINEERING", y)
    for item in data["projects"]:
        links = " | ".join(link(entry["label"], entry["href"]) for entry in item["links"])
        y = draw_entry_header(canvas, item["name"], links, y, size=8.8)
        y = draw_paragraph(canvas, f'<i>{escaped(item["stack"])}</i>', styles["entry"], MARGIN_X, y, PAGE_WIDTH - 2 * MARGIN_X)
        y -= 1
        for bullet in item["bullets"]:
            y = draw_paragraph(canvas, f"- {escaped(bullet)}", styles["bullet"], MARGIN_X + 2, y, PAGE_WIDTH - 2 * MARGIN_X - 2)
        y -= 7

    y = draw_section_heading(canvas, "TECHNICAL SKILLS", y)
    for item in data["skills"]:
        y = draw_paragraph(
            canvas,
            f'<b>{escaped(item["label"])}:</b> {escaped(item["value"])}',
            styles["skill"],
            MARGIN_X,
            y,
            PAGE_WIDTH - 2 * MARGIN_X,
        )
        y -= 3

    y -= 8
    y = draw_section_heading(canvas, "EDUCATION", y)
    education = data["education"]
    y = draw_entry_header(canvas, education["organization"], education["period"], y, size=8.75)
    y = draw_paragraph(canvas, f'<i>{escaped(education["degree"])}</i>', styles["education"], MARGIN_X, y, PAGE_WIDTH - 2 * MARGIN_X)
    draw_right_text(canvas, education["grade"], y + 10, "Helvetica", 8.1)

    canvas.save()


if __name__ == "__main__":
    build()
