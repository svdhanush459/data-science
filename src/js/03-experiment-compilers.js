(() => {
  const addPartButtons = () => {
    const cards = [...document.querySelectorAll("#cards .card")];
    const card = cards.find((entry) => entry.querySelector(".tag")?.textContent.includes("01"));
    if (!card || card.querySelector(".card-subparts")) return Boolean(card);
    const description = card.querySelector("p");
    if (!description) return false;
    const links = document.createElement("div");
    links.className = "card-subparts";
    links.setAttribute("aria-label", "Experiment 1 parts");
    links.style.cssText = "display:flex;gap:6px;margin:8px 0";
    links.innerHTML = '<button type="button" data-part="1a">a</button><button type="button" data-part="1b">b</button><button type="button" data-part="1c">c</button>';
    description.after(links);
    links.querySelectorAll("button").forEach((button) => {
      button.style.cssText = "border:1px solid #dce3ef;border-radius:6px;padding:6px 10px;background:#f4f7ff;color:#315fc4;font-size:9px;font-weight:700;cursor:pointer";
      button.onclick = (event) => {
        event.stopPropagation();
        if (typeof window.openExperimentPartCompiler === "function") window.openExperimentPartCompiler(button.dataset.part);
        else if (typeof window.openLab === "function") window.openLab(1);
      };
    });
    return true;
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addPartButtons, { once: true });
  else addPartButtons();
})();
