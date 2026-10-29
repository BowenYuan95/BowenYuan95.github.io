# Content Verification — Bowen Yuan academic portfolio

**Scope:** every publication DOI, external link, identity/affiliation claim, and asset on the *current* site, i.e. commit **HEAD = 122f6f9** on `redesign/academic-portfolio`. Verified 2026-10-29.
**Method:** Crossref REST API (`api.crossref.org`, reachable), `curl` HTTP checks, PDF/DNS/Git inspection. `doi.org`, `youtube.com`, `scholar.google.com` are unreachable from this host (curl exit 28/35) — those items are reported as unverifiable, not as passing.
**Baseline pinning:** the working tree is being edited concurrently by the redesign, so all "current site" claims cite `git show HEAD:<file>` line numbers (`HEAD:hugo.toml:1` etc.). Redesign-only claims (e.g. "PhD conferred 28 September 2026") are labelled as such.

Repro anchors: `git show HEAD:data/projects.json`, `curl -sS https://api.crossref.org/works/<DOI>`, `curl -sSI https://empathiccomputing.org/team/bowen-yuan/`.

## 1. Summary

| # | Item | Claim on site (HEAD) | Evidence | Status |
|---|---|---|---|---|
| 1 | FusionNexus DOI 10.1145/3610549.3614594 | "The Fusion Nexus: Biocognitive Audio-Verbal Interface in Asymmetric XR Collaboration", SIGGRAPH Asia 2023 XR | Crossref: title is "…: Exploring the Confluence of Virtual and Real Worlds through Biocognitive Audio-Verbal Interface in Immersive XR Environments"; 2023-11-28; pp. 1–2; ACM proceedings-article | PARTIAL |
| 2 | STAGE DOI 10.1145/3772363.3798430 | "STAGE: Non-Linear AR Task Guidance via Dependency Modeling", "ACM CHI 2026", year 2024–2025 | Crossref: **"Dependency-Aware AR Guidance for Replaying Non-Linear Work"**; CHI **Extended Abstracts** '26; 2026-04-13; pp. 1–5 | MISMATCH |
| 3 | Location-based playback DOI 10.1109/VRW70859.2026.00181 | "Location-based Non-linear Playback of AR Task Recording", "IEEE VR 2026", year 2024–2025 | Crossref: title matches; IEEE **VRW** (Abstracts and Workshops); 2026-03-21; pp. 1001–1004 | PARTIAL |
| 4 | Focus-aware DOI 10.1109/ISMAR67309.2025.00103 | "Focus-Aware AR Guidance: Adaptive Playback via Gaze and Location" | Crossref: "Focus-Aware **Task Guidance: Adaptive AR Instruction Playback Via Gaze and Location Tracking**"; ISMAR 2025; 2025-10-08; pp. 954–964 (full paper) | PARTIAL |
| 5 | Spatial cues DOI 10.1145/3703619.3706047 | "Spatial Guidance Cues in AR: Line vs. Radar Navigation", "ACM VRCAI 2024" | Crossref: **"Augmented Reality Spatial Guidance Cues for Flexible Multi-Objective Task Environments"**; VRCAI '24; 2024-12; pp. 1–9 | MISMATCH |
| 6 | Meeting agents DOI 10.1109/VRW70859.2026.00187 | "Facilitating Discussions in Immersive Virtual Meetings with Virtual Agents", "IEEE VR 2026" | Crossref: title matches; IEEE **VRW**; 2026-03-21; **pp. 1025–1026 (2 pages)**; Yuan is **2nd of 9** authors (Lee first) | PARTIAL |
| 7 | "Adaptive Avatar Agents…" marked Published | `published: true`, `doi: ""`, venue "SIGGRAPH Asia 2026" | `HEAD:data/projects.json` (1st entry); only repo evidence is commit bf044a2 "mark SIGGRAPH Asia 2026 acceptance"; no Crossref record for the title | UNVERIFIED |
| 8 | "Gaze-Adaptive Diminished Reality…" marked Unpublished | `published: false`, no DOI | No Crossref record found under his name or co-authors; consistent with the badge, but based on absence of evidence only | PARTIAL |
| 9 | All 6 DOIs resolve to real Crossref records | 6 DOIs in `HEAD:data/projects.json` | Each `/works/{DOI}` returned a record (see §2) | VERIFIED |
| 10 | Implied authorship/ownership of all 6 papers | Projects presented as his work; no author list shown | First author of 5/6 (3614594, 3798430, 00181, 00103, 3706047); **co-author only** on 00187 (2nd of 9) | PARTIAL |
| 11 | Coverage of publication list | 8 projects, 6 with DOIs | 5 further Bowen-Yuan HCI papers exist in Crossref and are absent from the site (§3) | VERIFIED |
| 12 | Role "PhD Candidate" | `HEAD:hugo.toml:7` `role = "PhD Candidate"`; bio "PhD candidate in Computer Science" `:11` | Lab profile says "**PhD Student**", not candidate; `empathiccomputing.org/team/bowen-yuan/` (HTTP 200) | PARTIAL |
| 13 | "PhD in Computer Science / PhD conferred 28 September 2026" | Redesign only: working `hugo.toml` `role = "PhD in Computer Science"`, `phd_conferred = "28 September 2026"` (not in HEAD) | No public source found; lab page still "PhD Student"; no repo commit/message asserts the date; Crossref 2026 affiliation only says "Adelaide University" | UNVERIFIED |
| 14 | Institution "Adelaide University (AU)" | `HEAD:hugo.toml:9`, `institution_url` = lab profile | Crossref 2026 VRW records list affiliation "Adelaide University"; older 2023–2025 records say "University of South Australia" (institution renamed 2026). Lab profile still says University of South Australia | PARTIAL |
| 15 | Email `Bowen.Yuan@adelaide.edu.au` | `HEAD:hugo.toml:13`, mailto link | `dig +short MX adelaide.edu.au` → Mimecast MX records (domain live). Mailbox itself not verifiable; lab page lists only `info@empathiccomputing.org` | PARTIAL |
| 16 | GitHub `github.com/BowenYuan95` | `HEAD:hugo.toml:14`, rendered as `https://github.com/BowenYuan95` | HTTP 200; profile name "Bowen", 16 public repos (`gh.html` title "BowenYuan95 (Bowen) · GitHub") | VERIFIED |
| 17 | Google Scholar `…user=DTQsOloAAAAJ` | `HEAD:hugo.toml:15` | scholar.google.com blocked to curl (exit 28); cannot confirm the ID belongs to him | UNVERIFIED |
| 18 | Bio: "publications in ACM CHI, IEEE VR, and ISMAR" | `HEAD:hugo.toml:11` | CHI record is **CHI EA** (extended abstracts); "IEEE VR" records are **IEEE VRW** (abstracts/workshops), i.e. not the main IEEE VR conference; only ISMAR 2025 is a full main-conference paper | PARTIAL |
| 19 | No current-employment claim beyond the PhD | bio/role/footer only | Read `HEAD:hugo.toml` (all 22 lines), `HEAD:layouts/*`; no employer, no "currently at" statement; footer status "Available for collaborations" `hugo.toml:17` | VERIFIED |
| 20 | Internal nav anchors | `/#projects`, `/#contact`, `#contact`, `/#` | Targets exist: `HEAD:layouts/index.html:52` (`id="projects"`), `:124` (`id="contact"`), `:39`; `HEAD:layouts/partials/nav.html:4-7` | VERIFIED |
| 21 | CV file `/files/Bourne_Resume.pdf` | `HEAD:hugo.toml:16`; buttons at `HEAD:layouts/index.html:36,115` | File exists: `static/files/Bourne_Resume.pdf`, 159,896 bytes, 2 pages | VERIFIED |
| 22 | CV labelling / freshness | "Full academic CV … updated {{ now.Format }}" (`HEAD:layouts/index.html:111`), button text "Bourne_Resume.pdf" (`:116`) | PDF `/Title` = `Bowen_Yuan_Monash_Research_Fellow_CV_Revised`, `/CreationDate`/`/ModDate` = **2026-06-03**; a build would print "October 2026" while the file is 4 months old; "Bourne" misspells "Bowen"; 2 pages ≠ "full academic CV" | MISMATCH |
| 23 | README CV path | `HEAD:README.md:25` `static/files/bowen_cv.pdf` | No such file; actual file is `static/files/Bourne_Resume.pdf` | MISMATCH |
| 24 | Avatar `/images/avatar.jpeg` | `HEAD:layouts/index.html:44` | `static/images/avatar.jpeg`, 179,268 bytes, 1086×724 JPEG | VERIFIED |
| 25 | No favicon | none referenced in `HEAD:layouts/_default/baseof.html`, no `static/favicon*` | Confirmed absent: `git ls-tree -r --name-only HEAD static/` returns only `css/main.css`, `files/Bourne_Resume.pdf`, `images/avatar.jpeg`; `git ls-tree -r --name-only HEAD \| grep -i favicon` → none. Browsers will 404 `/favicon.ico` | VERIFIED |
| 26 | `baseURL` | `HEAD:hugo.toml:1` `baseURL = "https://yourusername.github.io/"` | Wrong host; the deploy job runs plain `hugo --minify` (`.github/workflows/deploy.yml:34`), so this value reaches production output | MISMATCH |
| 27 | Canonical / sitemap / robots | none | No `<link rel="canonical">` in `HEAD:layouts/_default/baseof.html` (verified by grep); Hugo emits `sitemap.xml` from `baseURL` → wrong host; `enableRobotsTXT` not set so no robots.txt | MISMATCH |
| 28 | Six `https://doi.org/<DOI>` outbound links | `HEAD:layouts/index.html:82` | Targets exist in Crossref, but doi.org unresolvable from this host (curl exit 28) — redirect not tested | UNVERIFIED |
| 29 | Five `youtu.be` embeds | z3Rj5BoVQQg (STAGE), GHvM5LKPyRk (location), vsfr6rmE0jI (focus), 9xms8jyQf1o (FusionNexus), wSx3pSNgpcU (avatar agents) | youtube.com blocked (curl exit 35 reset / 28); only repo history ties IDs to entries (commits 81badd1, 6bb343e, bf044a2) | UNVERIFIED |
| 30 | Institution link content | `institution_url` → lab profile | HTTP 200 but content is stale (see §4) and lists 2 publications only | PARTIAL |

