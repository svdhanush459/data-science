(() => {
  const addPartButtons = () => {
    const cards = [...document.querySelectorAll("#cards .card")];
    cards.forEach((card) => {
      const tag = card.querySelector(".tag")?.textContent || "";
      const experimentId = Number((tag.match(/\d+/) || [])[0]);
      if (!Number.isInteger(experimentId) || experimentId < 1 || card.querySelector(".card-subparts")) return;
      const description = card.querySelector("p");
      if (!description) return;
      const keys = experimentId === 1 ? ["1a", "1b", "1c"] : experimentId === 2 ? ["2a", "2b"] : experimentId === 3 ? ["3a", "3b", "3c", "3d"] : experimentId === 4 ? ["4a", "4b", "4c"] : experimentId === 5 ? ["5a", "5b", "5c", "5d"] : [`${experimentId}a`, `${experimentId}b`];
      const links = document.createElement("div");
      links.className = "card-subparts";
      links.setAttribute("aria-label", `Experiment ${experimentId} parts`);
      links.style.cssText = "display:flex;gap:6px;margin:8px 0";
      links.innerHTML = keys.map((key) => `<button type="button" data-part="${key}">${key.slice(-1)}</button>`).join("");
      description.after(links);
      links.querySelectorAll("button").forEach((button) => {
        button.style.cssText = "border:1px solid #dce3ef;border-radius:6px;padding:6px 10px;background:#f4f7ff;color:#315fc4;font-size:9px;font-weight:700;cursor:pointer";
        button.onclick = (event) => {
          event.stopPropagation();
          if (typeof window.openExperimentPartCompiler === "function") window.openExperimentPartCompiler(button.dataset.part);
          else if (typeof window.openLab === "function") window.openLab(experimentId);
        };
      });
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addPartButtons, { once: true });
  else addPartButtons();
})();
