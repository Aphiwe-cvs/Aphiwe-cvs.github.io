// INKANYEZI EVENTS - MAIN JAVASCRIPT FILE

document.addEventListener("DOMContentLoaded", function () {

    // ------------------------------------------------
    // 1. MOBILE NAVIGATION
    // ------------------------------------------------

    var navigation = document.querySelector("nav");

    if (navigation) {
        var menuButton = document.createElement("button");

        menuButton.textContent = "☰ Menu";
        menuButton.className = "menu-toggle";
        menuButton.setAttribute("aria-expanded", "false");

        navigation.parentNode.insertBefore(menuButton, navigation);

        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("show-menu");

            var menuOpen = navigation.classList.contains("show-menu");

            menuButton.setAttribute("aria-expanded", menuOpen);
        });
    }


    // ------------------------------------------------
    // 2. PAGE TITLE AND SEO META DESCRIPTIONS
    // ------------------------------------------------

    var currentPage = window.location.pathname.toLowerCase();

    var pageSEO = {
        "index.html": {
            title: "Inkanyezi Events | Professional Event Planning",
            description: "Discover Inkanyezi Events, offering wedding planning, corporate event management and private celebrations."
        },

        "services.html": {
            title: "Event Planning Services | Inkanyezi Events",
            description: "Explore wedding planning, corporate functions, private parties, event decoration and event management services."
        },

        "gallery.html": {
            title: "Event Photography Gallery | Inkanyezi Events",
            description: "Explore the Inkanyezi Events gallery and view examples of beautiful event celebrations."
        },

        "contact.html": {
            title: "Contact Our Event Planners | Inkanyezi Events",
            description: "Contact Inkanyezi Events to enquire about wedding planning, corporate events and private celebrations."
        },

        "login.html": {
            title: "Client Portal | Inkanyezi Events",
            description: "Visit the Inkanyezi Events client portal."
        }
    };

    for (var page in pageSEO) {
        if (currentPage.endsWith(page)) {
            document.title = pageSEO[page].title;

            var description = document.querySelector(
                'meta[name="description"]'
            );

            if (!description) {
                description = document.createElement("meta");
                description.name = "description";
                document.head.appendChild(description);
            }

            description.content = pageSEO[page].description;
            break;
        }
    }


    // ------------------------------------------------
    // 3. TABS ON THE HOME PAGE
    // ------------------------------------------------

    var main = document.querySelector("main");

    if (currentPage.endsWith("index.html") && main) {

        var tabsSection = document.createElement("section");

        tabsSection.innerHTML = `
            <h2>Discover Our Event Planning</h2>

            <div class="tabs">
                <button class="tab-button active" data-tab="wedding-tab">
                    Weddings
                </button>

                <button class="tab-button" data-tab="corporate-tab">
                    Corporate Events
                </button>

                <button class="tab-button" data-tab="party-tab">
                    Private Parties
                </button>
            </div>

            <div id="wedding-tab" class="tab-panel active">
                <h3>Wedding Planning</h3>
                <p>We create beautiful and memorable weddings
                that reflect your unique love story.</p>
            </div>

            <div id="corporate-tab" class="tab-panel">
                <h3>Corporate Events</h3>
                <p>We organise professional conferences,
                gala dinners and corporate celebrations.</p>
            </div>

            <div id="party-tab" class="tab-panel">
                <h3>Private Celebrations</h3>
                <p>We help organise birthdays, anniversaries
                and other special celebrations.</p>
            </div>
        `;

        main.appendChild(tabsSection);

        var tabButtons = document.querySelectorAll(".tab-button");
        var tabPanels = document.querySelectorAll(".tab-panel");

        tabButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                tabButtons.forEach(function (tab) {
                    tab.classList.remove("active");
                });

                tabPanels.forEach(function (panel) {
                    panel.classList.remove("active");
                });

                button.classList.add("active");

                var selectedTab = document.getElementById(
                    button.getAttribute("data-tab")
                );

                if (selectedTab) {
                    selectedTab.classList.add("active");
                }

            });

        });
    }


    // ------------------------------------------------
    // 4. DYNAMIC SERVICE LIST, SEARCH AND SORTING
    // ------------------------------------------------

    if (currentPage.endsWith("services.html") && main) {

        // Service information is stored in a JavaScript array.

        var services = [
            {
                name: "Wedding Planning",
                description: "Full wedding planning, budget management and coordination.",
                category: "Wedding"
            },

            {
                name: "Corporate Functions",
                description: "Gala dinners, conferences, seminars and company events.",
                category: "Corporate"
            },

            {
                name: "Private Celebrations",
                description: "Birthdays, anniversaries, customised themes and decorations.",
                category: "Private"
            },

            {
                name: "Event Decoration",
                description: "Custom table settings, floral arrangements and backdrops.",
                category: "Decoration"
            },

            {
                name: "Sound and Lighting",
                description: "Sound equipment and lighting for special occasions.",
                category: "Equipment"
            }
        ];

        var serviceSection = document.createElement("section");

        serviceSection.innerHTML = `
            <h2>Explore Our Services</h2>

            <label for="content-search">Search services:</label>

            <input
                type="search"
                id="content-search"
                placeholder="Search for a service..."
            >

            <label for="content-sort">Sort services:</label>

            <select id="content-sort">
                <option value="az">A to Z</option>
                <option value="za">Z to A</option>
            </select>

            <div id="service-results" class="service-grid"></div>

            <p id="result-message" aria-live="polite"></p>
        `;

        main.appendChild(serviceSection);

        var searchInput = document.getElementById("content-search");
        var sortSelect = document.getElementById("content-sort");
        var results = document.getElementById("service-results");
        var resultMessage = document.getElementById("result-message");

        // Function to display services on the page.

        function displayServices() {

            var searchText = searchInput.value.toLowerCase();

            var filteredServices = services.filter(function (service) {

                return service.name.toLowerCase().includes(searchText) ||
                    service.description.toLowerCase().includes(searchText) ||
                    service.category.toLowerCase().includes(searchText);

            });

            // Sort the services alphabetically.

            filteredServices.sort(function (a, b) {

                if (sortSelect.value === "za") {
                    return b.name.localeCompare(a.name);
                }

                return a.name.localeCompare(b.name);

            });

            results.innerHTML = "";

            filteredServices.forEach(function (service) {

                var card = document.createElement("article");

                var heading = document.createElement("h3");
                heading.textContent = service.name;

                var paragraph = document.createElement("p");
                paragraph.textContent = service.description;

                var link = document.createElement("a");
                link.href = "contact.html";
                link.textContent = "Make an enquiry";
                link.className = "btn";

                card.appendChild(heading);
                card.appendChild(paragraph);
                card.appendChild(link);

                results.appendChild(card);

            });

            resultMessage.textContent =
                filteredServices.length + " service(s) found.";
        }

        searchInput.addEventListener("input", displayServices);
        sortSelect.addEventListener("change", displayServices);

        displayServices();
    }


    // ------------------------------------------------
    // 5. ACCORDION / FREQUENTLY ASKED QUESTIONS
    // ------------------------------------------------

    if (currentPage.endsWith("services.html") && main) {

        var faqSection = document.createElement("section");

        faqSection.innerHTML = `
            <h2>Frequently Asked Questions</h2>

            <button class="accordion-button"
                aria-expanded="false">
                What types of events do you organise?
            </button>

            <div class="accordion-answer" hidden>
                <p>We organise weddings, corporate functions,
                birthdays and private celebrations.</p>
            </div>

            <button class="accordion-button"
                aria-expanded="false">
                How can I book an event?
            </button>

            <div class="accordion-answer" hidden>
                <p>Visit our Contact Us page and complete
                the event inquiry form.</p>
            </div>

            <button class="accordion-button"
                aria-expanded="false">
                Can I request a customised event theme?
            </button>

            <div class="accordion-answer" hidden>
                <p>Yes. We can discuss customised decorations
                and themes for your celebration.</p>
            </div>
        `;

        main.appendChild(faqSection);

        var accordionButtons = document.querySelectorAll(
            ".accordion-button"
        );

        accordionButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                var answer = button.nextElementSibling;

                var isOpen = !answer.hidden;

                answer.hidden = isOpen;

                button.setAttribute(
                    "aria-expanded",
                    !isOpen
                );

            });

        });
    }


    // ------------------------------------------------
    // 6. GALLERY LIGHTBOX
    // ------------------------------------------------

    var galleryImages = document.querySelectorAll("main figure img");

    if (galleryImages.length > 0) {

        galleryImages.forEach(function (image, index) {

            // Add alternative text and improve image loading.

            if (!image.hasAttribute("alt") || image.alt === "") {
                image.alt = "Inkanyezi Events celebration gallery image " +
                    (index + 1);
            }

            image.loading = "lazy";
            image.decoding = "async";
            image.classList.add("gallery-image");

        });

        // Create the lightbox automatically.

        var lightbox = document.createElement("div");

        lightbox.id = "lightbox";
        lightbox.className = "lightbox";

        lightbox.innerHTML = `
            <button class="lightbox-close"
                aria-label="Close image">&times;</button>

            <img id="lightbox-image" alt="Enlarged event photograph">
        `;

        document.body.appendChild(lightbox);

        var enlargedImage = document.getElementById("lightbox-image");

        galleryImages.forEach(function (image) {

            image.style.cursor = "pointer";

            image.addEventListener("click", function () {

                enlargedImage.src = image.src;
                enlargedImage.alt = image.alt;

                lightbox.classList.add("visible");
                lightbox.setAttribute("aria-hidden", "false");

            });

        });

        function closeLightbox() {

            lightbox.classList.remove("visible");
            lightbox.setAttribute("aria-hidden", "true");

        }

        document.querySelector(".lightbox-close")
            .addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeLightbox();
            }

        });
    }


    // ------------------------------------------------
    // 7. ANIMATIONS AND TRANSITIONS
    // ------------------------------------------------

    var pageSections = document.querySelectorAll(
        "main section, main article, main figure"
    );

    pageSections.forEach(function (section) {

        section.classList.add("reveal");

    });

    function showSections() {

        pageSections.forEach(function (section) {

            var position = section.getBoundingClientRect().top;

            if (position < window.innerHeight - 50) {
                section.classList.add("show");
            }

        });

    }

    window.addEventListener("scroll", showSections);

    showSections();


    // ------------------------------------------------
    // 8. CONTACT FORM AND JAVASCRIPT VALIDATION
    // ------------------------------------------------

    var contactForm = document.querySelector("main form");

    if (currentPage.endsWith("contact.html") && contactForm) {

        contactForm.id = "contact-form";

        var personalFieldset = contactForm.querySelector("fieldset");

        // Add the message type selection.

        var typeLabel = document.createElement("label");
        typeLabel.htmlFor = "message-type";
        typeLabel.textContent = "Type of Message *";

        var typeSelect = document.createElement("select");
        typeSelect.id = "message-type";
        typeSelect.name = "message_type";
        typeSelect.required = true;

        var messageTypes = [
            "Select a message type",
            "Wedding Planning",
            "Corporate Event",
            "Private Celebration",
            "General Enquiry",
            "Other"
        ];

        messageTypes.forEach(function (type, index) {

            var option = document.createElement("option");
            option.textContent = type;
            option.value = index === 0 ? "" : type;

            typeSelect.appendChild(option);

        });

        // Add an optional event date.

        var dateLabel = document.createElement("label");
        dateLabel.htmlFor = "event-date";
        dateLabel.textContent = "Preferred Event Date (optional)";

        var dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.id = "event-date";
        dateInput.name = "event_date";

        dateInput.min = new Date().toISOString().split("T")[0];

        // Add the full message field.

        var messageLabel = document.createElement("label");
        messageLabel.htmlFor = "message";
        messageLabel.textContent = "Your Message *";

        var messageInput = document.createElement("textarea");
        messageInput.id = "message";
        messageInput.name = "message";
        messageInput.required = true;
        messageInput.minLength = 10;
        messageInput.maxLength = 1000;
        messageInput.rows = 6;
        messageInput.placeholder = "Tell us about your event...";

        // Add elements to the existing form.

        personalFieldset.appendChild(typeLabel);
        personalFieldset.appendChild(typeSelect);

        personalFieldset.appendChild(dateLabel);
        personalFieldset.appendChild(dateInput);

        personalFieldset.appendChild(messageLabel);
        personalFieldset.appendChild(messageInput);

        // Improve the existing phone number field.

        var phoneInput = document.getElementById("tel");

        if (phoneInput) {

            phoneInput.pattern = "(\\+27|0)[6-8][0-9]{8}";
            phoneInput.title =
                "Enter a valid South African mobile number.";

            phoneInput.minLength = 10;
            phoneInput.maxLength = 12;
        }

        // Create the submit button and feedback message.

        var submitButton = document.createElement("button");

        submitButton.type = "submit";
        submitButton.textContent = "Send Message";

        var feedback = document.createElement("p");

        feedback.id = "form-message";
        feedback.setAttribute("aria-live", "polite");

        contactForm.appendChild(submitButton);
        contactForm.appendChild(feedback);

        // FormSubmit provides an email service for HTML websites.
        // The recipient must activate the confirmation email first.

        contactForm.action =
            "https://formsubmit.co/ajax/nqubekogcaba@gmail.com";

        contactForm.method = "POST";

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            feedback.textContent = "";

            // Check the HTML5 validation rules.

            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                feedback.textContent =
                    "Please correct the errors in the form.";

                return;
            }

            var fullName =
                document.getElementById("full-name").value.trim();

            var email =
                document.getElementById("email").value.trim();

            var phone = phoneInput.value.trim();

            var message = messageInput.value.trim();

            // Check that the message has enough characters.

            if (fullName.length < 2 || message.length < 10) {

                feedback.textContent =
                    "Please enter a valid name and a message of at least 10 characters.";

                return;
            }

            // Prepare information for email submission.

            var formData = new FormData(contactForm);

            formData.set("_subject", "New Inkanyezi Events Enquiry");

            var formObject = {};

            formData.forEach(function (value, key) {
                formObject[key] = value;
            });

            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            // AJAX sends the form without refreshing the page.

            fetch(contactForm.action, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

                body: JSON.stringify(formObject)

            })

            .then(function (response) {

                if (!response.ok) {
                    throw new Error("Unable to send the form.");
                }

                return response.json();

            })

            .then(function () {

                feedback.textContent =
                    "Thank you! Your message has been submitted successfully.";

                contactForm.reset();

            })

            .catch(function (error) {

                feedback.textContent =
                    "Sorry, we could not send your message. Please try again later.";

                console.error("Form submission error:", error);

            })

            .finally(function () {

                submitButton.disabled = false;
                submitButton.textContent = "Send Message";

            });

        });
    }


    // ------------------------------------------------
    // 9. CLIENT REGISTRATION PASSWORD VALIDATION
    // ------------------------------------------------

    var registrationForms = document.querySelectorAll("form");

    registrationForms.forEach(function (form) {

        if (form.querySelector("#reg-password") &&
            form.querySelector("#confirm-password")) {

            form.addEventListener("submit", function (event) {

                var password =
                    document.getElementById("reg-password").value;

                var confirmation =
                    document.getElementById("confirm-password").value;

                if (password !== confirmation) {

                    event.preventDefault();

                    alert("Your passwords do not match.");

                }

            });

        }

    });


    // ------------------------------------------------
    // 10. INTERACTIVE MAP USING LEAFLET
    // ------------------------------------------------

    if (currentPage.endsWith("contact.html") && main) {

        var mapSection = document.createElement("section");

        mapSection.innerHTML = `
            <h2>Example Interactive Map</h2>

            <p>
                This is a demonstration map centred on Durban.
                Replace the marker coordinates with your organisation's
                actual office or event venue before publishing.
            </p>

            <div id="event-map"></div>
        `;

        main.appendChild(mapSection);

        // Load Leaflet CSS.

        var leafletCSS = document.createElement("link");

        leafletCSS.rel = "stylesheet";
        leafletCSS.href =
            "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

        document.head.appendChild(leafletCSS);

        // Load Leaflet JavaScript.

        var leafletScript = document.createElement("script");

        leafletScript.src =
            "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

        leafletScript.onload = function () {

            var map = L.map("event-map").setView(
                [-29.8587, 31.0218],
                12
            );

            L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }
            ).addTo(map);

            var marker = L.marker(
                [-29.8587, 31.0218]
            ).addTo(map);

            marker.bindPopup(
                "Example location: Durban City Centre."
            ).openPopup();

        };

        document.body.appendChild(leafletScript);
    }

});
