# Airbnb Listing Clone (Candolim Romantic Jacuzzi 1BHK)

A production-grade, pixel-perfect clone of the Airbnb listing page (*Romantic Jacuzzi 1BHK Candolim | Mirashya UG10*), featuring exact visual parity, interactive reservation calculation, full-screen Photo Tour, and an edge-to-edge Lightbox viewer with keyboard navigation.

---

## 🌟 Key Features & View Parity

1. **Listing Page**:
   - Airbnb Coral navbar with search pill (`Anywhere | Anytime | Add guests`) and profile menu.
   - 5-photo asymmetrical hero collage with hover brightness transitions.
   - Floating "Show all photos" pill with 9-dot icon.
   - Laurel wreath "Guest favourite" card with 4.95 star rating and 19 reviews.
   - Interactive sticky reservation card with reactive pricing, date inputs, guest selectors, and a claimable 10% discount promo banner.
   - Amenities grid, sleeping arrangement card, and host profile details.

2. **Photo Tour (Overlay View 1)**:
   - Full-screen modal opened via "Show all photos" or hero images.
   - Sticky header with back button, share, and save toggles.
   - Horizontal thumbnail category navigation (9 room categories) with smooth auto-scroll.
   - 43 curated property photos categorized with room feature tags.
   - Clicking any photo transitions directly into the Lightbox.

3. **Lightbox (Overlay View 2)**:
   - Edge-to-edge single-photo viewer.
   - 9-dot grid icon to navigate back to the Photo Tour.
   - Live photo counter (`X of 43`) and category header.
   - Circular previous/next navigation buttons.
   - Full keyboard accessibility: `ArrowLeft` (previous), `ArrowRight` (next), `Escape` (exit).

4. **Modern AI Workflow & Architecture**:
   - AI Subagent configs in `agents/` (`ui-fidelity-agent.md`, `accessibility-agent.md`, `architecture-agent.md`).
   - Project Cursor rules in `.cursorrules`.
   - Production scale architecture blueprint in `docs/ARCHITECTURE.md` and `docs/ARCHITECTURE_DIAGRAM.svg`.
   - Prompt sequence log in `docs/AI_DEVELOPMENT_LOG.md`.

---

## 🚀 Quick Start

### 1. Initialize and Run
```bash
# Navigate to the project folder
cd airbnb-clone

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will launch at `http://localhost:3000`.

### 2. Build for Production
```bash
npm run build
npm run preview
```

### 3. Packaging into ZIP
```bash
zip -r airbnb-clone.zip . -x "node_modules/*" "dist/*" ".git/*"
```
