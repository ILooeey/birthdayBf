/* =========================================================
   NAT'S FINAL BIRTHDAY QUEST
   LAST.JS — NO POPUP VERSION
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const cursor =
    document.querySelector(".cursor");

const giftBox =
    document.querySelector("#gift-box");

const unlockButton =
    document.querySelector("#unlock-button");

const lockMessage =
    document.querySelector("#lock-message");

const reveal =
    document.querySelector("#reveal");

const trackingNumber =
    document.querySelector("#tracking-number");

const copyButton =
    document.querySelector("#copy-button");

const finishButton =
    document.querySelector("#finish-button");

const scratchCanvas =
    document.querySelector("#scratch-canvas");

const scratchContainer =
    document.querySelector(".scratch-container");

const trackingCard =
    document.querySelector(".tracking-card");


/* =========================================================
   TRACKING NUMBER
========================================================= */

const RESI =
    "CM71903983627";


/* =========================================================
   SCRATCH STATE
========================================================= */

let ctx = null;

let isScratching = false;

let scratchedPixels = 0;

let trackingRevealed = false;

const requiredScratch = 45;


/* =========================================================
   CANVAS CONTEXT
========================================================= */

if (scratchCanvas) {

    ctx =
        scratchCanvas.getContext("2d");

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

document.addEventListener(
    "mousemove",
    (e) => {

        if (!cursor) return;

        gsap.to(
            cursor,
            {
                left: e.clientX,
                top: e.clientY,

                duration: 0.15,

                ease: "power2.out"
            }
        );

    }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        /* -------------------------------------------------
           PAGE ENTRANCE
        ------------------------------------------------- */

        gsap.from(
            ".container",
            {
                opacity: 0,
                y: 25,

                duration: 1,

                ease: "power3.out"
            }
        );


        /* -------------------------------------------------
           GIFT ENTRANCE
        ------------------------------------------------- */

        if (giftBox) {

            gsap.from(
                giftBox,
                {
                    opacity: 0,
                    scale: 0.6,
                    rotation: -10,

                    duration: 1.2,

                    delay: 0.3,

                    ease: "back.out(1.7)"
                }
            );


            /* -------------------------------------------------
               GIFT FLOAT
            ------------------------------------------------- */

            gsap.to(
                giftBox,
                {
                    y: -8,

                    duration: 1.8,

                    repeat: -1,

                    yoyo: true,

                    ease: "sine.inOut"
                }
            );

        }


        /* -------------------------------------------------
           INITIAL SCRATCH CANVAS
        ------------------------------------------------- */

        setTimeout(
            () => {

                resizeScratchCanvas();

            },
            300
        );

    }
);


/* =========================================================
   UNLOCK GIFT
========================================================= */

if (unlockButton) {

    unlockButton.addEventListener(
        "click",
        () => {

            console.log(
                "🎁 UNLOCK BUTTON CLICKED"
            );


            /* -------------------------------------------------
               DISABLE BUTTON
            ------------------------------------------------- */

            unlockButton.disabled = true;


            /* -------------------------------------------------
               BUTTON PRESS ANIMATION
            ------------------------------------------------- */

            gsap.timeline()

                .to(
                    unlockButton,
                    {
                        scale: 0.9,

                        duration: 0.1
                    }
                )

                .to(
                    unlockButton,
                    {
                        scale: 1,

                        duration: 0.25
                    }
                );


            /* -------------------------------------------------
               GIFT SHAKE
            ------------------------------------------------- */

            if (giftBox) {

                gsap.timeline()

                    .to(
                        giftBox,
                        {
                            x: -8,
                            rotation: -6,

                            duration: 0.08
                        }
                    )

                    .to(
                        giftBox,
                        {
                            x: 8,
                            rotation: 5,

                            duration: 0.08
                        }
                    )

                    .to(
                        giftBox,
                        {
                            x: -5,
                            rotation: -3,

                            duration: 0.08
                        }
                    )

                    .to(
                        giftBox,
                        {
                            x: 0,
                            rotation: 0,

                            duration: 0.15
                        }
                    );

            }


            /* -------------------------------------------------
               OPEN GIFT LID
            ------------------------------------------------- */

            gsap.to(
                ".gift-lid",
                {
                    y: -80,

                    rotation: -8,

                    opacity: 0,

                    duration: 0.8,

                    delay: 0.4,

                    ease: "back.out(1.5)"
                }
            );


            /* -------------------------------------------------
               GIFT BODY GLOW
            ------------------------------------------------- */

            gsap.to(
                ".gift-body",
                {
                    boxShadow:
                        "0 0 60px rgba(168,92,92,.35)",

                    duration: 0.8,

                    delay: 0.5
                }
            );


            /* -------------------------------------------------
               HIDE LOCK MESSAGE
            ------------------------------------------------- */

            if (lockMessage) {

                gsap.to(
                    lockMessage,
                    {
                        opacity: 0,

                        y: -20,

                        duration: 0.5,

                        delay: 1,

                        onComplete: () => {

                            lockMessage.style.display =
                                "none";

                            showReveal();

                        }
                    }
                );

            }

            else {

                showReveal();

            }

        }
    );

}


