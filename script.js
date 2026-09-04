/* =========================================================
   MY OCEAN
   REALISTIC SCI-FI INTERACTION CORE
========================================================= */


/* =========================================================
   LOADING SCREEN
========================================================= */

window.addEventListener(
    "load",
    () => {

        const loader =
            document.querySelector(
                ".loading-screen"
            );

        if(loader){

            setTimeout(
                () => {

                    loader.classList.add(
                        "loaded"
                    );

                },
                1000
            );

        }

    }
);


/* =========================================================
   PARTICLES
========================================================= */

const particleField =
    document.querySelector(
        ".particle-field"
    );

if(particleField){

    for(let i = 0; i < 110; i++){

        const particle =
            document.createElement(
                "span"
            );

        particle.className =
            "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            (8 + Math.random() * 20) + "s";

        particle.style.animationDelay =
            (-Math.random() * 20) + "s";

        particle.style.opacity =
            .15 + Math.random() * .6;

        particleField.appendChild(
            particle
        );

    }

}


/* =========================================================
   BUBBLES
========================================================= */

const bubbleField =
    document.querySelector(
        ".bubble-field"
    );

if(bubbleField){

    for(let i = 0; i < 25; i++){

        const bubble =
            document.createElement(
                "span"
            );

        bubble.className =
            "bubble";

        const size =
            5 + Math.random() * 25;

        bubble.style.width =
            size + "px";

        bubble.style.height =
            size + "px";

        bubble.style.left =
            Math.random() * 100 + "%";

        bubble.style.animationDuration =
            (9 + Math.random() * 18) + "s";

        bubble.style.animationDelay =
            (-Math.random() * 20) + "s";

        bubbleField.appendChild(
            bubble
        );

    }

}


/* =========================================================
   MOUSE LIGHT
========================================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        document.documentElement
            .style.setProperty(
                "--mx",
                event.clientX + "px"
            );

        document.documentElement
            .style.setProperty(
                "--my",
                event.clientY + "px"
            );

    }
);


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorCore =
    document.querySelector(
        ".cursor-core"
    );

const cursorRing =
    document.querySelector(
        ".cursor-ring"
    );

if(cursorCore && cursorRing){

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

            cursorCore.style.left =
                mouseX + "px";

            cursorCore.style.top =
                mouseY + "px";

        }
    );


    function animateCursor(){

        ringX +=
            (mouseX - ringX) * .18;

        ringY +=
            (mouseY - ringY) * .18;

        cursorRing.style.left =
            ringX + "px";

        cursorRing.style.top =
            ringY + "px";

        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();


    document.querySelectorAll(
        "a,button,.tilt-card"
    ).forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorRing.classList.add(
                        "hover"
                    );

                }
            );

            element.addEventListener(
                "mouseleave",
                () => {

                    cursorRing.classList.remove(
                        "hover"
                    );

                }
            );

        }
    );

}


/* =========================================================
   WATER SPLASH CLICK
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        const splash =
            document.createElement(
                "div"
            );

        splash.style.position =
            "fixed";

        splash.style.left =
            event.clientX + "px";

        splash.style.top =
            event.clientY + "px";

        splash.style.width =
            "15px";

        splash.style.height =
            "15px";

        splash.style.border =
            "2px solid #65f6ff";

        splash.style.borderRadius =
            "50%";

        splash.style.pointerEvents =
            "none";

        splash.style.zIndex =
            "99998";

        splash.style.transform =
            "translate(-50%,-50%)";

        document.body.appendChild(
            splash
        );


        splash.animate(
            [
                {
                    transform:
                        "translate(-50%,-50%) scale(.2)",

                    opacity:1
                },

                {
                    transform:
                        "translate(-50%,-50%) scale(5)",

                    opacity:0
                }
            ],
            {
                duration:800,
                easing:"ease-out"
            }
        );


        for(let i = 0; i < 8; i++){

            const drop =
                document.createElement(
                    "span"
                );

            drop.style.position =
                "fixed";

            drop.style.left =
                event.clientX + "px";

            drop.style.top =
                event.clientY + "px";

            drop.style.width =
                "4px";

            drop.style.height =
                "4px";

            drop.style.borderRadius =
                "50%";

            drop.style.background =
                "#65f6ff";

            drop.style.boxShadow =
                "0 0 10px #65f6ff";

            drop.style.pointerEvents =
                "none";

            drop.style.zIndex =
                "99998";

            document.body.appendChild(
                drop
            );


            const angle =
                (Math.PI * 2 / 8) * i;

            const distance =
                30 + Math.random() * 40;


            drop.animate(
                [
                    {
                        transform:
                            "translate(-50%,-50%) scale(1)",
                        opacity:1
                    },

                    {
                        transform:
                            `translate(
                                ${Math.cos(angle) * distance}px,
                                ${Math.sin(angle) * distance}px
                            )
                            scale(0)`,
                        opacity:0
                    }
                ],
                {
                    duration:
                        500 + Math.random() * 300,

                    easing:
                        "cubic-bezier(.2,.8,.2,1)"
                }
            );


            setTimeout(
                () => drop.remove(),
                900
            );

        }


        setTimeout(
            () => splash.remove(),
            900
        );

    }
);


/* =========================================================
   SCROLL DEPTH
========================================================= */

