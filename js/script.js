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
   THEME + LIGHTWEIGHT WALKING ANIMATION
========================================================= */

const savedTheme = localStorage.getItem("site-theme") === "light"
    ? "light"
    : "dark";

let currentTheme = savedTheme;
let themeAnimationTimer = null;
let themeAnimationRunning = false;

function setTheme(theme) {
    currentTheme = theme;

    html.setAttribute("data-theme", theme);
    localStorage.setItem("site-theme", theme);

    const icon = theme === "light" ? "☀" : "☾";

    if (themeIcon) {
        themeIcon.textContent = icon;
    }

    const mobileIcon = document.getElementById("mobileThemeIcon");

    if (mobileIcon) {
        mobileIcon.textContent = icon;
    }
}

setTheme(savedTheme);


function createThemeScene() {

    if (document.getElementById("themeSwitchScene")) {
        return document.getElementById("themeSwitchScene");
    }

    const scene = document.createElement("div");

    scene.id = "themeSwitchScene";
    scene.className = "theme-switch-scene";

    scene.setAttribute(
        "aria-hidden",
        "true"
    );

    scene.innerHTML = `
        <div class="theme-switch-card">

            <div class="theme-switch-sky"></div>

            <div class="theme-switch-sun"></div>

            <div class="theme-switch-ground"></div>

            <div class="theme-switch-hole">
                <span></span>
            </div>

            <div class="theme-switch-target"></div>

            <div
                class="theme-switch-person"
                aria-hidden="true"
            >
                <i class="head"></i>
                <i class="body"></i>
                <i class="arm arm-left"></i>
                <i class="arm arm-right"></i>
                <i class="leg leg-left"></i>
                <i class="leg leg-right"></i>
            </div>

        </div>
    `;

    document.body.appendChild(scene);

    return scene;
}


function positionThemeScene(button, scene) {

    if (!button || !scene) {
        return;
    }

    const rect =
        button.getBoundingClientRect();

    const mobile =
        window.innerWidth <= 760;

    const width =
        mobile ? 230 : 270;

    const height =
        mobile ? 132 : 150;

    let left =
        rect.left +
        (rect.width / 2) -
        (width / 2);

    let top =
        rect.bottom + 10;

    if (
        top + height >
        window.innerHeight - 8
    ) {
        top =
            rect.top -
            height -
            10;
    }

    left =
        Math.max(
            8,
            Math.min(
                left,
                window.innerWidth -
                width -
                8
            )
        );

    top =
        Math.max(
            8,
            Math.min(
                top,
                window.innerHeight -
                height -
                8
            )
        );

    scene.style.left =
        `${left}px`;

    scene.style.top =
        `${top}px`;
}


function runThemeAnimation(button) {

    if (
        themeAnimationRunning ||
        !button
    ) {
        return;
    }

    const scene =
        createThemeScene();

    const goingDark =
        currentTheme === "light";

    const nextTheme =
        goingDark
            ? "dark"
            : "light";

    themeAnimationRunning = true;

    button.disabled = true;

    scene.className =
        "theme-switch-scene";

    scene.classList.add(
        goingDark
            ? "to-dark"
            : "to-light"
    );

    if (!goingDark) {
        scene.classList.add(
            "light-stage"
        );
    }

    positionThemeScene(
        button,
        scene
    );

    void scene.offsetWidth;

    scene.classList.add(
        "is-visible"
    );

    if (themeAnimationTimer) {
        clearTimeout(
            themeAnimationTimer
        );
    }


    /*
        Light → Dark:
        الشخص يقع في الحفرة
        وبعدها الوضع يتحول إلى Dark.

        Dark → Light:
        الشخص يطلع من الحفرة
        ويمشي للزر
        وبعدها الوضع يتحول إلى Light.
    */

    themeAnimationTimer =
        setTimeout(
            function () {

                setTheme(
                    nextTheme
                );

            },
            goingDark
                ? 930
                : 1060
        );


    themeAnimationTimer =
        setTimeout(
            function () {

                scene.classList.remove(
                    "is-visible",
                    "to-dark",
                    "to-light",
                    "light-stage"
                );

                scene.setAttribute(
                    "aria-hidden",
                    "true"
                );

                button.disabled =
                    false;

                themeAnimationRunning =
                    false;

            },
            goingDark
                ? 1180
                : 1260
        );
}


function bindThemeButton(button) {

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function () {

            runThemeAnimation(
                button
            );

        }
    );
}


bindThemeButton(
    themeToggle
);

bindThemeButton(
    document.getElementById(
        "mobileThemeToggle"
    )
);


window.addEventListener(
    "resize",
    function () {

        if (!themeAnimationRunning) {
            return;
        }

        const scene =
            document.getElementById(
                "themeSwitchScene"
            );

        const activeButton =
            window.innerWidth <= 760
                ? document.getElementById(
                    "mobileThemeToggle"
                )
                : themeToggle;

        positionThemeScene(
            activeButton,
            scene
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage =
    localStorage.getItem(
        "site-language"
    ) || "ar";


function updateLanguage(language) {

    currentLanguage =
        language;

    const isArabic =
        language === "ar";


    html.setAttribute(
        "lang",
        isArabic
            ? "ar"
            : "en"
    );

    html.setAttribute(
        "dir",
        isArabic
            ? "rtl"
            : "ltr"
    );


    const elements =
        document.querySelectorAll(
            "[data-ar][data-en]"
        );


    elements.forEach(
        function (element) {

            const text =
                isArabic
                    ? element.getAttribute(
                        "data-ar"
                    )
                    : element.getAttribute(
                        "data-en"
                    );

            if (text !== null) {

                element.textContent =
                    text;

            }

        }
    );


    const languageButtons = [
        languageToggle,
        document.getElementById(
            "mobileLanguageToggle"
        )
    ].filter(Boolean);


    languageButtons.forEach(
        function (button) {

            button.textContent =
                isArabic
                    ? "EN"
                    : "AR";

            button.setAttribute(
                "aria-label",
                isArabic
                    ? "Switch to English"
                    : "التبديل إلى العربية"
            );

        }
    );


    localStorage.setItem(
        "site-language",
        language
    );
}


updateLanguage(
    currentLanguage
);


const languageButtons = [
    languageToggle,
    document.getElementById(
        "mobileLanguageToggle"
    )
].filter(Boolean);


languageButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const newLanguage =
                    currentLanguage === "ar"
                        ? "en"
                        : "ar";

                updateLanguage(
                    newLanguage
                );

            }
        );

    }
);


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

            mobileMenu.classList.toggle(
                "active"
            );

        }
    );


    const mobileLinks =
        mobileMenu.querySelectorAll(
            "a"
        );


    mobileLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }
            );

        }
    );

}


/* =========================================================
   HEADER ON SCROLL
========================================================= */

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 20) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

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
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(
    function (item) {

        const question =
            item.querySelector(
                ".faq-question"
            );

        if (!question) {
            return;
        }


        question.addEventListener(
            "click",
            function () {

                const wasActive =
                    item.classList.contains(
                        "active"
                    );


                faqItems.forEach(
                    function (otherItem) {

                        otherItem.classList.remove(
                            "active"
                        );

                    }
                );


                if (!wasActive) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (
                entries,
                observer
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {
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
                rootMargin:
                    "0px 0px -30px 0px"
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
    document.querySelector(
        ".back-to-top"
    );


if (backToTop) {

    backToTop.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "auto"
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