(() => {
    "use strict";

    /* =========================================================
       DOM
    ========================================================= */

    const html = document.documentElement;
    const body = document.body;

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

    const prefersReducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = () => window.innerWidth <= 760;


    /* =========================================================
       STATE
    ========================================================= */

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
    let themeCloseTimer = null;
    let themeBusy = false;

    let scrollTicking = false;


    /* =========================================================
       THEME
    ========================================================= */

    function updateThemeIcons() {
        const icon = theme === "light" ? "☀" : "☾";

        document
            .querySelectorAll("#themeIcon, #mobileThemeIcon")
            .forEach((element) => {
                element.textContent = icon;
            });
    }


    function applyTheme(value) {
        theme = value;

        html.dataset.theme = value;

        localStorage.setItem("site-theme", value);

        updateThemeIcons();
    }


    /* =========================================================
       THEME ANIMATION SCENE
    ========================================================= */

    function createThemeScene() {
        if (themeScene) {
            return themeScene;
        }

        themeScene = document.createElement("div");

        themeScene.className = "theme-switch-scene";

        themeScene.setAttribute("aria-hidden", "true");

        themeScene.innerHTML = `
            <div class="theme-switch-track"></div>

            <div class="theme-switch-hole">
                <span></span>
            </div>

            <span class="theme-switch-person">
                <i class="head"></i>
                <i class="body"></i>

                <i class="arm arm-left"></i>
                <i class="arm arm-right"></i>

                <i class="leg leg-left"></i>
                <i class="leg leg-right"></i>
            </span>
        `;

        body.appendChild(themeScene);

        return themeScene;
    }


    function getActiveThemeButton() {
        if (isMobile()) {
            return (
                document.getElementById("mobileThemeToggle") ||
                document.getElementById("themeToggle")
            );
        }

        return (
            document.getElementById("themeToggle") ||
            document.getElementById("mobileThemeToggle")
        );
    }


    function positionThemeScene(button) {
        if (!button || !themeScene) {
            return;
        }

        const rect = button.getBoundingClientRect();

        const mobile = isMobile();

        const width = mobile ? 148 : 164;
        const height = mobile ? 52 : 58;

        /*
         * بداية المشهد من نفس مكان زر تغيير الوضع
         * عشان الشخصية تبان وكأنها خارجة من الزر نفسه.
         */

        let left = rect.left;
        let top =
            rect.top +
            rect.height / 2 -
            height / 2;

        /*
         * منع خروج الأنيميشن من الشاشة
         */

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

        themeScene.style.width = `${width}px`;
        themeScene.style.height = `${height}px`;
    }


    function clearThemeTimers() {
        if (themeTimer) {
            clearTimeout(themeTimer);
            themeTimer = null;
        }

        if (themeCloseTimer) {
            clearTimeout(themeCloseTimer);
            themeCloseTimer = null;
        }
    }


    function closeThemeScene() {
        clearThemeTimers();

        if (themeScene) {
            themeScene.className = "theme-switch-scene";
            themeScene.setAttribute("aria-hidden", "true");
        }

        themeButtons.forEach((button) => {
            button.disabled = false;
            button.removeAttribute("aria-busy");
            button.classList.remove("theme-animating");
        });

        themeBusy = false;
    }


    function toggleTheme(button) {
        if (!button || themeBusy) {
            return;
        }

        const nextTheme =
            theme === "light"
                ? "dark"
                : "light";


        /* -----------------------------------------
           Reduced Motion
        ----------------------------------------- */

        if (prefersReducedMotion) {
            applyTheme(nextTheme);
            return;
        }


        themeBusy = true;

        clearThemeTimers();


        /*
         * تعطيل الأزرار أثناء الحركة
         * لمنع الضغط المتكرر.
         */

        themeButtons.forEach((item) => {
            item.disabled = true;

            item.setAttribute(
                "aria-busy",
                "true"
            );

            item.classList.add(
                "theme-animating"
            );
        });


        const scene = createThemeScene();


        /*
         * DARK:
         * الشخصية تبدأ من الزر وتمشي ناحية الحفرة
         *
         * LIGHT:
         * الشخصية تظهر من الحفرة وتمشي ناحية الزر
         */

        const animationClass =
            nextTheme === "dark"
                ? "to-dark"
                : "to-light";


        scene.className =
            `theme-switch-scene ${animationClass}`;


        scene.setAttribute(
            "aria-hidden",
            "false"
        );


        positionThemeScene(button);


        /*
         * إجبار المتصفح على رسم الوضع الأول
         * قبل تشغيل الحركة.
         */

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                scene.classList.add("is-visible");
            });
        });


        /* -----------------------------------------
           توقيت تغيير الوضع
        ----------------------------------------- */

        const themeChangeDelay =
            nextTheme === "dark"
                ? 720
                : 830;


        themeTimer = window.setTimeout(() => {
            applyTheme(nextTheme);
        }, themeChangeDelay);


        /* -----------------------------------------
           إنهاء المشهد
        ----------------------------------------- */

        const closeDelay =
            nextTheme === "dark"
                ? 960
                : 1080;


        themeCloseTimer = window.setTimeout(() => {
            closeThemeScene();
        }, closeDelay);
    }


    /* =========================================================
       LANGUAGE
    ========================================================= */

    function applyLanguage(value) {
        language = value;

        const arabic = value === "ar";


        html.lang = arabic
            ? "ar"
            : "en";

        html.dir = arabic
            ? "rtl"
            : "ltr";


        /*
         * تغيير كل العناصر التي تحتوي
         * data-ar / data-en
         */

        document
            .querySelectorAll("[data-ar][data-en]")
            .forEach((element) => {
                element.textContent = arabic
                    ? element.dataset.ar
                    : element.dataset.en;
            });


        /*
         * تحديث زر اللغة
         */

        languageButtons.forEach((button) => {
            button.textContent = arabic
                ? "EN"
                : "AR";

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
       HEADER
    ========================================================= */

    function updateHeader() {
        if (!header) {
            return;
        }

        const shouldScroll =
            window.scrollY > 18;

        header.classList.toggle(
            "scrolled",
            shouldScroll
        );
    }


    function requestHeaderUpdate() {
        if (scrollTicking) {
            return;
        }

        scrollTicking = true;

        window.requestAnimationFrame(() => {
            updateHeader();

            scrollTicking = false;
        });
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
        if (!mobileMenuButton || !mobileMenu) {
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


        /*
         * إغلاق القائمة بعد الضغط على أي رابط
         */

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
        const faqItems =
            document.querySelectorAll(
                ".faq-item"
            );

        if (!faqItems.length) {
            return;
        }


        faqItems.forEach((item) => {
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
                    const isOpen =
                        item.classList.contains(
                            "active"
                        );


                    /*
                     * إغلاق باقي الأسئلة
                     */

                    faqItems.forEach((other) => {
                        if (other !== item) {
                            other.classList.remove(
                                "active"
                            );
                        }
                    });


                    /*
                     * فتح السؤال الحالي
                     */

                    if (!isOpen) {
                        item.classList.add(
                            "active"
                        );
                    }
                }
            );
        });
    }


    /* =========================================================
       REVEAL ANIMATIONS
       Performance friendly
    ========================================================= */

    function initReveal() {
        const elements =
            document.querySelectorAll(
                ".reveal"
            );

        if (!elements.length) {
            return;
        }


        /*
         * لو الجهاز يفضل تقليل الحركة
         * أو المتصفح لا يدعم IntersectionObserver
         */

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

                    entries.forEach((entry) => {

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
                    });

                },
                {
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -32px 0px"
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

                /*
                 * Auto بدل smooth
                 * عشان الموبايل مايحصلش فيه تقطيع.
                 */

                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "auto"
                });
            }
        );
    }


    /* =========================================================
       THEME BUTTONS
    ========================================================= */

    themeButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {
                toggleTheme(button);
            }
        );

    });


    /* =========================================================
       LANGUAGE BUTTONS
    ========================================================= */

    languageButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const nextLanguage =
                    language === "ar"
                        ? "en"
                        : "ar";


                applyLanguage(
                    nextLanguage
                );


                /*
                 * لو زر اللغة داخل القائمة
                 * نقفل القائمة بعد التغيير.
                 */

                closeMobileMenu();
            }
        );

    });


    /* =========================================================
       SCROLL
       Passive + requestAnimationFrame
       لتقليل الضغط على الموبايل
    ========================================================= */

    window.addEventListener(
        "scroll",
        requestHeaderUpdate,
        {
            passive: true
        }
    );


    /* =========================================================
       RESIZE
    ========================================================= */

    let resizeTimer = null;

    window.addEventListener(
        "resize",
        () => {

            if (resizeTimer) {
                clearTimeout(
                    resizeTimer
                );
            }


            resizeTimer =
                window.setTimeout(() => {

                    if (themeBusy) {

                        const button =
                            getActiveThemeButton();

                        positionThemeScene(
                            button
                        );
                    }


                    /*
                     * إغلاق القائمة عند الانتقال
                     * من الموبايل للديسكتوب.
                     */

                    if (
                        window.innerWidth > 760
                    ) {
                        closeMobileMenu();
                    }

                }, 80);

        },
        {
            passive: true
        }
    );


    /* =========================================================
       PAGE VISIBILITY
       لو المستخدم خرج من التاب أثناء الأنيميشن
       ننظف الحركة ونمنع أي حالة معلقة.
    ========================================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden &&
                themeBusy
            ) {
                closeThemeScene();
            }

        }
    );


    /* =========================================================
       INITIALIZE
    ========================================================= */

    applyTheme(theme);

    applyLanguage(language);

    updateHeader();

    initMobileMenu();

    initFAQ();

    initReveal();

    initBackToTop();

})();