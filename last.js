/* ========================================
   ELEMENTS
======================================== */

const cursor =
    document.querySelector(".cursor");

const giftBox =
    document.querySelector("#gift-box");

const giftLid =
    document.querySelector(".gift-lid");

const giftBody =
    document.querySelector(".gift-body");

const unlockButton =
    document.querySelector("#unlock-button");

const lockMessage =
    document.querySelector("#lock-message");

const reveal =
    document.querySelector("#reveal");

const scratchCanvas =
    document.querySelector("#scratch-canvas");

const scratchContainer =
    document.querySelector(".scratch-container");

const trackingNumber =
    document.querySelector("#tracking-number");

const trackingCard =
    document.querySelector(".tracking-card");

const copyButton =
    document.querySelector("#copy-button");

const finishButton =
    document.querySelector("#finish-button");

const popupOverlay =
    document.querySelector("#camera-popup-overlay");

const popupClose =
    document.querySelector("#camera-popup-close");


const RESI =
    "CM71903983627";


/* ========================================
   CUSTOM CURSOR
======================================== */

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


/* ========================================
   PAGE LOAD
======================================== */

window.addEventListener(
    "load",
    () => {

        /* PAGE */

        gsap.from(
            ".container",
            {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out"
            }
        );


        /* GIFT APPEARS */

        gsap.from(
            giftBox,
            {
                opacity: 0,
                scale: 0.5,
                rotation: -12,
                duration: 1.2,
                delay: 0.3,
                ease: "back.out(1.7)"
            }
        );


        /* GIFT FLOAT */

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


        /* SCRATCH */

        setTimeout(
            resizeScratchCanvas,
            300
        );

    }
);


/* ========================================
   UNLOCK GIFT
======================================== */

if (unlockButton) {

    unlockButton.addEventListener(
        "click",
        openGift
    );

}


function openGift() {

    if (
        !giftBox ||
        !giftLid ||
        !lockMessage ||
        !reveal
    ) return;


    /* PREVENT DOUBLE CLICK */

    unlockButton.disabled = true;


    /* STOP FLOAT */

    gsap.killTweensOf(giftBox);


    /* BUTTON PRESS */

    gsap.timeline()

        .to(
            unlockButton,
            {
                scale: 0.92,
                duration: 0.1
            }
        )

        .to(
            unlockButton,
            {
                scale: 1,
                duration: 0.2
            }
        );


    /* ====================================
       GIFT SHAKE
    ==================================== */

    const timeline =
        gsap.timeline();


    timeline

        .to(
            giftBox,
            {
                x: -10,
                rotation: -6,
                duration: .08
            }
        )

        .to(
            giftBox,
            {
                x: 10,
                rotation: 6,
                duration: .08
            }
        )

        .to(
            giftBox,
            {
                x: -7,
                rotation: -4,
                duration: .08
            }
        )

        .to(
            giftBox,
            {
                x: 7,
                rotation: 4,
                duration: .08
            }
        )

        .to(
            giftBox,
            {
                x: 0,
                rotation: 0,
                duration: .15
            });


    /* ====================================
       LID FLIES OPEN
    ==================================== */

    gsap.to(
        giftLid,
        {
            y: -100,
            x: 20,
            rotation: -15,
            opacity: 0,
            duration: .8,
            delay: .45,
            ease: "back.in(1.5)"
        }
    );


    /* ====================================
       BODY GLOWS
    ==================================== */

    gsap.to(
        giftBody,
        {
            boxShadow:
                "0 0 70px rgba(168,92,92,.55)",
            duration: .5,
            delay: .7,
            yoyo: true,
            repeat: 1
        }
    );


    /* ====================================
       HEART PARTICLES
    ==================================== */

    setTimeout(
        createGiftExplosion,
        550
    );


    /* ====================================
       HIDE LOCK
    ==================================== */

    gsap.to(
        lockMessage,
        {
            opacity: 0,
            y: -25,
            duration: .5,
            delay: 1.1,

            onComplete: () => {

                lockMessage.style.display =
                    "none";

            }

        }
    );


    /* ====================================
       SHOW REVEAL
    ==================================== */

    setTimeout(
        () => {

            showReveal();

        },
        1250
    );

}


