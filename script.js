/* =========================================================
   MY OCEAN WORLD
   SCI-FI INTERACTION SYSTEM
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       01 INITIAL THEME
       ===================================================== */

    const savedTheme =
        localStorage.getItem("ocean-theme") || "day";

    document.body.setAttribute(
        "data-theme",
        savedTheme
    );


    /* =====================================================
       02 CREATE THEME SWITCHER
       ===================================================== */

    const themeSwitcher =
        document.createElement("div");

    themeSwitcher.className =
        "theme-switcher";

    themeSwitcher.innerHTML = `
        <button
            class="theme-btn"
            data-theme="day"
            title="กลางวัน"
            aria-label="เปลี่ยนเป็นธีมกลางวัน"
        >
            ☀️
        </button>

        <button
            class="theme-btn"
            data-theme="night"
            title="กลางคืน"
            aria-label="เปลี่ยนเป็นธีมกลางคืน"
        >
            🌙
        </button>
    `;

    document.body.appendChild(
        themeSwitcher
    );


    const themeButtons =
        document.querySelectorAll(
            ".theme-btn"
        );


    function updateThemeButtons() {

        const currentTheme =
            document.body.getAttribute(
                "data-theme"
            );

        themeButtons.forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.theme ===
                    currentTheme
                );

            }
        );

    }


    updateThemeButtons();


    themeButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const theme =
                        button.dataset.theme;

                    document.body.setAttribute(
                        "data-theme",
                        theme
                    );

                    localStorage.setItem(
                        "ocean-theme",
                        theme
                    );

                    updateThemeButtons();

                    createThemePulse();

                }
            );

        }
    );


    /* =====================================================
       03 THEME CHANGE PULSE
       ===================================================== */

    function createThemePulse() {

        const pulse =
            document.createElement("div");

        pulse.style.position =
            "fixed";

        pulse.style.left =
            "50%";

        pulse.style.top =
            "50%";

        pulse.style.width =
            "20px";

        pulse.style.height =
            "20px";

        pulse.style.borderRadius =
            "50%";

        pulse.style.transform =
            "translate(-50%, -50%)";

        pulse.style.border =
            "2px solid var(--primary)";

        pulse.style.boxShadow =
            "0 0 40px var(--primary)";

        pulse.style.pointerEvents =
            "none";

        pulse.style.zIndex =
            "999999";

        pulse.style.transition =
            "all .8s ease-out";

        document.body.appendChild(
            pulse
        );


        requestAnimationFrame(
            () => {

                pulse.style.width =
                    "180vw";

                pulse.style.height =
                    "180vw";

                pulse.style.opacity =
                    "0";

            }
        );


        setTimeout(
            () => pulse.remove(),
            850
        );

    }


    /* =====================================================
       04 PAGE LOADING SCREEN
       ===================================================== */

    const loader =
        document.querySelector(
            ".loading-screen"
        );


    if (loader) {

        document.body.style.overflow =
            "hidden";


        window.addEventListener(
            "load",
            () => {

                setTimeout(
                    () => {

                        loader.classList.add(
                            "hide"
                        );

                        document.body.style.overflow =
                            "";

                    },
                    1300
                );

            }
        );

    }


    /* =====================================================
       05 CREATE RADAR
       ===================================================== */

    const radar =
        document.createElement("div");

    radar.className =
        "ocean-radar";

    radar.innerHTML = `

        <div class="radar-grid-x"></div>

        <div class="radar-grid-y"></div>

        <div class="radar-sweep"></div>

        <div class="radar-dot one"></div>

        <div class="radar-dot two"></div>

        <div class="radar-dot three"></div>

        <div class="radar-label">
            MARINE SCAN
        </div>

    `;

    document.body.appendChild(
        radar
    );


    /* =====================================================
       06 CREATE DEPTH METER
       ===================================================== */

    const depthMeter =
        document.createElement("div");

    depthMeter.className =
        "depth-meter";

    depthMeter.innerHTML = `

        <div class="depth-progress"></div>

        <div class="depth-text">
            DEPTH 0 M
        </div>

    `;

    document.body.appendChild(
        depthMeter
    );


    const depthProgress =
        depthMeter.querySelector(
            ".depth-progress"
        );

    const depthText =
        depthMeter.querySelector(
            ".depth-text"
        );


    /* =====================================================
       07 DEPTH SCROLL SYSTEM
       ===================================================== */

    function updateDepth() {

        const scrollTop =
            window.scrollY;

        const maxScroll =
            document.documentElement.scrollHeight
            -
            window.innerHeight;

        let depth =
            maxScroll > 0
            ?
            scrollTop / maxScroll
            :
            0;


        depth =
            Math.min(
                Math.max(depth, 0),
                1
            );


        document.body.style.setProperty(
            "--depth",
            depth
        );


        depthProgress.style.height =
            `${depth * 100}%`;


        const fakeMeters =
            Math.round(
                depth * 4500
            );


        depthText.textContent =
            `DEPTH ${fakeMeters} M`;

    }


    window.addEventListener(
        "scroll",
        updateDepth,
        {
            passive: true
        }
    );


    updateDepth();


    /* =====================================================
       08 MOUSE LIGHT
       ===================================================== */

    window.addEventListener(
        "mousemove",
        event => {

            document.body.style.setProperty(
                "--mouse-x",
                `${event.clientX}px`
            );

            document.body.style.setProperty(
                "--mouse-y",
                `${event.clientY}px`
            );

        }
    );


    /* =====================================================
       09 CLICK RIPPLE
       ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const ripple =
                document.createElement("span");

            ripple.className =
                "click-ripple";

            ripple.style.left =
                `${event.clientX}px`;

            ripple.style.top =
                `${event.clientY}px`;

            document.body.appendChild(
                ripple
            );


            setTimeout(
                () => {

                    ripple.remove();

                },
                850
            );

        }
    );


    /* =====================================================
       10 HUD CORNERS
       ===================================================== */

    const corners = [

        "hud-tl",

        "hud-tr",

        "hud-bl",

        "hud-br"

    ];


    corners.forEach(
        name => {

            const element =
                document.createElement(
                    "div"
                );

            element.className =
                `hud-corner ${name}`;

            document.body.appendChild(
                element
            );

        }
    );


    /* =====================================================
       11 SCROLL REVEAL
       ===================================================== */

    const revealTargets =
        document.querySelectorAll(

            `
            .page-hero,
            .profile-section,
            .about-card,
            .info-box,
            .hobby-card,
            .timeline-item,
            .contact-card,
            .highlight-card
            `

        );


    revealTargets.forEach(
        element => {

            element.classList.add(
                "reveal-element"
            );

        }
    );


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealTargets.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );


    /* =====================================================
       12 3D CARD TILT
       ===================================================== */

    const cards =
        document.querySelectorAll(

            `
            .info-box,
            .hobby-card,
            .contact-card,
            .about-card,
            .timeline-content
            `

        );


    cards.forEach(
        card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX
                        -
                        rect.left;


                    const y =
                        event.clientY
                        -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        (
                            centerY - y
                        )
                        /
                        20;


                    const rotateY =
                        (
                            x - centerX
                        )
                        /
                        20;


                    card.style.transform = `

                        perspective(800px)

                        rotateX(
                            ${rotateX}deg
                        )

                        rotateY(
                            ${rotateY}deg
                        )

                        translateY(-6px)

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

        }
    );


    /* =====================================================
       13 RANDOM BUBBLES
       ===================================================== */

    function createBubble() {

        const bubble =
            document.createElement(
                "span"
            );

        bubble.className =
            "dynamic-bubble";


        const size =
            Math.random()
            *
            25
            +
            6;


        bubble.style.width =
            `${size}px`;

        bubble.style.height =
            `${size}px`;

        bubble.style.left =
            `${Math.random() * 100}%`;


        const duration =
            Math.random()
            *
            7
            +
            8;


        bubble.style.animationDuration =
            `${duration}s`;


        document.body.appendChild(
            bubble
        );


        setTimeout(
            () => {

                bubble.remove();

            },
            duration * 1000
        );

    }


    setInterval(
        createBubble,
        850
    );


    /* =====================================================
       14 RANDOM FISH
       ===================================================== */

    const fishList = [

        "🐠",

        "🐟",

        "🐡",

        "🐠",

        "🐟"

    ];


    function createFish() {

        const fish =
            document.createElement(
                "div"
            );

        fish.className =
            "ai-fish";


        fish.textContent =
            fishList[
                Math.floor(
                    Math.random()
                    *
                    fishList.length
                )
            ];


        fish.style.top =
            `${15 + Math.random() * 70}%`;


        fish.style.fontSize =
            `${25 + Math.random() * 25}px`;


        const duration =
            14
            +
            Math.random()
            *
            15;


        fish.style.animationDuration =
            `${duration}s`;


        fish.style.opacity =
            `${0.25 + Math.random() * 0.55}`;


        document.body.appendChild(
            fish
        );


        setTimeout(
            () => {

                fish.remove();

            },
            duration * 1000
        );

    }


    setInterval(
        createFish,
        5000
    );


    /* =====================================================
       15 NAV ACTIVE AUTO
       ===================================================== */

    const currentPage =
        location.pathname
        .split("/")
        .pop()
        ||
        "index.html";


    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(
            link => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                link.classList.toggle(
                    "active",
                    href === currentPage
                );

            }
        );


    /* =====================================================
       16 MAGNETIC NAVIGATION
       ===================================================== */

    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            link.getBoundingClientRect();


                        const x =
                            event.clientX
                            -
                            rect.left
                            -
                            rect.width / 2;


                        const y =
                            event.clientY
                            -
                            rect.top
                            -
                            rect.height / 2;


                        link.style.transform = `

                            translate(
                                ${x * 0.08}px,
                                ${y * 0.08}px
                            )

                            translateY(-2px)

                        `;

                    }
                );


                link.addEventListener(
                    "mouseleave",
                    () => {

                        link.style.transform =
                            "";

                    }
                );

            }
        );


    /* =====================================================
       17 PROFILE IMAGE PARALLAX
       ===================================================== */

    const profileImage =
        document.querySelector(
            ".profile-image-wrapper"
        );


    if (profileImage) {

        window.addEventListener(
            "mousemove",
            event => {

                const moveX =
                    (
                        event.clientX
                        /
                        window.innerWidth
                        -
                        0.5
                    )
                    *
                    10;


                const moveY =
                    (
                        event.clientY
                        /
                        window.innerHeight
                        -
                        0.5
                    )
                    *
                    10;


                profileImage.style.transform = `

                    translate(
                        ${moveX}px,
                        ${moveY}px
                    )

                `;

            }
        );

    }


    /* =====================================================
       18 HERO PARALLAX
       ===================================================== */

    const heroTitle =
        document.querySelector(
            ".page-hero h1"
        );


    if (heroTitle) {

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (
                        event.clientX
                        /
                        window.innerWidth
                        -
                        0.5
                    )
                    *
                    12;


                const y =
                    (
                        event.clientY
                        /
                        window.innerHeight
                        -
                        0.5
                    )
                    *
                    8;


                heroTitle.style.marginLeft =
                    `${x}px`;

                heroTitle.style.marginTop =
                    `${20 + y}px`;

            }
        );

    }


    /* =====================================================
       19 RADAR REACTION TO MOUSE
       ===================================================== */

    const radarDots =
        document.querySelectorAll(
            ".radar-dot"
        );


    window.addEventListener(
        "mousemove",
        event => {

            const percentageX =
                event.clientX
                /
                window.innerWidth;


            const percentageY =
                event.clientY
                /
                window.innerHeight;


            if (
                radarDots[0]
            ) {

                radarDots[0].style.left =
                    `${
                        15
                        +
                        percentageX
                        *
                        65
                    }%`;

                radarDots[0].style.top =
                    `${
                        15
                        +
                        percentageY
                        *
                        65
                    }%`;

            }

        }
    );


    /* =====================================================
       20 PAGE READY
       ===================================================== */

    console.log(
        "%c🌊 MY OCEAN WORLD READY",
        `
        color:#6ffcff;
        font-size:18px;
        font-weight:bold;
        `
    );

});
