document.addEventListener('DOMContentLoaded', function() {
    // Custom animated cursor with comet tail effect
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Comet tail positions array
    const tailPositions = [];
    const tailLength = 20;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    const updateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Add position to tail
        tailPositions.unshift({ x: cursorX, y: cursorY });
        if (tailPositions.length > tailLength) {
            tailPositions.pop();
        }
        
        // Update tail particles
        const tailParticles = document.querySelectorAll('.cursor-tail-particle');
        tailPositions.forEach((pos, index) => {
            if (tailParticles[index]) {
                tailParticles[index].style.left = pos.x + 'px';
                tailParticles[index].style.top = pos.y + 'px';
                const opacity = (1 - (index / tailLength)) * 0.6;
                tailParticles[index].style.opacity = opacity;
            } else if (index < tailLength) {
                const particle = document.createElement('div');
                particle.className = 'cursor-tail-particle';
                particle.style.left = pos.x + 'px';
                particle.style.top = pos.y + 'px';
                const opacity = (1 - (index / tailLength)) * 0.6;
                particle.style.opacity = opacity;
                document.body.appendChild(particle);
            }
        });
        
        requestAnimationFrame(updateCursor);
    };
    updateCursor();

    // Hide custom cursor on leave
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
        document.querySelectorAll('.cursor-tail-particle').forEach(p => {
            p.style.opacity = '0';
        });
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu hidden md:hidden fixed inset-0 bg-dark/95 z-40 pt-20 px-4';
    mobileMenu.innerHTML = `
        <div class="flex flex-col space-y-6 p-4">
            <a href="#hero" class="text-gray-300 hover:text-primary text-lg py-2 transition-all duration-300">Home</a>
            <a href="#skills" class="text-gray-300 hover:text-primary text-lg py-2 transition-all duration-300">Skills</a>
            <a href="#projects" class="text-gray-300 hover:text-primary text-lg py-2 transition-all duration-300">Projects</a>
            <a href="#about" class="text-gray-300 hover:text-primary text-lg py-2 transition-all duration-300">About</a>
            <a href="#contact" class="text-gray-300 hover:text-primary text-lg py-2 transition-all duration-300">Contact</a>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        if (!mobileMenu.classList.contains('hidden')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });

    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .contact-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize elements with opacity 0
    document.querySelectorAll('.skill-card, .project-card, .contact-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease-out';
    });

    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Glow effect for headings
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        heading.style.textShadow = '0 0 8px rgba(14, 165, 233, 0.3)';
    });

    // Typing animation for hero "Software Engineer"
    function setupTyping() {
        const typingEl = document.getElementById('typing-text');
        const cursorEl = document.getElementById('typing-cursor');
        const fullEl = document.getElementById('full-hero-text');
        if (!typingEl || !cursorEl || !fullEl) return;

        const fullText = fullEl.textContent.trim();
        const chars = Array.from(fullText);
        let idx = 0;
        const speed = 80; // ms per character (adjustable)

        // Clear initial
        typingEl.textContent = '';

        function typeNext() {
            if (idx < chars.length) {
                typingEl.textContent += chars[idx++];
                setTimeout(typeNext, speed + Math.random() * 40);
            } else {
                // After finishing, keep cursor blinking; no loop
                cursorEl.style.animation = 'blink 1s steps(2,start) infinite';
            }
        }

        // small delay before start
        setTimeout(typeNext, 300);
    }

    // Start typing after translations are applied so the text is localized
    window.addEventListener('translationsReady', setupTyping);

    // Scroll Reveal Effect for Project Cards
    const revealItems = document.querySelectorAll('.reveal-item');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Stagger effect
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealItems.forEach(item => {
        observer.observe(item);
    });
});
