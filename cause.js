// ========================================
// NAT'S BIRTHDAY QUEST
// ========================================


// ========================================
// CUSTOM CURSOR
// ========================================

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {

    if (!cursor) return;

    gsap.to(cursor, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.12,
        ease: "power2.out"
    });

});


// ========================================
// ELEMENTS
// ========================================

const flames =
    document.querySelectorAll('.flame');

const progressDots =
    document.querySelectorAll('.progress-dot');

const questText =
    document.querySelector('#quest-text');

const birthdayMessage =
    document.querySelector('#birthday-message');

const continueButton =
    document.querySelector('#continue-button');

const readyScreen =
    document.querySelector('#ready-screen');

const readyButton =
    document.querySelector('#ready-button');

const questContent =
    document.querySelector('#quest-content');


// ========================================
// VARIABLES
// ========================================

let candlesOut = 0;


// ========================================
// INITIAL PAGE
// ========================================

window.addEventListener('load', () => {

    // Page entrance

    gsap.fromTo(
        '.birthday-page',

        {
            opacity: 0,
            y: 25,
            scale: 0.98
        },

        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out"
        }
    );


    // ====================================
    // QUEST CONTENT
    // ====================================

    // Tetap hidden karena ada tombol Ready
    // Jangan disentuh display-nya di sini.


    // ====================================
    // CAKE
    // ====================================

    gsap.set('.cake-area', {

        opacity: 0,
        y: 35,
        scale: 0.9

    });


    // ====================================
    // QUEST STATUS
    // ====================================

    gsap.set('.quest-status', {

        opacity: 0,
        y: 10

    });


    // ====================================
    // BIRTHDAY MESSAGE
    // ====================================

    gsap.set(birthdayMessage, {

        opacity: 0,
        visibility: 'hidden',
        y: 25,
        scale: 0.96

    });

});


// ========================================
// STICKER ANIMATION
// ========================================

gsap.to('.sticker-d1', {

    x: 10,
    rotation: 3,

    duration: 1.8,

    repeat: -1,
    yoyo: true,

    ease: "sine.inOut"

});


gsap.to('.sticker-d2', {

    x: -10,
    rotation: -3,

    duration: 2.1,

    repeat: -1,
    yoyo: true,

    ease: "sine.inOut"

});


// ========================================
// READY BUTTON
// ========================================

if (readyButton) {

    readyButton.addEventListener('click', () => {


        // ====================================
        // REMOVE HIDDEN CLASS
        // ====================================

        if (questContent) {

            questContent.classList.remove('hidden');

        }


        // ====================================
        // SHOW QUEST CONTENT
        // ====================================

        gsap.fromTo(
            questContent,

            {
                opacity: 0
            },

            {
                opacity: 1,
                duration: 0.3
            }
        );


        // ====================================
        // HIDE READY SCREEN
        // ====================================

        gsap.to(
            readyScreen,

            {

                opacity: 0,
                scale: 0.95,

                duration: 0.5,

                ease: "power2.inOut",

                onComplete: () => {

                    readyScreen.style.display = 'none';

                }

            }
        );


        // ====================================
        // SHOW CAKE
        // ====================================

        gsap.to(
            '.cake-area',

            {

                opacity: 1,

                y: 0,

                scale: 1,

                duration: 1,

                delay: 0.25,

                ease: "back.out(1.5)"

            }
        );


        // ====================================
        // SHOW QUEST STATUS
        // ====================================

        gsap.to(
            '.quest-status',

            {

                opacity: 1,

                y: 0,

                duration: 0.6,

                delay: 0.8,

                ease: "power2.out"

            }
        );

    });

}


// ========================================
// CANDLE QUEST
// ========================================

