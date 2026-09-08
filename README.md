# Varun Sharma — Developer & AI Portfolio (`varun-sharma-portfolio`)

Modern personal portfolio website built with **HTML5, CSS3, and vanilla JavaScript**.

A clean, cinematic, minimal, and premium portfolio designed for **Varun Sharma**, a first-year B.Tech student specializing in **Computer Science Engineering with Data Science & Artificial Intelligence** at **JECRC University**.

---

## 🚀 Features

- **Dark Futuristic Aesthetic**: Deep obsidian theme (`#06090E`), glassmorphism cards (`backdrop-filter: blur(16px)`), electric cyan / indigo accents, and subtle glow effects.
- **Interactive Neural Particle Canvas**: Lightweight 60 FPS connected constellation background in the hero that reacts to pointer movement and pauses when inactive to preserve CPU & battery.
- **Dynamic Typewriter Subtitle**: Rotating hero subtitle cycling through core competencies (*CSE • DATA SCIENCE • AI*, *AI AGENTS & AUTOMATION*, *SOFTWARE DEVELOPMENT*, *MACHINE LEARNING & DATA*).
- **Sticky Glassmorphism Header**: Real-time reading progress bar at the top edge and scrollspy active link highlighting via `IntersectionObserver`.
- **Responsive Mobile Navigation**: Slide-out glass drawer navigation with accessible hamburger toggle, backdrop blur, and escape key listener.
- **Interactive Project Filtering**: Instant category switching (*All Projects*, *Web Applications*, *AI & Data*, *Prototypes*) with animated transitions.
- **Dynamic GitHub Repository Explorer**: Integrates with the GitHub REST API to highlight public repositories with seamless fallback to static cards if offline or rate-limited.
- **Client-Side Contact Form Validation**: Real-time inline field validation, error indicators, and accessible toast notifications with direct contact links.
- **Ambient Cursor Glow Follower**: Fluid ambient cursor glow for desktop pointers.
- **Accessibility & Performance**: Fully semantic HTML5 landmark tags, WCAG compliant contrast, screen reader labels, keyboard focus rings, and strict `@media (prefers-reduced-motion: reduce)` support.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic document structure, SEO & Open Graph meta tags, SVG icons.
- **CSS3**: Custom design tokens, CSS Grid & Flexbox, Glassmorphism, animations, responsive media queries.
- **Vanilla JavaScript (ES6+)**: HTML5 Canvas rendering, IntersectionObserver, client-side form validation, GitHub REST API integration.

*(No frameworks used — zero React, Next.js, TailwindCSS, or Bootstrap dependencies).*

---

## 📁 Project Structure

```text
varun-sharma-portfolio/
│
├── index.html        # Complete semantic HTML5 website structure
├── style.css         # Complete responsive styling and animations
├── script.js         # All interactive vanilla JavaScript functionality
├── README.md         # Documentation, guide, and project information
├── .gitignore        # Standard Git ignore rules
│
└── assets/
    ├── images/       # High-fidelity SVG project previews & avatar monogram
    │   ├── pathback-preview.svg
    │   ├── space-explorer-preview.svg
    │   ├── handwave-preview.svg
    │   └── avatar-monogram.svg
    └── icons/
        └── favicon.svg # Modern SVG browser tab icon
```

---

## 💻 How to Run the Project Locally

You can open `index.html` directly in any modern web browser or serve it locally using a lightweight server:

### Option 1: Direct in Browser
Double-click `index.html` or drag and drop it into Chrome, Edge, Firefox, or Safari.

### Option 2: Using Node.js (npx serve / http-server)
```bash
npx -y serve .
```
or
```bash
npx -y http-server -p 8080
```
Then navigate to `http://localhost:8080` in your browser.

---

## 🔮 Future Improvements

- Add live project demo embeds / interactive modals.
- Integrate backend webhook / email service (e.g. Formspree or EmailJS) for live contact form delivery.
- Expand the *Building in Public* section with real-time GitHub commit graphs and blog articles.
- Add additional certifications and hackathon achievements as they are completed.

---

## 👤 Author

**Varun Sharma**
- **Specialization**: B.Tech Computer Science Engineering (Data Science & AI)
- **Institution**: JECRC University
- **Focus**: Artificial Intelligence, Machine Learning, Data Science, Software Development, AI Agents & Automation
