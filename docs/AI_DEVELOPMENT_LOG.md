# AI-Assisted Development & Prompt Sequence Log

This document records the sequence of structured prompts used with state-of-the-art AI development workflows to build this Airbnb clone.

---

### Phase 1: Architecture & Structural Grounding
**Prompt 1.1: Visual Analysis & Data Extraction**
> "Analyze the Airbnb listing reference at `https://airbnb-clone-umber-two.vercel.app` (Property: Romantic Jacuzzi 1BHK Candolim | Mirashya UG10). Extract the complete hierarchical data schema: property specs (3 guests, 1 bed, 1 bath), ratings (4.95, 19 reviews), pricing model (base price, cleaning fee, service fee, promo discount), all 9 photo tour categories (Living room 1, Living room 2, Full kitchen, Bedroom, Full bathroom, Gym, Exterior, Pool, Additional photos), and individual photo mappings for the 43 listing images."

**Prompt 1.2: State Management & Overlay Routing**
> "Design a lightweight, deterministic state model in React to control transitions between:
> 1. Main Listing Page
> 2. Full-Screen Photo Tour
> 3. Lightbox Viewer
> Ensure transitions support opening the Lightbox directly from either the Hero Gallery or the Photo Tour, and returning gracefully with proper focus retention."

---

### Phase 2: Component Engineering & Visual Parity
**Prompt 2.1: Header & Hero 5-Photo Collage**
> "Implement `Header.jsx` and `HeroGallery.jsx` using Tailwind CSS. Header must feature the Airbnb Coral SVG logo, 3-section search pill (`Anywhere | Anytime | Add guests`), and user navigation dropdown. The hero gallery must match Airbnb's asymmetrical 5-photo grid (left half 1 large photo, right half 2x2 grid) with rounded corners and a floating 'Show all photos' pill button."

**Prompt 2.2: Photo Tour & Lightbox Micro-interactions**
> "Develop `PhotoTour.jsx` and `Lightbox.jsx`. PhotoTour requires a sticky category navigation bar with thumbnail cards that smooth-scrolls into each room section. Lightbox requires an edge-to-edge view with:
> - Left 9-dot grid icon to return to Photo Tour
> - Category title in center
> - `X of 43` counter and close button on right
> - Circular navigation arrows
> - Global keyboard bindings (`ArrowLeft`, `ArrowRight`, `Escape`)."

---

### Phase 3: Accessibility & Quality Hardening
**Prompt 3.1: Keyboard Hooks & Scroll Lock**
> "Create a reusable `useKeyboard.js` custom hook that handles `ArrowLeft`, `ArrowRight`, and `Escape` while ignoring keystrokes when form elements are focused. Ensure `document.body.style.overflow = 'hidden'` is applied when overlays are active to prevent background scrolling."

**Prompt 3.2: Production Architecture Blueprint**
> "Synthesize a production-scale system architecture diagram for an Airbnb-scale marketplace covering client edge caching, API gateway, microservice decoupling (search, booking saga, listing), and Kafka event streaming. Export both markdown specifications and an SVG vector diagram."
