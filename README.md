# Happy Birthday Interactive Greeting

A highly polished, interactive greeting card application composed of a seamless two-part transition. 

This repository allows you to host an immersive, customized digital birthday experience directly on Vercel or any static CDN. The project transitions elegantly between an animated profile reveal and an interactive "Universe" cake-cutting sequence.

---

## 🎨 How to Customize

This application is built strictly to be customizable via single sources of truth. You do not need to modify the complex source code or animation timelines manually.

### Part 1: The Introductory Animations
All initial configurations, namings, texts, and photos are maintained within `script/config.js`.

1. **Changing Target Name & Media:**
   Open `script/config.js` and edit the Recipient Info block:
   ```js
   name: "Person",                  // Changes the display name across elements
   photo: "./images/Person.JPG",    // Main profile photo (e.g. Person.JPG)
   music: "./song/HBD.mp3",         // Main background audio
   ```

2. **Editing Section Texts:**
   `script/config.js` strictly orders the timeline of animations inside the `sections` array.
   - You can rewrite the text inside `wishText`, `buttonText`, `text`, or `replyText` values.

3. **Color Themes:**
   The `script/config.js` defaults to a `light` color mode for eye comfort.
   ```js
   defaultMode: "light" // "light" or "dark"
   ```

### Part 2: The Interactive Universe
The final button of Part 1 transports the user to the interactive `universe.html`.

1. **Modifying Media:**
   The Universe loads four floating album photos (`1.JPG` to `4.JPG`) and the primary audio file. Edit their `src` values in `universe.html`:
   ```html
   <img src="images/1.JPG" class="album-photo album-left-1">
   ```

2. **Modifying the Core Message:**
   Around line 400 of `universe.html`, there is a `<div class="row message">` container where line-by-line typography scrolls up the screen. Adjust these text strings exactly as you want them to display.

3. **Balloons:**
   The interactive balloon sequence is optimized for names up to 5 letters (8 balloons total: H-B-D + N-A-M-E). For longer names, you'll need to update the `vw` offsets in `script/effect.js`.

---

## 💻 Technical Details & Stack

### Architecture Overview
The application functions as a static Multi-Page Application (MPA) consisting of two sequentially linked screens:
- **`index.html`**: A module-driven animation timeline, relying heavily on dynamic script loading.
- **`universe.html`**: A DOM-heavy click sequence relying on synchronized jQuery `.fadeTo` and `.animate()` callbacks.

### Core Technologies
1. **GreenSock Automation Platform (GSAP)**:
   - Part 1's engine (`script/main.js`) compiles the `script/config.js` declarative sequence into an absolute synchronized `gsap.timeline()`. 
   - GSAP handles timing offsets (the `stagger: 1.2` parameters), custom transforms, skews, and component exit lifecycles (fade-outs).

2. **jQuery Engine (`script/effect.js`)**:
   - `universe.html` drives interaction by utilizing a centralized orchestrator built on jQuery. 
   - It captures sequentially displayed `display: none` DOM targets and manually toggles transitions triggered by `.custom-btn` interaction IDs (`#turn_on`, `#play`, `#bannar_coming`, `#cake_fadein`, etc.).

3. **LESS Compilation (in-browser)**:
   - Generates and calculates the dimensions of the interactive birthday cake strictly via algorithmic calculations written in `style/cake.less` mapped to native `less.js` operations.
   - *Note: To improve performance for huge scale viewers, consider pre-compiling `cake.less` to standard `.css`!*

### The Unified Asset Pipeline
Both apps independently load standardized localized files:
- **`images/`**: Houses scalable SVGs, animated `.png` items and standard photographs mapping directly to the DOM and CSS `url()` macros.
- **`fonts/`**: Includes natively loaded `truetype` / `opentype` formats referenced dynamically from `@font-face` bindings.
- **`style/`**: Hosts modern Flexbox routines paired harmoniously with isolated Bootstrap 3 `.col-md` responsive grids to gracefully layout the pages symmetrically on mobile hardware vs desktops. 

---
### Mobile Responsiveness
The application is fully optimized for mobile devices (iOS/Android):
- **Fluid Layouts**: Text sizes and interactive elements automatically scale down to fit smaller screens.
- **Dynamic Centering**: The balloon sequence in `universe.html` calculates the optimal spacing (gap) based on the viewer's device width, keeping up to 8 balloons centered and visible even on narrow phones.

### Running Locally
To test any modifications immediately:
1. `python3 -m http.server 3000` (from Python 3)
2. Open `http://localhost:3000`

### Deployment
This site operates without build scripts. You can deploy it seamlessly on Vercel by selecting the repository and triggering a zero-config deployment. The main entry resolution handles everything autonomously.

