"use strict";
// * DOM selections
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const navLinksContainer = document.querySelector(".nav-links");
const scrollToTop = document.querySelector("#scroll-to-top");
const themeToggler = document.querySelector("#theme-toggle-button");
const navMenuToggler = document.querySelector(".nav-menu-toggler");
const portfolioFilters = document.querySelector("#portfolio-filters");
const filters = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const carousel = document.querySelector("#testimonials-carousel");
const nextTestimonial = document.querySelector("#next-testimonial");
const prevTestimonial = document.querySelector("#prev-testimonial");
const carouselIndicators = document.querySelectorAll(".carousel-indicator");
const projectTypeField = document.querySelector(".project-custom-select");
const projectTypeOptions = document.querySelector(".project-custom-options");
const budgetField = document.querySelector(".budget-custom-select");
const budgetOptions = document.querySelector(".budget-custom-options");
const fullNameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const projectDetailsInput = document.querySelector("#project-details");
const form = document.querySelector("form");
const settingsToggle = document.querySelector("#settings-toggle");
const settingsSidebar = document.querySelector("#settings-sidebar");
const closeSettingsBtn = document.querySelector("#close-settings");
const alexFont = document.querySelector("button[data-font=alexandria]");
const tajawalFont = document.querySelector("button[data-font=tajawal]");
const cairoFont = document.querySelector("button[data-font=cairo]");
const fontOptions = document.querySelectorAll(".font-option");
const themesContainer = document.querySelector("#theme-colors-grid");
const settingsReset = document.querySelector("#reset-settings");

// * scroll spy effect and scroll to top button show and hide
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });

  // * scroll to top show and hide
  if (window.scrollY >= 400) {
    scrollToTop.classList.remove("invisible");
    scrollToTop.classList.replace("opacity-0", "opacity-100");
  } else {
    scrollToTop.classList.add("invisible");
    scrollToTop.classList.replace("opacity-100", "opacity-0");
  }
});

// * scroll to top event
scrollToTop.addEventListener("click", () => window.scrollTo(0, 0));

// * theme toggler event
themeToggler.addEventListener("click", () => {
  if (document.querySelector("*").classList.contains("dark")) {
    document.querySelector("*").classList.remove("dark");
  } else {
    document.querySelector("*").classList.add("dark");
  }
});

// * nav-menu toggler event
navMenuToggler.addEventListener("click", () => {
  if (navLinksContainer.classList.contains("active")) {
    navLinksContainer.classList.remove("active");
  } else {
    navLinksContainer.classList.add("active");
  }
});

// * portfolio filtering and displaying projects
let activeTab = filters[0];

portfolioFilters.onclick = function (e) {
  let target = e.target;
  if (target.tagName != "BUTTON") return;
  setActiveTab(target);
  displayProjects(target);
};

function setActiveTab(target) {
  if (activeTab) {
    activeTab.className = `portfolio-filter px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700`;
  }
  target.className = `portfolio-filter px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 active bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50`;
  activeTab = target;
}

function displayProjects(tab) {
  portfolioItems.forEach((item) => {
    if (
      tab.getAttribute("data-filter") === "all" ||
      item.getAttribute("data-category") === tab.getAttribute("data-filter")
    ) {
      item.style.cssText = `transition: opacity 0.3s, transform 0.3s; opacity: 1; transform: scale(1); display: block;`;
    } else {
      item.style.cssText = `transition: opacity 0.3s, transform 0.3s; opacity: 0; transform: scale(0.8); display: none;`;
    }
  });
}

// * carousel handling
let carouselCounter = 0;

function updateCarousel() {
  if (carouselCounter === 0) {
    carousel.style.transform = "translateX(0%)";
  } else if (carouselCounter === 1) {
    carousel.style.transform = `translateX(${window.innerWidth < 640 ? "100" : window.innerWidth < 1024 ? "50" : "33.333333333"}%)`;
  } else if (carouselCounter === 2) {
    carousel.style.transform = `translateX(${window.innerWidth < 640 ? "200" : window.innerWidth < 1024 ? "100" : "66.666666666"}%)`;
  } else if (carouselCounter === 3) {
    carousel.style.transform = `translateX(${window.innerWidth < 640 ? "300" : window.innerWidth < 1024 ? "150" : "100"}%)`;
  }
}

