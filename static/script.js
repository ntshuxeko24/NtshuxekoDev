
/* ==========================================
   NTSHUXEKODEV JAVASCRIPT
========================================== */


/* ==========================================
   1. CURRENT YEAR
========================================== */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* ==========================================
   2. MOBILE NAVIGATION
========================================== */

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.querySelector(".nav-links");


if (menuButton && navLinks) {

    menuButton.addEventListener(
        "click",
        function () {

            const isOpen =
                navLinks.classList.toggle("active");


            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );


            menuButton.textContent =
                isOpen ? "✕" : "☰";

        }
    );


    /* ======================================
       CLOSE MENU AFTER CLICKING A LINK
    ====================================== */

    const navigationLinks =
        navLinks.querySelectorAll("a");


    navigationLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove("active");


                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );


                menuButton.textContent = "☰";

            }
        );

    });


    /* ======================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ====================================== */

    document.addEventListener(
        "click",
        function (event) {

            const clickedInsideNavigation =
                navLinks.contains(event.target) ||
                menuButton.contains(event.target);


            if (!clickedInsideNavigation) {

                navLinks.classList.remove("active");


                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );


                menuButton.textContent = "☰";

            }

        }
    );

}


/* ==========================================
   3. CONTACT FORM
========================================== */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            /*
             * DO NOT prevent the default form submission.
             *
             * The form will now submit directly to:
             *
             * /submit-enquiry
             *
             * Flask will receive the information
             * and save it to MySQL.
             */

        }
    );

}