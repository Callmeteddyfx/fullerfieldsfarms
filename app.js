import { PRODUCTS } from "./products.js";

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const productGrid = document.querySelector("#productGrid");
const productSearchInput = document.querySelector("#productSearchInput");
const productTypeSelect = document.querySelector("#productTypeSelect");
const contactMessageInput = document.querySelector("#contactMessage");
const whatsappSendBtn = document.querySelector("#whatsappSendBtn");

if (navToggle && siteNav) {
	navToggle.addEventListener("click", () => {
		const isOpen = siteNav.classList.toggle("is-open");
		navToggle.classList.toggle("is-open", isOpen);
		navToggle.setAttribute("aria-expanded", String(isOpen));
		navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
	});

	siteNav.addEventListener("click", (event) => {
		if (event.target.closest("a")) {
			siteNav.classList.remove("is-open");
			navToggle.classList.remove("is-open");
			navToggle.setAttribute("aria-expanded", "false");
			navToggle.setAttribute("aria-label", "Open navigation menu");
		}
	});

	document.addEventListener("click", (event) => {
		if (!event.target.closest(".nav-shell")) {
			siteNav.classList.remove("is-open");
			navToggle.classList.remove("is-open");
			navToggle.setAttribute("aria-expanded", "false");
			navToggle.setAttribute("aria-label", "Open navigation menu");
		}
	});
}

function formatCurrency(value) {
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		maximumFractionDigits: 0
	}).format(value);
}

function renderProducts(filteredList) {
	if (!productGrid) {
		return;
	}

	productGrid.innerHTML = "";

	if (!filteredList.length) {
		productGrid.innerHTML = `
			<div class="product-empty-state">
				<h3>No products found</h3>
				<p>Try another product name or type like fruit, vegetable, or pantry.</p>
			</div>
		`;
		return;
	}

	const cardsMarkup = filteredList.map((product) => `
		<article class="product-card rounded-2xl border border-[#d7cfb2] bg-[#f8f2df] p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
			<div class="product-card-image-wrap overflow-hidden rounded-md">
				<img src="${product.image}" alt="${product.name}" class="product-card-image h-28 w-full object-cover" loading="lazy">
			</div>
			<h3 class="mt-3 text-sm font-semibold uppercase tracking-wide">${product.name}</h3>
			<p class="text-xs uppercase text-[#55652b]">${product.type} | ${product.unit}</p>
			<p class="product-price text-sm font-semibold">${formatCurrency(product.price)}</p>
			<label class="qty-row" for="qty-${product.id}">Qty
				<input id="qty-${product.id}" type="number" min="0" step="1" value="0" aria-label="Quantity for ${product.name}">
			</label>
			<button type="button" class="purchase-btn">Purchase</button>
		</article>
	`).join("");

	productGrid.innerHTML = cardsMarkup;
}

function populateProductTypeSelect() {
	if (!productTypeSelect) {
		return;
	}

	const types = [...new Set(PRODUCTS.map((product) => product.type.toLowerCase()))].sort();
	const optionsMarkup = [
		`<option value="">All types</option>`,
		...types.map((type) => `<option value="${type}">${type}</option>`)
	].join("");

	productTypeSelect.innerHTML = optionsMarkup;
}

function applyProductFilters() {
	if (!productGrid) {
		return;
	}

	const query = productSearchInput ? productSearchInput.value.trim().toLowerCase() : "";
	const selectedType = productTypeSelect ? productTypeSelect.value.trim().toLowerCase() : "";

	const filteredProducts = PRODUCTS.filter((product) => {
		const matchesText =
			product.name.toLowerCase().includes(query) ||
			product.type.toLowerCase().includes(query);
		const matchesType = !selectedType || product.type.toLowerCase() === selectedType;

		return matchesText && matchesType;
	});

	renderProducts(filteredProducts);
}

if (productGrid) {
	populateProductTypeSelect();
	applyProductFilters();

	if (productSearchInput) {
		productSearchInput.addEventListener("input", applyProductFilters);
	}

	if (productTypeSelect) {
		productTypeSelect.addEventListener("change", applyProductFilters);
	}
}

if (whatsappSendBtn && contactMessageInput) {
	whatsappSendBtn.addEventListener("click", () => {
		const rawNumber = whatsappSendBtn.dataset.whatsappNumber || "";
		const cleanNumber = rawNumber.replace(/\D/g, "");
		const message = contactMessageInput.value.trim() || "Hello Fuller Fields Farms, I would like to place an order.";

		if (!cleanNumber) {
			window.alert("Please set a valid WhatsApp number in data-whatsapp-number.");
			return;
		}

		const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, "_blank", "noopener,noreferrer");
	});
}

const revealSections = document.querySelectorAll(".scroll-reveal");

if (revealSections.length) {
	if ("IntersectionObserver" in window) {
		const revealObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		}, {
			threshold: 0.18,
			rootMargin: "0px 0px -8% 0px"
		});

		revealSections.forEach((section) => revealObserver.observe(section));
	} else {
		revealSections.forEach((section) => section.classList.add("is-visible"));
	}
}
