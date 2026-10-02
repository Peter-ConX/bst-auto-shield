# BST AUTO SHIELD — Premium Automotive Studio Website

A modern, production-ready, dark automotive protection and window tinting website built specifically for **BST AUTO SHIELD** in Kettering, Northamptonshire, UK.

Rebuilt from scratch with an emphasis on authentic craftsmanship, verified business information, local SEO authority, fast performance, and an understated UK automotive studio aesthetic.

---

## 🏢 Verified Business Information

| Attribute | Details |
| :--- | :--- |
| **Business Name** | BST AUTO SHIELD |
| **Address** | 1 Henson Way, Kettering, NN16 8PX, United Kingdom |
| **Phone** | `+44 7414 768308` (Tel: [`tel:+447414768308`](tel:+447414768308)) |
| **Location** | Kettering, Northamptonshire, UK |
| **Coordinates** | `52.4089767, -0.7433669` |
| **Opening Hours** | **Monday – Saturday:** 9:00 AM – 9:00 PM<br>**Sunday:** Closed *(Fully editable)* |
| **Google Maps Directions** | [Get Directions](https://maps.google.com/?q=1+Henson+Way,+Kettering,+NN16+8PX) |

---

## 🎨 Visual Identity & Design Direction

- **Movement:** Dark Technical Luxury & Precision Automotive Glass
- **Tone:** Professional, precise, confident, authentic, understated luxury
- **Palette:**
  - **Canvas Background:** Obsidian Near-Black (`#090b0e`)
  - **Panel Surfaces:** Deep Matte Carbon & Chamfered Glass (`#14171e`, `#1b2029`)
  - **Precision Accent:** Electric Cyan (`#00e5ff`) applied selectively to CTAs, badges, active states, and focal highlights
  - **Text:** Crisp Off-White (`#f8fafc`) and Muted Titanium (`#94a3b8`)
- **Typography:**
  - **Headlines / Display:** `Space Grotesk` (bold, cinematic, engineered)
  - **Body / Editorial:** `Plus Jakarta Sans` (clean, highly legible)
  - **Technical Labels & Chips:** `JetBrains Mono`

---

## 🚀 Key Features & Sections

1. **Sticky Glass Navigation:**
   - Wordmark, official logo, desktop links, click-to-call direct dial, and Get a Quote CTA.
   - Transitions into a more opaque blurred glass surface upon scroll.
   - Fully accessible responsive mobile drawer with keyboard trap and ESC dismiss.

2. **Cinematic Hero:**
   - Headline: *"PROTECTION THAT CHANGES THE WAY YOUR CAR FEELS."*
   - Clear Kettering studio positioning with dynamic live opening hours status pill.
   - Dual conversion paths: Primary Quote request and direct telephone booking.

3. **Trust & Location Strip:**
   - Immediate confirmation of local Kettering studio presence, hours, and hand-finished craft.

4. **Services Section (6 Categories):**
   - Automotive Window Tinting
   - Privacy Tint
   - Heat & Glare Reduction
   - Automotive Protection
   - Custom Tint Solutions
   - Vehicle Appearance Enhancement
   - *"Request Quote"* integration that automatically pre-selects the chosen service in the enquiry form.

5. **"Why BST" Practical Benefits:**
   - Honest, benefit-led communication (Privacy, Cabin Comfort, Exterior Appearance, Interior Sunlight Reduction, and Tailored Solutions) without unsupported marketing claims.

6. **Precision Craft Showcase:**
   - Highlights meticulous preparation, clean decontamination, heat-shrinking, and finished edge alignment.

7. **Interactive Before / After Comparison Slider:**
   - Smooth draggable split slider comparing factory glass with automotive window tinting.
   - Touch-enabled, mouse-enabled, keyboard accessible (Arrow keys), with dynamic percentage readout.

8. **Studio Gallery (Real Assets):**
   - Features real customer and workshop photographs from BST Auto Shield's Kettering bay (`1 Henson Way`).
   - Category filtering (Studio Bay, Tint Detail, Finished Vehicles).
   - Fullscreen Lightbox modal preview with captions and keyboard shortcuts.

9. **The 4-Step Process:**
   - 01: Tell Us About Your Vehicle
   - 02: Choose Your Solution
   - 03: Professional Installation
   - 04: Final Check

10. **Quote & Location Section:**
    - Full quotation form with vehicle make, model, year, service package, preferred contact method, and custom notes.
    - Verified submission workflow that presents a summary of requested specifications and immediate one-tap calling confirmation.
    - Styled location card with Google Maps directions link.

11. **Floating Quick-Action Pill:**
    - Persistent, thumb-accessible bar on mobile and desktop for quick calling, quoting, and directions.

12. **Local SEO & Schema.org:**
    - `LocalBusiness` / `AutoRepair` structured JSON-LD data for search engines.

---

## 📁 Project Structure

```
├── index.html            # Main website entry point with semantic markup & schema
├── css/
│   └── styles.css        # Custom automotive design system & component styles
├── js/
│   └── main.js           # Client interactions (slider, lightbox, status, forms)
├── assets/               # Production assets & high-resolution imagery
│   ├── logo-highres.png  # BST Auto Shield brand logo
│   ├── hero-porsche-1920.jpg
│   ├── comparison-split-1920.jpg
│   ├── install-technician-1920.jpg
│   ├── saloon-limo-1920.jpg
│   └── real/             # Authentic photos from BST Auto Shield's Google Maps
│       ├── real-1-studio-car.jpg
│       ├── real-2-workshop-front.jpg
│       ├── real-3-exterior-detail.jpg
│       └── real-4-tint-window.jpg
└── README.md             # Project documentation & deployment guide
```

---

## 🛠️ Deployment

This project requires zero build steps or heavy dependencies. It runs directly on any static web host or server:

- **GitHub Pages:**
  Go to Repository Settings -> Pages -> Deploy from Branch (`main` / root).
- **Vercel / Netlify / Cloudflare Pages:**
  Deploy root directory directly.
- **Traditional Apache / Nginx:**
  Copy all files to `/var/www/html` or your public document root.

---

## 📝 Content & Photo Management

- **Opening Hours:** Edit `BUSINESS_CONFIG.hours` inside `js/main.js` and the corresponding lines in `index.html`.
- **Replacing Photography:** Add new vehicle photos into `assets/real/` and update the `src` and `alt` attributes in the `#gallery` section of `index.html`.
- **Form Backend:** To connect the quote form to an email notification endpoint (such as Formspree, Resend, or your custom server API), update the `fetch` target in `initQuoteForm()` in `js/main.js`.
