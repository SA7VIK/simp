const reveals = document.querySelectorAll(".reveal");
const heroVisual = document.querySelector("[data-parallax]");
const scrollHints = document.querySelectorAll(".scroll-hint");
const typeTargets = Array.from(document.querySelectorAll(".type-line"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((section) => observer.observe(section));

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const handleScroll = () => {
  const offset = window.scrollY * 0.25;
  const y = clamp(offset, 0, 90);
  if (heroVisual) {
    heroVisual.style.transform = `translateY(${y}px)`;
  }

  const pinkStart = window.innerHeight * 0.25;
  const blueStart = window.innerHeight * 1.2;
  const shouldPink = window.scrollY > pinkStart && window.scrollY < blueStart;
  const shouldBlue = window.scrollY >= blueStart;
  document.body.classList.toggle("is-pink", shouldPink);
  document.body.classList.toggle("is-blue", shouldBlue);

  const shouldHideHint = window.scrollY > 40;
  scrollHints.forEach((hint) => {
    hint.classList.toggle("is-hidden", shouldHideHint);
  });
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const typeElement = async (element, speed) => {
  const fullText = element.textContent;
  element.textContent = "";
  element.classList.add("is-typing");
  for (let index = 0; index <= fullText.length; index += 1) {
    element.textContent = fullText.slice(0, index);
    await sleep(speed);
  }
  element.classList.remove("is-typing");
  element.classList.add("is-typed");
};

const typeAllContent = async () => {
  for (const element of typeTargets) {
    await typeElement(element, 35);
    await sleep(1000);
  }
};

typeAllContent();
handleScroll();
window.addEventListener("scroll", handleScroll, { passive: true });

document.querySelectorAll(".song-card").forEach((card) => {
  const button = card.querySelector("[data-play]");
  const audio = card.querySelector("[data-audio]");
  if (!button || !audio) return;

  button.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      button.textContent = "Pause";
      button.classList.add("is-playing");
    } else {
      audio.pause();
      button.textContent = "Play";
      button.classList.remove("is-playing");
    }
  });

  audio.addEventListener("ended", () => {
    button.textContent = "Play";
    button.classList.remove("is-playing");
  });
});