/* =========================================================
   SHOW REVEAL
========================================================= */

function showReveal() {

    if (!reveal) return;


    /* -------------------------------------------------
       RESET TRACKING
    ------------------------------------------------- */

    if (trackingNumber) {

        trackingNumber.textContent =
            "";

    }


    scratchedPixels = 0;

    trackingRevealed = false;


    if (scratchCanvas) {

        scratchCanvas.dataset.revealed =
            "";

        scratchCanvas.style.opacity =
            "1";

    }


    /* -------------------------------------------------
       SHOW REVEAL
    ------------------------------------------------- */

    reveal.style.display =
        "block";


    gsap.fromTo(
        reveal,

        {
            opacity: 0,

            y: 40
        },

        {
            opacity: 1,

            y: 0,

            duration: 1,

            ease: "power3.out",

            onComplete: () => {

                createParticles();

                resizeScratchCanvas();

            }
        }
    );

}


/* =========================================================
   RESIZE SCRATCH CANVAS
========================================================= */

function resizeScratchCanvas() {

    if (
        !scratchCanvas ||
        !scratchContainer ||
        !ctx ||
        trackingRevealed
    ) {

        return;

    }


    const rect =
        scratchContainer.getBoundingClientRect();


    if (
        rect.width <= 0 ||
        rect.height <= 0
    ) {

        return;

    }


    const dpr =
        window.devicePixelRatio || 1;


    scratchCanvas.width =
        rect.width * dpr;

    scratchCanvas.height =
        rect.height * dpr;


    scratchCanvas.style.width =
        rect.width + "px";

    scratchCanvas.style.height =
        rect.height + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    drawScratchLayer(
        rect.width,
        rect.height
    );

}


/* =========================================================
   DRAW SCRATCH LAYER
========================================================= */

function drawScratchLayer(
    width,
    height
) {

    if (!ctx) return;


    /* -------------------------------------------------
       RESET CANVAS
    ------------------------------------------------- */

    ctx.globalCompositeOperation =
        "source-over";


    /* -------------------------------------------------
       BASE
    ------------------------------------------------- */

    ctx.fillStyle =
        "#a85c5c";


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /* -------------------------------------------------
       TEXTURE
    ------------------------------------------------- */

    for (
        let i = 0;
        i < 350;
        i++
    ) {

        const x =
            Math.random() * width;

        const y =
            Math.random() * height;

        const size =
            Math.random() * 2 + 1;


        ctx.fillStyle =
            `rgba(
                255,
                253,
                248,
                ${Math.random() * 0.25}
            )`;


        ctx.fillRect(
            x,
            y,
            size,
            size
        );

    }


    /* -------------------------------------------------
       SCRATCH TEXT
    ------------------------------------------------- */

    ctx.fillStyle =
        "#fffdf8";


    ctx.font =
        "bold 12px Arial";


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.fillText(
        "✦ SCRATCH HERE ✦",
        width / 2,
        height / 2
    );

}


/* =========================================================
   SCRATCH FUNCTION
========================================================= */

