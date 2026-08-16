// ========================================
// NAT'S BIRTHDAY QUEST
// ========================================


// ========================================
// CUSTOM CURSOR
// ========================================

const cursor =
    document.querySelector('.cursor');


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


    // ------------------------------------
    // Page entrance
    // ------------------------------------

    gsap.fromTo(

        '.birthday-page',

        {
            opacity: 0,
            y: 25,
            scale: .98
        },

        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out"
        }

    );


    // ------------------------------------
    // Cake starts hidden
    // ------------------------------------

    gsap.set(

        '.cake-area',

        {
            opacity: 0,
            y: 40,
            scale: .85
        }

    );


    // ------------------------------------
    // Quest status starts hidden
    // ------------------------------------

    gsap.set(

        '.quest-status',

        {
            opacity: 0,
            y: 10
        }

    );


    // ------------------------------------
    // Birthday message starts hidden
    // ------------------------------------

    gsap.set(

        '.birthday-message',

        {
            opacity: 0,
            visibility: 'hidden',
            y: 25,
            scale: .96
        }

    );

});


// ========================================
// STICKER ANIMATION
// ========================================

gsap.to(

    ".sticker-d1",

    {

        x: 8,

        rotation: 3,

        duration: 1.8,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    }

);


gsap.to(

    ".sticker-d2",

    {

        x: -8,

        rotation: -3,

        duration: 2.1,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    }

);


// ========================================
// READY SCREEN
// ========================================

if (
    readyButton &&
    readyScreen
) {


    readyButton.addEventListener(
        'click',
        () => {


            // ====================================
            // SHOW QUEST CONTENT
            // ====================================

            if (questContent) {

                questContent.classList.remove(
                    'hidden'
                );

            }


            // ====================================
            // HIDE READY SCREEN
            // ====================================

            gsap.to(

                readyScreen,

                {

                    opacity: 0,

                    scale: .95,

                    duration: .5,

                    ease: "power2.inOut",

                    onComplete: () => {

                        readyScreen.style.display =
                            'none';

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

                    delay: .25,

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

                    duration: .6,

                    delay: .85,

                    ease: "power2.out"

                }

            );


            // ====================================
            // DESCRIPTION ENTRANCE
            // ====================================

            gsap.fromTo(

                '.description',

                {

                    opacity: 0,

                    y: 10

                },

                {

                    opacity: 1,

                    y: 0,

                    duration: .6,

                    delay: .15,

                    ease: "power2.out"

                }

            );


            // ====================================
            // STICKER ENTRANCE
            // ====================================

            gsap.fromTo(

                '.cake-sticker',

                {

                    opacity: 0,

                    scale: .75

                },

                {

                    opacity: 1,

                    scale: 1,

                    duration: .7,

                    delay: .5,

                    stagger: .12,

                    ease: "back.out(1.7)"

                }

            );

        }

    );

}


// ========================================
// CANDLE QUEST
// ========================================

flames.forEach((flame) => {


    flame.addEventListener(
        'click',
        () => {


            // --------------------------------
            // Prevent double click
            // --------------------------------

            if (
                flame.classList.contains(
                    'extinguished'
                )
            ) {

                return;

            }


            flame.classList.add(
                'extinguished'
            );


            // --------------------------------
            // Get candle
            // --------------------------------

            const candle =
                flame.closest('.candle');


            const smoke =
                candle.querySelector('.smoke');


            // ====================================
            // FLAME DISAPPEARING
            // ====================================

            gsap.to(

                flame,

                {

                    opacity: 0,

                    scale: 0,

                    rotation: -20,

                    duration: .35,

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

                    scale: .5

                },

                {

                    opacity: .5,

                    y: -20,

                    scale: 1,

                    duration: .4,

                    ease: "power2.out",

                    onComplete: () => {


                        gsap.to(

                            smoke,

                            {

                                opacity: 0,

                                y: -45,

                                scale: 1.5,

                                duration: .8,

                                ease: "power2.out"

                            }

                        );

                    }

                }

            );


            // ====================================
            // CANDLE REACTION
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
                        Math.random() > .5
                            ? -3
                            : 3,

                    duration: .15,

                    yoyo: true,

                    repeat: 1,

                    ease: "power2.out"

                }

            );


            // ====================================
            // PROGRESS
            // ====================================

            candlesOut++;


            if (
                progressDots[
                    candlesOut - 1
                ]
            ) {

                progressDots[
                    candlesOut - 1
                ].classList.remove(
                    'active'
                );

            }


            // ====================================
            // TEXT UPDATE
            // ====================================

            const remaining =
                flames.length -
                candlesOut;


            if (remaining > 0) {

                questText.textContent =

                    remaining === 1

                        ? "One more candle... make your wish. ✦"

                        : `${remaining} candles left... keep going. ✦`;

            }


            // ====================================
            // COMPLETE QUEST
            // ====================================

            if (
                candlesOut ===
                flames.length
            ) {

                completeQuest();

            }

        }

    );

});


// ========================================
// COMPLETE QUEST
// ========================================

function completeQuest() {


    // ====================================
    // FINAL TEXT
    // ====================================

    questText.textContent =
        "You did it. Your wish is ready. 🤍";


    // ====================================
    // CELEBRATION
    // ====================================

    createCelebration();


    // ====================================
    // SMALL CAKE CELEBRATION
    // ====================================
    // Cake only wiggles.
    // It DOES NOT disappear.

    gsap.to(

        '.cake',

        {

            y: -7,

            rotation: 1,

            duration: .2,

            yoyo: true,

            repeat: 3,

            ease: "power2.out"

        }

    );


    // ====================================
    // KEEP CAKE AREA VISIBLE
    // ====================================

    gsap.set(

        '.cake-area',

        {

            opacity: 1,

            y: 0

        }

    );


    // ====================================
    // KEEP STICKERS VISIBLE
    // ====================================

    gsap.set(

        '.cake-sticker',

        {

            opacity: 1

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

            duration: .5,

            ease: "power2.out"

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

            delay: .7,

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
                    Math.random() *
                    500 - 250,

                y:
                    Math.random() *
                    400 - 250,

                rotation:
                    Math.random() * 360,

                opacity: 0,

                scale:
                    Math.random() *
                    .8 + .5,

                duration:
                    Math.random() *
                    1.5 + 1,

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

                    duration: .8,

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
