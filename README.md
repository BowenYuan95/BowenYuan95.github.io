# Personal Academic Website

Built with [Hugo](https://gohugo.io/) and deployed via GitHub Pages.

## Quick Start

```bash
# Install Hugo (macOS)
brew install hugo

# Run locally
hugo server -D

# Open http://localhost:1313
```

## Customisation

| File | What to edit |
|------|-------------|
| `hugo.toml` | Name, bio, email, institution, links |
| `data/projects.json` | Add / edit projects |
| `data/tags.json` | Research interest tags |
| `static/css/main.css` | Styles |
| `static/files/bowen_cv.pdf` | Drop your CV here |

## Deployment

Push to `main` — GitHub Actions builds and deploys automatically.

1. Go to repo **Settings → Pages**
2. Set Source to **GitHub Actions**
3. Done — site goes live at `https://yourusername.github.io/`