function scratch(
    x,
    y
) {

    if (
        !ctx ||
        trackingRevealed
    ) {

        return;

    }


    ctx.globalCompositeOperation =
        "destination-out";


    ctx.beginPath();


    ctx.arc(
        x,
        y,
        18,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.globalCompositeOperation =
        "source-over";


    scratchedPixels++;


    if (
        scratchedPixels >=
        requiredScratch
    ) {

        revealTracking();

    }

}


/* =========================================================
   GET POINTER POSITION
========================================================= */

function getPointerPosition(e) {

    if (!scratchCanvas) {

        return {
            x: 0,
            y: 0
        };

    }


    const rect =
        scratchCanvas.getBoundingClientRect();


    return {

        x:
            e.clientX -
            rect.left,

        y:
            e.clientY -
            rect.top

    };

}


/* =========================================================
   MOUSE SCRATCH
========================================================= */

if (scratchCanvas) {

    scratchCanvas.addEventListener(
        "mousedown",
        (e) => {

            isScratching = true;


            const pos =
                getPointerPosition(e);


            scratch(
                pos.x,
                pos.y
            );

        }
    );


    scratchCanvas.addEventListener(
        "mousemove",
        (e) => {

            if (!isScratching) return;


            const pos =
                getPointerPosition(e);


            scratch(
                pos.x,
                pos.y
            );

        }
    );

}


/* =========================================================
   MOUSE UP
========================================================= */

window.addEventListener(
    "mouseup",
    () => {

        isScratching = false;

    }
);


/* =========================================================
   TOUCH SCRATCH
========================================================= */

if (scratchCanvas) {

    scratchCanvas.addEventListener(
        "touchstart",
        (e) => {

            e.preventDefault();

            isScratching = true;


            const touch =
                e.touches[0];


            if (!touch) return;


            const rect =
                scratchCanvas.getBoundingClientRect();


            scratch(
                touch.clientX -
                    rect.left,

                touch.clientY -
                    rect.top
            );

        },
        {
            passive: false
        }
    );


    scratchCanvas.addEventListener(
        "touchmove",
        (e) => {

            e.preventDefault();


            if (!isScratching) return;


            const touch =
                e.touches[0];


            if (!touch) return;


            const rect =
                scratchCanvas.getBoundingClientRect();


            scratch(
                touch.clientX -
                    rect.left,

                touch.clientY -
                    rect.top
            );

        },
        {
            passive: false
        }
    );


    scratchCanvas.addEventListener(
        "touchend",
        () => {

            isScratching = false;

        }
    );


    scratchCanvas.addEventListener(
        "touchcancel",
        () => {

            isScratching = false;

        }
    );

}


/* =========================================================
   REVEAL TRACKING NUMBER
========================================================= */

function revealTracking() {

    if (
        !scratchCanvas ||
        trackingRevealed
    ) {

        return;

    }


    trackingRevealed = true;


    scratchCanvas.dataset.revealed =
        "true";


    /* -------------------------------------------------
       SHOW RESI
    ------------------------------------------------- */

    if (trackingNumber) {

        trackingNumber.textContent =
            RESI;

    }


    /* -------------------------------------------------
       ADD REVEALED CLASS
    ------------------------------------------------- */

    if (trackingCard) {

        trackingCard.classList.add(
            "revealed"
        );

    }


    /* -------------------------------------------------
       HIDE SCRATCH CANVAS
    ------------------------------------------------- */

    gsap.to(
        scratchCanvas,
        {
            opacity: 0,

            duration: 0.8,

            ease: "power2.out"
        }
    );


    /* -------------------------------------------------
       RESI ANIMATION
    ------------------------------------------------- */

    if (trackingNumber) {

        gsap.fromTo(
            trackingNumber,

            {
                scale: 0.85,

                opacity: 0.5
            },

            {
                scale: 1,

                opacity: 1,

                duration: 0.8,

                ease: "back.out(2)"
            }
        );

    }


    /* -------------------------------------------------
       CHANGE HINT
    ------------------------------------------------- */

    const hint =
        document.querySelector(
            ".scratch-hint"
        );


    if (hint) {

        hint.textContent =
            "You found it. 📦 Your little surprise is on its way. ♡";

    }


    /* -------------------------------------------------
       CELEBRATION
    ------------------------------------------------- */

    createScratchCelebration();

}


/* =========================================================
   COPY TRACKING NUMBER
========================================================= */

if (copyButton) {

    copyButton.addEventListener(
        "click",
        async () => {

            const originalText =
                copyButton.textContent;


            try {

                await navigator.clipboard.writeText(
                    RESI
                );


                copyButton.textContent =
                    "Copied! 📦♡";


                gsap.to(
                    copyButton,
                    {
                        scale: 1.05,

                        duration: 0.15,

                        yoyo: true,

                        repeat: 1
                    }
                );


                setTimeout(
                    () => {

                        copyButton.textContent =
                            originalText;

                    },
                    1800
                );

            }

            catch (error) {

                /* -------------------------------------------------
                   FALLBACK COPY
                ------------------------------------------------- */

                const textarea =
                    document.createElement(
                        "textarea"
                    );


                textarea.value =
                    RESI;


                textarea.style.position =
                    "fixed";

                textarea.style.opacity =
                    "0";


                document.body.appendChild(
                    textarea
                );


                textarea.select();


                try {

                    document.execCommand(
                        "copy"
                    );

                }

                catch (copyError) {

                    console.error(
                        "Copy failed:",
                        copyError
                    );

                }


                textarea.remove();


                copyButton.textContent =
                    "Copied! 📦♡";


                setTimeout(
                    () => {

                        copyButton.textContent =
                            originalText;

                    },
                    1800
                );

            }

        }
    );

}


/* =========================================================
   GENERAL CELEBRATION
========================================================= */

function createParticles() {

    const symbols = [
        "✦",
        "♡",
        "✧",
        "⋆"
    ];


    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.position =
            "fixed";


        particle.style.left =
            "50%";


        particle.style.top =
            "45%";


        particle.style.zIndex =
            "999";


        particle.style.pointerEvents =
            "none";


        particle.style.color =
            "#a85c5c";


        particle.style.fontSize =
            `${Math.random() * 15 + 10}px`;


        document.body.appendChild(
            particle
        );


        gsap.to(
            particle,
            {

                x:
                    Math.random() *
                    400 -
                    200,

                y:
                    Math.random() *
                    400 -
                    200,

                opacity: 0,

                rotation:
                    Math.random() *
                    360,

                duration:
                    Math.random() * 1.5 +
                    1,

                ease:
                    "power2.out",

                onComplete: () => {

                    particle.remove();

                }

            }
        );

    }

}