function updateIndicators() {
  carouselIndicators.forEach((item) => {
    if (carouselCounter === +item.getAttribute("data-index")) {
      item.classList.remove("dark:bg-slate-600", "bg-slate-400");
      item.classList.add("active", "bg-accent", "scale-125");
    } else {
      item.classList.add("dark:bg-slate-600", "bg-slate-400");
      item.classList.remove("active", "bg-accent", "scale-125");
    }
  });
}

nextTestimonial.addEventListener("click", () => {
  if (carouselCounter === 0) {
    carouselCounter += 1;
  } else if (carouselCounter === 1) {
    carouselCounter += 1;
  } else if (carouselCounter === 2) {
    carouselCounter += 1;
  } else if (carouselCounter === 3) {
    carouselCounter = 0;
  }
  updateCarousel();
  updateIndicators();
});

prevTestimonial.addEventListener("click", () => {
  if (carouselCounter === 0) {
    carouselCounter = 3;
  } else if (carouselCounter === 1) {
    carouselCounter = 0;
  } else if (carouselCounter === 2) {
    carouselCounter = 1;
  } else if (carouselCounter === 3) {
    carouselCounter = 2;
  }
  updateCarousel();
  updateIndicators();
});

carouselIndicators.forEach((item) => {
  item.addEventListener("click", () => {
    carouselCounter = +item.getAttribute("data-index");
    updateIndicators();
    updateCarousel();
  });
});

// * handling the form

// * handling the select project field
projectTypeField.addEventListener("click", () => {
  if (projectTypeOptions.classList.contains("hidden")) {
    projectTypeOptions.classList.remove("hidden");
    projectTypeField.children[1].style.cssText = `rotate: 180deg;`;
  } else {
    projectTypeOptions.classList.add("hidden");
    projectTypeField.children[1].style.cssText = `rotate: 0deg;`;
  }
});

projectTypeOptions.addEventListener("click", (e) => {
  const target = e.target;
  projectTypeField.children[0].textContent = target.getAttribute("data-value");
  projectTypeOptions.classList.add("hidden");
  projectTypeField.children[1].style.cssText = `rotate: 0deg;`;
  projectTypeField.children[0].style.color = `${document.body.parentElement.classList.contains("dark") ? "white" : "black"}`;
});

// * handling the select budget field
budgetField.addEventListener("click", () => {
  if (budgetOptions.classList.contains("hidden")) {
    budgetOptions.classList.remove("hidden");
    budgetField.children[1].style.cssText = `rotate: 180deg;`;
  } else {
    budgetOptions.classList.add("hidden");
    budgetField.children[1].style.cssText = `rotate: 0deg;`;
  }
});

budgetOptions.addEventListener("click", (e) => {
  const target = e.target;
  budgetField.children[0].textContent = target.getAttribute("data-value");
  budgetField.children[0].style.color = "white";
  budgetOptions.classList.add("hidden");
  budgetField.children[0].style.color = `${document.body.parentElement.classList.contains("dark") ? "white" : "black"}`;
});

function clearForm() {
  fullNameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  projectDetailsInput.value = "";

  projectTypeField.children[0].textContent = `اختر نوع المشروع`;
  projectTypeField.children[0].style.color = "";

  budgetField.children[0].textContent = `اختر الميزانية`;
  budgetField.children[0].style.color = "";
}

// * form validation
function inputValidation(pattern, input) {
  if (pattern.test(input.value)) {
    input.nextElementSibling.classList.add("hidden");
    return true;
  } else {
    input.nextElementSibling.classList.remove("hidden");
    return false;
  }
}

function formValidation() {
  const patterns = {
    name: /^([ء-ي\sًٌٍَُِ]{2,50}|[a-zA-Z\s]{2,50})$/,
    phone: /^((\+2)|(2)|)01(0|1|2|5)\d{8}$/,
    email: /^([a-z0-9]+@[a-z]+\.[a-z]+)$/,
  };

  // * form behavior
  const name = inputValidation(patterns.name, fullNameInput);
  const email = inputValidation(patterns.email, emailInput);
  const phone = inputValidation(patterns.phone, phoneInput);
  let message = true;

  if (projectDetailsInput.value == "") {
    projectDetailsInput.nextElementSibling.classList.remove("hidden");
    projectDetailsInput.nextElementSibling.textContent =
      "يرجى إدخال تفاصيل المشروع";
    message = false;
  } else if (projectDetailsInput.value.length < 20) {
    projectDetailsInput.nextElementSibling.classList.remove("hidden");
    projectDetailsInput.nextElementSibling.textContent =
      "يرجى إدخال المزيد من التفاصيل";
    message = false;
  } else {
    projectDetailsInput.nextElementSibling.classList.add("hidden");
  }

  return name && email && phone && message;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = formValidation();

  if (isValid) {
    clearForm();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "تم ارسال رسالتك بنجاح",
      text: "شكراً لتواصلك. سأقوم بالرد عليك في اقرب وقت ممكن",
      showConfirmButton: false,
      timer: 3000,
      theme: `${document.body.parentElement.classList.contains("dark") ? "dark" : "light"}`,
    });
  }
});

