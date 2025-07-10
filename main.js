function animateValue(element, start = 0, end = 25, duration = 2000) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value + '+';
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Trigger when element is visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateValue(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.experience-number').forEach(el => {
  el.textContent = '0+'; // Initialize at 0
  observer.observe(el);
});

// Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
  
    function showCard(index) {
      cards.forEach(card => card.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      cards[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }
  
    function nextCard() {
      currentIndex = (currentIndex + 1) % cards.length;
      showCard(currentIndex);
    }
  
    function prevCard() {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      showCard(currentIndex);
    }
  
    // Button controls
    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);
  
    // Dot controls
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        showCard(parseInt(dot.dataset.index));
      });
    });
  
    // Auto-rotate (optional)
    setInterval(nextCard, 5000);
  });