/* ========================================
   SHOW REVEAL
======================================== */

function showReveal() {

    if (!reveal) return;


    reveal.style.display =
        "block";


    reveal.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    gsap.fromTo(
        reveal,
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",

            onComplete: () => {

                createParticles();

                setTimeout(
                    resizeScratchCanvas,
                    100
                );

            }

        }
    );

}


/* ========================================
   GIFT EXPLOSION
======================================== */

function createGiftExplosion() {

    const symbols = [
        "♡",
        "✦",
        "✧",
        "⋆",
        "🤍"
    ];


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const particle =
            document.createElement("div");


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
            "42%";


        particle.style.zIndex =
            "999998";


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
                    350 -
                    175,

                y:
                    Math.random() *
                    300 -
                    150,

                rotation:
                    Math.random() *
                    360,

                scale:
                    Math.random() * .8 +
                    .6,

                opacity: 0,

                duration:
                    Math.random() * .8 +
                    .8,

                ease:
                    "power2.out",

                onComplete: () => {

                    particle.remove();

                }

            }
        );

    }

}


/* ========================================
   SCRATCH CARD
======================================== */

let ctx = null;

let isScratching = false;

let scratchedPixels = 0;

const requiredScratch = 45;


if (scratchCanvas) {

    ctx =
        scratchCanvas.getContext("2d");

}


/* ========================================
   RESIZE CANVAS
======================================== */

