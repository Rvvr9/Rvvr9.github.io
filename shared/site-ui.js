const initializedToggles = new WeakSet();
const initializedHeaders = new WeakSet();

export function setupNavigation(scope = document) {
  const toggle = scope.querySelector(".menu-toggle");
  const nav = scope.querySelector(".site-nav");
  if (toggle && nav && !initializedToggles.has(toggle)) {
    initializedToggles.add(toggle);
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }));
  }

  const header = scope.querySelector("[data-header]");
  if (header && !initializedHeaders.has(header)) {
    initializedHeaders.add(header);
    const syncHeader = () => header.classList.toggle("is-scrolled", scrollY > 24);
    window.addEventListener("scroll", syncHeader, {passive: true});
    syncHeader();
  }
}

export function setupReveals(scope = document) {
  const elements = [...scope.querySelectorAll(".reveal:not(.is-visible)")];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elements.forEach(item => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }), {rootMargin: "0px 0px -8%", threshold: 0.08});
  elements.forEach(item => observer.observe(item));
}