function updateDepth(){

    const maxScroll =
        document.documentElement
            .scrollHeight -
        window.innerHeight;


    const currentScroll =
        window.scrollY;


    const progress =
        maxScroll > 0
        ? currentScroll / maxScroll
        : 0;


    const depth =
        Math.round(
            progress * 4500
        );


    document.documentElement
        .style.setProperty(
            "--depth",
            progress
        );


    const hudDepth =
        document.getElementById(
            "hudDepth"
        );

    if(hudDepth){

        hudDepth.textContent =
            String(depth)
                .padStart(4,"0")
            + "M";

    }


    const depthDisplay =
        document.getElementById(
            "depthDisplay"
        );

    if(depthDisplay){

        depthDisplay.textContent =
            String(depth)
                .padStart(4,"0")
            + " M";

    }


    const depthBar =
        document.getElementById(
            "depthBar"
        );

    if(depthBar){

        depthBar.style.width =
            progress * 100 + "%";

    }

}

window.addEventListener(
    "scroll",
    updateDepth,
    {
        passive:true
    }
);

updateDepth();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if(
                        entry.isIntersecting
                    ){

                        entry.target.classList.add(
                            "show"
                        );

                    }

                }
            );

        },
        {
            threshold:.12
        }
    );


document.querySelectorAll(
    ".reveal"
).forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   3D CARD TILT
========================================================= */

document.querySelectorAll(
    ".tilt-card"
).forEach(
    card => {

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
                    centerY) * -5;

                const rotateY =
                    ((x - centerX) /
                    centerX) * 5;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
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


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

document.querySelectorAll(
    ".magnetic"
).forEach(
    button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `
                    translate(
                        ${x * .08}px,
                        ${y * .08}px
                    )
                    `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   THEME SYSTEM
========================================================= */

const themeButton =
    document.getElementById(
        "themeToggle"
    );


let deepNight =
    localStorage.getItem(
        "myOceanTheme"
    ) === "deep";


function applyTheme(){

    if(deepNight){

        document.documentElement
            .style.setProperty(
                "--cyan",
                "#9b8cff"
            );

        document.documentElement
            .style.setProperty(
                "--blue",
                "#3459ff"
            );

        if(themeButton){

            themeButton.textContent =
                "🌙";

        }

    }else{

        document.documentElement
            .style.setProperty(
                "--cyan",
                "#65f6ff"
            );

        document.documentElement
            .style.setProperty(
                "--blue",
                "#168cff"
            );

        if(themeButton){

            themeButton.textContent =
                "☀️";

        }

    }

}


if(themeButton){

    themeButton.addEventListener(
        "click",
        () => {

            deepNight =
                !deepNight;

            localStorage.setItem(
                "myOceanTheme",
                deepNight
                ? "deep"
                : "ocean"
            );

            applyTheme();

        }
    );

}

applyTheme();


/* =========================================================
   ORB PARALLAX
========================================================= */

const orb =
    document.querySelector(
        ".ocean-orb"
    );


if(orb){

    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (event.clientX /
                window.innerWidth -
                .5) * 18;

            const y =
                (event.clientY /
                window.innerHeight -
                .5) * 18;


            orb.style.marginLeft =
                x + "px";

            orb.style.marginTop =
                y + "px";

        }
    );

}


/* =========================================================
   RANDOM FISH SPAWN
========================================================= */

const fishField =
    document.querySelector(
        ".fish-field"
    );


if(fishField){

    const fishCharacters =
        [
            "🐠",
            "🐟",
            "🐡"
        ];


    setInterval(
        () => {

            const fish =
                document.createElement(
                    "span"
                );

            fish.className =
                "ocean-fish";

            fish.textContent =
                fishCharacters[
                    Math.floor(
                        Math.random() *
                        fishCharacters.length
                    )
                ];

            fish.style.top =
                (10 + Math.random()*75)
                + "%";

            fish.style.animationDuration =
                (20 + Math.random()*25)
                + "s";

            fishField.appendChild(
                fish
            );


            setTimeout(
                () => fish.remove(),
                50000
            );

        },
        7000
    );

}


/* =========================================================
   CONSOLE SYSTEM
========================================================= */

console.log(
`
╔══════════════════════════════════════╗
║       MY OCEAN // ONLINE              ║
╠══════════════════════════════════════╣
║ DEEP SEA ENGINE ............ ACTIVE  ║
║ RADAR ...................... ACTIVE  ║
║ DEPTH SENSOR ............... ACTIVE  ║
║ PARTICLE FIELD ............. ACTIVE  ║
║ WATER CAUSTICS ............. ACTIVE  ║
║ CURSOR SYSTEM .............. ACTIVE  ║
║ SPLASH ENGINE .............. ACTIVE  ║
║                                      ║
║      WELCOME TO THE OCEAN 🌊         ║
╚══════════════════════════════════════╝
`
);
