/* ========================================
   CUSTOM CURSOR
======================================== */

const cursor =
    document.querySelector('.cursor');


document.addEventListener(
    'mousemove',
    (e) => {

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


/* ========================================
   YOUR TRACKING NUMBER
======================================== */

const RESI = "CM71903983627";


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

    }
);


/* ========================================
   UNLOCK GIFT
======================================== */

unlockButton.addEventListener(
    'click',
    () => {


        unlockButton.disabled = true;


        /* Button press */

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


        /* Gift shakes */

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


        /* Open lid */

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


        /* Gift body glow */

        gsap.to(
            '.gift-body',
            {

                boxShadow:
                    '0 0 60px rgba(168,92,92,.35)',

                duration: .8,

                delay: .5

            }
        );


        /* Hide lock */

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


/* ========================================
   SHOW REVEAL
======================================== */
function showReveal() {

    // Resi disembunyikan sampai scratch selesai
    trackingNumber.textContent = "";

    reveal.style.display = 'block';

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

                setTimeout(() => {
                    resizeScratchCanvas();
                }, 100);

            }
        }
    );
}

/* ========================================
   COPY RESI
======================================== */

/* ========================================
   SCRATCH CARD
======================================== */

const scratchCanvas =
    document.querySelector('#scratch-canvas');

const scratchContainer =
    document.querySelector('.scratch-container');

const trackingCard =
    document.querySelector('.tracking-card');


const ctx =
    scratchCanvas.getContext('2d');


let isScratching = false;

let scratchedPixels = 0;

const requiredScratch =
    45;


/* ========================================
   SET CANVAS SIZE
======================================== */

function resizeScratchCanvas() {

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


    ctx.scale(dpr, dpr);


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

    /*
        Base layer
    */

    ctx.fillStyle =
        '#a85c5c';

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /*
        Subtle texture
    */

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


    /*
        Scratch instruction
    */

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
        scratchedPixels >= requiredScratch
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
            e.clientX - rect.left,

        y:
            e.clientY - rect.top

    };

}


/* ========================================
   MOUSE
======================================== */

scratchCanvas.addEventListener(
    'mousedown',
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


window.addEventListener(
    'mouseup',
    () => {

        isScratching = false;

    }
);


/* ========================================
   TOUCH
======================================== */

scratchCanvas.addEventListener(
    'touchstart',
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
    { passive: false }
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
            touch.clientX - rect.left,
            touch.clientY - rect.top
        );

    },
    { passive: false }
);


scratchCanvas.addEventListener(
    'touchend',
    () => {

        isScratching = false;

    }
);


/* ========================================
   REVEAL TRACKING
======================================== */

function revealTracking() {

    if (
        scratchCanvas.dataset.revealed
    )
        return;

    scratchCanvas.dataset.revealed =
        'true';

    // Baru tampilkan nomor resi setelah digosok
    trackingNumber.textContent = RESI;

    trackingCard.classList.add(
        'revealed'
    );

    gsap.to(
        scratchCanvas,
        {
            opacity: 0,
            duration: .8,
            ease: "power2.out"
        }
    );

    gsap.fromTo(
        '#tracking-number',
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

    const hint =
        document.querySelector(
            '.scratch-hint'
        );

    hint.textContent =
        "You found it. 📦 Your little surprise is on its way. ♡";

    createScratchCelebration();
}


/* ========================================
   CELEBRATION
======================================= */

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
            document.createElement('div');


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random()
                    *
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
                Math.random() * 12 + 10
            ) + 'px';


        document.body.appendChild(
            particle
        );


        gsap.to(
            particle,
            {

                x:
                    Math.random() * 300
                    - 150,

                y:
                    Math.random() * 200
                    - 100,

                opacity: 0,

                rotation:
                    Math.random() * 360,

                duration:
                    1.2,

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
   INITIALIZE
======================================== */

window.addEventListener(
    'load',
    () => {

        setTimeout(
            resizeScratchCanvas,
            100
        );

    }
);


window.addEventListener(
    'resize',
    () => {

        /*
            Don't redraw after
            user has already scratched.
        */

        if (
            !scratchCanvas.dataset.revealed
        ) {

            resizeScratchCanvas();

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
            document.createElement('div');


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random()
                    *
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
                Math.random() * 15 + 10
            )
            + 'px';


        document.body.appendChild(
            particle
        );


        gsap.to(
            particle,
            {

                x:
                    Math.random() * 400
                    - 200,

                y:
                    Math.random() * 400
                    - 200,

                opacity: 0,

                rotation:
                    Math.random() * 360,

                duration:
                    Math.random() * 1.5
                    + 1,

                ease: "power2.out",

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
            document.createElement('div');


        element.className =
            'background-particle';


        element.textContent =
            symbols[
                Math.floor(
                    Math.random()
                    *
                    symbols.length
                )
            ];


        element.style.position =
            'fixed';


        element.style.left =
            Math.random() * 100
            + 'vw';


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
                    -window.innerHeight
                    -100,

                x:
                    Math.random() * 100
                    -50,

                rotation:
                    Math.random() * 80
                    -40,

                duration:
                    Math.random() * 6
                    + 7,

                ease: "none",

                onComplete: () => {

                    element.remove();

                }

            }
        );

    },
    1800
);
