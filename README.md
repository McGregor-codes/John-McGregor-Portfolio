# McGregor-Codes Portfolio

A standalone, dependency-free portfolio site for John McGregor / McGregor-Codes.

## Structure

```
index.html
css/
  style.css       tokens, reset, type, buttons, scroll-reveal
  nav.css         header + mobile menu
  hero.css        hero section, circuit-line accent, entrance animation
  about.css
  skills.css
  projects.css    project cards + hover video previews
  automation.css  automation section + flow diagram
  journey.css     timeline
  contact.css     contact section + footer + back-to-top
js/
  script.js       nav, scrollspy, reveal-on-scroll, project hover video,
                   WhatsApp link builder, back-to-top, footer year
assets/
  images/         headshot, logo (light + original mark), favicons,
                   poster frames for each project video
  videos/         short muted preview clips for each project card
```

## Editing content

Everything text-based lives directly in `index.html`, section by section
(`#home`, `#about`, `#skills`, `#work`, `#automation`, `#journey`, `#contact`).
To add a new project, copy one `<article class="project-card">` block inside
`#work` and swap the text, links, poster image and preview video.

## Running locally

No build step. Open `index.html` in a browser, or serve the folder with
any static server, for example:

```
npx serve .
```

## Deploying

This folder is ready to push to a `gh-pages` branch or the root of a
GitHub Pages repository, the same way the existing project sites
(TechConnect 2026, Learnova, etc.) are hosted.
