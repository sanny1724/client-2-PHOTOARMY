document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Loader Animation
    const tlLoader = gsap.timeline();
    tlLoader.to('#loader-line', {
        scaleX: 1,
        duration: 1.5,
        ease: 'power2.inOut'
    })
        .to('#loader h1 span', {
            y: 0,
            duration: 0.8,
            ease: 'power4.out'
        }, '-=0.5')
        .to('#loader', {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
            delay: 0.5,
            onComplete: () => {
                // Ensure loader is hidden after animation
                document.getElementById('loader').style.display = 'none';
            }
        })
        .from('#main-header', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.5')
        .to('#hero-title', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out'
        }, '-=0.5')
        .to('#hero-subtitle', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.8')
        .to('#hero-ctas', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.8')
        .to('#scroll-indicator', {
            opacity: 1,
            duration: 1
        }, '-=0.5');

    // Navbar Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-primary/95', 'py-4', 'border-white/10');
            header.classList.remove('py-6', 'border-white/0');
        } else {
            header.classList.remove('bg-primary/95', 'py-4', 'border-white/10');
            header.classList.add('py-6', 'border-white/0');
        }
    });

    // Hero Slider
    const slides = [
        'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2052&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?q=80&w=2103&auto=format&fit=crop'
    ];
    let currentSlide = 0;
    const heroSlider = document.getElementById('hero-slider').querySelector('.slide');

    /*
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        gsap.to(heroSlider, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                heroSlider.style.backgroundImage = `url('${slides[currentSlide]}')`;
                gsap.to(heroSlider, { opacity: 1, duration: 1 });
            }
        });
    }, 6000);
    */

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    window.openLightbox = function (item) {
        const imgSrc = item.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'block';
        setTimeout(() => {
            lightboxImg.classList.remove('scale-90');
            lightboxImg.classList.add('scale-100');
        }, 50);
    };

    window.closeLightbox = function () {
        lightboxImg.classList.remove('scale-100');
        lightboxImg.classList.add('scale-90');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 400);
    };

    // Filter Logic
    const filterBtns = document.querySelectorAll('#filter-btns button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('text-accent', 'active'));
            btn.classList.add('text-accent', 'active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    gsap.to(item, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        display: 'block'
                    });
                } else {
                    gsap.to(item, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.5,
                        display: 'none'
                    });
                }
            });
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const btnLine1 = document.getElementById('btn-line-1');
    const btnLine2 = document.getElementById('btn-line-2');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('translate-x-full');
            btnLine1.classList.add('rotate-45', 'translate-y-2');
            btnLine2.classList.add('-rotate-45', '-translate-y-0.5');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('translate-x-full');
            btnLine1.classList.remove('rotate-45', 'translate-y-2');
            btnLine2.classList.remove('-rotate-45', '-translate-y-0.5');
            document.body.style.overflow = 'auto';
        }
    }

    menuToggle.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // Reveal Animations on Scroll
    const sections = ['#portfolio', '#about', '#services', '#contact'];
    sections.forEach(section => {
        // Heading animation
        gsap.from(section + ' h2', {
            scrollTrigger: {
                trigger: section,
                start: 'top 90%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Content animation (staggered)
        const contentElements = document.querySelectorAll(section + ' .gallery-item, ' + section + ' .glass, ' + section + ' .md\\:w-1\\/2');
        if (contentElements.length > 0) {
            gsap.from(contentElements, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                clearProps: "all" // Ensure elements aren't stuck at opacity 0 if something fails
            });
        }
    });

    // About Section Image Parallax
    gsap.to('#about img', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: -30,
        ease: 'none'
    });

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Final layout refresh to ensure ScrollTrigger catches all elements
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // Fallback refresh after a short delay
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 1500);
});
