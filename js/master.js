// Local Storage Option
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((li) => {
    li.classList.remove("active");

    if (li.dataset.color === mainColor) li.classList.add("active");
  });
}

// Start Settings Box
let settingBox = document.querySelector(".settings-box");
let settingIcon = document.querySelector(".settings-box .fa-gear");

settingIcon.addEventListener("click", () => {
  settingIcon.classList.toggle("spin");
  settingBox.classList.toggle("open");
});

// Colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(colorsLi, li);
  });
});

let randomBackgroundEl = document.querySelectorAll(".random-backgrounds span");
let backgroundOption = true;
let backgroundInteval;
let randomNum;
let landingPage = document.querySelector(".landing-page");

randomBackgroundEl.forEach((span) => {
  span.addEventListener("click", () => {
    handleActive(randomBackgroundEl, span);

    if (span.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", "true");
    } else {
      backgroundOption = false;
      clearInterval(backgroundInteval);
      localStorage.setItem("background_option", "false");
      localStorage.setItem("background_image", `url("${imgsArr[randomNum]}")`);
    }
  });
});

// Set LocalStorage Main Images and Radom Option
let mainBackgroundOption = localStorage.getItem("background_option");

if (mainBackgroundOption !== null) {
  if (mainBackgroundOption === "true") backgroundOption = true;
  else backgroundOption = false;
}

document
  .querySelectorAll(".random-backgrounds span")
  .forEach((ele) => ele.classList.remove("active"));

if (mainBackgroundOption === "true" || mainBackgroundOption === null)
  document.querySelector(".random-backgrounds .yes").classList.add("active");
else document.querySelector(".random-backgrounds .no").classList.add("active");

let mainBackgroundImage = localStorage.getItem("background_image");

if (mainBackgroundImage !== null && backgroundOption === false) {
  landingPage.style.backgroundImage = mainBackgroundImage;
}
// End Settings Box

// Start Landing Page
let navLinks = document.querySelectorAll(".links li a");
let imgsArr = [
  "../imgs/01.jpg",
  "../imgs/02.png",
  "../imgs/03.jpg",
  "../imgs/04.jpg",
  "../imgs/05.jpg",
];

let randomizeImgs = () => {
  if (backgroundOption) {
    backgroundInteval = setInterval(() => {
      randomNum = Math.floor(Math.random() * imgsArr.length);
      landingPage.style.backgroundImage = `url("${imgsArr[randomNum]}")`;
    }, 5000);
  }
};

randomizeImgs();

navLinks.forEach((link) => {
  7;
  link.addEventListener("click", () => {
    handleActive(navLinks, link);
  });
});

// End Landing Page

// Start Our Skills
let ourSkills = document.querySelector(".skills");

window.addEventListener("scroll", () => {
  let skillsOffestTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.scrollY;
  let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

  if (windowScrollTop > skillsOffestTop + skillsOuterHeight - windowHeight) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
});

// End Our Skills

// Create Popup Image
let outGallery = document.querySelectorAll(".gallery img");

outGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let textHeading = document.createTextNode(img.alt);

      imgHeading.appendChild(textHeading);

      popupBox.appendChild(imgHeading);
    }

    let popupImage = document.createElement("img");
    popupImage.src = img.src;

    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    let closeSpan = document.createElement("span");
    let closeText = document.createTextNode("X");

    closeSpan.appendChild(closeText);
    closeSpan.className = "close-span";

    popupBox.appendChild(closeSpan);

    closeSpan.addEventListener("click", () => {
      popupBox.remove();
      overlay.remove();
    });
  });
});

// Nav Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Nav Links
let allLinks = document.querySelectorAll(".links a");

// Handle Scrolling
function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(ele.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(parentElement, element) {
  parentElement.forEach((ele) => {
    ele.classList.remove("active");
  });
  element.classList.add("active");
}

// Show Bullets Option
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(bulletsSpan, span);
  });
});

// Reset Option Button
document.querySelector(".reset-option").onclick = () => {
  localStorage.clear();
  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleBtn.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
});

tLinks.onclick = (e) => {
  e.stopPropagation();
};

document.body.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      tLinks.classList.toggle("open");
      toggleBtn.classList.toggle("menu-active");
    }
  }
});

// Scroll To Up
let scrollToUp = document.querySelector(".btn-to-up");

window.addEventListener("scroll", () => {
  if (scrollY >= 385) {
    scrollToUp.classList.add("show");
  } else {
    scrollToUp.classList.remove("show");
  }
});

scrollToUp.addEventListener("click", () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
