// ========================================
// 🎮 NAT'S BIRTHDAY QUEST — PAGE 1
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
// FLOATING GAME ELEMENTS
// ========================================

const floatingElements = [
    '✦',
    '♡',
    '✧',
    '+',
    '⋆',
    '♡'
];

function createFloating() {

    const element = document.createElement('div');

    element.className = 'floating';

    element.textContent =
        floatingElements[
            Math.floor(
                Math.random() *
                floatingElements.length
            )
        ];

    element.style.left =
        Math.random() * 100 + 'vw';

    element.style.top =
        '105vh';

    element.style.fontSize =
        (Math.random() * 12 + 14) + 'px';

    document.body.appendChild(element);


    gsap.fromTo(
        element,

        {
            opacity: 0,
            y: 20,
            scale: 0.7,
            rotation: -10
        },

        {
            opacity: 0.5,
            y: -(window.innerHeight + 100),
            x: Math.random() * 100 - 50,
            rotation: Math.random() * 40 - 20,
            scale: 1,

            duration:
                Math.random() * 6 + 7,

            ease: "none",

            onComplete: () => {
                element.remove();
            }
        }
    );

}


// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {


    // ------------------------------------
    // Game Screen
    // ------------------------------------

    gsap.fromTo(
        '.game-screen',

        {
            opacity: 0,
            scale: 0.96,
            y: 20
        },

        {
            opacity: 1,
            scale: 1,
            y: 0,

            duration: 1,

            ease: "power3.out"
        }
    );


    // ------------------------------------
    // Top Bar
    // ------------------------------------

    gsap.fromTo(
        '.top-bar',

        {
            opacity: 0,
            y: -20
        },

        {
            opacity: 1,
            y: 0,

            duration: 0.7,
            delay: 0.3,

            ease: "power2.out"
        }
    );


    // ------------------------------------
    // Game Label
    // ------------------------------------

    gsap.fromTo(
        '.game-label',

        {
            opacity: 0,
            y: 15
        },

        {
            opacity: 1,
            y: 0,

            duration: 0.6,
            delay: 0.5,

            ease: "power2.out"
        }
    );


    // ------------------------------------
    // Title
    // ------------------------------------

    gsap.fromTo(
        'h1',

        {
            opacity: 0,
            y: 30,
            scale: 0.95
        },

        {
            opacity: 1,
            y: 0,
            scale: 1,

            duration: 1,

            delay: 0.6,

            ease: "back.out(1.5)"
        }
    );


    // ------------------------------------
    // Character Card
    // ------------------------------------

    gsap.fromTo(
        '.character-card',

        {
            opacity: 0,
            scale: 0.7,
            y: 50,
            rotation: -8
        },

        {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: -3,

            duration: 1,

            delay: 0.9,

            ease: "back.out(1.7)"
        }
    );


    // ------------------------------------
    // Description
    // ------------------------------------

    gsap.fromTo(
        '.game-description',

        {
            opacity: 0,
            y: 15
        },

        {
            opacity: 1,
            y: 0,

            duration: 0.6,

            delay: 1.4,

            ease: "power2.out"
        }
    );


    gsap.fromTo(
        '.game-subdescription',

        {
            opacity: 0,
            y: 10
        },

        {
            opacity: 1,
            y: 0,

            duration: 0.6,

            delay: 1.6,

            ease: "power2.out"
        }
    );


    // ------------------------------------
    // Start Button
    // ------------------------------------

    gsap.fromTo(
        '.start-button',

        {
            opacity: 0,
            y: 25,
            scale: 0.9
        },

        {
            opacity: 1,
            y: 0,
            scale: 1,

            duration: 0.8,

            delay: 1.9,

            ease: "back.out(1.7)"
        }
    );


    // ------------------------------------
    // Game Info
    // ------------------------------------

    gsap.fromTo(
        '.game-info',

        {
            opacity: 0,
            y: 15
        },

        {
            opacity: 1,
            y: 0,

            duration: 0.6,

            delay: 2.2,

            ease: "power2.out"
        }
    );


    // ------------------------------------
    // Bottom Bar
    // ------------------------------------

    gsap.fromTo(
        '.bottom-bar',

        {
            opacity: 0
        },

        {
            opacity: 1,

            duration: 0.6,

            delay: 2.4
        }
    );


    // ------------------------------------
    // Floating Elements
    // ------------------------------------

    setInterval(
        createFloating,
        1800
    );

});


// ========================================
// START GAME BUTTON
// ========================================

const startButton =
    document.querySelector('#start-game');


if (startButton) {


    // ------------------------------------
    // Hover
    // ------------------------------------

    startButton.addEventListener(
        'mouseenter',
        () => {

            gsap.to(startButton, {

                y: -5,
                scale: 1.05,

                duration: 0.2,

                ease: "power2.out"

            });

        }
    );


    startButton.addEventListener(
        'mouseleave',
        () => {

            gsap.to(startButton, {

                y: 0,
                scale: 1,

                duration: 0.2,

                ease: "power2.out"

            });

        }
    );


    // ------------------------------------
    // Click
    // ------------------------------------

    startButton.addEventListener(
        'click',
        () => {

            // Prevent double click

            startButton.disabled = true;


            // Button press

            gsap.to(startButton, {

                scale: 0.9,

                duration: 0.1,

                ease: "power2.out"

            });


            // Release

            gsap.to(startButton, {

                scale: 1,

                duration: 0.2,

                delay: 0.1,

                ease: "back.out(2)"

            });


            // Spawn particles

            for (let i = 0; i < 12; i++) {

                setTimeout(
                    createFloating,
                    i * 50
                );

            }


            // --------------------------------
            // Screen transition
            // --------------------------------

            gsap.to(
                '.game-screen',

                {

                    opacity: 0,
                    scale: 1.04,

                    duration: 0.8,

                    delay: 0.25,

                    ease: "power2.inOut",

                    onComplete: () => {

                        window.location.href =
                            'cause.html';

                    }

                }
            );

        }
    );

}