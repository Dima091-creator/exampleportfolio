// Portfolio Application
class PortfolioApp {
    constructor() {
        // App state
        this.theme = 'light';
        this.projects = [];
        this.filteredProjects = [];
        this.activeTags = new Set();
        this.searchTerm = '';
        
        // DOM Elements
        this.elements = {
            // Theme toggle
            themeToggle: document.getElementById('theme-toggle'),
            themeIcon: document.querySelector('#theme-toggle i'),
            
            // Mobile menu
            mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
            mobileMenu: document.getElementById('mobile-menu'),
            mobileMenuClose: document.getElementById('mobile-menu-close'),
            mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),
            
            // Projects
            projectsGrid: document.getElementById('projects-grid'),
            filterTags: document.getElementById('filter-tags'),
            projectSearch: document.getElementById('project-search'),
            projectsCount: document.getElementById('projects-count'),
            noResults: document.getElementById('no-results'),
            
            // Modal
            projectModal: document.getElementById('project-modal'),
            modalClose: document.getElementById('modal-close'),
            modalBody: document.getElementById('modal-body'),
            
            // Contact form
            contactForm: document.getElementById('contact-form'),
            formMessage: document.getElementById('form-message'),
            
            // Back to top
            backToTop: document.getElementById('back-to-top'),
            
            // Loading overlay
            loadingOverlay: document.getElementById('loading-overlay'),
            
            // Current year
            currentYear: document.getElementById('current-year'),
            
            // Download resume
            downloadResume: document.getElementById('download-resume')
        };
        
