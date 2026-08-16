/* =========================================================
   NAT'S FINAL BIRTHDAY QUEST
   FULL JAVASCRIPT
========================================================= */


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {

    if (!cursor) return;

    gsap.to(cursor, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.15,
        ease: "power2.out"
    });

});


/* =========================================================
   ELEMENTS
========================================================= */

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


/* =========================================================
   FINAL POPUP ELEMENTS
========================================================= */

const cameraPopupOverlay =
    document.querySelector("#camera-popup-overlay");

const cameraPopup =
    document.querySelector("#camera-popup");

const cameraPopupClose =
    document.querySelector("#camera-popup-close");


/* =========================================================
   TRACKING NUMBER
========================================================= */

const RESI = "CM71903983627";


/* =========================================================
   STATE
========================================================= */

let isScratching = false;

let scratchedPixels = 0;

let trackingRevealed = false;

const requiredScratch = 45;


/* =========================================================
   SCRATCH ELEMENTS
========================================================= */

const scratchCanvas =
    document.querySelector("#scratch-canvas");

const scratchContainer =
    document.querySelector(".scratch-container");

const trackingCard =
    document.querySelector(".tracking-card");

let ctx = null;

if (scratchCanvas) {

    ctx =
        scratchCanvas.getContext("2d");

}


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", () => {


    /* -----------------------------------------------------
       PAGE ENTRANCE
    ----------------------------------------------------- */

    gsap.from(".container", {

        opacity: 0,

        y: 25,

        duration: 1,

        ease: "power3.out"

    });


    /* -----------------------------------------------------
       GIFT ENTRANCE
    ----------------------------------------------------- */

    if (giftBox) {

        gsap.from(giftBox, {

            opacity: 0,

            scale: 0.6,

            rotation: -10,

            duration: 1.2,

            delay: 0.3,

            ease: "back.out(1.7)"

        });


        /* -------------------------------------------------
           GIFT FLOAT
        ------------------------------------------------- */

        gsap.to(giftBox, {

            y: -8,

            duration: 1.8,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        });

    }


    /* -----------------------------------------------------
       POPUP INITIAL STATE
    ----------------------------------------------------- */

    if (
        cameraPopupOverlay &&
        cameraPopup
    ) {

        gsap.set(cameraPopupOverlay, {

            opacity: 0,

            visibility: "hidden",

            pointerEvents: "none"

        });


        gsap.set(cameraPopup, {

            opacity: 0,

            y: 30,

            scale: 0.92

        });

    }


    /* -----------------------------------------------------
       INITIAL SCRATCH CANVAS
    ----------------------------------------------------- */

    setTimeout(() => {

        resizeScratchCanvas();

    }, 300);

});


/* =========================================================
   UNLOCK GIFT
========================================================= */

if (unlockButton) {

    unlockButton.addEventListener("click", () => {


        unlockButton.disabled = true;


        /* -------------------------------------------------
           BUTTON PRESS
        ------------------------------------------------- */

        gsap.timeline()

            .to(unlockButton, {

                scale: 0.9,

                duration: 0.1

            })

            .to(unlockButton, {

                scale: 1,

                duration: 0.25

            });


        /* -------------------------------------------------
           GIFT SHAKE
        ------------------------------------------------- */

        if (giftBox) {

            gsap.timeline()

                .to(giftBox, {

                    x: -8,

                    rotation: -6,

                    duration: 0.08

                })

                .to(giftBox, {

                    x: 8,

                    rotation: 5,

                    duration: 0.08

                })

                .to(giftBox, {

                    x: -5,

                    rotation: -3,

                    duration: 0.08

                })

                .to(giftBox, {

                    x: 0,

                    rotation: 0,

                    duration: 0.15

                });

        }


        /* -------------------------------------------------
           OPEN GIFT LID
        ------------------------------------------------- */

        gsap.to(".gift-lid", {

            y: -80,

            rotation: -8,

            opacity: 0,

            duration: 0.8,

            delay: 0.4,

            ease: "back.out(1.5)"

        });


        /* -------------------------------------------------
           GIFT BODY GLOW
        ------------------------------------------------- */

        gsap.to(".gift-body", {

            boxShadow:
                "0 0 60px rgba(168,92,92,.35)",

            duration: 0.8,

            delay: 0.5

        });


        /* -------------------------------------------------
           HIDE LOCK MESSAGE
        ------------------------------------------------- */

        if (lockMessage) {

            gsap.to(lockMessage, {

                opacity: 0,

                y: -20,

                duration: 0.5,

                delay: 1,

                onComplete: () => {

                    lockMessage.style.display = "none";

                    showReveal();

                }

            });

        }

        else {

            showReveal();

        }

    });

}


