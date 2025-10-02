// Navigation and Scroll Handling
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileMenu();
      scrollToTarget(this.getAttribute('href'));
    });
  });
};

const scrollToTarget = (targetSelector) => {
  const target = document.querySelector(targetSelector);
  if (target) {
    const navbarHeight = 80;
    const targetPosition = target.offsetTop - navbarHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

// Mobile Menu
const initMobileMenu = () => {
  const hamburger = document.getElementById('hamburger');
  if (!hamburger) return;

  const mobileMenu = createMobileMenu();
  document.body.insertBefore(mobileMenu, document.body.firstChild);

  setupMobileMenuListeners(hamburger, mobileMenu);
};

const createMobileMenu = () => {
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = `
    <ul>
      <li><a href="#how-it-works">How It Works</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
  `;
  return mobileMenu;
};

const setupMobileMenuListeners = (hamburger, mobileMenu) => {
  hamburger.addEventListener('click', () => toggleMobileMenu(hamburger, mobileMenu));
  
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => closeMobileMenu());
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });
};

const toggleMobileMenu = (hamburger, mobileMenu) => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
};

const closeMobileMenu = () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
};

// Animations
const initAnimations = () => {
  setupProgressAnimation();
  setupScrollAnimations();
  injectAnimationStyles();
};

const setupProgressAnimation = () => {
  const progressFill = document.getElementById('progress-fill');
  if (progressFill && progressFill.style.width === '') {
    setTimeout(() => {
      progressFill.style.width = '67%';
      setTimeout(() => {
        progressFill.classList.add('animated');
      }, 2500);
    }, 500);
  }
};

const setupScrollAnimations = () => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-up');
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      if (elementPosition < screenPosition) {
        element.classList.add('animate');
      }
    });
  };

  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  setTimeout(animateOnScroll, 100);
};

const injectAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(46, 139, 87, 0.4); }
      70% { box-shadow: 0 0 0 15px rgba(46, 139, 87, 0); }
      100% { box-shadow: 0 0 0 0 rgba(46, 139, 87, 0); }
    }
    
    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  document.head.appendChild(style);
};

// Countdown Timer
const initCountdownTimer = () => {
  const countdownDate = new Date('July 1, 2035 00:00:00').getTime();
  
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    if (distance < 0) {
      document.getElementById('countdown-timer').innerHTML = '<p>LAUNCHED! 🚀</p>';
      return;
    }
    
    updateCountdownDisplay(distance);
  };
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
};

const updateCountdownDisplay = (distance) => {
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
  document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
  document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initMobileMenu();
  initAnimations();
  initCountdownTimer();
  
  // Logo click handler
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.reload();
    });
  }
  
  // Book now button handler
  document.getElementById('book-now')?.addEventListener('click', () => {
    closeMobileMenu();
    document.querySelector('#pricing').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
    
    const featuredCard = document.querySelector('.pricing-card.featured');
    if (featuredCard) {
      featuredCard.style.animation = 'pulse 1.5s infinite';
      setTimeout(() => {
        featuredCard.style.animation = '';
      }, 5000);
    }
  });
});