        // Initialize the app
        this.init();
    }
    
    async init() {
        // Set current year
        this.elements.currentYear.textContent = new Date().getFullYear();
        
        // Load saved theme
        this.loadTheme();
        
        // Initialize projects
        this.initializeProjects();
        
        // Initialize event listeners
        this.setupEventListeners();
        
        // Initialize animations
        this.initAnimations();
        
        // Show content after loading
        setTimeout(() => {
            this.hideLoading();
        }, 1000);
    }
    
    // Theme Management
    loadTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            this.theme = savedTheme;
        } else {
            // Detect system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.theme = 'dark';
            }
        }
        
        this.applyTheme();
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Update theme icon
        if (this.theme === 'dark') {
            this.elements.themeIcon.className = 'fas fa-sun';
            this.elements.themeIcon.setAttribute('aria-label', 'Switch to light mode');
        } else {
            this.elements.themeIcon.className = 'fas fa-moon';
            this.elements.themeIcon.setAttribute('aria-label', 'Switch to dark mode');
        }
        
        // Save to localStorage
        localStorage.setItem('portfolio-theme', this.theme);
    }
    
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
    }
    
    // Projects Management
    initializeProjects() {
        // Sample projects data
        this.projects = [
            {
                id: 1,
                title: "E-Commerce Dashboard",
                description: "A modern e-commerce dashboard with real-time analytics, inventory management, and order processing capabilities.",
                longDescription: "This dashboard provides business owners with comprehensive insights into their e-commerce operations. It features real-time sales tracking, inventory management, customer analytics, and order processing. Built with a focus on performance and user experience.",
                tags: ["React", "Node.js", "MongoDB", "Chart.js", "Express"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                github: "https://github.com/username/ecommerce-dashboard",
                demo: "https://ecommerce-demo.example.com",
                features: [
                    "Real-time sales analytics",
                    "Inventory management system",
                    "Customer behavior tracking",
                    "Order processing workflow",
                    "Responsive mobile interface"
                ],
                technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io", "Chart.js"],
                status: "Live"
            },
            {
                id: 2,
                title: "Task Management App",
                description: "Collaborative task management application with drag & drop functionality, team assignments, and progress tracking.",
                longDescription: "A comprehensive task management solution for teams. Features include drag & drop task organization, team assignments with role-based permissions, progress tracking with visual indicators, and real-time collaboration.",
                tags: ["Vue.js", "Firebase", "Tailwind CSS", "Drag & Drop"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w-800&q=80",
                github: "https://github.com/username/task-manager",
                demo: "https://taskmanager-demo.example.com",
                features: [
                    "Drag & drop interface",
                    "Team collaboration",
                    "Progress tracking",
                    "File attachments",
                    "Calendar integration"
                ],
                technologies: ["Vue.js", "Vuex", "Firebase", "Tailwind CSS", "Vue Draggable"],
                status: "Live"
            },
            {
                id: 3,
                title: "Weather Forecast App",
                description: "Real-time weather forecasting application with location detection, 7-day forecasts, and severe weather alerts.",
                longDescription: "A weather application that provides accurate forecasts using multiple data sources. Features include location-based weather detection, detailed 7-day forecasts, severe weather alerts, and customizable weather widgets.",
                tags: ["JavaScript", "API", "CSS Grid", "Responsive"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                github: "https://github.com/username/weather-app",
                demo: "https://weather-app-demo.example.com",
                features: [
                    "Location-based forecasts",
                    "7-day weather predictions",
                    "Severe weather alerts",
                    "Customizable widgets",
                    "Multiple measurement units"
                ],
                technologies: ["Vanilla JavaScript", "Weather API", "CSS Grid", "Local Storage"],
                status: "Live"
            },
            {
                id: 4,
                title: "Fitness Tracker",
                description: "Mobile-first fitness tracking application with workout plans, progress charts, and social sharing features.",
                longDescription: "A comprehensive fitness tracking solution designed for mobile users. It includes personalized workout plans, progress tracking with visual charts, calorie counting, water intake tracking, and social sharing capabilities.",
                tags: ["React Native", "Redux", "GraphQL", "MongoDB"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                github: "https://github.com/username/fitness-tracker",
                demo: "https://fitness-tracker-demo.example.com",
                features: [
                    "Personalized workout plans",
                    "Progress tracking charts",
                    "Calorie counter",
                    "Water intake tracker",
                    "Social sharing"
                ],
                technologies: ["React Native", "Redux", "GraphQL", "MongoDB", "Chart.js"],
                status: "In Development"
            },
            {
                id: 5,
                title: "Recipe Finder",
                description: "Recipe discovery application with ingredient-based search, dietary filters, and step-by-step cooking instructions.",
                longDescription: "An intuitive recipe finder that helps users discover new recipes based on available ingredients. Features include advanced search filters, dietary restrictions, step-by-step cooking instructions with timers, and shopping list generation.",
                tags: ["Next.js", "TypeScript", "SASS", "REST API"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                github: "https://github.com/username/recipe-finder",
                demo: "https://recipe-finder-demo.example.com",
                features: [
                    "Ingredient-based search",
                    "Dietary restriction filters",
                    "Step-by-step instructions",
                    "Shopping list generator",
                    "User recipe collections"
                ],
                technologies: ["Next.js", "TypeScript", "SASS", "Recipe API", "Context API"],
                status: "Live"
            },
            {
                id: 6,
                title: "Portfolio Builder",
                description: "Drag & drop portfolio builder with customizable templates, theme options, and deployment to multiple platforms.",
                longDescription: "A no-code portfolio builder that allows users to create professional portfolios using drag & drop components. Features include customizable templates, theme options, SEO optimization, and one-click deployment to multiple hosting platforms.",
                tags: ["React", "DND Kit", "Firebase", "Material UI"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                github: "https://github.com/username/portfolio-builder",
                demo: "https://portfolio-builder-demo.example.com",
                features: [
                    "Drag & drop interface",
                    "Customizable templates",
                    "Theme customization",
                    "SEO optimization",
                    "One-click deployment"
                ],
                technologies: ["React", "DND Kit", "Firebase", "Material UI", "Vercel API"],
                status: "Live"
            }
        ];
        
        // Initialize filtered projects
        this.filteredProjects = [...this.projects];
        
        // Generate tags from projects
        this.generateTags();
        
        // Render initial projects
        this.renderProjects();
        this.updateProjectsCount();
    }
    
    generateTags() {
        const allTags = new Set();
        
        // Collect all unique tags
        this.projects.forEach(project => {
            project.tags.forEach(tag => {
                allTags.add(tag);
            });
        });
        
        // Sort tags alphabetically
        const sortedTags = Array.from(allTags).sort();
        
        // Add "All" tag
        sortedTags.unshift("All");
        
        // Render tags
        this.renderTags(sortedTags);
    }
    
    renderTags(tags) {
        const container = this.elements.filterTags;
        container.innerHTML = '';
        
        tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag';
            if (tag === "All") {
                tagElement.classList.add('active');
            }
            tagElement.textContent = tag;
            tagElement.dataset.tag = tag;
            
            tagElement.addEventListener('click', () => this.handleTagClick(tag));
            
            container.appendChild(tagElement);
        });
    }
    
    renderProjects() {
        const container = this.elements.projectsGrid;
        container.innerHTML = '';
        
        if (this.filteredProjects.length === 0) {
            this.elements.noResults.style.display = 'block';
            return;
        }
        
        this.elements.noResults.style.display = 'none';
        
        this.filteredProjects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            container.appendChild(projectCard);
        });
    }
    
    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.id = project.id;
        
        // Create image placeholder
        const imageDiv = document.createElement('div');
        imageDiv.className = 'project-image';
        imageDiv.style.backgroundColor = this.getRandomColor();
        
        // Create project content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'project-content';
        
        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = project.title;
        
        const description = document.createElement('p');
        description.className = 'project-description';
        description.textContent = project.description;
        
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'project-tags';
        
        project.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'project-tag';
            tagSpan.textContent = tag;
            tagsDiv.appendChild(tagSpan);
        });
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'project-actions';
        
        const githubBtn = document.createElement('a');
        githubBtn.href = project.github;
        githubBtn.target = '_blank';
        githubBtn.className = 'action-btn github';
        githubBtn.innerHTML = '<i class="fab fa-github"></i> Code';
        
        const demoBtn = document.createElement('a');
        demoBtn.href = project.demo;
        demoBtn.target = '_blank';
        demoBtn.className = 'action-btn demo';
        demoBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo';
        
        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'action-btn details';
        detailsBtn.innerHTML = '<i class="fas fa-info-circle"></i> Details';
        detailsBtn.addEventListener('click', () => this.openProjectModal(project.id));
        
        actionsDiv.appendChild(githubBtn);
        actionsDiv.appendChild(demoBtn);
        actionsDiv.appendChild(detailsBtn);
        
        // Assemble the card
        contentDiv.appendChild(title);
        contentDiv.appendChild(description);
        contentDiv.appendChild(tagsDiv);
        contentDiv.appendChild(actionsDiv);
        
        card.appendChild(imageDiv);
        card.appendChild(contentDiv);
        
        return card;
    }
    
    filterProjects() {
        this.filteredProjects = this.projects.filter(project => {
            // Check search term
            const matchesSearch = this.searchTerm === '' || 
                project.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(this.searchTerm.toLowerCase());
            
            // Check tags
            const matchesTags = this.activeTags.size === 0 || 
                project.tags.some(tag => this.activeTags.has(tag));
            
            return matchesSearch && matchesTags;
        });
        
        this.renderProjects();
        this.updateProjectsCount();
    }
    
    handleTagClick(tag) {
        const tagElements = document.querySelectorAll('.tag');
        
        if (tag === 'All') {
            // Deactivate all other tags
            tagElements.forEach(t => {
                t.classList.remove('active');
                if (t.dataset.tag === 'All') {
                    t.classList.add('active');
                }
            });
            
            this.activeTags.clear();
        } else {
            // Toggle tag
            const tagElement = document.querySelector(`.tag[data-tag="${tag}"]`);
            const isActive = tagElement.classList.contains('active');
            
            if (isActive) {
                tagElement.classList.remove('active');
                this.activeTags.delete(tag);
                
                // If no tags active, activate "All"
                if (this.activeTags.size === 0) {
                    document.querySelector('.tag[data-tag="All"]').classList.add('active');
                }
            } else {
                tagElement.classList.add('active');
                this.activeTags.add(tag);
                
                // Deactivate "All" if it's active
                document.querySelector('.tag[data-tag="All"]').classList.remove('active');
            }
        }
        
        this.filterProjects();
    }
    
    updateProjectsCount() {
        this.elements.projectsCount.textContent = this.filteredProjects.length;
    }
    
    // Modal Management
    openProjectModal(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;
        
        const modalBody = this.elements.modalBody;
        
        // Create modal content
        modalBody.innerHTML = `
            <div class="modal-project-image" style="background-color: ${this.getRandomColor()}"></div>
            
            <h2 class="modal-project-title">${project.title}</h2>
            
            <p class="modal-project-description">${project.longDescription}</p>
            
            <div class="modal-project-details">
                <div class="detail-item">
                    <h4>Features</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-item">
                    <h4>Technologies</h4>
                    <p>${project.technologies.join(', ')}</p>
                </div>
                
                <div class="detail-item">
                    <h4>Status</h4>
                    <p>${project.status}</p>
                </div>
            </div>
            
            <div class="modal-project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="modal-actions">
                <a href="${project.github}" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> View Code
                </a>
                <a href="${project.demo}" target="_blank" class="btn btn-secondary">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        `;
        
        // Show modal
        this.elements.projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeProjectModal() {
        this.elements.projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Contact Form
    setupContactForm() {
        this.elements.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this.elements.contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                this.showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            this.showFormMessage('Sending message...', 'info');
            
            setTimeout(() => {
                // In a real app, you would send this to a server
                console.log('Form submitted:', data);
                
                // Show success message
                this.showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                this.elements.contactForm.reset();
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    this.hideFormMessage();
                }, 5000);
            }, 1500);
        });
    }
    
    showFormMessage(message, type) {
        const element = this.elements.formMessage;
        element.textContent = message;
        element.className = `form-message ${type}`;
        element.style.display = 'block';
    }
    
    hideFormMessage() {
        this.elements.formMessage.style.display = 'none';
    }
    
    // Animations
    initAnimations() {
        // Animate skill bars
        this.animateSkillBars();
        
        // Animate stat numbers
        this.animateStats();
        
        // Intersection Observer for scroll animations
        this.initIntersectionObserver();
        
        // Smooth scrolling for anchor links
        this.initSmoothScrolling();
    }
    
    animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItem = entry.target;
                    const level = skillItem.dataset.level;
                    const progressBar = skillItem.querySelector('.skill-progress');
                    
                    setTimeout(() => {
                        progressBar.style.width = `${level}%`;
                    }, 300);
                    
                    observer.unobserve(skillItem);
                }
            });
        }, { threshold: 0.5 });
        
        skillItems.forEach(item => observer.observe(item));
    }
    
    animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const target = parseInt(stat.dataset.count);
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current);
                    }, 16);
                    
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }
    
    initIntersectionObserver() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => observer.observe(section));
    }
    
    initSmoothScrolling() {
        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (this.elements.mobileMenu.classList.contains('active')) {
                        this.elements.mobileMenu.classList.remove('active');
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Event Listeners
    setupEventListeners() {
        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Mobile menu
        this.elements.mobileMenuToggle.addEventListener('click', () => {
            this.elements.mobileMenu.classList.add('active');
        });
        
        this.elements.mobileMenuClose.addEventListener('click', () => {
            this.elements.mobileMenu.classList.remove('active');
        });
        
        // Close mobile menu when clicking links
        this.elements.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.elements.mobileMenu.classList.remove('active');
            });
        });
        
        // Project search
        this.elements.projectSearch.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.filterProjects();
        });
        
        // Modal close
        this.elements.modalClose.addEventListener('click', () => this.closeProjectModal());
        
        // Close modal when clicking outside
        this.elements.projectModal.addEventListener('click', (e) => {
            if (e.target === this.elements.projectModal) {
                this.closeProjectModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.projectModal.classList.contains('active')) {
                this.closeProjectModal();
            }
        });
        
        // Back to top
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.elements.backToTop.classList.add('visible');
            } else {
                this.elements.backToTop.classList.remove('visible');
            }
        });
        
        this.elements.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Contact form
        this.setupContactForm();
        
        // Download resume
        this.elements.downloadResume.addEventListener('click', (e) => {
            e.preventDefault();
            this.showFormMessage('Resume download started!', 'success');
            
            // Simulate download
            setTimeout(() => {
                this.hideFormMessage();
            }, 3000);
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            // Close mobile menu on larger screens
            if (window.innerWidth > 768) {
                this.elements.mobileMenu.classList.remove('active');
            }
        });
    }
    
    // Utility Methods
    getRandomColor() {
        const colors = [
            '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    hideLoading() {
        this.elements.loadingOverlay.classList.add('hidden');
        
        setTimeout(() => {
            this.elements.loadingOverlay.style.display = 'none';
        }, 300);
    }
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    
    // Make app available globally for debugging
    window.portfolioApp = app;
});

// Add CSS for scroll animations
const scrollAnimationStyles = document.createElement('style');
scrollAnimationStyles.textContent = `
    .hero-section .hero-text,
    .hero-section .hero-visual {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .hero-section.animated .hero-text,
    .hero-section.animated .hero-visual {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .project-card.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-item {
        opacity: 0;
        transform: translateX(-20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .skill-item.animated {
        opacity: 1;
        transform: translateX(0);
    }
    
    .timeline-item {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .timeline-item.animated {
        opacity: 1;
        transform: translateX(0);
    }
    
    .contact-method {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .contact-method.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(scrollAnimationStyles);