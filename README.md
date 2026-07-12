# Rana Awais — Portfolio

A fully static, dependency-free portfolio site. Pure HTML, CSS, and vanilla
JavaScript — no build step, no framework, no npm install required.

## Structure

Everything is flat — **one folder, no subfolders at all.** Every file, for
both your personal portfolio and the Novara Tech Solutions company site,
sits side by side. Filenames are prefixed where needed (`company-*`) so
nothing collides:

```
portfolio/
├── index.html               Home / landing
├── about.html                About Me (Professional Journey, Skills, Certifications)
├── publication.html          "Elegance As Power" book page (linked from About via hover)
├── services.html             HR / IT-Dev / Resume & LinkedIn services + booking modal
├── portfolio.html            Selected work
├── blog.html                 Blog listing with filter + search
├── contact.html                Contact form (Email + WhatsApp), map, socials
├── style.css                 Portfolio design system
├── main.js                   Portfolio nav, scroll reveal, forms, modal, filters
│
├── company-index.html        Novara Tech Solutions — homepage
├── company-services.html      NTS — 18 services, categorized
├── company-industries.html    NTS — industries served
├── company-portfolio.html     NTS — selected work
├── company-about.html         NTS — company + founder
├── company-contact.html       NTS — contact form
├── company-style.css         NTS design system (same tokens as the portfolio)
├── company-main.js           NTS nav, mega-menu, forms — all vanilla
│
├── rana-hero.jpg             Homepage hero photo (also reused on the NTS about page)
├── rana-about.jpg            About page hero photo (also reused on the NTS about page)
├── rana-author.jpg           Publication page "About the Author" photo
├── assets-README.txt         Notes on the photos above
├── extensions.json           VS Code Live Server recommendation (see note below)
└── vercel.json                Static hosting config
```

**Why `company-*` prefixes:** the NTS site needed its own `index.html`,
`services.html`, `about.html`, `contact.html`, `portfolio.html`, `style.css`,
and `main.js` — all names your portfolio already uses. Prefixing them is
the only way to put everything in one folder without files overwriting each
other. Every link inside the `company-*.html` files points to the prefixed
filenames, and the two photos it reuses (`rana-hero.jpg`, `rana-about.jpg`)
just reference the shared copies already sitting in this same folder — no
duplicate images.

Two small, deliberate touches in the main portfolio (nothing else was
changed): the nav now has a **"My Company · NTS"** item between Portfolio
and Blogs (hover for a preview card, click to open `company-index.html`),
and `main.js` got a small generalization so that hover-flyout works the
same way for both "About Me" and "My Company · NTS" on mobile.

> **Note on `extensions.json`:** VS Code only auto-suggests extensions when
> this file lives inside a `.vscode/` folder. Since everything here is
> intentionally flat, this copy is just a reference — VS Code won't prompt
> you automatically. If you want the auto-install prompt back, create a
> `.vscode` folder and drop this file inside it as `.vscode/extensions.json`.
> Otherwise, just install **Live Server** (Ritwick Dey) manually once — see
> below.

## Run it locally in VS Code

1. Open the `portfolio` folder in VS Code.
2. Install the **Live Server** extension (Ritwick Dey) if you don't have it.
3. Right-click `index.html` → **Open with Live Server** (or `company-index.html`
   to preview the Novara Tech Solutions site directly).
4. That's it — no `npm install`, no build step. All pages are plain `.html`
   files linked to each other with relative paths.

You can also just double-click `index.html` to open it directly in a
browser, though a couple of things (the embedded map on the Contact page)
work better served over `http://` — hence Live Server.

## Your photos

Three photos are already in place and wired into the pages:
`rana-hero.jpg`, `rana-about.jpg`, `rana-author.jpg`. To swap any of them,
replace the file (keep the same filename) or update the matching
`<img src="...">` in the relevant `.html` file. See `assets-README.txt`
for which photo is used where.

## Novara Tech Solutions — company site (`company-*.html`)

The `company-*` files are a **separate, self-contained mini-site** for
Novara Tech Solutions, living in this same folder as everything else. They
have their own `company-style.css`, `company-main.js`, and a full
mega-menu nav (Services / Industries / Portfolio / Company / Contact),
styled with the same design tokens as the main portfolio so the two feel
like one family. Two photos (`rana-hero.jpg`, `rana-about.jpg`) are shared
directly from the portfolio — no duplicate copies.

**Right now:** visiting `My Company · NTS` in the main nav opens
`company-index.html` — so it works today as a page inside your portfolio,
exactly as asked, at whatever domain the portfolio itself is deployed to.

