"use strict";

/* =========================================================
   ELEMENTS
========================================================= */

const html = document.documentElement;
const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const languageToggle = document.getElementById("languageToggle");

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

const header = document.getElementById("header");


/* =========================================================
   THEME
========================================================= */

const savedTheme = localStorage.getItem("site-theme");

if (savedTheme === "light") {
    html.setAttribute("data-theme", "light");

    if (themeIcon) {
        themeIcon.textContent = "☀";
    }
} else {
    html.setAttribute("data-theme", "dark");

    if (themeIcon) {
        themeIcon.textContent = "☾";
    }
}


if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const currentTheme =
            html.getAttribute("data-theme");

        const newTheme =
            currentTheme === "light"
                ? "dark"
                : "light";

        html.setAttribute(
            "data-theme",
            newTheme
        );

        localStorage.setItem(
            "site-theme",
            newTheme
        );

        if (themeIcon) {
            themeIcon.textContent =
                newTheme === "light"
                    ? "☀"
                    : "☾";
        }

    });

}


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage =
    localStorage.getItem("site-language") || "ar";


function updateLanguage(language) {

    currentLanguage = language;

    const isArabic =
        language === "ar";

    html.setAttribute(
        "lang",
        isArabic ? "ar" : "en"
    );

    html.setAttribute(
        "dir",
        isArabic ? "rtl" : "ltr"
    );

    const elements =
        document.querySelectorAll(
            "[data-ar][data-en]"
        );

    elements.forEach(function (element) {

        const text =
            isArabic
                ? element.getAttribute("data-ar")
                : element.getAttribute("data-en");

        if (text !== null) {
            element.textContent = text;
        }

    });


    if (languageToggle) {

        languageToggle.textContent =
            isArabic
                ? "EN"
                : "AR";

        languageToggle.setAttribute(
            "aria-label",
            isArabic
                ? "Switch to English"
                : "التبديل إلى العربية"
        );
    }

    localStorage.setItem(
        "site-language",
        language
    );
}


updateLanguage(currentLanguage);


if (languageToggle) {

    languageToggle.addEventListener(
        "click",
        function () {

            const newLanguage =
                currentLanguage === "ar"
                    ? "en"
                    : "ar";

            updateLanguage(newLanguage);

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

if (
    mobileMenuButton &&
    mobileMenu
) {

    mobileMenuButton.addEventListener(
        "click",
        function () {

            mobileMenu.classList.toggle("active");

        }
    );


    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                mobileMenu.classList.remove(
                    "active"
                );

            }
        );

    });

}


/* =========================================================
   HEADER ON SCROLL
========================================================= */

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 20) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);

updateHeader();


/* =========================================================
   FAQ
========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(function (item) {

    const question =
        item.querySelector(".faq-question");

    if (!question) {
        return;
    }

    question.addEventListener(
        "click",
        function () {

            const wasActive =
                item.classList.contains("active");


            faqItems.forEach(function (otherItem) {

                otherItem.classList.remove(
                    "active"
                );

            });


            if (!wasActive) {

                item.classList.add(
                    "active"
                );

            }

        }
    );

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(
                    function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -30px 0px"
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.querySelector(".back-to-top");


if (backToTop) {

    backToTop.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU WHEN RESIZING
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 760 &&
            mobileMenu
        ) {

            mobileMenu.classList.remove(
                "active"
            );

        }

    },
    {
        passive: true
    }
);