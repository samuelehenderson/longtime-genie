# Longtime Genie — Website

A complete, mobile-responsive website for **Longtime Genie**, the genealogy & discovery practice of **Sheri Long, The Digger**.

Built with plain HTML, CSS, and JavaScript — no build step, no frameworks. Just upload and go.

> *"Uncover the story that made you."*

---

## File Structure

```
longtime-genie/
├── index.html             ← Home page
├── about.html             ← About Sheri
├── services.html          ← The 5 services offered
├── how-it-works.html      ← The 4-step process
├── stories.html           ← Testimonials & success stories
├── contact.html           ← Contact form & FAQ
├── styles.css             ← All styles (heavily commented)
├── script.js              ← All JavaScript (heavily commented)
├── README.md              ← You are here
└── assets/
    └── images/            ← Drop your photos here (see "Adding Photos" below)
```

Every HTML page is fully standalone — share the same nav, footer, and stylesheet.

---

## Quick Start: Publishing to GitHub Pages

GitHub Pages is free and perfect for a static site like this.

### Step 1 — Create the repository

1. Sign in to [github.com](https://github.com).
2. Click the **+** in the top-right → **New repository**.
3. Name it whatever you like — `longtime-genie` is a good choice. (If you name it `<your-username>.github.io`, the site will live at that URL automatically.)
4. Set it to **Public**.
5. Click **Create repository**.

### Step 2 — Upload the files

**Option A — In the browser (easiest):**
1. On your new empty repo page, click **uploading an existing file**.
2. Drag and drop every file from this folder (including the `assets` folder).
3. Add a commit message like `Initial site upload` and click **Commit changes**.

**Option B — With git (if you're comfortable with the command line):**
```bash
cd longtime-genie
git init
git add .
git commit -m "Initial site upload"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/longtime-genie.git
git push -u origin main
```

### Step 3 — Turn on GitHub Pages

1. In your repo, click **Settings** (top right).
2. In the left sidebar, click **Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Set the branch to **main** and the folder to **/ (root)**.
5. Click **Save**.

Within a minute or two your site will be live at:

```
https://YOUR-USERNAME.github.io/longtime-genie/
```

### Step 4 — (Optional) Use a custom domain

If you own `longtimegenie.com` (or similar):

1. In repo Settings → Pages → **Custom domain**, enter your domain and click **Save**.
2. At your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:
   - **A records** pointing to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME record** for `www` pointing to `YOUR-USERNAME.github.io`
3. Wait 10 min – 24 hours for DNS to propagate.
4. Back in repo Settings → Pages, check **Enforce HTTPS** once it becomes available.

---

## Making the Contact Form Actually Work

GitHub Pages can host the site, but it can't process form submissions. You need a free third-party form service. The easiest options:

### Option A — Formspree (recommended)

1. Sign up free at [formspree.io](https://formspree.io).
2. Create a new form. Copy the form endpoint URL (looks like `https://formspree.io/f/abcd1234`).
3. Open `contact.html` and find this line (around the form):
   ```html
   <form class="contact-form reveal" action="#" method="POST">
   ```
4. Replace `action="#"` with your endpoint:
   ```html
   <form class="contact-form reveal" action="https://formspree.io/f/abcd1234" method="POST">
   ```
5. Done. Submissions will email you at the address you signed up with.

### Option B — Web3Forms (no signup)

1. Get a free access key at [web3forms.com](https://web3forms.com).
2. In `contact.html`, change the form opening tag to:
   ```html
   <form class="contact-form reveal" action="https://api.web3forms.com/submit" method="POST">
     <input type="hidden" name="access_key" value="YOUR-ACCESS-KEY-HERE" />
   ```

The success-message JavaScript in `script.js` already handles both cases — when a real endpoint is set, the form submits normally; when not, it just shows a "thank you" notice.

---

## Editing Content

Everything is plain HTML — no special tools needed. Open any `.html` file in a text editor (VS Code, Notepad, TextEdit, anything).

### Common edits

| What you want to change | Where to look |
|---|---|
| Phone number, email | `contact.html` → search for `contact-info__item` |
| Service prices | `services.html` → search for `service-item__price` |
| Testimonials | `stories.html` → search for `testimonial` or `story-card` |
| Hero headline | `index.html` → search for `hero__title` |
| Brand colors | `styles.css` → top of file, the `:root` block |

The CSS file uses **CSS variables** at the top, so changing a color in one place updates the whole site. For example, to change the gold accent, find this line in `styles.css`:

```css
--gold: #c9a227;
```

and change it. Done — every gold accent across the site updates instantly.

---

## Adding Photos

Right now the site uses elegant SVG placeholders where photos would go. To swap in real photos:

1. Drop your image into `assets/images/` (e.g. `assets/images/sheri-portrait.jpg`).
2. Find the placeholder in the relevant HTML file. Each one is marked with a comment like:
   ```html
   <!-- PLACEHOLDER: replace with real photo of Sheri.
        <img src="assets/images/sheri-portrait.jpg" alt="..."/> -->
   ```
3. Replace the `<svg>...</svg>` block with the suggested `<img>` tag.

### Recommended photo dimensions

| Spot | Where | Suggested size |
|---|---|---|
| Hero portrait | `index.html` | 920×1150 px (4:5 ratio) |
| Sheri About photo | `about.html`, `index.html` | 800×1000 px |
| Story cards | `stories.html` | 800×500 px (16:10) |
| Open Graph share image | site-wide meta tag | 1200×630 px → save as `assets/images/og-image.jpg` |

---

## Browser Support

Works on every browser released in the past five years — Chrome, Safari, Firefox, Edge, mobile Safari, mobile Chrome. Includes:

- Mobile-first responsive layout (down to 320px)
- Reduced-motion support for accessibility
- Semantic HTML for screen readers
- Sticky navigation with mobile hamburger menu
- Smooth scroll, IntersectionObserver-based reveals
- WCAG-aware color contrast

---

## Customizing the Look

The whole design system lives at the top of `styles.css`:

```css
:root {
  --teal: #00868b;
  --gold: #c9a227;
  --cream: #f8f4ec;
  --font-display: "Cormorant Garamond", ...;
  --font-body: "Lora", ...;
  /* ...etc */
}
```

Change any of these variables and the change cascades through the entire site. Want a different display font? Pick one from [Google Fonts](https://fonts.google.com), update the `<link>` tag in each HTML `<head>`, and change `--font-display`.

---

## Need to Add a New Page?

1. Copy `about.html` (it's a clean template with nav + footer).
2. Rename it (e.g. `blog.html`).
3. Replace the `<main>` content with whatever you need.
4. Add the new link to the `<ul class="nav__menu">` block in **every** HTML file.

---

## License & Credits

Site code: yours to use, modify, and deploy freely.

Fonts: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Lora](https://fonts.google.com/specimen/Lora), [Inter](https://fonts.google.com/specimen/Inter) — all free under the SIL Open Font License.

Built with care for Sheri Long & Longtime Genie.

> *"The truth is there. I'll help you find it."*
