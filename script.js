export function sanitizeInput(str) {
	const tempNode = document.createElement("div");
	tempNode.textContent = String(str ?? "");
	return tempNode.textContent || "";
}

export function parsePositiveInteger(value) {
	const parsedValue = Number.parseInt(String(value ?? ""), 10);

	if (Number.isNaN(parsedValue) || parsedValue < 0) {
		return 0;
	}

	return parsedValue;
}

export function sendWhatsAppMessage({ phoneNumber, message, fallbackMessage = "Hello Fuller Fields Farms, I would like to place an order." }) {
	const cleanNumber = String(phoneNumber ?? "").replace(/\D/g, "");
	const safeMessage = sanitizeInput(message || fallbackMessage).trim();

	if (!safeMessage) {
		window.alert("Please type a message before sending.");
		return false;
	}

	const finalPayload = encodeURIComponent(safeMessage);

	if (!cleanNumber) {
		window.alert("Please set a valid phone number.");
		return false;
	}

	window.location.href = `https://wa.me/${cleanNumber}?text=${finalPayload}`;
	return true;
}
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
