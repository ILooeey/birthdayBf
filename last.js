/* ========================================
   NAT'S FINAL BIRTHDAY QUEST
======================================== */


/* ========================================
   CUSTOM CURSOR
======================================== */

const cursor =
    document.querySelector('.cursor');


document.addEventListener(
    'mousemove',
    (e) => {

        if (!cursor) return;

        gsap.to(cursor, {

            left: e.clientX,

            top: e.clientY,

            duration: .15,

            ease: "power2.out"

        });

    }
);


/* ========================================
   ELEMENTS
======================================== */

const giftBox =
    document.querySelector('#gift-box');

const unlockButton =
    document.querySelector('#unlock-button');

const lockMessage =
    document.querySelector('#lock-message');

const reveal =
    document.querySelector('#reveal');

const trackingNumber =
    document.querySelector('#tracking-number');

const copyButton =
    document.querySelector('#copy-button');

const finishButton =
    document.querySelector('#finish-button');


/* ========================================
   CAMERA POPUP ELEMENTS
======================================== */

const cameraModal =
    document.querySelector('#camera-modal');

const cameraModalCard =
    document.querySelector('.camera-modal-card');

const cameraReadyButton =
    document.querySelector('#camera-ready-button');


/* ========================================
   YOUR TRACKING NUMBER
======================================== */

const RESI =
    "CM71903983627";


/* ========================================
   PAGE LOAD
======================================== */

window.addEventListener(
    'load',
    () => {

        gsap.from(
            '.container',
            {
                opacity: 0,

                y: 25,

                duration: 1,

                ease: "power3.out"
            }
        );


        gsap.from(
            '.gift-box',
            {
                opacity: 0,

                scale: .6,

                rotation: -10,

                duration: 1.2,

                delay: .3,

                ease: "back.out(1.7)"
            }
        );


        gsap.to(
            '.gift-box',
            {
                y: -8,

                duration: 1.8,

                repeat: -1,

                yoyo: true,

                ease: "sine.inOut"
            }
        );


        /* ====================================
           CAMERA MODAL INITIAL STATE
        ==================================== */

        if (
            cameraModal &&
            cameraModalCard
        ) {

            gsap.set(
                cameraModal,
                {
                    opacity: 0,

                    visibility: 'hidden',

                    pointerEvents: 'none'
                }
            );


            gsap.set(
                cameraModalCard,
                {
                    opacity: 0,

                    y: 25,

                    scale: .92
                }
            );

        }

    }
);


/* ========================================
   UNLOCK GIFT
======================================== */

if (unlockButton) {

    unlockButton.addEventListener(
        'click',
        () => {

            unlockButton.disabled =
                true;


            /* ====================================
               BUTTON PRESS
            ==================================== */

            gsap.to(
                unlockButton,
                {
                    scale: .9,

                    duration: .1
                }
            );


            gsap.to(
                unlockButton,
                {
                    scale: 1,

                    duration: .25,

                    delay: .1
                }
            );


            /* ====================================
               GIFT SHAKES
            ==================================== */

            gsap.timeline()

                .to(
                    giftBox,
                    {
                        x: -8,

                        rotation: -6,

                        duration: .08
                    }
                )

                .to(
                    giftBox,
                    {
                        x: 8,

                        rotation: 5,

                        duration: .08
                    }
                )

                .to(
                    giftBox,
                    {
                        x: -5,

                        rotation: -3,

                        duration: .08
                    }
                )

                .to(
                    giftBox,
                    {
                        x: 0,

                        rotation: 0,

                        duration: .15
                    }
                );


            /* ====================================
               OPEN LID
            ==================================== */

            gsap.to(
                '.gift-lid',
                {

                    y: -80,

                    rotation: -8,

                    opacity: 0,

                    duration: .8,

                    delay: .4,

                    ease: "back.out(1.5)"

                }
            );


            /* ====================================
               GIFT BODY GLOW
            ==================================== */

            gsap.to(
                '.gift-body',
                {

                    boxShadow:
                        '0 0 60px rgba(168,92,92,.35)',

                    duration: .8,

                    delay: .5

                }
            );


            /* ====================================
               HIDE LOCK
            ==================================== */

            gsap.to(
                lockMessage,
                {

                    opacity: 0,

                    y: -20,

                    duration: .5,

                    delay: 1,

                    onComplete: () => {

                        lockMessage.style.display =
                            'none';

                        showReveal();

                    }

                }
            );

        }
    );

}


/* ========================================
   SHOW REVEAL
======================================== */

function showReveal() {

    if (!reveal) return;


    /*
        Hide tracking number
        until scratch is completed
    */

    if (trackingNumber) {

        trackingNumber.textContent = "";

    }


    reveal.style.display =
        'block';


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


                setTimeout(
                    () => {

                        resizeScratchCanvas();

                    },
                    100
                );

            }
        }
    );

}


