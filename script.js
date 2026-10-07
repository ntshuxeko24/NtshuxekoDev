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
             * Prevent the browser from
             * refreshing the page.
             */

            event.preventDefault();


            /* =================================
               GET FORM VALUES
            ================================== */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            /* =================================
               VALIDATION
            ================================== */

            if (!name || !email || !message) {

                showFormMessage(
                    "Please complete all the fields before sending your message.",
                    "error"
                );

                return;
            }


            /* =================================
               EMAIL VALIDATION
            ================================== */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            /* =================================
               CREATE WHATSAPP MESSAGE
            ================================== */

            const whatsappMessage =
                "Hello NtshuxekoDev!" +
                "\n\n" +
                "I would like to discuss a website project." +
                "\n\n" +
                "Name: " +
                name +
                "\n" +
                "Email: " +
                email +
                "\n\n" +
                "Project details:" +
                "\n" +
                message;


            /* =================================
               ENCODE MESSAGE
            ================================== */

            const encodedMessage =
                encodeURIComponent(
                    whatsappMessage
                );


            /* =================================
               WHATSAPP NUMBER
            ================================== */

            const phoneNumber =
                "27768301043";


            /* =================================
               CREATE WHATSAPP URL
            ================================== */

            const whatsappURL =
                "https://wa.me/" +
                phoneNumber +
                "?text=" +
                encodedMessage;


            /* =================================
               SHOW SUCCESS MESSAGE
            ================================== */

            showFormMessage(
                "Your message is ready. Opening WhatsApp...",
                "success"
            );


            /* =================================
               OPEN WHATSAPP
            ================================== */

            setTimeout(
                function () {

                    window.open(
                        whatsappURL,
                        "_blank"
                    );

                },
                500
            );

        }
    );

}


/* ==========================================
   4. FORM MESSAGE
========================================== */

function showFormMessage(message, type) {

    let messageBox =
        document.getElementById(
            "formMessage"
        );


    /*
     * If the message box does not exist,
     * create it automatically.
     */

    if (!messageBox && contactForm) {

        messageBox =
            document.createElement("div");


        messageBox.id =
            "formMessage";


        contactForm.appendChild(
            messageBox
        );

    }


    /*
     * Stop if there is no contact form.
     */

    if (!messageBox) {
        return;
    }


    messageBox.textContent =
        message;


    messageBox.className =
        "form-message " + type;


    /*
     * Automatically remove error
     * messages after five seconds.
     */

    if (type === "error") {

        setTimeout(
            function () {

                messageBox.className =
                    "form-message";


                messageBox.textContent = "";

            },
            5000
        );

    }

}