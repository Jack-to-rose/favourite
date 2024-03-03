const now = new Date()
const NAME = "Rio";
const DATE = "2024-03-03";
const TIME = "T13:00:00";
const RUN_TIME = 1800; //seconds
// const TIME_TO_RUN = (24 * 60 * 60 * 1000);
const TIME_TO_RUN = (RUN_TIME * 1000);
let birthdayDate = new Date(DATE + TIME);

let yearOfTheEvent = now.getFullYear()
let eventDate = new Date( yearOfTheEvent, birthdayDate.getMonth(), birthdayDate.getDate(), birthdayDate.getHours(), birthdayDate.getMinutes(), birthdayDate.getSeconds())

// Store the original HTML content
const originalHTML = document.querySelector('.countdown-container').innerHTML;

updateCountdown();

function updateCountdown() {
    const countdownElement = document.getElementById("countdown");
    const currentDate = new Date().getTime();
    
    if ( currentDate > eventDate.getTime() + TIME_TO_RUN) {
        eventDate = new Date( yearOfTheEvent + 1, birthdayDate.getMonth(), birthdayDate.getDate(), birthdayDate.getHours(), birthdayDate.getMinutes(), birthdayDate.getSeconds())
    } else if ( now.getFullYear() === eventDate.getFullYear() + 1) {
        eventDate = new Date( now.getFullYear(),birthdayDate.getMonth(), birthdayDate.getDate(), birthdayDate.getHours(), birthdayDate.getMinutes(), birthdayDate.getSeconds())
      }
    
    const timeLeft = eventDate.getTime() - currentDate;
    
    if (timeLeft <= 0 ) {

        // Birthday has passed
        countdownElement.innerHTML = `<h1>Happy Birthday! ${NAME}</h1>`;
        
        // Trigger confetti effect
        confettiEffect();
        // Update the countdown every second
        setTimeout(updateCountdown, 1000);
        return;
    }
    
    // To revert back to the original content
    document.querySelector('.countdown-container').innerHTML = originalHTML;
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

    // Update the countdown every second
    setTimeout(updateCountdown, 1000);
    return;
}

// Function to validate the date format
function isValidDate(dateString) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    const d = new Date(dateString + "T00:00:00");
    return !isNaN(d.getTime());
}

function confettiEffect() {
  const Confettiful = function (el) {
    this.el = el;
    this.containerEl = null;

    this.confettiFrequency = 3;
    this.confettiColors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];

    this._renderConfetti();
  };


  Confettiful.prototype._renderConfetti = function () {
    const confettiContanier = document.getElementById("confetti");
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div');
      const confettiSize = Math.floor(Math.random() * 3) + 7 + 'px';
      const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
      const confettiLeft = Math.floor(Math.random() * this.el.offsetWidth) + 'px';
      const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

      confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 3000);

      confettiContanier.appendChild(confettiEl);
    }, 25);
  };

  window.confettiful = new Confettiful(document.querySelector('.container'));
}