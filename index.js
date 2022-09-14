import i18Obj from './translate.js';

let lang = '';

if (localStorage.getItem('lang')) {
  lang = localStorage.getItem('lang');
} else lang = 'en';

console.log(`lang is ${lang}`);

setLocalStorage();

getTranslate(lang);

function toggleHamburgerMenu() {
  var checkExist = setInterval(() => {
    const hamburger = document.querySelector(".hamburger");
    if (hamburger) {
      clearInterval(checkExist);
    }

    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", smallscreenMenu);

    function smallscreenMenu() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    }

    const navLink = document.querySelectorAll(".nav-link");

    navLink.forEach(n => n.addEventListener("click", closeMenu));

    function closeMenu() {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}
toggleHamburgerMenu();

function getTranslate(lang) {
  const fields = document.querySelectorAll('[data-i18]');
  fields.forEach((field) => {
    const key = field.dataset.i18;
    const languageObj = i18Obj[lang];
    field.innerHTML = languageObj[key];
    if (field.placeholder) {
      field.placeholder = languageObj[field.dataset.i18];
      field.textContent = '';
    }
  })
}

function translate() {
  const languageBtns = document.querySelectorAll('.lang');
  languageBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.innerText === "Eng") {
        lang = 'en';
      } else lang = 'ru';
      console.log(`lang is ${lang}`);
      getTranslate(lang);
      changeClassActive('lang', btn);
      localStorage.setItem('lang', lang);
    })
  })
}

translate();

function setLocalStorage() {
  localStorage.setItem('lang', lang);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
  }
}
window.addEventListener('load', getLocalStorage);