**Counts:** VERIFIED 8 · PARTIAL 11 · MISMATCH 6 · UNVERIFIED 5 (30 items).

## 2. Publication verification (Crossref, exact fields)

| DOI | Exact Crossref title | Authors (order) | Container | Printed | Pages | Type |
|---|---|---|---|---|---|---|
| 10.1145/3610549.3614594 | The Fusion Nexus: Exploring the Confluence of Virtual and Real Worlds through Biocognitive Audio-Verbal Interface in Immersive XR Environments | Yuan, Xiao, Gunasekaran, Zou, Chang, Mirza, Lee, Billinghurst | SIGGRAPH Asia 2023 XR | 2023-11-28 | 1–2 | proceedings-article (ACM) |
| 10.1145/3772363.3798430 | Dependency-Aware AR Guidance for Replaying Non-Linear Work | Yuan, Xiao, Cho, Billinghurst, Lee | Proc. of the **Extended Abstracts** of the 2026 CHI Conference (CHI EA '26) | 2026-04-13 | 1–5 | proceedings-article (ACM) |
| 10.1109/VRW70859.2026.00181 | Location-Based Non-Linear Playback of AR Task Recording | Yuan, Xiao, Cho, Lee, Billinghurst | 2026 IEEE Conference on Virtual Reality and 3D User Interfaces **Abstracts and Workshops (VRW)** | 2026-03-21 | 1001–1004 | proceedings-article (IEEE) |
| 10.1109/ISMAR67309.2025.00103 | Focus-Aware Task Guidance: Adaptive AR Instruction Playback Via Gaze and Location Tracking | Yuan, Cho, Teo, Lee, Billinghurst | 2025 IEEE ISMAR | 2025-10-08 | 954–964 | proceedings-article (IEEE) |
| 10.1145/3703619.3706047 | Augmented Reality Spatial Guidance Cues for Flexible Multi-Objective Task Environments | Yuan, Cho, Lee, Billinghurst | Proc. 19th ACM SIGGRAPH VRCAI (VRCAI '24) | 2024-12 (online 2025-01-19) | 1–9 | proceedings-article (ACM) |
| 10.1109/VRW70859.2026.00187 | Facilitating Discussions in Immersive Virtual Meetings with Virtual Agents | **Lee**, Yuan, Hart, Teo, Jing, Billinghurst, Shin, Lee, Gil | 2026 IEEE VRW | 2026-03-21 | 1025–1026 | proceedings-article (IEEE) |

Findings that must change copy:

1. **STAGE is a CHI 2026 Extended Abstracts paper, 5 pages, with a different real title** ("Dependency-Aware AR Guidance for Replaying Non-Linear Work"). The site shows an invented paper title and "ACM CHI 2026", which reads as a full CHI paper. Fix both.
2. **Two "IEEE VR 2026" entries are actually VRW** — "2026 IEEE Conference on Virtual Reality and 3D User Interfaces *Abstracts and Workshops*", pages 1001–1004 (4 pp.) and **1025–1026 (2 pp.)**. These are workshop/poster abstracts; "IEEE VR 2026" overstates them. The 2-page paper is also **not first-authored** (Lee is first of 9).
3. **Two titles are materially different from the site titles** (STAGE #2, Spatial Guidance Cues #5); the ISMAR title is a paraphrase (#4). Papers should show the Crossref title or an explicit system name plus the real title.
4. **Year drift:** STAGE printed 13 Apr 2026 but site says 2024–2025; Location-Based printed 2026 but site says 2024–2025; Focus-Aware printed 2025 but site says 2024–2025.
5. **SIGGRAPH Asia 2026 "Adaptive Avatar Agents" cannot be independently verified.** No Crossref record exists for the title (`query.bibliographic` search returned only unrelated items; SIGGRAPH Asia 2026 proceedings not deposited yet). The only evidence is repo commit `bf044a2` ("mark SIGGRAPH Asia 2026 acceptance"), which is self-authored. It should not display a "Published" badge until the DOI or acceptance letter is available.
6. **Author ordering / display:** Yuan is first author on 5 of 6 papers, but the meeting-agents paper is authored by Gun A. Lee with Yuan second (and 7 co-authors on a 2-page abstract). Any "first author" framing must exclude it; the site currently shows no author information at all, so the entry silently implies sole/authorship.

## 3. Additional publications discovered (candidates, not yet on the site)

Method: Crossref `query.author=Bowen Yuan` + `filter=orcid:0000-0002-3012-4077` (his ORCID, as deposited on the CHI/VRCAI/SIGGRAPH records) + co-author queries (Billinghurst / Gun Lee / Zirui Xiao). Every candidate below contains "Bowen Yuan" in the author list together with University of South Australia / Empathic Computing co-authors. **Confidence: high for #1 (ORCID-linked record), high for #2–5 (name + full co-author chain, and #3–#4 are also listed on his lab profile).**

| # | DOI | Title | Venue / year | Pages | Yuan's position |
|---|---|---|---|---|---|
| 1 | 10.1080/10447318.2025.2499159 | Bridging Time and Space: A Novel Cross-Reality Interface for Asynchronous Task Guidance | Int. J. Human–Computer Interaction, 2025 | 15529–15550 | 3rd (Cho, Chang, Yuan…) |
| 2 | 10.1109/ismar67309.2025.00144 | Bichronous Collaboration: Using Spatiotemporal Cues to Collaborate Across Time and Space on Physical Tasks | IEEE ISMAR 2025 | 1398–1408 | 3rd |
| 3 | 10.1109/ismar-adjunct60411.2023.00022 | An Asynchronous Hybrid Cross Reality Collaborative System | ISMAR-Adjunct 2023 | 70–73 | 2nd |
| 4 | 10.1109/ismar-adjunct60411.2023.00186 | Time Travellers: An Asynchronous Cross Reality Collaborative System | ISMAR-Adjunct 2023 | 848–853 | 2nd |
| 5 | 10.1109/ismar-adjunct60411.2023.00170 | Hybrid Cross-Reality Collaborative System | ISMAR-Adjunct 2023 | 775–776 | 5th |

Not counted as candidates: the many other "Bowen Yuan" records (civil engineering, optimisation, ophthalmology, English literature, power electronics, etc.) have no Adelaide/empathic-computing co-author and are almost certainly a different person. The only journal article (#1) is a notable gap: the site currently shows no journal publications.

## 4. Identity & affiliation

Source: `https://empathiccomputing.org/team/bowen-yuan/` (HTTP 200; "Bowen Yuan" page title). Exact wording on the page:

- Heading/subtitle: **"PhD Student"**.
- Body: "Bowen Yuan is a Ph.D student at the Empathic Computing Laboratory, **at the University of South Australia**. During his Master's degree in Information Technology at the University of Queensland, he worked with Dr. Arindam on the topic of interactions using facial expressions in virtual environments… Currently, Bowen is doing a research on the topic of MR task guidance under the supervision of Dr Gun and Professor Mark Billinghurst."
- Publications listed: only 2 (the two ISMAR-Adjunct 2023 papers, §3 #3 and #4). No thesis date, no conferral date, no "Adelaide University" mention.
- Footer/address: "© 2026 Empathic Computing Lab", "University of South Australia, Mawson Lakes Campus, SA 5095".

Assessment:
- **"PhD in Computer Science, conferred 28 September 2026" is UNVERIFIED** — inconsistent with the live lab profile ("PhD Student") and unsupported by any public record; the only place the date appears is the redesign's working `hugo.toml`. Treat as owner-supplied only.
- **"Adelaide University" is plausible but only PARTIAL:** Crossref 2026 VRW records give his affiliation as "Adelaide University", whereas 2023–2025 records and the lab profile say "University of South Australia" (Adelaide University is the 2026 UniSA/University of Adelaide merger). Recommend confirming the exact institution line with the owner and asking ECL to refresh the profile.
- **No site copy claims current employment** beyond the PhD role (verified by reading every line of `HEAD:hugo.toml`, `HEAD:layouts/*.html`); footer status is "Available for collaborations", which is not an employment claim.
- Email: domain `adelaide.edu.au` is live (MX → Mimecast); the specific mailbox is not externally verifiable and is absent from the lab page (which lists only `info@empathiccomputing.org`).
- GitHub `github.com/BowenYuan95` → HTTP 200, public profile exists (display name "Bowen", 16 repos) — matches.
- Google Scholar: blocked from this host; **UNVERIFIED**.

## 5. Asset & link integrity of the current site (HEAD)

- Internal anchors: all resolve — `HEAD:layouts/partials/nav.html:4-7` targets `/`, `/#projects`, `/#contact`, plus the CV file; sections exist at `HEAD:layouts/index.html:52,102,124` and the hero button `#contact` at `:39`. VERIFIED.
- `/files/Bourne_Resume.pdf`: exists, 159,896 bytes, 2 pages → the path is correct; the *label* (misspelled "Bourne", "Full academic CV", fake "updated <build month>") is the problem (§1 #22).
- `/images/avatar.jpeg`: exists, 179,268 bytes, 1086×724.
- Favicon: absent at HEAD (`git ls-tree -r --name-only HEAD static/` lists only `css/main.css`, `files/Bourne_Resume.pdf`, `images/avatar.jpeg`; no `<link rel="icon">` in `HEAD:layouts/_default/baseof.html`) → minor 404 on `/favicon.ico`.
- `baseURL = "https://yourusername.github.io/"` (`HEAD:hugo.toml:1`) is wrong and is not overridden by the deploy workflow (`hugo --minify`, `.github/workflows/deploy.yml:34`) → generated `sitemap.xml`/absolute URLs would point at `yourusername.github.io`. No canonical tag and no `robots.txt` at HEAD either.
- 404-risk outbound links: 6 `doi.org` links (targets exist in Crossref; redirect untested, doi.org blocked), 5 `youtu.be` links (untestable from this host), 1 lab-profile link (200 but stale). No broken internal asset paths found.
- Note for the deploy checklist (uncommitted redesign work in the shared tree, `git status --short`): `hugo.toml` now has the real `baseURL`, `static/favicon.svg` was added — good; **but `static/files/Bowen_Yuan_CV.pdf` is byte-identical to `Bourne_Resume.pdf` (same SHA-256 `0c8a69de…`), i.e. the CV was renamed, not updated.**

## 6. Content requiring the site owner's confirmation

1. **SIGGRAPH Asia 2026 "Adaptive Avatar Agents"** — acceptance status/track; please provide the DOI or acceptance evidence before the entry keeps `published: true`.
2. **Author display** — should publication entries list all authors (and mark first-author vs co-author)? At minimum the meeting-agents entry should show Gun A. Lee as first author while Bowen Yuan is second.
3. **Venue naming** — may we display "CHI 2026 Extended Abstracts (EA)" and "IEEE VRW 2026 (Abstracts & Workshops)" instead of "ACM CHI 2026"/"IEEE VR 2026"?
4. **Titles** — may we replace the site titles with the exact Crossref titles (STAGE, Spatial Guidance Cues, Focus-Aware), keeping "STAGE" as a system name?
5. **PhD conferral** — confirm the wording "PhD in Computer Science, conferred 28 September 2026" (currently unverifiable; lab profile still says "PhD Student" at University of South Australia).
6. **Institution line** — confirm "Adelaide University" vs "University of South Australia" for the hero/contact block.
7. **CV PDF** — confirm it is the current CV: file metadata reads `Bowen_Yuan_Monash_Research_Fellow_CV_Revised`, dated 3 June 2026, 2 pages; confirm whether to keep the name "Bourne_Resume.pdf" (typo) or rename, and whether "Full academic CV … updated <build month>" is accurate.
8. **Google Scholar link** — confirm `user=DTQsOloAAAAJ` is the current profile (unverifiable from here).
9. **Email** — confirm `Bowen.Yuan@adelaide.edu.au` is still the preferred public address.
10. **YouTube videos** — confirm all five IDs are public/unlisted and correctly mapped: z3Rj5BoVQQg (STAGE), GHvM5LKPyRk (location playback), vsfr6rmE0jI (focus-aware), 9xms8jyQf1o (Fusion Nexus), wSx3pSNgpcU (avatar agents).
11. **Missing publications** — should the 5 candidates in §3 (incl. the IJHCI 2025 journal article) be added to the portfolio?
12. **Unpublished entry** — confirm "Gaze-Adaptive Diminished Reality" is genuinely unpublished (no DOI found) and whether it has a venue/target.
13. **Add the 5 Crossref-verified publications (§3)** — if the owner approves, extend `data/projects.json` with the IJHCI 2025 journal article and the four ISMAR/ISMAR-Adjunct papers, citing ORCID `0000-0002-3012-4077` and the DOIs as evidence; not added unilaterally here.

---

### Must-fix before deploy (content)

1. STAGE entry: real title + "CHI EA 2026" + 5-page extended abstract + year 2026.
2. "IEEE VR 2026" entries → "IEEE VRW 2026"; disclose 2-page/4-page abstract status; mark the 2-page paper as co-authored.
3. Spatial Guidance Cues and Focus-Aware titles restored to Crossref wording.
4. Project years aligned with printed dates (STAGE/Location 2026, Focus 2025).
5. Strip `published: true` from "Adaptive Avatar Agents" until DOI/acceptance evidence exists.
6. `baseURL` fixed to the real host; add canonical + favicon; correct README/hero CV filename and the "updated <build month>" CV claim.

## 7. Resolution log (redesign working tree)

Status as of **2026-10-29 20:53 CST** on the **uncommitted working tree** (HEAD is still 122f6f9); line numbers refer to the working files at that moment.

| # | Must-fix item | Working-tree state & evidence | Status |
|---|---|---|---|
| 1 | STAGE real title / CHI EA / year | `data/projects.json:13` exact Crossref title; `:14-16` venue "ACM CHI 2026" + `venue_detail` "Extended Abstracts" + type "Extended abstract"; `:11` `publication_year: 2026`; `:20` pages "1-5". Project heading `:4` keeps "STAGE" as the system name | RESOLVED |
| 2 | "IEEE VR 2026" → VRW; co-author disclosure | `data/projects.json:58-60` and `:224-226` carry `venue_detail` "Workshop & Poster Abstracts" + type "Poster / workshop abstract"; author order `:231+` puts Gun A. Lee first and `layouts/partials/publication.html:32-39` renders the full order with self in `<strong>`. **But the visible venue badge still reads "IEEE VR 2026"** — `venue_detail` is only rendered by `layouts/partials/project-meta.html:10`, not by `publication.html:12`; Crossref container is "…Abstracts and Workshops (VRW)" | PARTIALLY RESOLVED |
| 3 | Crossref titles for Spatial cues / Focus-Aware / Fusion Nexus | `data/projects.json:143`, `:100`, `:298`; rendered via `layouts/partials/publication.html:24` (`$pub.title \| default $project.title`) | RESOLVED |
| 4 | Project years vs printed years | `start_year`/`end_year` preserved separately from `publication_year` (`data/projects.json:11,55,98,141`), Publications list sorts on `publication_year` (`layouts/index.html:6`) | RESOLVED |
| 5 | Adaptive Avatar Agents no longer "Published" | `data/projects.json:189` `"status": "Accepted"`, `:188` type "XR program submission", `:191` empty DOI, `:193` empty authors; rendered as an Accepted badge + "Accepted; DOI pending" (`publication.html:17-19,45`). Externally still unverified (see §6.1) | RESOLVED |
| 6 | baseURL / canonical / OG / JSON-LD / robots / favicon | `hugo.toml:1` `baseURL = "https://bowenyuan95.github.io/"`, `:4` `enableRobotsTXT = true`; `layouts/_default/baseof.html:13` canonical, `:15-23` OG/Twitter, `:26` favicon, `:31-44` JSON-LD; `static/favicon.svg` present (308 B) | RESOLVED |
| 7 | CV path/label; no "Bourne", no "updated <build month>" | `hugo.toml:33` `cv_file = "/files/Bowen_Yuan_CV.pdf"`, `:34` legacy path documented as byte-identical; `layouts/index.html:99` "Curriculum Vitae (PDF, two pages)"; README:30 documents both paths. No "Bourne" or build-month string left in the rendered copy. **Caveat:** the PDF itself was not regenerated — `shasum -a 256 static/files/*.pdf` gives the same `0c8a69de…` hash for both files, i.e. contents are still the June 2026 revision (metadata `/Title Bowen_Yuan_Monash_Research_Fellow_CV_Revised`, `/ModDate` 2026-06-03). The CV card still asserts `PhD in Computer Science conferred 28 September 2026` (`layouts/index.html:100`), which remains externally unverified | PARTIALLY RESOLVED |
| 8 | README documents real CV path + schema | `README.md:30` CV path, `:86-101` schema rules (statuses Published/Accepted/In progress, `publication` may be null, "never invent metrics, participant counts, authors or venues") | RESOLVED |
| 9 | Re-check for overstated status/affiliation copy | No employment/appointment claim anywhere (`grep -riE "appoint\|employ\|currently" hugo.toml layouts/ data/ README.md` → no hits beyond the bio's research-direction sentence); 5 sentences still overstate status/credential — listed below | OPEN |
| 10 | Asset/SEO regressions from §1 #25-27 | `layouts/partials/nav.html:6-9` anchors `/#research`, `/#publications`, `/#cv`, `/#contact` all exist as `id`s in `layouts/index.html:38,73,90,112`; every static asset referenced by the templates resolves on disk (css/main.css, js/site.js, the two woff2 fonts, images/avatar.jpeg, favicon.svg, both PDFs), and the `play`/`external`/`download` icons used are defined in `layouts/partials/icon.html:6-11` | RESOLVED |

Remaining overstated copy after the re-check (correctness only; each needs an owner decision):

- `hugo.toml:14,17,23` + `layouts/index.html:12,100` + `layouts/_default/baseof.html:41` — "PhD in Computer Science" / "conferred 28 September 2026" is still unverified (lab profile says "PhD Student, University of South Australia"). Suggested: gate on §6.5; until confirmed use "PhD in Computer Science (conferral date to be confirmed)" and drop the JSON-LD `hasCredential` claim.
- `data/projects.json:189` + `layouts/partials/publication.html:18,45` — "Accepted" for SIGGRAPH Asia 2026 rests on the owner's word only. Suggested: keep if acceptance evidence is on file, else use README-sanctioned `"status": "In progress"`.
- `data/projects.json:58,224` — venue badge "IEEE VR 2026" overstates the VRW container. Suggested: `"venue": "IEEE VRW 2026"` (keep `venue_detail`).
- `layouts/index.html:78` — "Peer-reviewed papers and abstracts." covers two "XR program submission" records (`data/projects.json:188,300`). Suggested: "Peer-reviewed papers, workshop abstracts, and juried XR program submissions."
- `layouts/_default/baseof.html:40` — JSON-LD `alumniOf` asserts the degree came from `Adelaide University`; Crossref supports a 2026 affiliation, not the degree. Suggested: omit `alumniOf` until §6.6 is confirmed.


## 8. Update 2026-10-29 — STAGE second publication and multi-publication schema

Scope: working tree after the `publications` refactor; the eight projects and all
DOIs below were re-checked against Crossref / the owner's submitted metadata.

| Item | Evidence (checked 2026-10-29) | Status |
|---|---|---|
| STAGE CHI 2026 record 10.1145/3772363.3798430 | Crossref title "Dependency-Aware AR Guidance for Replaying Non-Linear Work", CHI EA '26, pp. 1–5, 2026-04-13 — unchanged from §2 | VERIFIED |
| STAGE OzCHI 2026 record 10.1145/3847401.3847407 | Owner-supplied: 38th Australasian Conference on Human-Computer Interaction, Adelaide, Australia, 21–25 Nov 2026, ISBN 979-8-4007-2724-5/2026/11, CC BY, status Accepted. Crossref `/works/10.1145/3847401.3847407` returns **HTTP 404**, and a headless-Chrome check through the system proxy (curl cannot reach doi.org from this host) returns `Error: DOI Not Found` for `https://doi.org/10.1145/3847401.3847407` | ACCEPTED (owner), UNVERIFIED externally — DOI does not resolve yet |
| OzCHI paper title | Not supplied and not in Crossref — deliberately omitted from `data/projects.json`. The Publications list renders the project title with an explicit "(paper title to be announced)" note instead of reusing the CHI paper's title or inventing one | NOT INVENTED |
| OzCHI authors / pages | Not supplied and not verifiable; `authors: []` and `pages: ""` omit them rather than guess | NOT INVENTED |
| Multi-publication data shape | STAGE uses `publications: [...]`; the other seven projects keep the original single `publication` object. Rendering verified after `hugo --minify`: STAGE card shows "ACM CHI 2026 · Published" and "ACM OzCHI 2026 · Accepted" with one DOI link each; the Publications list went from 7 to 8 items with CHI first and OzCHI second | VERIFIED |
| Backward compatibility | Single-`publication` projects render exactly as before (venue badge, status, one Paper link); a temporary legacy fixture using top-level `venue` / `doi` / `status` also built and rendered correctly (venue, status, DOI link) | VERIFIED |
| DOI links | Both `https://doi.org/10.1145/3772363.3798430` and `https://doi.org/10.1145/3847401.3847407` are emitted as anchors in the STAGE card actions and in the Publications list; `hugo --minify` exits 0 with no template errors | VERIFIED |
| DOI resolution (all records) | Headless Chrome via the system proxy (doi.org is blocked for curl here) 2026-10-29: `10.1145/3772363.3798430`, `10.1145/3703619.3706047`, `10.1145/3610549.3614594` → ACM Digital Library (Cloudflare challenge page); `10.1109/VRW70859.2026.00181` → IEEE Xplore document 11489744; `10.1109/VRW70859.2026.00103` → document 11220360; `10.1109/VRW70859.2026.00187` → document 11489662; **`10.1145/3847401.3847407` → "Error: DOI Not Found"** | 6 VERIFIED, OzCHI 2026 NOT RESOLVABLE (yet) |

Status wording kept on the site: CHI 2026 = Published, OzCHI 2026 = Accepted.
Flip the OzCHI record to `"status": "Published"`, add its verified title/authors
and Crossref evidence only after the proceedings record exists.

**Owner decision (2026-10-29):** publish the OzCHI 2026 record as supplied —
`Accepted`, with its DOI link visible — because the paper is accepted and the
DOI is expected to resolve once the OzCHI 2026 proceedings are registered (the
conference runs 21–25 November 2026). Until then the link is expected to return
"DOI Not Found"; re-check it when the proceedings appear. This is the only
outbound link on the site that is currently known to be unresolvable.

Layout check: headless Chrome renders the built page at 1440 px and at a true
375 px viewport (iframe harness) with no horizontal overflow; the STAGE card
meta wraps as venue + status per publication, with the conference name on the
following line.

## 9. Update 2026-10-29 (later) — two owner-added demo videos from `origin/main`

While the redesign branch was being prepared, `origin/main` advanced from
`122f6f9` with two owner commits adding demo videos to project entries:

| Commit | Project | Video ID added |
|---|---|---|
| `62d929d` "Add Spatial Guidance Cues demo video to project entry" | Spatial Guidance Cues in AR: Line vs. Radar Navigation | `EGBjBESJ4g8` |
| `46b45d4` "Add Virtual Meetings facilitation demo video to project entry" | Facilitating Discussions in Immersive Virtual Meetings with Virtual Agents | `iqXHlYf_8VU` |

Both IDs are carried into the `data/projects.json` schema of this branch, so no
existing video was dropped by the redesign. The site now references **seven**
videos: `z3Rj5BoVQQg` (STAGE), `GHvM5LKPyRk` (location playback),
`vsfr6rmE0jI` (focus-aware), `EGBjBESJ4g8` (spatial guidance cues),
`wSx3pSNgpcU` (avatar agents), `iqXHlYf_8VU` (virtual meetings),
`9xms8jyQf1o` (Fusion Nexus).

Status: mapping VERIFIED against the owner's commits and the previous data file;
playback still UNVERIFIED externally because `youtube.com` cannot be reached
from this host (curl exit 35/28). Re-check that each video is public or unlisted
before publishing.
