// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const productCatalog = document.getElementById('productCatalog');
const productSelection = document.getElementById('productSelection');
const form = document.getElementById('distributorApplicationForm');
const formStatus = document.getElementById('formStatus');

// Product Data
const products = [
    {
        id: 'shiro-traditional-1kg',
        name: 'Traditional Shiro Powder',
        description: 'Authentic Ethiopian shiro powder made from finest chickpeas and traditional spices.',
        price: '$15.00/kg',
        moq: '50kg',
        packaging: '1kg vacuum bags, 20kg master case',
        specs: ['Traditional recipe', 'Gluten-free', 'Vegan', 'Non-GMO'],
        image: 'images/products/shiro-traditional-1kg.jpg'
    },
    {
        id: 'shiro-organic-1kg',
        name: 'Organic Shiro Powder',
        description: 'Certified organic shiro powder with all-natural ingredients, no additives.',
        price: '$18.50/kg',
        moq: '50kg',
        packaging: '1kg vacuum bags, 20kg master case',
        specs: ['USDA Organic (pending)', 'Gluten-free', 'Vegan', 'Non-GMO'],
        image: 'images/products/shiro-organic-1kg.jpg'
    },
    {
        id: 'shiro-traditional-5kg',
        name: 'Traditional Shiro (5kg Bulk)',
        description: 'Cost-effective bulk packaging for high-volume distributors.',
        price: '$13.50/kg',
        moq: '100kg',
        packaging: '5kg bags, 4 bags per master case',
        specs: ['Traditional recipe', 'Bulk discount', 'Gluten-free', 'Vegan'],
        image: 'images/products/shiro-traditional-5kg.jpg'
    },
    {
        id: 'shiro-organic-5kg',
        name: 'Organic Shiro (5kg Bulk)',
        description: 'Organic certified bulk packaging for premium market distributors.',
        price: '$16.50/kg',
        moq: '100kg',
        packaging: '5kg bags, 4 bags per master case',
        specs: ['USDA Organic (pending)', 'Bulk discount', 'Gluten-free', 'Vegan'],
        image: 'images/products/shiro-organic-5kg.jpg'
    },
    {
        id: 'shiro-bulk-25kg',
        name: 'Shiro Bulk (25kg)',
        description: 'Industrial bulk packaging for large distributors and food service.',
        price: '$12.00/kg',
        moq: '200kg',
        packaging: '25kg food-grade bags',
        specs: ['Best value', 'Food service grade', 'Gluten-free', 'Custom labeling available'],
        image: 'images/products/shiro-bulk-25kg.jpg'
    },
    {
        id: 'beginner-kit',
        name: 'Shiro Beginner Kit',
        description: 'Sample kit including shiro, berbere spice, and recipe cards.',
        price: '$8.50 per kit',
        moq: '50 kits',
        packaging: '250g shiro + 50g berbere per kit',
        specs: ['Market testing', 'Sample distribution', 'Recipe cards included', 'Bilingual instructions'],
        image: 'images/products/beginner-kit.jpg'
    }
];

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process internal anchor links
            if (href === '#' || !href.startsWith('#')) return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calculate position with offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Load products
    loadProductCatalog();
    loadProductSelection();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize form submission
    initFormSubmission();
});

// Mobile Menu
function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Load Product Catalog
function loadProductCatalog() {
    productCatalog.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <ul class="product-specs">
                    <li><i class="fas fa-box"></i> <strong>MOQ:</strong> ${product.moq}</li>
                    <li><i class="fas fa-box-open"></i> <strong>Packaging:</strong> ${product.packaging}</li>
                    ${product.specs.map(spec => `<li><i class="fas fa-check"></i> ${spec}</li>`).join('')}
                </ul>
                <p>${product.description}</p>
            </div>
        </div>
    `).join('');
}

// Load Product Selection in Form
function loadProductSelection() {
    productSelection.innerHTML = products.map(product => `
        <label class="product-checkbox" for="product-${product.id}">
            <input type="checkbox" id="product-${product.id}" name="products[]" value="${product.name}">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-checkbox-info">
                <h4>${product.name}</h4>
                <div class="price">${product.price}</div>
                <small>MOQ: ${product.moq}</small>
            </div>
        </label>
    `).join('');
    
    // Add click handlers for product checkboxes
    document.querySelectorAll('.product-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            if (e.target.type !== 'checkbox') {
                const input = checkbox.querySelector('input[type="checkbox"]');
                input.checked = !input.checked;
                checkbox.classList.toggle('selected', input.checked);
            }
        });
    });
}

// Form Submission
function initFormSubmission() {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (response.ok) {
                // Success
                showFormStatus('Thank you! Your distributor application has been submitted successfully. We will contact you within 24 hours to discuss advance payment and purchase agreement details.', 'success');
                form.reset();
                
                // Scroll to status message
                setTimeout(() => {
                    formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
                
                // Reset product checkboxes styling
                document.querySelectorAll('.product-checkbox').forEach(cb => {
                    cb.classList.remove('selected');
                });
                
            } else {
                // Error from Formspree
                const errorData = await response.json();
                const errorMessage = errorData.errors 
                    ? errorData.errors.map(error => error.message).join(', ')
                    : 'There was a problem submitting your application. Please try again.';
                
                showFormStatus(errorMessage, 'error');
            }
            
        } catch (error) {
            // Network error
            showFormStatus('Network error. Please check your connection and try again.', 'error');
            
        } finally {
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Hide status message after 10 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 10000);
        }
    });
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `status-${type}`;
    formStatus.style.display = 'block';
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Form Validation Helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone);
}
