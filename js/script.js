(() => {
    "use strict";

    const html = document.documentElement;
    const header = document.getElementById("header");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuButton = document.getElementById("mobileMenuButton");

    const themeButtons = [
        document.getElementById("themeToggle"),
        document.getElementById("mobileThemeToggle")
    ].filter(Boolean);

    const languageButtons = [
        document.getElementById("languageToggle"),
        document.getElementById("mobileLanguageToggle")
    ].filter(Boolean);

    const prefersReducedMotion =
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let theme =
        localStorage.getItem("site-theme") === "light"
            ? "light"
            : "dark";

    let language =
        localStorage.getItem("site-language") === "en"
            ? "en"
            : "ar";

    let themeScene = null;
    let themeTimer = null;
    let themeBusy = false;

    /* =========================================================
       THEME
    ========================================================= */

    function applyTheme(value) {
        theme = value;

        html.dataset.theme = value;

        localStorage.setItem("site-theme", value);

        const icon = value === "light" ? "☀" : "☾";

        document
            .querySelectorAll("#themeIcon, #mobileThemeIcon")
            .forEach((element) => {
                element.textContent = icon;
            });
    }

    function createThemeScene() {
        if (themeScene) {
            return themeScene;
        }

        themeScene = document.createElement("div");

        themeScene.className = "theme-switch-scene";

        themeScene.setAttribute("aria-hidden", "true");

        themeScene.innerHTML = `
            <div class="theme-switch-track"></div>
            <div class="theme-switch-hole"></div>

            <span class="theme-switch-person">
                <i class="head"></i>
                <i class="body"></i>
                <i class="arm arm-left"></i>
                <i class="arm arm-right"></i>
                <i class="leg leg-left"></i>
                <i class="leg leg-right"></i>
            </span>
        `;

        document.body.appendChild(themeScene);

        return themeScene;
    }

    function positionThemeScene(button) {
        if (!button || !themeScene) {
            return;
        }

        const rect = button.getBoundingClientRect();

        const mobile = window.innerWidth <= 760;

        const width = mobile ? 148 : 158;
        const height = mobile ? 52 : 56;

        let left = rect.left - 2;

        let top =
            rect.top +
            rect.height / 2 -
            height / 2;

        left = Math.max(
            4,
            Math.min(
                left,
                window.innerWidth - width - 4
            )
        );

        top = Math.max(
            4,
            Math.min(
                top,
                window.innerHeight - height - 4
            )
        );

        themeScene.style.left = `${left}px`;
        themeScene.style.top = `${top}px`;
    }

    function closeThemeScene() {
        if (themeTimer) {
            clearTimeout(themeTimer);
        }

        themeTimer = null;

        if (themeScene) {
            themeScene.className = "theme-switch-scene";

            themeScene.setAttribute(
                "aria-hidden",
                "true"
            );
        }

        themeButtons.forEach((button) => {
            button.disabled = false;
            button.removeAttribute("aria-busy");
        });

        themeBusy = false;
    }

    function toggleTheme(button) {
        if (themeBusy || !button) {
            return;
        }

        const nextTheme =
            theme === "light"
                ? "dark"
                : "light";

        if (prefersReducedMotion) {
            applyTheme(nextTheme);
            return;
        }

        themeBusy = true;

        themeButtons.forEach((item) => {
            item.disabled = true;
            item.setAttribute("aria-busy", "true");
        });

        const scene = createThemeScene();

        scene.className =
            `theme-switch-scene ${
                nextTheme === "dark"
                    ? "to-dark"
                    : "to-light"
            }`;

        scene.setAttribute(
            "aria-hidden",
            "false"
        );

        positionThemeScene(button);

        requestAnimationFrame(() => {
            scene.classList.add("is-visible");
        });

        themeTimer = window.setTimeout(() => {
            applyTheme(nextTheme);
        }, nextTheme === "dark" ? 720 : 830);

        window.setTimeout(() => {
            closeThemeScene();
        }, nextTheme === "dark" ? 940 : 1060);
    }

    /* =========================================================
       LANGUAGE
    ========================================================= */

    function applyLanguage(value) {
        language = value;

        const arabic = value === "ar";

        html.lang = arabic ? "ar" : "en";
        html.dir = arabic ? "rtl" : "ltr";

        document
            .querySelectorAll("[data-ar][data-en]")
            .forEach((element) => {
                element.textContent =
                    arabic
                        ? element.dataset.ar
                        : element.dataset.en;
            });

        languageButtons.forEach((button) => {
            button.textContent =
                arabic ? "EN" : "AR";

            button.setAttribute(
                "aria-label",
                arabic
                    ? "Switch to English"
                    : "التبديل إلى العربية"
            );
        });

        localStorage.setItem(
            "site-language",
            value
        );
    }

    /* =========================================================
       MOBILE HEADER CONTROLS
    ========================================================= */

    function moveMobileControlsToHeader() {
        const controls =
            document.querySelector(
                ".mobile-theme-controls"
            );

        const navContainer =
            document.querySelector(
                ".nav-container"
            );

        const menuButton =
            document.getElementById(
                "mobileMenuButton"
            );

        if (
            !controls ||
            !navContainer ||
            !menuButton
        ) {
            return;
        }

        /*
         * Move the existing controls only once.
         * This prevents duplicate buttons.
         */
        if (
            controls.parentElement !==
            navContainer
        ) {
            navContainer.insertBefore(
                controls,
                menuButton
            );
        }
    }

    /* =========================================================
       HEADER
    ========================================================= */

    function initHeaderState() {
        if (!header) {
            return;
        }

        const marker =
            document.createElement("div");

        marker.setAttribute(
            "aria-hidden",
            "true"
        );

        marker.style.position =
            "absolute";

        marker.style.top = "18px";
        marker.style.width = "1px";
        marker.style.height = "1px";

        marker.style.pointerEvents =
            "none";

        document.body.prepend(marker);

        if (
            !("IntersectionObserver" in window)
        ) {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 18
            );

            return;
        }

        const observer =
            new IntersectionObserver(
                ([entry]) => {
                    header.classList.toggle(
                        "scrolled",
                        !entry.isIntersecting
                    );
                },
                {
                    threshold: 0
                }
            );

        observer.observe(marker);
    }

    /* =========================================================
       MOBILE MENU
    ========================================================= */

    function closeMobileMenu() {
        if (!mobileMenu) {
            return;
        }

        mobileMenu.classList.remove(
            "active"
        );

        mobileMenuButton?.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    function initMobileMenu() {
        if (
            !mobileMenuButton ||
            !mobileMenu
        ) {
            return;
        }

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenuButton.addEventListener(
            "click",
            () => {
                const open =
                    mobileMenu.classList.toggle(
                        "active"
                    );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    String(open)
                );
            }
        );

        mobileMenu
            .querySelectorAll("a")
            .forEach((link) => {
                link.addEventListener(
                    "click",
                    closeMobileMenu
                );
            });
    }

    /* =========================================================
       FAQ
    ========================================================= */

    function initFAQ() {
        document
            .querySelectorAll(".faq-item")
            .forEach((item) => {
                const button =
                    item.querySelector(
                        ".faq-question"
                    );

                if (!button) {
                    return;
                }

                button.addEventListener(
                    "click",
                    () => {
                        const open =
                            item.classList.contains(
                                "active"
                            );

                        document
                            .querySelectorAll(
                                ".faq-item.active"
                            )
                            .forEach(
                                (other) => {
                                    other.classList.remove(
                                        "active"
                                    );
                                }
                            );

                        if (!open) {
                            item.classList.add(
                                "active"
                            );
                        }
                    }
                );
            });
    }

    /* =========================================================
       REVEAL ANIMATION
    ========================================================= */

    function initReveal() {
        const elements =
            document.querySelectorAll(
                ".reveal"
            );

        if (
            prefersReducedMotion ||
            !("IntersectionObserver" in window)
        ) {
            elements.forEach((element) => {
                element.classList.add(
                    "visible"
                );
            });

            return;
        }

        const observer =
            new IntersectionObserver(
                (entries, instance) => {
                    entries.forEach(
                        (entry) => {
                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            entry.target.classList.add(
                                "visible"
                            );

                            instance.unobserve(
                                entry.target
                            );
                        }
                    );
                },
                {
                    threshold: 0.08,
                    rootMargin:
                        "0px 0px -24px 0px"
                }
            );

        elements.forEach((element) => {
            observer.observe(element);
        });
    }

    /* =========================================================
       BACK TO TOP
    ========================================================= */

    function initBackToTop() {
        const button =
            document.querySelector(
                ".back-to-top"
            );

        if (!button) {
            return;
        }

        button.addEventListener(
            "click",
            (event) => {
                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "auto"
                });
            }
        );
    }

    /* =========================================================
       EVENTS
    ========================================================= */

    themeButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => toggleTheme(button)
        );
    });

    languageButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                applyLanguage(
                    language === "ar"
                        ? "en"
                        : "ar"
                );

                closeMobileMenu();
            }
        );
    });

    window.addEventListener(
        "resize",
        () => {
            if (themeBusy) {
                const button =
                    window.innerWidth <= 760
                        ? document.getElementById(
                              "mobileThemeToggle"
                          )
                        : document.getElementById(
                              "themeToggle"
                          );

                positionThemeScene(button);
            }

            if (window.innerWidth > 760) {
                closeMobileMenu();
            }
        },
        { passive: true }
    );

    /* =========================================================
       INIT
    ========================================================= */

    moveMobileControlsToHeader();

    applyTheme(theme);
    applyLanguage(language);

    initHeaderState();
    initMobileMenu();
    initFAQ();
    initReveal();
    initBackToTop();
})();