flames.forEach((flame) => {

    flame.addEventListener('click', () => {


        // Prevent double click

        if (
            flame.classList.contains('extinguished')
        ) {

            return;

        }


        flame.classList.add('extinguished');


        // ====================================
        // GET CANDLE
        // ====================================

        const candle =
            flame.closest('.candle');

        const smoke =
            candle.querySelector('.smoke');


        // ====================================
        // FLAME DISAPPEAR
        // ====================================

        gsap.to(
            flame,

            {

                opacity: 0,

                scale: 0,

                rotation: -20,

                duration: 0.35,

                ease: "back.in(2)"

            }
        );


        // ====================================
        // SMOKE
        // ====================================

        gsap.fromTo(

            smoke,

            {

                opacity: 0,
                y: 0,
                scale: 0.5

            },

            {

                opacity: 0.5,
                y: -20,
                scale: 1,

                duration: 0.4,

                ease: "power2.out",

                onComplete: () => {

                    gsap.to(
                        smoke,

                        {

                            opacity: 0,

                            y: -45,

                            scale: 1.5,

                            duration: 0.8,

                            ease: "power2.out"

                        }
                    );

                }

            }
        );


        // ====================================
        // CANDLE SHAKE
        // ====================================

        gsap.fromTo(

            candle,

            {
                y: 0,
                rotation: 0
            },

            {

                y: -5,

                rotation:
                    Math.random() > 0.5
                        ? -3
                        : 3,

                duration: 0.15,

                yoyo: true,

                repeat: 1,

                ease: "power2.out"

            }

        );


        // ====================================
        // PROGRESS
        // ====================================

        candlesOut++;


        if (progressDots[candlesOut - 1]) {

            progressDots[
                candlesOut - 1
            ].classList.remove('active');

        }


        // ====================================
        // TEXT
        // ====================================

        const remaining =
            flames.length - candlesOut;


        if (remaining > 0) {

            questText.textContent =

                remaining === 1

                    ? "One more candle... make your wish. ✦"

                    : `${remaining} candles left... keep going. ✦`;

        }


        // ====================================
        // COMPLETE
        // ====================================

        if (
            candlesOut === flames.length
        ) {

            completeQuest();

        }

    });

});


// ========================================
// COMPLETE QUEST
// ========================================

function completeQuest() {


    questText.textContent =
        "You did it. Your wish is ready. 🤍";


    // ====================================
    // CELEBRATION
    // ====================================

    createCelebration();


    // ====================================
    // CAKE BOUNCE
    // ====================================

    gsap.to(
        '.cake',

        {

            y: -8,

            rotation: 1,

            duration: 0.25,

            yoyo: true,

            repeat: 3,

            ease: "power2.out"

        }

    );


    // ====================================
    // HIDE QUEST STATUS
    // ====================================

    gsap.to(
        '.quest-status',

        {

            opacity: 0,

            y: -10,

            duration: 0.5

        }

    );


    // ====================================
    // SHOW BIRTHDAY MESSAGE
    // ====================================

    gsap.to(
        birthdayMessage,

        {

            opacity: 1,

            visibility: 'visible',

            y: 0,

            scale: 1,

            duration: 1,

            delay: 0.7,

            ease: "back.out(1.5)"

        }

    );

}


// ========================================
// CELEBRATION PARTICLES
// ========================================

function createCelebration() {

    const symbols = [
        '✦',
        '♡',
        '✧',
        '⋆'
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
            '100';

        particle.style.pointerEvents =
            'none';

        particle.style.color =
            '#a85c5c';

        particle.style.fontSize =
            `${Math.random() * 12 + 12}px`;


        document.body.appendChild(
            particle
        );


        gsap.to(
            particle,

            {

                x:
                    Math.random() * 500 - 250,

                y:
                    Math.random() * 400 - 250,

                rotation:
                    Math.random() * 360,

                opacity: 0,

                scale:
                    Math.random() * 0.8 + 0.5,

                duration:
                    Math.random() * 1.5 + 1,

                ease: "power2.out",

                onComplete: () => {

                    particle.remove();

                }

            }

        );

    }

}


// ========================================
// CONTINUE
// ========================================

if (continueButton) {

    continueButton.addEventListener(
        'click',
        () => {

            gsap.to(
                '.birthday-page',

                {

                    opacity: 0,

                    scale: 1.03,

                    duration: 0.8,

                    ease: "power2.inOut",

                    onComplete: () => {

                        window.location.href =
                            'last.html';

                    }

                }

            );

        }
    );

}