/* =========================================================
   SHOW REVEAL
========================================================= */

function showReveal() {

    if (!reveal) return;


    /* -----------------------------------------------------
       RESET TRACKING
    ----------------------------------------------------- */

    if (trackingNumber) {

        trackingNumber.textContent = "";

    }


    scratchedPixels = 0;

    trackingRevealed = false;


    /* -----------------------------------------------------
       SHOW REVEAL
    ----------------------------------------------------- */

    reveal.style.display = "block";


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
   SCRATCH CANVAS RESIZE
========================================================= */

function resizeScratchCanvas() {

    if (
        !scratchCanvas ||
        !scratchContainer ||
        !ctx ||
        trackingRevealed
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


/* =========================================================
   DRAW SCRATCH LAYER
========================================================= */

function drawScratchLayer(width, height) {

    if (!ctx) return;


    ctx.globalCompositeOperation =
        "source-over";


    /* -----------------------------------------------------
       BASE
    ----------------------------------------------------- */

    ctx.fillStyle =
        "#a85c5c";


    ctx.fillRect(

        0,

        0,

        width,

        height

    );


    /* -----------------------------------------------------
       TEXTURE
    ----------------------------------------------------- */

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
            `rgba(255,253,248,${Math.random() * 0.25})`;


        ctx.fillRect(

            x,

            y,

            size,

            size

        );

    }


    /* -----------------------------------------------------
       TEXT
    ----------------------------------------------------- */

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

function scratch(x, y) {

    if (
        !ctx ||
        trackingRevealed
    ) return;


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
   POINTER POSITION
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
    ) return;


    trackingRevealed = true;


    /* -----------------------------------------------------
       SHOW RESI
    ----------------------------------------------------- */

    if (trackingNumber) {

        trackingNumber.textContent =
            RESI;

    }


    /* -----------------------------------------------------
       ADD REVEALED CLASS
    ----------------------------------------------------- */

    if (trackingCard) {

        trackingCard.classList.add(
            "revealed"
        );

    }


    /* -----------------------------------------------------
       HIDE SCRATCH LAYER
    ----------------------------------------------------- */

    gsap.to(

        scratchCanvas,

        {

            opacity: 0,

            duration: 0.8,

            ease: "power2.out"

        }

    );


    /* -----------------------------------------------------
       RESI ANIMATION
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       CHANGE HINT
    ----------------------------------------------------- */

    const hint =
        document.querySelector(".scratch-hint");


    if (hint) {

        hint.textContent =
            "You found it. 📦 Your little surprise is on its way. ♡";

    }


    /* -----------------------------------------------------
       CELEBRATION
    ----------------------------------------------------- */

    createScratchCelebration();

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

                ease: "power2.out",

                onComplete: () => {

                    particle.remove();

                }

            }

        );

    }

}


/* =========================================================
   WINDOW RESIZE
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
   GENERAL PARTICLES
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

                ease: "power2.out",

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

setInterval(() => {


    const symbols = [

        "✦",

        "♡",

        "✧"

    ];


    const element =
        document.createElement("div");


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
                Math.random() * 6 +
                7,

            ease: "none",

            onComplete: () => {

                element.remove();

            }

        }

    );


}, 1800);


/* =========================================================
   COPY TRACKING NUMBER
========================================================= */

if (copyButton) {

    copyButton.addEventListener(

        "click",

        async () => {

            try {

                await navigator.clipboard.writeText(
                    RESI
                );


                const originalText =
                    copyButton.textContent;


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


                setTimeout(() => {

                    copyButton.textContent =
                        originalText;

                }, 1800);

            }

            catch (error) {

                /* ------------------------------------------------
                   FALLBACK
                ------------------------------------------------ */

                const textarea =
                    document.createElement("textarea");


                textarea.value = RESI;


                document.body.appendChild(
                    textarea
                );


                textarea.select();


                document.execCommand(
                    "copy"
                );


                textarea.remove();


                copyButton.textContent =
                    "Copied! 📦♡";


                setTimeout(() => {

                    copyButton.textContent =
                        "Mau dicopy? Klik aja";

                }, 1800);

            }

        }

    );

}


