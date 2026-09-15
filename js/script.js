/* =====================================================
   ISLAM QADRY WEBSITE
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   THEME SYSTEM
===================================================== */

const themeToggle = document.getElementById("themeToggle");


// Get saved theme

const savedTheme = localStorage.getItem("islam-qadry-theme");


// Apply saved theme

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeToggle.textContent = "☾";

} else {

    document.body.classList.remove("light");

    themeToggle.textContent = "☀";

}


// Toggle theme

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");


    const isLight =
        document.body.classList.contains("light");


    if (isLight) {

        localStorage.setItem(
            "islam-qadry-theme",
            "light"
        );

        themeToggle.textContent = "☾";

    } else {

        localStorage.setItem(
            "islam-qadry-theme",
            "dark"
        );

        themeToggle.textContent = "☀";

    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");


menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");


    if (mobileMenu.classList.contains("active")) {

        menuBtn.textContent = "✕";

    } else {

        menuBtn.textContent = "☰";

    }

});


// Close mobile menu when clicking a link

const mobileLinks =
    mobileMenu.querySelectorAll("a");


mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        menuBtn.textContent = "☰";

    });

});


/* =====================================================
   GALLERY SLIDER
===================================================== */

const galleryTrack =
    document.getElementById("galleryTrack");

const galleryPrev =
    document.getElementById("galleryPrev");

const galleryNext =
    document.getElementById("galleryNext");


let galleryPosition = 0;


function updateGallery() {

    /*
       This function is prepared for the
       real gallery images that will be added later.
    */

    galleryTrack.style.transform =
        `translateX(${galleryPosition}px)`;

}


galleryNext.addEventListener("click", () => {

    const maxScroll =
        galleryTrack.scrollWidth -
        galleryTrack.parentElement.clientWidth;

    if (galleryPosition > -maxScroll) {

        galleryPosition -= 320;

        if (galleryPosition < -maxScroll) {

            galleryPosition = -maxScroll;

        }

        updateGallery();

    }

});


galleryPrev.addEventListener("click", () => {

    galleryPosition += 320;

    if (galleryPosition > 0) {

        galleryPosition = 0;

    }

    updateGallery();

});


/* =====================================================
   SCROLL HEADER
===================================================== */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 10px 35px rgba(0,0,0,.12)";

    } else {

        header.style.boxShadow = "none";

    }

});


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".card, .service-card, .package-card, .video-placeholder, .gallery-item, .final-cta"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    observer.observe(element);

});


/* =====================================================
   CURRENT YEAR
===================================================== */

const yearElement =
    document.querySelector(".copyright");


if (yearElement) {

    const currentYear =
        new Date().getFullYear();

    yearElement.textContent =
        `© ${currentYear} د. إسلام قدري — جميع الحقوق محفوظة`;

}


/* =====================================================
   PHONE NUMBER
===================================================== */

const phoneNumber =
    "01000297411";


console.log(
    `Islam Qadry Website Loaded — ${phoneNumber}`
);