// * sidebar
settingsToggle.addEventListener("click", () => {
  if (settingsSidebar.classList.contains("translate-x-full")) {
    openSidebar();
  } else {
    closeSidebar();
  }
});

closeSettingsBtn.addEventListener("click", () => {
  closeSidebar();
});

function openSidebar() {
  settingsSidebar.classList.remove("translate-x-full");
  settingsSidebar.setAttribute("aria-hidden", "false");
  settingsToggle.style.right = `20rem`;
}

function closeSidebar() {
  closeSettingsBtn.blur();
  settingsReset.blur();
  settingsSidebar.classList.add("translate-x-full");
  settingsSidebar.setAttribute("aria-hidden", "true");
  settingsToggle.style.right = `0rem`;
}

// * fonts handling
alexFont.addEventListener("click", (e) => {
  changeFont(alexFont);
});

cairoFont.addEventListener("click", () => {
  changeFont(cairoFont);
});

tajawalFont.addEventListener("click", () => {
  changeFont(tajawalFont);
});

function changeFont(font) {
  // * change the active button
  fontOptions.forEach((item) => {
    if (item.getAttribute("data-font") == font.getAttribute("data-font")) {
      item.classList.add(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800",
      );
      item.classList.remove("border-slate-200", "dark:border-slate-700");
      item.setAttribute("aria-checked", "true");
    } else {
      item.classList.remove(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800",
      );
      item.classList.add("border-slate-200", "dark:border-slate-700");
      item.setAttribute("aria-checked", "false");
    }
  });

  // * change the body's font family
  if (font.getAttribute("data-font") == "alexandria") {
    document.body.classList.remove("font-tajawal", "font-cairo");
    document.body.classList.add("font-alexandria");
  } else if (font.getAttribute("data-font") == "tajawal") {
    document.body.classList.remove("font-cairo", "font-alexandria");
    document.body.classList.add("font-tajawal");
  } else if (font.getAttribute("data-font") == "cairo") {
    document.body.classList.remove("font-tajawal", "font-alexandria");
    document.body.classList.add("font-cairo");
  }
}

// * theme handling
themesContainer.addEventListener("click", (e) => {
  if (e.target.getAttribute("data-primary")) {
    document.documentElement.style.setProperty(
      "--color-primary",
      `${e.target.getAttribute("data-primary")}`,
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      `${e.target.getAttribute("data-secondary")}`,
    );
    document.documentElement.style.setProperty(
      "--color-accent",
      `${e.target.getAttribute("data-accent")}`,
    );

    [...themesContainer.children].forEach((theme) => {
      if (theme == e.target) {
        theme.classList.add(
          "ring-2",
          "ring-primary",
          "ring-offset-2",
          "ring-offset-white",
          "dark:ring-offset-slate-900",
        );
      } else {
        theme.classList.remove(
          "ring-2",
          "ring-primary",
          "ring-offset-2",
          "ring-offset-white",
          "dark:ring-offset-slate-900",
        );
      }
    });
  }
});

// * settings reset
settingsReset.addEventListener("click", () => {
  tajawalFont.click();
  themesContainer.children[0].click();
  closeSidebar();
});

// * an event to close the dropdown lists and sidebar when clicked outside
document.addEventListener("click", (e) => {
  if (e.target.closest("div") !== projectTypeField) {
    projectTypeOptions.classList.add("hidden");
    projectTypeField.children[1].style.cssText = `rotate: 0deg;`;
  }
  if (e.target.closest("div") !== budgetField) {
    budgetOptions.classList.add("hidden");
    budgetField.children[1].style.cssText = `rotate: 0deg;`;
  }
  if (
    e.target.closest("div#settings-sidebar") !== settingsSidebar &&
    e.target.closest("button#settings-toggle") !== settingsToggle
  ) {
    closeSidebar();
  }
});
