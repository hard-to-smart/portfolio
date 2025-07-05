$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});
document.addEventListener('DOMContentLoaded', function() {
const {
  gsap,
  MorphSVGPlugin,
  Draggable } = window;

  gsap.registerPlugin(MorphSVGPlugin);

// Used to calculate distance of "tug"
let startX;
let startY;

const AUDIO = {
  CLICK: new Audio('https://assets.codepen.io/605876/click.mp3')
};

const STATE = {
  ON: false
};

const CORD_DURATION = 0.1;

const CORDS = document.querySelectorAll('.toggle-scene__cord');
const HIT = document.querySelector('.toggle-scene__hit-spot');
const DUMMY = document.querySelector('.toggle-scene__dummy-cord');
const DUMMY_CORD = document.querySelector('.toggle-scene__dummy-cord line');
const PROXY = document.createElement('div');
// set init position
const ENDX = DUMMY_CORD.getAttribute('x2');
const ENDY = DUMMY_CORD.getAttribute('y2');
const bulb = document.querySelector('.bulb__bulb');
const flash = document.querySelector('.bulb__flash');
const alertMessage = document.querySelector('.alert-secondary ');

const RESET = () => {
  gsap.set(PROXY, {
    x: ENDX,
    y: ENDY
  });
};

RESET();
setTimeout(() => {
 
  // Pull back and trigger animation
  gsap.to(DUMMY_CORD, {
    attr: { x2: ENDX + 14400, y2: ENDY + 1400},
    duration: 0.1,
    onComplete: () => {
      AUDIO.CLICK.play();
      CORD_TL.restart();
    }
  });
}, 2000);

const CORD_TL = gsap.timeline({
  paused: true,
  onStart: () => {
    STATE.ON = !STATE.ON;
    gsap.set(document.documentElement, { '--on': STATE.ON ? 1 : 0 });
    gsap.set([DUMMY, HIT], { display: 'none' });
    gsap.set(CORDS[0], { display: 'block' });

    AUDIO.CLICK.play();
    toggleBulbState(STATE);

  },
  
  onComplete: () => {
    gsap.set([DUMMY, HIT], { display: 'block' });
    gsap.set(CORDS[0], { display: 'none' });
    RESET();
  }
});

for (let i = 1; i < CORDS.length; i++) {
  CORD_TL.add(
    
    gsap.to(CORDS[0], {
      morphSVG: CORDS[i],
      duration: 0.1, // Increase the duration
      ease: 'Power2.easeInOut',
      repeat: 1,
      yoyo: true  
    })
  );
}

Draggable.create(PROXY, {
  trigger: HIT,
  type: 'x,y',
  onPress: e => {
    startX = e.x;
    startY = e.y;
  },
  onDrag: function () {
    gsap.set(DUMMY_CORD, {
      attr: {
        x2: this.x,
        y2: this.y
      }
    });
  },
  onRelease: function (e) {
    const DISTX = Math.abs(e.x - startX);
    const DISTY = Math.abs(e.y - startY);
    const TRAVELLED = Math.sqrt(DISTX * DISTX + DISTY * DISTY);
    gsap.to(DUMMY_CORD, {
      attr: { x2: ENDX, y2: ENDY },
      duration: CORD_DURATION,
      onComplete: () => {
        if (TRAVELLED > 50) {
          CORD_TL.restart();
        } else {
          RESET();
        }
      }
    });
  }

});
});

document.addEventListener('DOMContentLoaded', function() {
    var phone = document.getElementById('phoneno');
    phone.addEventListener('dblclick', function(e) {
        e.preventDefault();
        var phonenum = '+91-7300233262';
        navigator.clipboard.writeText(phonenum)
        .then(function() {  
            $('.toast').toast('show');
            $('.toast').toast('hide');
        })

    })
})
    const pastelColors = [
 
    'rgba(186, 220, 255, 0.8)',  // Light blue with a hint of gold
    'rgba(220, 255, 186, 0.8)',  // Light green with a hint of gold
    'rgba(255, 220, 186, 0.8)',  // Light yellow with a hint of gold
    'rgba(255, 186, 220, 0.8)',  // Light pink with a hint of gold
    'rgba(186, 186, 255, 0.8)',  // Light purple with a hint of gold
    'rgba(220, 186, 255, 0.8)' 
      ];
  
    let sparkleListener;
      // random color sparkle effect
      function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${x + (Math.random() * 20 - 10)}px`;
        sparkle.style.top = `${y+ (Math.random() * 20 - 10)}px`;
  
        const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        sparkle.style.background = `radial-gradient(circle, ${randomColor} 0%, ${randomColor} 40%, ${randomColor} 80%)`;
        sparkle.style.filter='none';
        document.body.appendChild(sparkle);
        
      }
     
      // yellow sparkle effect
      // function createSparkle(x, y) {
      //   const sparkle = document.createElement('div');
      //   sparkle.classList.add('sparkle');
      //   sparkle.style.left = `${x}px`;
      //   sparkle.style.top = `${y}px`;
  
      //   document.body.appendChild(sparkle);
  
      //   sparkle.addEventListener('animationend', () => {
      //     sparkle.remove();
      //   });
      // }

      // code for firefly
      function toggleBulbState(STATE) {
        const elementsToAdjust = document.querySelectorAll('#home > *:not(.firefly.collapsed)');
        
        if ( STATE.ON ==1) {
            // Add sparkle effect when bulb is ON

            console.log('State is ON');
            document.body.classList.add('on');
            document.body.classList.remove('off');
         
             sparkleListener = (e) => {
                let i = Math.floor(Math.random() * (3 + 1 - 1) + 0);
                while (i > 0) {
                    createSparkle(e.pageX, e.pageY);
                    i--;
                }
            };
            document.addEventListener('mousemove', sparkleListener);
    
            // Adjust elements when bulb is ON
            elementsToAdjust.forEach(element => {
                element.style.filter = 'grayscale(0%)';
            });
        } else {
            console.log('State is OFF');
            document.body.classList.add('off');
            document.body.classList.remove('on');
            // Remove sparkle effect when bulb is OFF
            document.removeEventListener('mousemove', sparkleListener);
            elementsToAdjust.forEach(element => {
                element.style.filter = 'grayscale(100%)';
            });
        }
    }
    function downloadPDF() {
      const pdfUrl = "assets/ResumeJune2.pdf"; 
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'file.pdf'; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  
        
  
     