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

## Adding YouTube videos

1. Upload the video to YouTube. **Public** or **Unlisted** both embed fine; **Private** does not.
2. Copy its URL (any of these forms works):
   - `https://youtu.be/VIDEO_ID`
   - `https://www.youtube.com/watch?v=VIDEO_ID`
   - `https://www.youtube.com/shorts/VIDEO_ID`
   - or just the bare `VIDEO_ID`
3. Add a `video` field to the matching project in `data/projects.json`:

```json
{
  "title": "My project",
  "video": "https://youtu.be/VIDEO_ID",
  "video_caption": "Optional caption shown under the player"
}
```

The embed is responsive (16:9), lazy-loaded, and uses `youtube-nocookie.com`
so no YouTube cookies are set until the video is played. Omit `video` to hide
the player for that project. To embed elsewhere in a template:

```go-html-template
{{ partial "youtube.html" "https://youtu.be/VIDEO_ID" }}
```

Do **not** commit video files to this repo — GitHub Pages has a 1 GB site
limit and a 100 MB per-file limit. YouTube hosting avoids both.

## Deployment

Push to `main` — GitHub Actions builds and deploys automatically.

1. Go to repo **Settings → Pages**
2. Set Source to **GitHub Actions**
3. Done — site goes live at `https://yourusername.github.io/`
