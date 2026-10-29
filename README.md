# Bowen Yuan — Academic Research Portfolio

Single-page academic portfolio built with [Hugo](https://gohugo.io/) and deployed
to GitHub Pages via GitHub Actions. No theme, no JavaScript framework, no build
step beyond `hugo`.

Live site: <https://bowenyuan95.github.io/>

## Quick start

```bash
brew install hugo          # Hugo 0.161+ (extended not required, but used in CI)
hugo server -D             # http://localhost:1313
hugo --minify              # production build into ./public
```

## Structure

| Path | What it is |
|------|-----------|
| `hugo.toml` | Site parameters: name, role, institution, positioning line, bio, contact links, CV path |
| `data/projects.json` | **Single source of truth** for research projects and their publication records |
| `data/tags.json` | Research-area tags shown in the hero |
| `layouts/index.html` | Homepage: hero, featured research, other research, publications, CV, contact |
| `layouts/_default/baseof.html` | Document head, SEO/Open Graph/JSON-LD, skip link, JS include |
| `layouts/partials/` | Reusable components (see below) |
| `static/css/main.css` | The complete design system (tokens, typography, components, responsive) |
| `static/js/site.js` | Only JavaScript on the site: click-to-load YouTube players + thumbnail fallback |
| `static/fonts/` | Self-hosted Inter (variable 400–600) and Source Serif 4 (600), latin subset |
| `static/files/Bowen_Yuan_CV.pdf` | Canonical CV (the legacy `Bourne_Resume.pdf` copy is kept for old links) |
| `docs/content-verification.md` | Evidence log for every publication DOI, link and identity claim |

### Partials

| Partial | Purpose |
|---------|---------|
| `nav.html`, `footer.html` | Site chrome |
| `project-featured.html` | Large research card (media + research information) |
| `project-compact.html` | Compact card for "Other research" |
| `project-meta.html` | Venue / year / publication-status line shared by both cards (one badge per publication) |
| `project-actions.html` | Paper / video / code / project-page links (one DOI link per publication) |
| `project-publications.html` | Normalises `publications` / `publication` / legacy flat fields into one list |
| `publication.html` | One item of the publication list (verified authors + DOI) |
| `tag-list.html` | Tag chips |
| `youtube.html` | Click-to-load, privacy-enhanced YouTube player |
| `icon.html` | Inline SVG icons |

## Editing research content

`data/projects.json` is an array. A project with several papers lists them in a
`publications` array; a project with one paper may keep the original
`publication` object. Both shapes render the same. Each entry looks like this:

```json
{
  "slug": "stage-non-linear-ar-task-guidance",
  "title": "STAGE: Non-Linear AR Task Guidance via Dependency Modeling",
  "short_title": "STAGE",
  "start_year": 2024,
  "end_year": 2025,
  "featured": true,
  "featured_order": 1,
  "sort_order": 0,
  "publication_year": 2026,
  "publications": [
    {
      "title": "Dependency-Aware AR Guidance for Replaying Non-Linear Work",
      "venue": "ACM CHI 2026",
      "venue_detail": "Extended Abstracts",
      "type": "Extended abstract",
      "status": "Published",
      "year": 2026,
      "doi": "10.1145/3772363.3798430",
      "pages": "1-5",
      "authors": ["Bowen Yuan", "Zirui Xiao"]
    },
    {
      "venue": "ACM OzCHI 2026",
      "venue_detail": "38th Australasian Conference on Human-Computer Interaction",
      "type": "Conference paper",
      "status": "Accepted",
      "year": 2026,
      "doi": "10.1145/3847401.3847407",
      "conference_dates": "November 21–25, 2026",
      "location": "Adelaide, Australia",
      "isbn": "979-8-4007-2724-5/2026/11",
      "license": "CC BY",
      "pages": "",
      "authors": []
    }
  ],
  "summary": "35–60 word card summary.",
  "full_description": "Longer description, kept verbatim.",
  "key_result": "Verified result, or the main technical contribution.",
  "tags": ["AR", "Task Guidance", "Multimodal"],
  "thumbnail": "",
  "youtube_id": "z3Rj5BoVQQg",
  "video_caption": "",
  "paper_url": "",
  "code_url": "",
  "project_url": ""
}
```

Rules the templates rely on:

- `featured: true` entries are rendered in `featured_order`; all others are
  rendered in `sort_order` (keep it chronological, newest first).
- A record may use `publications` (array), `publication` (single object, the
  original schema) or legacy top-level `venue` / `doi` fields. The normaliser
  `project-publications.html` accepts all three, so old entries keep working
  without a migration.
- Publications may be absent for ongoing work; never label unpublished work
  "Published". Allowed statuses: `Published`, `Accepted`, `In progress`. An
  accepted paper keeps the `Accepted` badge until its publication is confirmed.
- Publications drive **both** the project card metadata and the Publications
  section — nothing is duplicated in templates. One card shows one venue badge
  and one DOI link per publication. Set `publication_year: 0` when there is no
  publication record, otherwise the year it belongs under in the list.
- `publications[].title` (or `publication.title`) is the publisher's title
  (verify it against the DOI); `title` is the project title shown on the site.
  Omit the paper title when it is not published yet — never reuse another
  paper's title or assume two papers share a title.
- `DOI` values render as `https://doi.org/<doi>` links, in the card actions and
  in the Publications list.
- `key_result` is rendered as a "Key result" callout only when the sentence
  reports an outcome; otherwise it is labelled "Contribution".
- `paper_url` may stay empty — the card falls back to `https://doi.org/<doi>`.
- Never invent metrics, participant counts, authors, titles or venues.

## Videos

YouTube stays the video host; nothing is rehosted.

1. Upload as **Public** or **Unlisted** (Private cannot be embedded).
2. Put the id (or any YouTube URL is accepted by the partial) in `youtube_id`.
3. The player is click-to-load: only the thumbnail is downloaded initially, and
   the `youtube-nocookie.com` iframe is created after the visitor presses play.

```go-html-template
{{ partial "youtube.html" (dict "id" "VIDEO_ID" "title" "Demo video" "caption" "Optional caption") }}
```

Videos keep their 16:9 frame, so pressing play causes no layout shift.

## Accessibility and performance notes

- Colour pairs meet WCAG AA (see `docs/content-verification.md`).
- Fonts are self-hosted and preloaded; system fallbacks are declared.
- Every interactive control has a visible focus state; `prefers-reduced-motion`
  disables transitions and smooth scrolling.
- Thumbnails are lazy-loaded with intrinsic dimensions to prevent layout shift.

## Fonts

Self-hosted (no Google Fonts request at runtime), latin subset, files in
`static/fonts/`:

| File | Font | Licence |
|------|------|---------|
| `inter-latin-var.woff2` | Inter (variable, 400–600) | SIL OFL 1.1 — `static/fonts/OFL-Inter.txt` |
| `source-serif-4-600-latin.woff2` | Source Serif 4 (600) | SIL OFL 1.1 — `static/fonts/OFL-SourceSerif4.txt` |

Both are preloaded in `layouts/_default/baseof.html` and declared with
`font-display: swap` plus system fallback stacks in `static/css/main.css`.

## Verification and QA evidence

- `docs/content-verification.md` — evidence log for every DOI (Crossref REST API),
  author order, venue wording, external link, identity/affiliation claim, plus a
  resolution log for the redesign and the items still needing the owner's
  confirmation.
- `docs/screenshots/` — before/after full-page captures at 1440 px and 375 px.
- Reproduce the checks locally:

```bash
hugo --destination /tmp/site --cleanDestinationDir
(cd /tmp/site && python3 -m http.server 8899)
npx lighthouse http://127.0.0.1:8899/ --preset=desktop   # or mobile default
```

Last verified results (Lighthouse, production build): mobile **99 performance /
100 accessibility / 100 best practices / 100 SEO**, desktop **100 / 100 / 100 /
100**; zero horizontal overflow at 375, 768, 1024 and 1440 px; CLS 0.

## Deployment

Push to `main` — `.github/workflows/deploy.yml` builds with the pinned Hugo
version and deploys through GitHub Pages.

1. Repository **Settings → Pages → Source: GitHub Actions**.
2. Site publishes to <https://bowenyuan95.github.io/>.

`public/` is generated output and is git-ignored; do not commit it.
