/* =========================================================
   AQUA-X // DEEP SEA JAVASCRIPT
========================================================= */


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initCursor();

    initClickEffects();

    initReveal();

    initTiltCards();

    initNavigation();

    initParallax();

    initDepthCounter();

});


/* =========================================================
   LOADING SCREEN
========================================================= */

function initLoader() {

    const loader =
        document.querySelector(".loading-screen");

    if (!loader) return;


    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 2400);

    });

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCursor() {

    const glow =
        document.querySelector(".cursor-glow");

    const dot =
        document.querySelector(".cursor-dot");

    const ring =
        document.querySelector(".cursor-ring");


    if (!glow || !dot || !ring) return;


    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;


    window.addEventListener("mousemove", event => {

        mouseX = event.clientX;
        mouseY = event.clientY;


        dot.style.left =
            `${mouseX}px`;

        dot.style.top =
            `${mouseY}px`;


        glow.style.left =
            `${mouseX}px`;

        glow.style.top =
            `${mouseY}px`;

    });


    function animateCursor() {

        ringX +=
            (mouseX - ringX) * .14;

        ringY +=
            (mouseY - ringY) * .14;


        ring.style.left =
            `${ringX}px`;

        ring.style.top =
            `${ringY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    const interactive =
        document.querySelectorAll(
            "a, button, .hologram-card, .magnetic"
        );


    interactive.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {
                document.body.classList.add(
                    "cursor-hover"
                );
            }
        );


        element.addEventListener(
            "mouseleave",
            () => {
                document.body.classList.remove(
                    "cursor-hover"
                );
            }
        );

    });

}


/* =========================================================
   CLICK SHOCKWAVE
========================================================= */

function initClickEffects() {

    document.addEventListener(
        "click",
        event => {

            const ripple =
                document.createElement("div");

            ripple.className =
                "click-ripple";


            ripple.style.left =
                `${event.clientX}px`;

            ripple.style.top =
                `${event.clientY}px`;


            document.body.appendChild(
                ripple
            );


            setTimeout(() => {

                ripple.remove();

            }, 850);

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   3D CARD TILT
========================================================= */

function initTiltCards() {

    const cards =
        document.querySelectorAll(
            ".hologram-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) * -3;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 3;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-4px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {

    const menuButton =
        document.querySelector(
            ".menu-toggle"
        );

    const nav =
        document.querySelector(
            ".nav-links"
        );


    if (!menuButton || !nav) return;


    menuButton.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "open"
            );

        }
    );


    nav.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove(
                        "open"
                    );

                }
            );

        });

}


/* =========================================================
   PARALLAX
========================================================= */

function initParallax() {

    const visual =
        document.querySelector(
            ".hero-visual"
        );


    if (!visual) return;


    window.addEventListener(
        "mousemove",
        event => {

            const x =
                (event.clientX /
                window.innerWidth -
                .5);


            const y =
                (event.clientY /
                window.innerHeight -
                .5);


            visual.style.transform =
                `
                translate(
                    ${x * 12}px,
                    ${y * 12}px
                )
                `;

        }
    );

}


/* =========================================================
   DEPTH COUNTER
========================================================= */

function initDepthCounter() {

    const counter =
        document.querySelector(
            "#depthCounter"
        );


    if (!counter) return;


    let currentDepth = 0;


    function updateDepth() {

        const scroll =
            window.scrollY;


        const depth =
            Math.min(
                9999,
                Math.floor(
                    scroll * .7
                )
            );


        if (
            depth !== currentDepth
        ) {

            currentDepth =
                depth;


            counter.textContent =
                String(depth)
                .padStart(4, "0")
                + " M";

        }


        requestAnimationFrame(
            updateDepth
        );

    }


    updateDepth();

}


/* =========================================================
   RANDOM OCEAN PARTICLES
========================================================= */

function createParticles() {

    const container =
        document.querySelector(
            ".ocean-background"
        );


    if (!container) return;


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "ocean-particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            `${Math.random() * 100}%`;


        particle.style.animationDelay =
            `${Math.random() * 6}s`;


        particle.style.animationDuration =
            `${4 + Math.random() * 8}s`;


        container.appendChild(
            particle
        );

    }

}


createParticles();


/* =========================================================
   EASTER EGG
========================================================= */

let secretCode = "";

document.addEventListener(
    "keydown",
    event => {

        secretCode +=
            event.key.toLowerCase();


        if (
            secretCode.length > 12
        ) {

            secretCode =
                secretCode.slice(-12);

        }


        if (
            secretCode.includes("ocean")
        ) {

            document.body.classList.add(
                "aqua-overdrive"
            );


            setTimeout(() => {

                document.body.classList.remove(
                    "aqua-overdrive"
                );

            }, 5000);


            secretCode = "";

        }

    }
);


/* =========================================================
   PAGE TRANSITION
========================================================= */

document
    .querySelectorAll(
        "a[href$='.html']"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !target ||
                    target.startsWith("#") ||
                    link.target === "_blank"
                ) {
                    return;
                }


                event.preventDefault();


                document.body.style.transition =
                    "opacity .35s ease";


                document.body.style.opacity =
                    "0";


                setTimeout(() => {

                    window.location.href =
                        target;

                }, 350);

            }
        );

    });
