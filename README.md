# Shirish Man Shakya — Portfolio
Premium Apple-inspired dark portfolio. Pure HTML5 + CSS3 + vanilla JS. No frameworks.

---

## File Structure
```
portfolio/
├── index.html          ← all markup (no styles, no scripts inline)
├── assets/
│   ├── style.css       ← all CSS (design tokens, animations, layout)
│   ├── main.js         ← scroll reveal + nav + resume download
│   │
│   ├── photo.jpg       ← YOUR HERO PORTRAIT  (add this!)
│   ├── about-photo.jpg ← YOUR ABOUT PHOTO    (add this!)
│   ├── proj-churn.jpg  ← project screenshot  (add this!)
│   ├── proj-retail.jpg ← project screenshot  (add this!)
│   ├── proj-clinical.jpg ← project screenshot (add this!)
│   └── proj-genomics.jpg ← project screenshot (add this!)
└── README.md
```

---

## Adding Photos

Every image slot degrades gracefully — if the file is missing you see a clean
placeholder with the file path shown. Nothing breaks.

### Hero Portrait (`assets/photo.jpg`)
- **Recommended size:** 520×520 px minimum, square crop
- **Format:** JPG or PNG
- **Tips:** Professional headshot, neutral or blurred background, good lighting
- The portrait has an animated gradient ring — a clean circular/square crop looks best

### About Photo (`assets/about-photo.jpg`)
- **Recommended size:** 800×600 px, landscape
- **Format:** JPG or PNG
- **Tips:** Relaxed, in-context shot — at a desk, whiteboard, café, or outdoors
- Displayed with a subtle zoom-on-hover effect

### Project Screenshots
All four use the same slot logic. Ideal size: **800×350 px** (16:7 ratio).

| File                     | Project                        | What to capture                         |
|--------------------------|--------------------------------|-----------------------------------------|
| `proj-churn.jpg`         | Churn / Revenue Recovery       | Streamlit dashboard, ROC curve, SHAP plot |
| `proj-retail.jpg`        | Retail Analytics Pipeline      | Tableau dashboard, ERD diagram, query output |
| `proj-clinical.jpg`      | Hospital Readmission (Clinical AI) | SHAP beeswarm plot, confusion matrix, Streamlit UI |
| `proj-genomics.jpg`      | Cancer Multi-Omics (Capstone)  | UMAP cluster plot, heatmap, capstone poster |

**Quick screenshot tips:**
- Use your OS screenshot tool or `cmd/ctrl + shift + 4`
- Capture at 2× (Retina) for crispness
- Crop tightly to the relevant chart or UI panel
- Export as JPG at 85% quality to keep file size low

---

## Customisation

### Colours (CSS variables in `assets/style.css`, section 2)
```css
--accent: #3b82f6;   /* primary blue — change to any hex */
```

### Content
All text lives in `index.html`. Each section is clearly commented:
- `<!-- HERO -->`, `<!-- ABOUT -->`, `<!-- PROJECTS -->`, etc.

### Adding a new project card
Copy any `<article class="project-card ...">` block in `index.html`,
change the `data-accent` attribute to one of: `blue | violet | green | amber`,
update all text and the image `src`.

---

## Running locally
```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```
> Do NOT open index.html directly from the file system — fonts and paths
> load correctly only over HTTP.