/* =========================================================
   SCRATCH CELEBRATION
========================================================= */

function createScratchCelebration() {

    const symbols = [
        "✦",
        "♡",
        "✧",
        "⋆"
    ];


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.position =
            "fixed";


        particle.style.left =
            "50%";


        particle.style.top =
            "55%";


        particle.style.zIndex =
            "999";


        particle.style.pointerEvents =
            "none";


        particle.style.color =
            "#a85c5c";


        particle.style.fontSize =
            `${Math.random() * 12 + 10}px`;


        document.body.appendChild(
            particle
        );


        gsap.to(
            particle,
            {

                x:
                    Math.random() *
                    300 -
                    150,

                y:
                    Math.random() *
                    200 -
                    100,

                opacity: 0,

                rotation:
                    Math.random() *
                    360,

                duration: 1.2,

                ease:
                    "power2.out",

                onComplete: () => {

                    particle.remove();

                }

            }
        );

    }

}


/* =========================================================
   FLOATING BACKGROUND PARTICLES
========================================================= */

setInterval(
    () => {

        const symbols = [
            "✦",
            "♡",
            "✧"
        ];


        const element =
            document.createElement(
                "div"
            );


        element.className =
            "background-particle";


        element.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        element.style.position =
            "fixed";


        element.style.left =
            Math.random() *
            100 +
            "vw";


        element.style.top =
            "105vh";


        element.style.color =
            "#a85c5c";


        element.style.opacity =
            ".2";


        element.style.pointerEvents =
            "none";


        element.style.zIndex =
            "1";


        document.body.appendChild(
            element
        );


        gsap.to(
            element,
            {

                y:
                    -window.innerHeight -
                    100,

                x:
                    Math.random() *
                    100 -
                    50,

                rotation:
                    Math.random() *
                    80 -
                    40,

                duration:
                    Math.random() *
                    6 +
                    7,

                ease:
                    "none",

                onComplete: () => {

                    element.remove();

                }

            }
        );

    },
    1800
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            scratchCanvas &&
            !trackingRevealed
        ) {

            resizeScratchCanvas();

        }

    }
);


/* =========================================================
   FINAL BUTTON
   NO POPUP
========================================================= */

if (finishButton) {

    finishButton.addEventListener(
        "click",
        () => {

            /* -------------------------------------------------
               BUTTON EFFECT
            ------------------------------------------------- */

            gsap.to(
                finishButton,
                {
                    scale: 0.94,

                    duration: 0.1
                }
            );


            gsap.to(
                finishButton,
                {
                    scale: 1,

                    duration: 0.25,

                    delay: 0.1
                }
            );


            /* -------------------------------------------------
               FINAL CELEBRATION
            ------------------------------------------------- */

            createFinalCelebration();


            /* -------------------------------------------------
               CHANGE BUTTON TEXT
            ------------------------------------------------- */

            finishButton.textContent =
                "See you on VC 🤍";


            setTimeout(
                () => {

                    finishButton.textContent =
                        "Last Info klik inii ✦";

                },
                2000
            );

        }
    );

}


/* =========================================================
   FINAL CELEBRATION
========================================================= */

function createFinalCelebration() {

    const symbols = [
        "♡",
        "✦",
        "✧",
        "⋆"
    ];


    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.position =
            "fixed";


        particle.style.left =
            "50%";


        particle.style.top =
            "50%";


        particle.style.zIndex =
            "9999";


        particle.style.pointerEvents =
            "none";


        particle.style.color =
            "#a85c5c";


        particle.style.fontSize =
            `${Math.random() * 15 + 12}px`;


        document.body.appendChild(
            particle
        );


        gsap.to(
            particle,
            {

                x:
                    Math.random() *
                    500 -
                    250,

                y:
                    Math.random() *
                    400 -
                    200,

                rotation:
                    Math.random() *
                    360,

                opacity: 0,

                duration:
                    Math.random() *
                    1 +
                    1,

                ease:
                    "power2.out",

                onComplete: () => {

                    particle.remove();

                }

            }
        );

    }

}