**When you're ready to put it on its own subdomain** (`ranaawais.nts.online`):
1. Copy the 8 `company-*` files plus `rana-hero.jpg` and `rana-about.jpg`
   into their own folder/repo, and deploy that as its **own** Vercel
   project (drag-and-drop or Git import, same steps as below).
2. Point `ranaawais.nts.online` at that new project in Vercel's domain
   settings (Vercel walks you through the DNS/CNAME record).
3. Update two sets of links so both sites point at the *live* URLs instead
   of relative/placeholder ones:
   - **In the main portfolio** (all 7 `.html` files): change
     `href="company-index.html"` (appears twice per file, in the nav
     flyout) to `href="https://ranaawais.nts.online"`.
   - **In the `company-*.html` files**: every
     `https://rana-eosin.vercel.app/...` link ("Meet the Founder", footer
     credit) should become your real portfolio domain, e.g.
     `https://ranaawais.online/...`. Marked with a `TODO` comment near the
     top of each file — a project-wide find-and-replace for
     `rana-eosin.vercel.app` updates them all at once.
   - Once split into its own repo, also update `company-about.html`'s two
     `src="rana-*.jpg"` photo paths if you don't copy those images over too.

## Deploy to Vercel (free)



**Option A — no CLI, drag and drop:**
1. Go to [vercel.com](https://vercel.com) → sign up / log in (GitHub login is easiest).
2. Click **Add New → Project → Deploy from a folder / Import** — or use
   **vercel.com/new** and choose "Deploy without Git" if offered, then drag
   the `portfolio` folder in.
3. Framework preset: choose **Other** (it's a static site, no build command needed).
4. Click **Deploy**. You'll get a free `your-project.vercel.app` URL.

**Option B — CLI (recommended, more control):**
```bash
npm install -g vercel     # one-time
cd portfolio
vercel login
vercel                    # deploy a preview
vercel --prod              # promote to production URL
```

**Option C — GitHub (best for future updates):**
1. Push this `portfolio` folder to a new GitHub repo.
2. In Vercel: **Add New → Project → Import Git Repository** → select the repo.
3. Framework preset: **Other**. Leave build command blank, output directory blank/root.
4. Deploy. Every future `git push` auto-deploys.

## Current status (as of this build)

**Live / wired up:**
- Photos: `rana-hero.jpg`, `rana-about.jpg`, `rana-author.jpg` (cropped from the portraits you sent)
- Map: Malir District, Karachi (Contact page)
- WhatsApp button + Email button (Contact page + booking modal + floating button)
- Instagram, Facebook, X — real profile links
- YouTube, TikTok — generic placeholder links (youtube.com / tiktok.com) since your channels aren't live yet; swap these out the moment you have real URLs (see "Editable content" below)
- Newsletter "Subscribe" buttons — link directly to your real LinkedIn Newsletters (HR Insights, Building Multi-Sector Leverage)
- "Novara Tech Solutions" and "Novara Clothing" mentions on the About page and homepage now link to their LinkedIn company pages
- The `company-*.html` files are a working Novara Tech Solutions site, reachable from "My Company · NTS" in the main nav

**Intentionally left pending (you said you'll send these later):**
- Blog post pages — "Read Full Blog" / blog card links are placeholders (`#`) since none are published yet
- Book purchase/read link on `publication.html` — book isn't published yet
- A designed logo / favicon — none added, per your instruction; the browser tab currently uses no custom icon

## Editable content

- **WhatsApp number / email**: set once in `main.js` at the top of the
  "Contact form" and "Booking modal" sections (`WHATSAPP_NUMBER`, `EMAIL`),
  and in the `href="https://wa.me/..."` / `mailto:` links in the footer and
  floating WhatsApp button on every page.
- **Social links**: Instagram, Facebook, and X are live. YouTube and TikTok
  are still generic placeholders (`youtube.com` / `tiktok.com`) — replace
  with your real channel URLs in each page's `<footer>` and on
  `contact.html` once those exist.
- **Blog posts**: add more `<div class="blog-card" data-cat="...">` blocks
  in `blog.html` — the filter pills and search box work against whatever
  cards exist, no JS changes needed.
- **Book chapters**: edit the `.chapter-item` list in `publication.html`.

## Notes on the design

Dark ink-black background, bone-white type, and a single restrained oxblood
red accent — no neon, no gradients on every surface. Serif display face
(Fraunces) for headings, Inter for body/UI text. The signature interaction
is the **About → Publication** hover flyout: hovering "About Me" in the nav
reveals a card linking straight to the "Elegance As Power" book page, since
the book is conceptually an extension of who you are, not a separate topic.
