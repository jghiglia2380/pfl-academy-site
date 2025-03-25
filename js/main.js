document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current nav item
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('text-indigo-200');
        }
    });
    
    // Functionality for activity timers
    const timers = document.querySelectorAll('.activity-timer-control');
    timers.forEach(timer => {
        timer.addEventListener('click', function() {
            const minutes = this.dataset.minutes || 5;
            const timerDisplay = this.parentElement.querySelector('.timer-display');
            
            let timeLeft = minutes * 60;
            timerDisplay.textContent = `${minutes}:00`;
            timerDisplay.classList.remove('hidden');
            
            const interval = setInterval(() => {
                timeLeft--;
                const mins = Math.floor(timeLeft / 60);
                const secs = timeLeft % 60;
                timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
                
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    timerDisplay.textContent = 'Time\'s up\!';
                }
            }, 1000);
            
            this.disabled = true;
        });
    });
    
    // Functionality for section navigation
    const sectionNavItems = document.querySelectorAll('.section-nav-item');
    sectionNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header
                behavior: 'smooth'
            });
            
            sectionNavItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
