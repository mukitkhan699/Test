// script.js

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    // Content Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const contentItems = document.querySelectorAll('.content-item');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-tab');
            
            // Show/hide content based on category
            contentItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Color Customization
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', color);
            
            // Update active state
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Save to localStorage
            localStorage.setItem('primaryColor', color);
        });
    });
    
    // Load saved color
    const savedColor = localStorage.getItem('primaryColor');
    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
        colorOptions.forEach(option => {
            if (option.getAttribute('data-color') === savedColor) {
                option.classList.add('active');
            }
        });
    }
    
    // Font Size Customization
    const fontSizeBtns = document.querySelectorAll('.font-size-btn');
    
    fontSizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const size = this.getAttribute('data-size');
            
            // Update active state
            fontSizeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Apply font size
            if (size === 'small') {
                document.documentElement.style.setProperty('--font-size', '14px');
            } else if (size === 'medium') {
                document.documentElement.style.setProperty('--font-size', '16px');
            } else if (size === 'large') {
                document.documentElement.style.setProperty('--font-size', '18px');
            }
            
            // Save to localStorage
            localStorage.setItem('fontSize', size);
        });
    });
    
    // Load saved font size
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    fontSizeBtns.forEach(btn => {
        if (btn.getAttribute('data-size') === savedFontSize) {
            btn.classList.add('active');
            
            if (savedFontSize === 'small') {
                document.documentElement.style.setProperty('--font-size', '14px');
            } else if (savedFontSize === 'medium') {
                document.documentElement.style.setProperty('--font-size', '16px');
            } else if (savedFontSize === 'large') {
                document.documentElement.style.setProperty('--font-size', '18px');
            }
        }
    });
    
    // Layout Customization
    const layoutBtns = document.querySelectorAll('.layout-btn');
    const contentGrid = document.querySelector('.content-grid');
    
    layoutBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const layout = this.getAttribute('data-layout');
            
            // Update active state
            layoutBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Apply layout
            if (layout === 'grid') {
                contentGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(350px, 1fr))';
            } else if (layout === 'list') {
                contentGrid.style.gridTemplateColumns = '1fr';
            }
            
            // Save to localStorage
            localStorage.setItem('layout', layout);
        });
    });
    
    // Load saved layout
    const savedLayout = localStorage.getItem('layout') || 'grid';
    layoutBtns.forEach(btn => {
        if (btn.getAttribute('data-layout') === savedLayout) {
            btn.classList.add('active');
            
            if (savedLayout === 'grid') {
                contentGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(350px, 1fr))';
            } else if (savedLayout === 'list') {
                contentGrid.style.gridTemplateColumns = '1fr';
            }
        }
    });
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        if (nav.classList.contains('active')) {
            mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // In a real application, you would send this to a server
            alert(`Thank you for subscribing with: ${email}`);
            emailInput.value = '';
        }
    });
    
    // Initialize PDF Features
    initializePDFFeatures();
    
    // Initialize Category Cards
    initializeCategoryCards();
});

// PDF Features
function initializePDFFeatures() {
    const pdfModal = document.getElementById('pdfModal');
    const pdfFrame = document.getElementById('pdfFrame');
    const pdfModalTitle = document.getElementById('pdfModalTitle');
    const closePdf = document.getElementById('closePdf');
    const viewPdfBtns = document.querySelectorAll('.view-pdf-btn');

    // Open PDF in Modal
    viewPdfBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const pdfUrl = this.getAttribute('data-pdf');
            const pdfName = this.getAttribute('data-title');
            
            pdfFrame.src = pdfUrl;
            pdfModalTitle.textContent = pdfName;
            pdfModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Track PDF view
            trackPDFView(pdfUrl, pdfName);
        });
    });

    // Close PDF Modal
    closePdf.addEventListener('click', closePDFModal);
    
    // Close modal when clicking outside
    pdfModal.addEventListener('click', function(e) {
        if (e.target === pdfModal) {
            closePDFModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
            closePDFModal();
        }
    });

    function closePDFModal() {
        pdfModal.classList.remove('active');
        pdfFrame.src = '';
        document.body.style.overflow = 'auto';
    }

    // Track PDF Downloads
    const downloadLinks = document.querySelectorAll('a[download]');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function() {
            const pdfUrl = this.getAttribute('href');
            const pdfName = this.closest('.content-details').querySelector('h3').textContent;
            trackPDFDownload(pdfUrl, pdfName);
        });
    });
}

// Category Cards Navigation
function initializeCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Find and click the corresponding tab
            const tabBtn = document.querySelector(`[data-tab="${category}"]`);
            if (tabBtn) {
                tabBtn.click();
                
                // Scroll to content section
                document.getElementById('contentSection').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// PDF Analytics
function trackPDFView(pdfUrl, pdfName) {
    console.log('PDF viewed:', pdfName, pdfUrl);
    
    // Here you can add:
    // - Google Analytics tracking
    // - Custom backend analytics
    // - Local storage tracking
    
    // Example: Increment view count in localStorage
    let views = JSON.parse(localStorage.getItem('pdfViews')) || {};
    views[pdfName] = (views[pdfName] || 0) + 1;
    localStorage.setItem('pdfViews', JSON.stringify(views));
}

function trackPDFDownload(pdfUrl, pdfName) {
    console.log('PDF downloaded:', pdfName, pdfUrl);
    
    // Here you can add:
    // - Download tracking
    // - Analytics integration
    // - User behavior analysis
    
    // Example: Increment download count in localStorage
    let downloads = JSON.parse(localStorage.getItem('pdfDownloads')) || {};
    downloads[pdfName] = (downloads[pdfName] || 0) + 1;
    localStorage.setItem('pdfDownloads', JSON.stringify(downloads));
    
    // Update download count display (optional)
    updateDownloadCount(pdfName);
}

function updateDownloadCount(pdfName) {
    // This would typically update a database
    // For demo purposes, we'll just log it
    console.log(`Download recorded for: ${pdfName}`);
}

// Hero Section Functions
function scrollToPDFs() {
    const pdfTab = document.querySelector('[data-tab="pdfs"]');
    pdfTab.click();
    
    document.getElementById('contentSection').scrollIntoView({
        behavior: 'smooth'
    });
}

function showAllContent() {
    const allTab = document.querySelector('[data-tab="all"]');
    allTab.click();
    
    document.getElementById('contentSection').scrollIntoView({
        behavior: 'smooth'
    });
}

// Utility function to get download statistics
function getDownloadStats() {
    const downloads = JSON.parse(localStorage.getItem('pdfDownloads')) || {};
    const totalDownloads = Object.values(downloads).reduce((sum, count) => sum + count, 0);
    return totalDownloads;
}

// Update total downloads in footer (optional)
function updateTotalDownloads() {
    const totalDownloads = getDownloadStats();
    const downloadElement = document.getElementById('total-downloads');
    if (downloadElement && totalDownloads > 0) {
        downloadElement.textContent = `${totalDownloads.toLocaleString()} PDF Downloads`;
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    updateTotalDownloads();
});