function resizeScratchCanvas() {

    if (
        !scratchCanvas ||
        !scratchContainer ||
        !ctx
    ) return;


    if (
        scratchCanvas.dataset.revealed
    ) return;


    const rect =
        scratchContainer.getBoundingClientRect();


    if (
        rect.width <= 0 ||
        rect.height <= 0
    ) return;


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


/* ========================================
   DRAW SCRATCH
======================================== */

function drawScratchLayer(
    width,
    height
) {

    if (!ctx) return;


    ctx.globalCompositeOperation =
        "source-over";


    ctx.fillStyle =
        "#a85c5c";


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


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
            `rgba(255,253,248,${Math.random() * .25})`;


        ctx.fillRect(
            x,
            y,
            size,
            size
        );

    }


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


/* ========================================
   SCRATCH
======================================== */

function scratch(x, y) {

    if (!ctx) return;


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


/* ========================================
   POINTER POSITION
======================================== */

function getPointerPosition(e) {

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


/* ========================================
   MOUSE
======================================== */

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


/* ========================================
   TOUCH
======================================== */

if (scratchCanvas) {

    scratchCanvas.addEventListener(
        "touchstart",
        (e) => {

            e.preventDefault();

            isScratching = true;

            const touch =
                e.touches[0];

            const rect =
                scratchCanvas.getBoundingClientRect();


            scratch(
                touch.clientX - rect.left,
                touch.clientY - rect.top
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

            const rect =
                scratchCanvas.getBoundingClientRect();


            scratch(
                touch.clientX - rect.left,
                touch.clientY - rect.top
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

}


window.addEventListener(
    "mouseup",
    () => {

        isScratching = false;

    }
);


/* ========================================
   REVEAL TRACKING
======================================== */

function revealTracking() {

    if (
        !scratchCanvas ||
        scratchCanvas.dataset.revealed
    ) return;


    scratchCanvas.dataset.revealed =
        "true";


    trackingNumber.textContent =
        RESI;


    trackingCard.classList.add(
        "revealed"
    );


    gsap.to(
        scratchCanvas,
        {
            opacity: 0,
            duration: .8
        }
    );


    gsap.fromTo(
        trackingNumber,
        {
            scale: .8,
            opacity: .4
        },
        {
            scale: 1,
            opacity: 1,
            duration: .8,
            ease: "back.out(2)"
        }
    );


    const hint =
        document.querySelector(
            ".scratch-hint"
        );


    if (hint) {

        hint.textContent =
            "You found it. 📦 Your little surprise is on its way. ♡";

    }


    createScratchCelebration();

}


/* ========================================
   COPY
======================================== */

if (copyButton) {

    copyButton.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    RESI
                );

            } catch {

                const textarea =
                    document.createElement(
                        "textarea"
                    );


                textarea.value =
                    RESI;


                document.body.appendChild(
                    textarea
                );


                textarea.select();

                document.execCommand(
                    "copy"
                );

                textarea.remove();

            }


            copyButton.textContent =
                "Copied!!! 📦♡";


            setTimeout(
                () => {

                    copyButton.textContent =
                        "Copy tracking number";

                },
                1800
            );

        }
    );

}


/* ========================================
   FINAL POPUP
======================================== */

if (finishButton) {

    finishButton.addEventListener(
        "click",
        () => {

            popupOverlay.classList.add(
                "show"
            );


            document.body.style.overflow =
                "hidden";


            createCameraCelebration();

        }
    );

}


if (popupClose) {

    popupClose.addEventListener(
        "click",
        () => {

            popupOverlay.classList.remove(
                "show"
            );


            document.body.style.overflow =
                "";

        }
    );

}


if (popupOverlay) {

    popupOverlay.addEventListener(
        "click",
        (e) => {

            if (
                e.target ===
                popupOverlay
            ) {

                popupOverlay.classList.remove(
                    "show"
                );


                document.body.style.overflow =
                    "";

            }

        }
    );

}


document.addEventListener(
    "keydown",
    (e) => {

        if (
            e.key === "Escape" &&
            popupOverlay.classList.contains("show")
        ) {

            popupOverlay.classList.remove(
                "show"
            );


            document.body.style.overflow =
                "";

        }

    }
);


/* ========================================
   PARTICLES
======================================== */

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
            document.createElement("div");


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
            "999998";


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


/* ========================================
   SCRATCH CELEBRATION
======================================== */

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
            document.createElement("div");


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
            "999998";


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


/* ========================================
   POPUP CELEBRATION
======================================== */

function createCameraCelebration() {

    const symbols = [
        "♡",
        "✦",
        "✧",
        "⋆"
    ];


    for (
        let i = 0;
        i < 15;
        i++
    ) {

        const particle =
            document.createElement("div");


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
            "1000000";


        particle.style.pointerEvents =
            "none";


        particle.style.color =
            "#a85c5c";


        particle.style.fontSize =
            `${Math.random() * 10 + 12}px`;


        document.body.appendChild(
            particle
        );


        gsap.to(
            particle,
            {

                x:
                    Math.random() *
                    260 -
                    130,

                y:
                    Math.random() *
                    200 -
                    100,

                rotation:
                    Math.random() *
                    360,

                opacity: 0,

                duration:
                    Math.random() *
                    .8 +
                    .8,

                ease:
                    "power2.out",

                onComplete: () => {

                    particle.remove();

                }

            }
        );

    }

}


/* ========================================
   BACKGROUND FLOATING PARTICLES
======================================== */

setInterval(
    () => {

        const symbols = [
            "✦",
            "♡",
            "✧"
        ];


        const element =
            document.createElement("div");


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
            Math.random() * 100 + "vw";


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
                    -window.innerHeight - 100,

                x:
                    Math.random() * 100 - 50,

                rotation:
                    Math.random() * 80 - 40,

                duration:
                    Math.random() * 6 + 7,

                ease: "none",

                onComplete: () => {

                    element.remove();

                }

            }
        );

    },
    1800
);


/* ========================================
   RESIZE
======================================== */

window.addEventListener(
    "resize",
    () => {

        if (
            scratchCanvas &&
            !scratchCanvas.dataset.revealed
        ) {

            resizeScratchCanvas();

        }

    }
);
