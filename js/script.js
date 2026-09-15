/* =========================================================
   ISLAM QADRY WEBSITE
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const languageToggle = document.getElementById("languageToggle");
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const year = document.getElementById("year");

    const galleryTrack = document.getElementById("galleryTrack");
    const galleryPrev = document.getElementById("galleryPrev");
    const galleryNext = document.getElementById("galleryNext");


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       TRANSLATIONS
       ===================================================== */

    const translations = {

        ar: {

            metaTitle:
                "د. إسلام قدري | الصحة النفسية والإرشاد الأسري",

            metaDescription:
                "الموقع الرسمي لد. إسلام قدري في مجال الصحة النفسية والإرشاد الأسري.",

            doctorName:
                "د. إسلام قدري",

            doctorField:
                "الصحة النفسية والإرشاد الأسري",

            navHome:
                "الرئيسية",

            navAbout:
                "عن الدكتور",

            navServices:
                "المجالات",

            navPackages:
                "الباقات",

            navGallery:
                "الصور",

            navVideos:
                "الفيديوهات",

            navContact:
                "تواصل",

            bookNow:
                "احجز الآن",

            heroEyebrow:
                "الصحة النفسية تستحق الاهتمام",

            heroTitle:
                "مساحة آمنة لفهم نفسك وبناء خطوات أوضح.",

            heroText:
                "د. إسلام قدري، متخصص في مجالات الصحة النفسية والإرشاد الأسري، مع اهتمام بالمشكلات النفسية والعلاقات ودعم رحلة التغيير.",

            heroBook:
                "احجز جلستك",

            heroAbout:
                "تعرف على الدكتور",

            aboutTitle:
                "عن د. إسلام قدري",

            aboutIntro:
                "نبذة تعريفية عن الدكتور ومجالات عمله والمؤهلات المهنية.",

            aboutCardTitle:
                "نبذة مهنية",

            aboutCardText:
                "د. إسلام قدري إسماعيل يعمل في مجال الصحة النفسية والإرشاد الأسري، ويقدم محتوى واستشارات في عدد من المجالات النفسية والأسرية.",

            factName:
                "الاسم",

            factField:
                "المجال",

            factSpecialty:
                "التخصصات",

            factSpecialtyValue:
                "المشكلات والاضطرابات النفسية واضطرابات الشخصية",

            factPhone:
                "الهاتف",

            credentialsTitle:
                "المؤهلات",

            britishBoard:
                "Certificate of Excellence in Professional Study",

            messageSmall:
                "أحيانًا الكلام هو أول خطوة",

            messageTitle:
                "مش كل وجع بيبان... ومش كل حاجة تقدر تحكيها لأي حد.",

            messageText:
                "خُد وقتك، افهم اللي جواك، وابدأ خطوة جديدة في مساحة قائمة على الاستماع والخصوصية.",

            startContact:
                "ابدأ التواصل",

            servicesTitle:
                "المجالات والاستشارات",

            servicesIntro:
                "مجالات قابلة للتعديل والاعتماد النهائي قبل إطلاق الموقع.",

            service1Title:
                "الصحة النفسية",

            service1Text:
                "دعم واستشارات في مجالات الصحة النفسية والمشكلات الانفعالية.",

            service2Title:
                "الاضطرابات النفسية",

            service2Text:
                "قسم مخصص للتعريف بالمشكلات والاضطرابات التي يحددها الدكتور.",

            service3Title:
                "اضطرابات الشخصية",

            service3Text:
                "محتوى تعريفي حول اضطرابات الشخصية ومجالات التعامل معها.",

            service4Title:
                "الإرشاد الأسري",

            service4Text:
                "استشارات ومحتوى متعلق بالعلاقات والتواصل والمشكلات الأسرية.",

            packagesTitle:
                "الجلسات والباقات",

            packagesIntro:
                "الأسعار حاليًا 0 جنيه كقيم مؤقتة حتى يتم تعديلها.",

            sessionLabel:
                "جلسة",

            packageLabel:
                "باقة",

            customLabel:
                "مخصصة",

            currency:
                "جنيه",

            package1Title:
                "جلسة فردية",

            package1Text:
                "جلسة استشارية فردية.",

            package1Li1:
                "جلسة فردية",

            package1Li2:
                "التفاصيل تحدد لاحقًا",

            package1Li3:
                "الحجز عبر الهاتف",

            package2Title:
                "باقة 4 جلسات",

            package2Text:
                "باقة قابلة للتعديل حسب نظام الدكتور.",

            package2Li1:
                "4 جلسات",

            package2Li2:
                "تفاصيل الباقة تحدد لاحقًا",

            package2Li3:
                "السعر قابل للتعديل",

            package3Title:
                "باقة مخصصة",

            package3Text:
                "يتم تحديد محتوى الباقة والسعر لاحقًا.",

            package3Li1:
                "خدمة قابلة للتخصيص",

            package3Li2:
                "تفاصيل تحدد لاحقًا",

            package3Li3:
                "السعر قابل للتعديل",

            popular:
                "الأكثر طلبًا",

            askPackage:
                "استفسر عن الباقة",

            contactNow:
                "تواصل الآن",

            galleryTitle:
                "معرض الصور",

            galleryIntro:
                "الأماكن جاهزة لإضافة صور الدكتور والعيادة والشهادات لاحقًا.",

            gallery1:
                "صورة الدكتور",

            gallery2:
                "صورة من العيادة",

            gallery3:
                "الشهادات",

            gallery4:
                "صورة إضافية",

            addLater:
                "ستضاف لاحقًا",

            videosTitle:
                "فيديوهات الدكتور",

            videosIntro:
                "أماكن جاهزة لإضافة فيديوهات الدكتور لاحقًا.",

            video1:
                "فيديو 01",

            video2:
                "فيديو 02",

            video3:
                "فيديو 03",

            faqTitle:
                "الأسئلة الشائعة",

            faqIntro:
                "إجابات مبدئية يمكن تحديثها بعد تحديد نظام الحجز والأسعار.",

            faq1Question:
                "كيف يمكن حجز جلسة؟",

            faq1Answer:
                "يمكنك التواصل مباشرة عبر الرقم 01000297411 لمعرفة المواعيد والتفاصيل.",

            faq2Question:
                "ما أسعار الجلسات؟",

            faq2Answer:
                "الأسعار الحالية مؤقتة وستتم إضافتها وتحديثها قبل إطلاق الموقع بشكل نهائي.",

            faq3Question:
                "هل توجد جلسات أونلاين؟",

            faq3Answer:
                "سيتم توضيح نوع الجلسات المتاحة وطريقة تقديمها بعد اعتماد نظام الحجز النهائي.",

            ctaSmall:
                "جاهز تبدأ؟",

            ctaTitle:
                "أول خطوة تبدأ بكلمة.",

            ctaText:
                "للتواصل والاستفسار عن الجلسات والمواعيد.",

            contactTitle:
                "تواصل",

            quickLinks:
                "روابط سريعة",

            footerDescription:
                "الموقع التعريفي الرسمي لد. إسلام قدري.",

            rights:
                "جميع الحقوق محفوظة"
        },


        en: {

            metaTitle:
                "Dr. Islam Qadry | Mental Health & Family Counseling",

            metaDescription:
                "The official website of Dr. Islam Qadry for mental health and family counseling.",

            doctorName:
                "Dr. Islam Qadry",

            doctorField:
                "Mental Health & Family Counseling",

            navHome:
                "Home",

            navAbout:
                "About",

            navServices:
                "Services",

            navPackages:
                "Packages",

            navGallery:
                "Gallery",

            navVideos:
                "Videos",

            navContact:
                "Contact",

            bookNow:
                "Book Now",

            heroEyebrow:
                "Your mental health matters",

            heroTitle:
                "A safe space to understand yourself and move forward.",

            heroText:
                "Dr. Islam Qadry works in mental health and family counseling, with a focus on psychological concerns, relationships, and personal change.",

            heroBook:
                "Book a Session",

            heroAbout:
                "Meet the Doctor",

            aboutTitle:
                "About Dr. Islam Qadry",

            aboutIntro:
                "A professional introduction to the doctor, areas of practice, and qualifications.",

            aboutCardTitle:
                "Professional Profile",

            aboutCardText:
                "Dr. Islam Qadry Ismail works in mental health and family counseling and provides educational content and consultations across psychological and family-related areas.",

            factName:
                "Name",

            factField:
                "Field",

            factSpecialty:
                "Specialties",

            factSpecialtyValue:
                "Psychological concerns, mental disorders, and personality disorders",

            factPhone:
                "Phone",

            credentialsTitle:
                "Qualifications",

            britishBoard:
                "Certificate of Excellence in Professional Study",

            messageSmall:
                "Sometimes speaking is the first step",

            messageTitle:
                "Not every struggle is visible, and not everything is easy to share.",

            messageText:
                "Take your time, understand what you are going through, and take a new step in a space built around listening and privacy.",

            startContact:
                "Start a Conversation",

            servicesTitle:
                "Areas of Practice",

            servicesIntro:
                "These areas can be updated and finalized before launch.",

            service1Title:
                "Mental Health",

            service1Text:
                "Support and consultations related to mental health and emotional concerns.",

            service2Title:
                "Mental Disorders",

            service2Text:
                "A dedicated section for psychological conditions and concerns defined by the doctor.",

            service3Title:
                "Personality Disorders",

            service3Text:
                "Educational content about personality disorders and related areas.",

            service4Title:
                "Family Counseling",

            service4Text:
                "Consultations and educational content related to relationships, communication, and family concerns.",

            packagesTitle:
                "Sessions & Packages",

            packagesIntro:
                "Prices are currently set to 0 as temporary placeholders.",

            sessionLabel:
                "Session",

            packageLabel:
                "Package",

            customLabel:
                "Custom",

            currency:
                "EGP",

            package1Title:
                "Individual Session",

            package1Text:
                "One individual consultation session.",

            package1Li1:
                "Individual session",

            package1Li2:
                "Details to be finalized",

            package1Li3:
                "Booking by phone",

            package2Title:
                "4-Session Package",

            package2Text:
                "A package that can be adjusted according to the doctor's system.",

            package2Li1:
                "4 sessions",

            package2Li2:
                "Package details to be finalized",

            package2Li3:
                "Price can be updated",

            package3Title:
                "Custom Package",

            package3Text:
                "Package contents and price will be finalized later.",

            package3Li1:
                "Customizable service",

            package3Li2:
                "Details to be finalized",

            package3Li3:
                "Price can be updated",

            popular:
                "Most Popular",

            askPackage:
                "Ask About Package",

            contactNow:
                "Contact Now",

            galleryTitle:
                "Photo Gallery",

            galleryIntro:
                "Ready-to-use spaces for the doctor's photos, clinic photos, and certificates.",

            gallery1:
                "Doctor Photo",

            gallery2:
                "Clinic Photo",

            gallery3:
                "Certificates",

            gallery4:
                "Additional Photo",

            addLater:
                "To be added later",

            videosTitle:
                "Doctor's Videos",

            videosIntro:
                "Ready-to-use spaces for the doctor's videos.",

            video1:
                "Video 01",

            video2:
                "Video 02",

            video3:
                "Video 03",

            faqTitle:
                "Frequently Asked Questions",

            faqIntro:
                "Initial answers that can be updated after finalizing booking and pricing.",

            faq1Question:
                "How can I book a session?",

            faq1Answer:
                "You can contact 01000297411 directly to ask about available appointments and details.",

            faq2Question:
                "How much do sessions cost?",

            faq2Answer:
                "Prices are currently temporary placeholders and will be updated before the final launch.",

            faq3Question:
                "Are online sessions available?",

            faq3Answer:
                "The available session types and delivery method will be clarified after the final booking system is approved.",

            ctaSmall:
                "Ready to start?",

            ctaTitle:
                "The first step starts with a conversation.",

            ctaText:
                "Contact us to ask about sessions and appointments.",

            contactTitle:
                "Contact",

            quickLinks:
                "Quick Links",

            footerDescription:
                "The official informational website of Dr. Islam Qadry.",

            rights:
                "All rights reserved"
        }

    };


    /* =====================================================
       LANGUAGE
       ===================================================== */

    let currentLanguage =
        localStorage.getItem("siteLanguage") || "ar";


    function applyLanguage(language) {

        const dictionary = translations[language];

        if (!dictionary) {
            return;
        }

        document.documentElement.lang = language;

        document.documentElement.dir =
            language === "ar" ? "rtl" : "ltr";

        document.body.classList.toggle(
            "english",
            language === "en"
        );


        document.querySelectorAll("[data-i18n]").forEach((element) => {

            const key = element.getAttribute("data-i18n");

            if (dictionary[key] !== undefined) {
                element.textContent = dictionary[key];
            }

        });


        document
            .querySelectorAll("[data-i18n-content]")
            .forEach((element) => {

                const key =
                    element.getAttribute("data-i18n-content");

                if (dictionary[key] !== undefined) {
                    element.setAttribute(
                        "content",
                        dictionary[key]
                    );
                }

            });


        if (dictionary.metaTitle) {
            document.title = dictionary.metaTitle;
        }


        if (languageToggle) {
            languageToggle.textContent =
                language === "ar" ? "EN" : "AR";
        }


        localStorage.setItem(
            "siteLanguage",
            language
        );

    }


    applyLanguage(currentLanguage);


    if (languageToggle) {

        languageToggle.addEventListener("click", () => {

            currentLanguage =
                currentLanguage === "ar"
                    ? "en"
                    : "ar";

            applyLanguage(currentLanguage);

        });

    }


    /* =====================================================
       THEME
       ===================================================== */

    const savedTheme =
        localStorage.getItem("siteTheme") || "dark";


    function applyTheme(theme) {

        const isLight =
            theme === "light";

        body.classList.toggle(
            "light",
            isLight
        );


        if (themeToggle) {

            themeToggle.textContent =
                isLight ? "☾" : "☀";

            themeToggle.setAttribute(
                "aria-label",
                isLight
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );

        }


        localStorage.setItem(
            "siteTheme",
            theme
        );

    }


    applyTheme(savedTheme);


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const nextTheme =
                body.classList.contains("light")
                    ? "dark"
                    : "light";

            applyTheme(nextTheme);

        });

    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function closeMobileMenu() {

        if (!mobileMenu) {
            return;
        }

        mobileMenu.classList.remove("active");

        body.classList.remove("menu-open");

        if (menuBtn) {
            menuBtn.textContent = "☰";
        }

    }


    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("active");

            body.classList.toggle(
                "menu-open",
                isOpen
            );

            menuBtn.textContent =
                isOpen ? "×" : "☰";

        });


        mobileMenu
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

            });

    }


    /* =====================================================
       HEADER SHADOW ON SCROLL
       ===================================================== */

    const siteHeader =
        document.getElementById("siteHeader");


    function handleHeaderScroll() {

        if (!siteHeader) {
            return;
        }

        if (window.scrollY > 20) {

            siteHeader.style.boxShadow =
                "0 10px 40px rgba(0,0,0,.14)";

        } else {

            siteHeader.style.boxShadow =
                "none";

        }

    }


    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       GALLERY SLIDER
       ===================================================== */

    let galleryIndex = 0;


    function getGalleryCards() {

        if (!galleryTrack) {
            return [];
        }

        return Array.from(
            galleryTrack.children
        );

    }


    function updateGallery() {

        const cards =
            getGalleryCards();

        if (!cards.length) {
            return;
        }

        const firstCard =
            cards[0];

        const cardWidth =
            firstCard.getBoundingClientRect().width;

        const gap =
            parseFloat(
                getComputedStyle(
                    galleryTrack
                ).gap
            ) || 0;


        const direction =
            document.documentElement.dir === "rtl"
                ? 1
                : -1;


        galleryTrack.scrollTo({

            left:
                direction *
                galleryIndex *
                (cardWidth + gap),

            behavior: "smooth"

        });

    }


    function moveGallery(step) {

        const cards =
            getGalleryCards();

        if (!cards.length) {
            return;
        }

        const maxIndex =
            Math.max(
                0,
                cards.length - 1
            );


        galleryIndex += step;


        if (galleryIndex > maxIndex) {
            galleryIndex = 0;
        }


        if (galleryIndex < 0) {
            galleryIndex = maxIndex;
        }


        updateGallery();

    }


    if (galleryNext) {

        galleryNext.addEventListener(
            "click",
            () => moveGallery(1)
        );

    }


    if (galleryPrev) {

        galleryPrev.addEventListener(
            "click",
            () => moveGallery(-1)
        );

    }


    /* =====================================================
       KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }

        }
    );


    /* =====================================================
       SMOOTH ANCHOR FALLBACK
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       RESIZE
       ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                galleryIndex = 0;
                updateGallery();

                if (
                    window.innerWidth > 900
                ) {
                    closeMobileMenu();
                }

            }, 150);

        }
    );

});