/* ========================================
   SCRATCH CARD
======================================== */

const scratchCanvas =
    document.querySelector(
        '#scratch-canvas'
    );

const scratchContainer =
    document.querySelector(
        '.scratch-container'
    );

const trackingCard =
    document.querySelector(
        '.tracking-card'
    );


let ctx = null;


if (scratchCanvas) {

    ctx =
        scratchCanvas.getContext(
            '2d'
        );

}


let isScratching =
    false;


let scratchedPixels =
    0;


const requiredScratch =
    45;


/* ========================================
   SET CANVAS SIZE
======================================== */

function resizeScratchCanvas() {

    if (
        !scratchCanvas ||
        !scratchContainer ||
        !ctx
    )
        return;


    const rect =
        scratchContainer.getBoundingClientRect();


    const dpr =
        window.devicePixelRatio || 1;


    scratchCanvas.width =
        rect.width * dpr;


    scratchCanvas.height =
        rect.height * dpr;


    scratchCanvas.style.width =
        rect.width + 'px';


    scratchCanvas.style.height =
        rect.height + 'px';


    /*
        Reset transform before scaling.

        Prevents the canvas from
        becoming increasingly distorted
        after multiple resize events.
    */

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
   SCRATCH LAYER
======================================== */

function drawScratchLayer(
    width,
    height
) {

    if (!ctx) return;


    ctx.globalCompositeOperation =
        'source-over';


    /* ====================================
       BASE
    ==================================== */

    ctx.fillStyle =
        '#a85c5c';


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /* ====================================
       TEXTURE
    ==================================== */

    for (
        let i = 0;
        i < 350;
        i++
    ) {

        const x =
            Math.random() *
            width;


        const y =
            Math.random() *
            height;


        const size =
            Math.random() * 2 + 1;


        ctx.fillStyle =
            `rgba(255,253,248,${
                Math.random() * .25
            })`;


        ctx.fillRect(
            x,
            y,
            size,
            size
        );

    }


    /* ====================================
       INSTRUCTION
    ==================================== */

    ctx.fillStyle =
        '#fffdf8';


    ctx.font =
        'bold 12px Arial';


    ctx.textAlign =
        'center';


    ctx.textBaseline =
        'middle';


    ctx.fillText(
        '✦ SCRATCH HERE ✦',

        width / 2,

        height / 2
    );

}


/* ========================================
   SCRATCH FUNCTION
======================================== */

function scratch(
    x,
    y
) {

    if (!ctx) return;


    ctx.globalCompositeOperation =
        'destination-out';


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
        'source-over';


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

    if (!scratchCanvas)
        return {
            x: 0,
            y: 0
        };


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
        'mousedown',
        (e) => {

            isScratching =
                true;


            const pos =
                getPointerPosition(e);


            scratch(
                pos.x,
                pos.y
            );

        }
    );


    scratchCanvas.addEventListener(
        'mousemove',
        (e) => {

            if (!isScratching)
                return;


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
   MOUSE UP
======================================== */

window.addEventListener(
    'mouseup',
    () => {

        isScratching =
            false;

    }
);


/* ========================================
   TOUCH
======================================== */

if (scratchCanvas) {

    scratchCanvas.addEventListener(
        'touchstart',
        (e) => {

            e.preventDefault();


            isScratching =
                true;


            const touch =
                e.touches[0];


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
        'touchmove',
        (e) => {

            e.preventDefault();


            if (!isScratching)
                return;


            const touch =
                e.touches[0];


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
        'touchend',
        () => {

            isScratching =
                false;

        }
    );

}


/* ========================================
   REVEAL TRACKING
======================================== */

function revealTracking() {

    if (!scratchCanvas)
        return;


    if (
        scratchCanvas.dataset.revealed
    )
        return;


    scratchCanvas.dataset.revealed =
        'true';


    /* ====================================
       SHOW RESI
    ==================================== */

    if (trackingNumber) {

        trackingNumber.textContent =
            RESI;

    }


    if (trackingCard) {

        trackingCard.classList.add(
            'revealed'
        );

    }


    /* ====================================
       HIDE SCRATCH LAYER
    ==================================== */

    gsap.to(
        scratchCanvas,
        {

            opacity: 0,

            duration: .8,

            ease: "power2.out"

        }
    );


    /* ====================================
       RESI ANIMATION
    ==================================== */

    if (trackingNumber) {

        gsap.fromTo(
            trackingNumber,
            {
                scale: .85,

                opacity: .5
            },
            {
                scale: 1,

                opacity: 1,

                duration: .8,

                ease: "back.out(2)"
            }
        );

    }


    const hint =
        document.querySelector(
            '.scratch-hint'
        );


    if (hint) {

        hint.textContent =
            "You found it. 📦 Your little surprise is on its way. ♡";

    }


    createScratchCelebration();

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
            document.createElement(
                'div'
            );


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.position =
            'fixed';


        particle.style.left =
            '50%';


        particle.style.top =
            '55%';


        particle.style.zIndex =
            '999';


        particle.style.pointerEvents =
            'none';


        particle.style.color =
            '#a85c5c';


        particle.style.fontSize =
            (
                Math.random() * 12 +
                10
            ) + 'px';


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
   INITIALIZE SCRATCH
======================================== */

window.addEventListener(
    'load',
    () => {

        setTimeout(
            () => {

                resizeScratchCanvas();

            },
            100
        );

    }
);


/* ========================================
   RESIZE
======================================== */

window.addEventListener(
    'resize',
    () => {

        if (
            scratchCanvas &&
            !scratchCanvas.dataset.revealed
        ) {

            resizeScratchCanvas();

        }

    }
);


/* ========================================
   GENERAL PARTICLES
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
            document.createElement(
                'div'
            );


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.position =
            'fixed';


        particle.style.left =
            '50%';


        particle.style.top =
            '45%';


        particle.style.zIndex =
            '999';


        particle.style.pointerEvents =
            'none';


        particle.style.color =
            '#a85c5c';


        particle.style.fontSize =
            (
                Math.random() * 15 +
                10
            ) + 'px';


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
   FLOATING BACKGROUND
======================================== */

setInterval(
    () => {

        const symbols = [
            "✦",
            "♡",
            "✧"
        ];


        const element =
            document.createElement(
                'div'
            );


        element.className =
            'background-particle';


        element.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        element.style.position =
            'fixed';


        element.style.left =
            Math.random() *
            100 +
            'vw';


        element.style.top =
            '105vh';


        element.style.color =
            '#a85c5c';


        element.style.opacity =
            '.2';


        element.style.pointerEvents =
            'none';


        element.style.zIndex =
            '1';


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

    },

    1800
);


/* ========================================
   CAMERA MOMENT
======================================== */
/* ========================================
   FINAL VC POPUP
======================================== */

const cameraPopupOverlay =
    document.querySelector(
        '#camera-popup-overlay'
    );

const cameraPopup =
    document.querySelector(
        '#camera-popup'
    );

const cameraPopupClose =
    document.querySelector(
        '#camera-popup-close'
    );


/* ========================================
   OPEN FINAL POPUP
======================================== */

if (
    finishButton &&
    cameraPopupOverlay &&
    cameraPopup
) {

    finishButton.addEventListener(
        'click',
        () => {

            /* ====================================
               SHOW OVERLAY
            ==================================== */

            cameraPopupOverlay.classList.add(
                'show'
            );


            /* ====================================
               ENTRANCE ANIMATION
            ==================================== */

            gsap.fromTo(
                cameraPopup,
                {
                    opacity: 0,

                    y: 25,

                    scale: .92
                },
                {
                    opacity: 1,

                    y: 0,

                    scale: 1,

                    duration: .65,

                    ease: "back.out(1.5)"
                }
            );

        }
    );

}


/* ========================================
   CLOSE FINAL POPUP
======================================== */

if (
    cameraPopupClose &&
    cameraPopupOverlay &&
    cameraPopup
) {

    cameraPopupClose.addEventListener(
        'click',
        () => {

            /* ====================================
               BUTTON PRESS
            ==================================== */

            gsap.to(
                cameraPopupClose,
                {
                    scale: .92,

                    duration: .1,

                    yoyo: true,

                    repeat: 1
                }
            );


            /* ====================================
               CARD EXIT
            ==================================== */

            gsap.to(
                cameraPopup,
                {
                    opacity: 0,

                    y: 20,

                    scale: .95,

                    duration: .35,

                    ease: "power2.in"
                }
            );


            /* ====================================
               CLOSE OVERLAY
            ==================================== */

            gsap.to(
                cameraPopupOverlay,
                {
                    opacity: 0,

                    duration: .4,

                    delay: .1,

                    ease: "power2.in",

                    onComplete: () => {

                        cameraPopupOverlay.classList.remove(
                            'show'
                        );

                        /* Reset */

                        gsap.set(
                            cameraPopup,
                            {
                                opacity: 1,

                                y: 0,

                                scale: 1
                            }
                        );

                    }
                }
            );


            createCameraCelebration();

        }
    );

}


/* ========================================
   CAMERA CELEBRATION
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
        i < 10;
        i++
    ) {

        const particle =
            document.createElement(
                'div'
            );


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.position =
            'fixed';


        particle.style.left =
            '50%';


        particle.style.top =
            '50%';


        particle.style.zIndex =
            '100000';


        particle.style.pointerEvents =
            'none';


        particle.style.color =
            '#a85c5c';


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