/* =========================================================
   FINAL VC POPUP
========================================================= */


/* =========================================================
   OPEN POPUP
========================================================= */

function openFinalPopup() {

    if (
        !cameraPopupOverlay ||
        !cameraPopup
    ) {

        console.error(
            "FINAL POPUP ELEMENT NOT FOUND."
        );

        return;

    }


    /* -----------------------------------------------------
       STOP OLD ANIMATIONS
    ----------------------------------------------------- */

    gsap.killTweensOf([

        cameraPopupOverlay,

        cameraPopup

    ]);


    /* -----------------------------------------------------
       SHOW OVERLAY
    ----------------------------------------------------- */

    cameraPopupOverlay.classList.add(
        "show"
    );


    cameraPopupOverlay.style.visibility =
        "visible";


    cameraPopupOverlay.style.pointerEvents =
        "auto";


    cameraPopupOverlay.style.opacity =
        "1";


    /* -----------------------------------------------------
       POPUP START
    ----------------------------------------------------- */

    gsap.set(

        cameraPopup,

        {

            opacity: 0,

            y: 30,

            scale: 0.92

        }

    );


    /* -----------------------------------------------------
       POPUP ANIMATION
    ----------------------------------------------------- */

    gsap.to(

        cameraPopup,

        {

            opacity: 1,

            y: 0,

            scale: 1,

            duration: 0.65,

            ease: "back.out(1.5)"

        }

    );

}


/* =========================================================
   CLOSE POPUP
========================================================= */

function closeFinalPopup() {

    if (
        !cameraPopupOverlay ||
        !cameraPopup
    ) return;


    gsap.killTweensOf([

        cameraPopupOverlay,

        cameraPopup

    ]);


    /* -----------------------------------------------------
       CARD EXIT
    ----------------------------------------------------- */

    gsap.to(

        cameraPopup,

        {

            opacity: 0,

            y: 20,

            scale: 0.95,

            duration: 0.3,

            ease: "power2.in"

        }

    );


    /* -----------------------------------------------------
       OVERLAY EXIT
    ----------------------------------------------------- */

    gsap.to(

        cameraPopupOverlay,

        {

            opacity: 0,

            duration: 0.35,

            delay: 0.1,

            ease: "power2.in",

            onComplete: () => {


                cameraPopupOverlay.classList.remove(
                    "show"
                );


                cameraPopupOverlay.style.visibility =
                    "hidden";


                cameraPopupOverlay.style.pointerEvents =
                    "none";


                gsap.set(

                    cameraPopup,

                    {

                        opacity: 0,

                        y: 30,

                        scale: 0.92

                    }

                );

            }

        }

    );


    createCameraCelebration();

}


/* =========================================================
   FINISH BUTTON → OPEN POPUP
========================================================= */

if (finishButton) {

    finishButton.addEventListener(

        "click",

        (e) => {

            e.preventDefault();

            openFinalPopup();

        }

    );

}


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (cameraPopupClose) {

    cameraPopupClose.addEventListener(

        "click",

        (e) => {

            e.preventDefault();


            gsap.to(

                cameraPopupClose,

                {

                    scale: 0.92,

                    duration: 0.1,

                    yoyo: true,

                    repeat: 1

                }

            );


            setTimeout(() => {

                closeFinalPopup();

            }, 120);

        }

    );

}


/* =========================================================
   CLICK OUTSIDE POPUP
========================================================= */

if (cameraPopupOverlay) {

    cameraPopupOverlay.addEventListener(

        "click",

        (e) => {

            if (
                e.target ===
                cameraPopupOverlay
            ) {

                closeFinalPopup();

            }

        }

    );

}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(

    "keydown",

    (e) => {

        if (

            e.key === "Escape" &&

            cameraPopupOverlay &&

            cameraPopupOverlay.classList.contains(
                "show"
            )

        ) {

            closeFinalPopup();

        }

    }

);


/* =========================================================
   CAMERA POPUP CELEBRATION
========================================================= */

function createCameraCelebration() {

    const symbols = [

        "♡",

        "✦",

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
            "50%";


        particle.style.zIndex =
            "100000";


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
                    220 -
                    110,

                rotation:
                    Math.random() *
                    360,

                opacity: 0,

                duration:
                    Math.random() *
                    0.8 +
                    0.8,

                ease:
                    "power2.out",

                onComplete: () => {

                    particle.remove();

                }

            }

        );

    }

}
