// Dark Mode Toggle - Initialize theme immediately to prevent flash
(function() {
    const html = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
})();

// Dark Mode Toggle - Setup toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const html = document.documentElement;

    function updateDarkModeIcon(theme) {
        if (darkModeIcon) {
            if (theme === 'dark') {
                darkModeIcon.classList.remove('fa-moon');
                darkModeIcon.classList.add('fa-sun');
            } else {
                darkModeIcon.classList.remove('fa-sun');
                darkModeIcon.classList.add('fa-moon');
            }
        }
    }

    // Set initial icon based on current theme
    const currentTheme = html.getAttribute('data-theme');
    updateDarkModeIcon(currentTheme);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateDarkModeIcon(newTheme);
        });
    }
});

// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link (you can integrate with a backend service later)
    const mailtoLink = `mailto:dan_talnariu@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for your message! Your email client should open shortly.');
    
    // Reset form
    contactForm.reset();
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .achievement-card, .skill-category');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect on page load
// window.addEventListener('load', () => {
//     const nameElement = document.querySelector('.name');
//     const originalText = nameElement.textContent;
//     typeWriter(nameElement, originalText, 100);
// });

// Video Modal Functions
function openVideoModal() {
    console.log('openVideoModal called');
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('demo-video');
    
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    
    if (!video) {
        console.error('Video element not found');
        return;
    }
    
    console.log('Opening modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Try to play video, but don't fail if autoplay is blocked
    video.play().catch(error => {
        console.log('Video autoplay prevented:', error);
        // Video will still be visible and user can click play
    });
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('demo-video');
    
    if (!modal || !video) {
        return;
    }
    
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    video.pause();
    video.currentTime = 0; // Reset video to start
}

// Close modal when clicking outside the video content
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('video-modal');
    
    // Add event listener to demo button as backup (onclick should also work)
    const demoBtn = document.querySelector('.demo-btn');
    if (demoBtn) {
        demoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openVideoModal();
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });
});

// Bug Hunt Game Logic
let bugHuntState = {
    isActive: false,
    startTime: null,
    timerInterval: null,
    bugsFound: 0,
    totalBugs: 3,
    score: 0,
    foundBugs: [],
    currentBuggedElement: null
};

// Calculator state
let calcState = {
    display: '0',
    previousValue: null,
    operator: null,
    waitingForNewValue: false
};

// Open Bug Hunt Modal
function openBugHunt() {
    const modal = document.getElementById('bug-hunt-modal');
    if (!modal) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset game state
    bugHuntState.isActive = true;
    bugHuntState.startTime = Date.now();
    bugHuntState.bugsFound = 0;
    bugHuntState.score = 0;
    bugHuntState.foundBugs = [];
    
    // Reset calculator
    calcState.display = '0';
    calcState.previousValue = null;
    calcState.operator = null;
    calcState.waitingForNewValue = false;
    updateCalculatorDisplay();
    
    // Hide completion screen and bug report form
    document.getElementById('bug-hunt-complete').style.display = 'none';
    document.getElementById('bug-report-form').style.display = 'none';
    
    // Update UI
    updateBugHuntUI();
    
    // Start timer
    startBugHuntTimer();
    
    // Make calculator buttons clickable for bug reporting
    setupBugReporting();
}

// Close Bug Hunt Modal
function closeBugHunt() {
    const modal = document.getElementById('bug-hunt-modal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    bugHuntState.isActive = false;
    stopBugHuntTimer();
}

// Start Timer
function startBugHuntTimer() {
    if (bugHuntState.timerInterval) {
        clearInterval(bugHuntState.timerInterval);
    }
    
    bugHuntState.timerInterval = setInterval(() => {
        if (!bugHuntState.isActive) return;
        
        const elapsed = Math.floor((Date.now() - bugHuntState.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        document.getElementById('bug-timer').textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Stop Timer
function stopBugHuntTimer() {
    if (bugHuntState.timerInterval) {
        clearInterval(bugHuntState.timerInterval);
        bugHuntState.timerInterval = null;
    }
}

// Update Bug Hunt UI
function updateBugHuntUI() {
    document.getElementById('bugs-found').textContent = bugHuntState.bugsFound;
    document.getElementById('bug-score').textContent = bugHuntState.score;
}

// Setup Bug Reporting
function setupBugReporting() {
    const calculator = document.querySelector('.calculator');
    if (!calculator) return;
    
    // Add click listeners to all calculator buttons for bug reporting
    const buttons = calculator.querySelectorAll('.calc-btn');
    buttons.forEach(button => {
        const text = button.textContent.trim();
        const onclick = button.getAttribute('onclick');
        
        // Special handling for button "1" which has buggy onclick (BUG 1)
        if (text === '1' && onclick && onclick.includes('calcNumberBuggy')) {
            button.addEventListener('click', function(e) {
                if (!bugHuntState.isActive) return;
                
                // Small delay to allow onclick to execute first, then check for bugs
                setTimeout(() => {
                    // Check if button "1" was clicked and resulted in "11" being displayed
                    if (!bugHuntState.foundBugs.includes('button-one-double')) {
                        // The bug always adds "11", so we can detect it immediately
                        showBugReportForm(this, 'button-one-double');
                    }
                }, 50);
            }, true);
        } else {
            // Add click listener for bug reporting (don't remove onclick handlers)
            button.addEventListener('click', function(e) {
                if (!bugHuntState.isActive) return;
                
                // Small delay to allow onclick to execute first, then check for bugs
                setTimeout(() => {
                    // Check if this element has a bug
                    const bugType = checkForBug(this);
                    if (bugType && !bugHuntState.foundBugs.includes(bugType)) {
                        showBugReportForm(this, bugType);
                    }
                }, 100);
            }, true); // Use capture phase to check before onclick
        }
    });
}

// Check for bugs in clicked element
function checkForBug(element) {
    const onclick = element.getAttribute('onclick');
    const text = element.textContent.trim();
    
    // Bug 1: Button "0" has no onclick handler (handled in setupBugReporting)
    // This function checks for other bugs
    
    // Bug 2: Division by zero - check if display shows Infinity or -Infinity
    if (text === '=') {
        const displayValue = calcState.display;
        if (displayValue === 'Infinity' || displayValue === '-Infinity' || 
            displayValue === 'NaN' || !isFinite(parseFloat(displayValue))) {
            // Check if we just divided by zero
            if (calcState.operator === '/' || calcState.previousValue !== null) {
                return 'division-zero';
            }
        }
    }
    
    // Bug 3: Clear button doesn't clear the display
    // The display should be reset to '0' when clear is clicked, but it's not
    // This is checked in calcClear() function directly
    
    return null;
}

// Show Bug Report Form
function showBugReportForm(element, bugType) {
    bugHuntState.currentBuggedElement = element;
    bugHuntState.currentBugType = bugType;
    
    const form = document.getElementById('bug-report-form');
    const elementName = document.getElementById('bugged-element-name');
    const description = document.getElementById('bug-description');
    
    const bugNames = {
        'button-one-double': 'Button "1"',
        'division-zero': 'Division by Zero',
        'clear-incomplete': 'Clear Button'
    };
    
    elementName.textContent = bugNames[bugType] || 'Element';
    description.value = '';
    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Cancel Bug Report
function cancelBugReport() {
    document.getElementById('bug-report-form').style.display = 'none';
    bugHuntState.currentBuggedElement = null;
    bugHuntState.currentBugType = null;
}

// Submit Bug Report
function submitBugReport() {
    const description = document.getElementById('bug-description').value.trim();
    
    if (!description) {
        alert('Please describe the bug you found!');
        return;
    }
    
    const bugType = bugHuntState.currentBugType;
    
    // Mark bug as found
    if (!bugHuntState.foundBugs.includes(bugType)) {
        bugHuntState.foundBugs.push(bugType);
        bugHuntState.bugsFound++;
        
        // Calculate score (faster = more points, max 1000 per bug)
        const elapsed = Math.floor((Date.now() - bugHuntState.startTime) / 1000);
        const points = Math.max(100, 1000 - (elapsed * 10));
        bugHuntState.score += points;
        
        updateBugHuntUI();
        
        // Show success message
        showBugFoundMessage(bugType);
        
        // Hide form
        cancelBugReport();
        
        // Check if all bugs found
        if (bugHuntState.bugsFound >= bugHuntState.totalBugs) {
            setTimeout(() => {
                showCompletionScreen();
            }, 1500);
        }
    }
}

// Show Bug Found Message
function showBugFoundMessage(bugType) {
    const bugMessages = {
        'button-one-double': '🐛 Bug Found! Button "1" inputs "11" instead of a single digit!',
        'division-zero': '🐛 Bug Found! Division by zero is not handled!',
        'clear-incomplete': '🐛 Bug Found! Clear button doesn\'t clear the display!'
    };
    
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = bugMessages[bugType] || 'Bug Found!';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Show Completion Screen
function showCompletionScreen() {
    stopBugHuntTimer();
    bugHuntState.isActive = false;
    
    const elapsed = Math.floor((Date.now() - bugHuntState.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    document.getElementById('final-time').textContent = timeString;
    document.getElementById('final-score').textContent = bugHuntState.score;
    
    document.getElementById('bug-hunt-complete').style.display = 'block';
    document.getElementById('bug-hunt-complete').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Restart Bug Hunt
function restartBugHunt() {
    closeBugHunt();
    setTimeout(() => {
        openBugHunt();
    }, 300);
}

// Calculator Functions (with intentional bugs)
function calcNumber(num) {
    if (calcState.waitingForNewValue) {
        calcState.display = num;
        calcState.waitingForNewValue = false;
    } else {
        calcState.display = calcState.display === '0' ? num : calcState.display + num;
    }
    updateCalculatorDisplay();
}

// BUG 1: Button "1" inputs "11" instead of "1"
function calcNumberBuggy(num) {
    // Bug: Always adds "11" instead of "1"
    if (calcState.waitingForNewValue) {
        calcState.display = '11'; // Should be '1'
        calcState.waitingForNewValue = false;
    } else {
        calcState.display = calcState.display === '0' ? '11' : calcState.display + '11'; // Should be '1' or calcState.display + '1'
    }
    updateCalculatorDisplay();
}

function calcOperation(op) {
    const inputValue = parseFloat(calcState.display);
    
    if (calcState.previousValue === null) {
        calcState.previousValue = inputValue;
    } else if (calcState.operator) {
        const result = calculate(calcState.previousValue, inputValue, calcState.operator);
        calcState.display = String(result);
        calcState.previousValue = result;
        updateCalculatorDisplay();
    }
    
    calcState.waitingForNewValue = true;
    calcState.operator = op;
}

function calcEquals() {
    const inputValue = parseFloat(calcState.display);
    
    if (calcState.previousValue !== null && calcState.operator) {
        // BUG 2: Division by zero not handled - should check before calculating
        // But we're intentionally NOT checking to demonstrate the bug
        
        // Check for division by zero BEFORE calculating
        const isDivisionByZero = calcState.operator === '/' && inputValue === 0;
        
        const result = calculate(calcState.previousValue, inputValue, calcState.operator);
        
        // Handle Infinity result (which occurs when dividing by zero)
        if (!isFinite(result) || isDivisionByZero) {
            // Ensure division by zero always shows Infinity
            if (isDivisionByZero) {
                calcState.display = calcState.previousValue >= 0 ? 'Infinity' : '-Infinity';
            } else {
                calcState.display = result > 0 ? 'Infinity' : '-Infinity';
            }
        } else {
            calcState.display = String(result);
        }
        
        // Trigger bug detection for division by zero
        if (isDivisionByZero && bugHuntState.isActive) {
            setTimeout(() => {
                const equalsBtn = Array.from(document.querySelectorAll('.calc-btn')).find(btn => btn.textContent.trim() === '=');
                if (equalsBtn && !bugHuntState.foundBugs.includes('division-zero')) {
                    showBugReportForm(equalsBtn, 'division-zero');
                }
            }, 100);
        }
        
        calcState.previousValue = null;
        calcState.operator = null;
        calcState.waitingForNewValue = true;
        updateCalculatorDisplay();
    }
}

function calculate(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            // BUG: No check for division by zero - will return Infinity
            if (second === 0) {
                // Intentionally not handling this - this is the bug!
                return first / second; // Returns Infinity or -Infinity
            }
            return first / second;
        default:
            return second;
    }
}

function calcClear() {
    // BUG 3: Clear button doesn't clear the display - it only resets internal state
    // The display should be reset to '0' but it's not!
    // Missing: calcState.display = '0';
    calcState.previousValue = null;
    calcState.operator = null;
    calcState.waitingForNewValue = false;
    // Note: display is NOT updated, so the old value remains visible
    
    // Trigger bug detection - the display not being cleared is the bug
    if (bugHuntState.isActive) {
        setTimeout(() => {
            const clearBtn = Array.from(document.querySelectorAll('.calc-btn')).find(btn => btn.textContent.trim() === 'C');
            if (clearBtn && !bugHuntState.foundBugs.includes('clear-incomplete')) {
                showBugReportForm(clearBtn, 'clear-incomplete');
            }
        }, 200);
    }
}

function calcBackspace() {
    if (calcState.display.length > 1) {
        calcState.display = calcState.display.slice(0, -1);
    } else {
        calcState.display = '0';
    }
    updateCalculatorDisplay();
}

function updateCalculatorDisplay() {
    const display = document.getElementById('calc-display');
    if (display) {
        display.textContent = calcState.display;
    }
}

// Initialize Bug Hunt Button
document.addEventListener('DOMContentLoaded', () => {
    const bugHuntBtn = document.getElementById('bug-hunt-btn');
    if (bugHuntBtn) {
        bugHuntBtn.addEventListener('click', openBugHunt);
    }
    
    // Close bug hunt modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const bugHuntModal = document.getElementById('bug-hunt-modal');
            if (bugHuntModal && bugHuntModal.classList.contains('active')) {
                closeBugHunt();
            }
        }
    });
    
    // Close bug hunt modal when clicking outside
    const bugHuntModal = document.getElementById('bug-hunt-modal');
    if (bugHuntModal) {
        bugHuntModal.addEventListener('click', (e) => {
            if (e.target === bugHuntModal) {
                closeBugHunt();
            }
        });
    }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

