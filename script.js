const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
	navToggle.addEventListener('click', () => {
		const isOpen = siteNav.classList.toggle('is-open');
		navToggle.classList.toggle('is-open', isOpen);
		navToggle.setAttribute('aria-expanded', String(isOpen));
		navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
	});

	siteNav.addEventListener('click', (event) => {
		if (event.target.closest('a')) {
			siteNav.classList.remove('is-open');
			navToggle.classList.remove('is-open');
			navToggle.setAttribute('aria-expanded', 'false');
			navToggle.setAttribute('aria-label', 'Open navigation menu');
		}
	});

	document.addEventListener('click', (event) => {
		if (!event.target.closest('.nav-shell')) {
			siteNav.classList.remove('is-open');
			navToggle.classList.remove('is-open');
			navToggle.setAttribute('aria-expanded', 'false');
			navToggle.setAttribute('aria-label', 'Open navigation menu');
		}
	});
}

const revealSections = document.querySelectorAll('.scroll-reveal');

if (revealSections.length) {
	if ('IntersectionObserver' in window) {
		const revealObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, {
			threshold: 0.18,
			rootMargin: '0px 0px -8% 0px'
		});

		revealSections.forEach((section) => revealObserver.observe(section));
	} else {
		revealSections.forEach((section) => section.classList.add('is-visible'));
	}
}
