(function () {
  window.Components = window.Components || {};

  window.Components.closing = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-closing";
      div.innerHTML = `
        <p class="closing-text">${
          section.text || "Okay, now come back and tell me if you liked it."
        }</p>
        ${
          section.buttonText
            ? `<a href="${section.buttonLink || '#'}" class="custom-btn">${section.buttonText}</a>`
            : `<p class="replay-btn" id="replay">${section.replayText || "Or click, if you want to watch it again."}</p>`
        }
        <p class="last-smile">:)</p>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const ideaIn = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
      tl.from(el.querySelectorAll("p, a"), {
        duration: 1, ...ideaIn, stagger: 1.2,
      });
      // Enable button only after it becomes visible
      const btn = el.querySelector("#replay, .custom-btn");
      if (btn) {
        tl.set(btn, { pointerEvents: "auto" });
      }
      tl.to(el.querySelector(".last-smile"), {
        duration: 0.5, rotation: 90,
      }, "+=1");
    },
  };
})();
