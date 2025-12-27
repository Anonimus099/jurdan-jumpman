// Jordan Shoes Website - Interactive Features

document.addEventListener("DOMContentLoaded", function () {
  // Slider Functionality
  const slides = document.querySelectorAll(".slide");
  const navDots = document.querySelectorAll(".nav-dot");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");

  let currentSlide = 0;
  let isAnimating = false;
  let autoplayInterval;
  const autoplayDelay = 5000; // 5 seconds

  // Slide Data with Product Info
  const slideData = [
    {
      color: "red",
      name: "JORDAN JUMPMAN 2021 PF",
      badge: "exclusive",
      price: "134$",
      description:
        "Inspired by the design of the latest Air Jordan game shoe, the Jordan Jumpman 2021 helps up-and-coming players level up their game.",
    },
    {
      color: "blue",
      name: "JORDAN JUMPMAN 2021 BLUE",
      badge: "limited",
      price: "139$",
      description:
        "Feel the energy with this stunning blue edition. Perfect for players who want to stand out on the court with style and performance.",
    },
    {
      color: "white",
      name: "JORDAN JUMPMAN 2021 CLASSIC",
      badge: "bestseller",
      price: "129$",
      description:
        "The classic white edition combines timeless design with modern technology. A must-have for every Jordan collection.",
    },
    {
      color: "green",
      name: "JORDAN JUMPMAN 2021 FRESH",
      badge: "new",
      price: "144$",
      description:
        "Fresh green colorway brings a new dimension to your game. Eco-friendly materials meet cutting-edge design.",
    },
    {
      color: "purple",
      name: "JORDAN JUMPMAN 2021 ROYAL",
      badge: "exclusive",
      price: "149$",
      description:
        "Royal purple edition for those who demand the best. Premium materials and exceptional craftsmanship.",
    },
  ];

  function goToSlide(index) {
    if (isAnimating || index === currentSlide) return;

    isAnimating = true;

    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove("active");
    slides[currentSlide].classList.add("prev");
    navDots[currentSlide].classList.remove("active");

    // Update current slide
    currentSlide = index;

    // Add active class to new slide and dot
    slides[currentSlide].classList.add("active");
    navDots[currentSlide].classList.add("active");

    // Update product info
    updateProductInfo(slideData[currentSlide]);

    // Remove prev class after animation
    setTimeout(() => {
      document.querySelectorAll(".slide.prev").forEach((slide) => {
        slide.classList.remove("prev");
      });
      isAnimating = false;
    }, 1000);

    // Reset autoplay
    resetAutoplay();
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  function updateProductInfo(data) {
    // Update price
    const priceEl = document.querySelector(".price");
    if (priceEl) {
      priceEl.style.animation = "none";
      setTimeout(() => {
        priceEl.textContent = data.price;
        priceEl.style.animation = "fadeInRight 0.5s ease-out";
      }, 10);
    }

    // Update badge
    const badgeEl = document.querySelector(".exclusive-badge");
    if (badgeEl) {
      badgeEl.style.animation = "none";
      setTimeout(() => {
        badgeEl.textContent = data.badge;
        badgeEl.style.animation = "scaleIn 0.5s ease-out";
      }, 10);
    }

    // Update title
    const titleEl = document.querySelector(".product-title");
    if (titleEl) {
      titleEl.style.animation = "none";
      setTimeout(() => {
        const words = data.name.split(" ");
        if (words.length > 2) {
          titleEl.innerHTML = `${words[0]}<br />${words.slice(1).join(" ")}`;
        } else {
          titleEl.innerHTML = data.name;
        }
        titleEl.style.animation = "fadeInRight 0.5s ease-out 0.1s both";
      }, 10);
    }

    // Update description
    const descEl = document.querySelector(".inspiration-text");
    if (descEl) {
      descEl.style.animation = "none";
      setTimeout(() => {
        descEl.textContent = data.description;
        descEl.style.animation = "fadeInUp 0.5s ease-out 0.2s both";
      }, 10);
    }
  }

  // Navigation Dots Click
  navDots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      goToSlide(index);
    });
  });

  // Slider Controls
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Keyboard Navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  const screen = document.querySelector(".screen");

  screen.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  screen.addEventListener(
    "touchend",
    function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, autoplayDelay);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pause autoplay on hover
  screen.addEventListener("mouseenter", stopAutoplay);
  screen.addEventListener("mouseleave", startAutoplay);

  // Start autoplay
  startAutoplay();

  // Initialize first slide
  updateProductInfo(slideData[0]);

  // Menu Navigation
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all menu items
      menuItems.forEach((m) => m.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      console.log(`Menu item clicked: ${this.textContent}`);
    });
  });

  // Add to Cart Button
  const addToCartBtn = document.querySelector(".btn-primary");
  let cartCount = 0;

  addToCartBtn.addEventListener("click", function () {
    // Add animation
    this.style.animation = "none";
    setTimeout(() => {
      this.style.animation = "pulse 0.6s ease-in-out";
    }, 10);

    cartCount++;

    // Show custom notification
    const productName = document
      .querySelector(".product-title")
      .textContent.replace(/<br\s*\/?>/gi, " ");
    const productPrice = document.querySelector(".price").textContent;

    showNotification(
      `✓ ${productName} добавлен в корзину! (${productPrice})`,
      "success"
    );

    // Update cart icon
    updateCartIcon();

    console.log(`Product added to cart: ${productName} - ${productPrice}`);
  });

  function updateCartIcon() {
    const cartIcon = document.querySelector(".cart-icon");

    // Create or update badge
    let badge = cartIcon.querySelector(".cart-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "cart-badge";
      cartIcon.appendChild(badge);
    }

    badge.textContent = cartCount;
    badge.style.animation = "scaleIn 0.3s ease-out";
  }

  // Buy Now Button
  const buyNowBtn = document.querySelector(".btn-secondary");

  buyNowBtn.addEventListener("click", function () {
    // Add animation
    this.style.animation = "none";
    setTimeout(() => {
      this.style.animation = "pulse 0.6s ease-in-out";
    }, 10);

    const productName = document
      .querySelector(".product-title")
      .textContent.replace(/<br\s*\/?>/gi, " ");
    const productPrice = document.querySelector(".price").textContent;

    // Show checkout modal (simulated)
    showCheckoutModal(productName, productPrice);

    console.log(`Buy now clicked: ${productName} - ${productPrice}`);
  });

  function showCheckoutModal(productName, price) {
    // Create modal
    const modal = document.createElement("div");
    modal.className = "checkout-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Оформление заказа</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <p><strong>Товар:</strong> ${productName}</p>
          <p><strong>Цена:</strong> ${price}</p>
          <p class="modal-message">🎉 Отличный выбор! Оформление заказа...</p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
      modal.classList.add("show");
    }, 10);

    // Close modal
    const closeBtn = modal.querySelector(".modal-close");
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    });

    // Close on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeBtn.click();
      }
    });
  }

  // Search Icon
  const searchIcon = document.querySelector(".search-icon");

  searchIcon.addEventListener("click", function () {
    // You can implement a search modal here
    alert("Функция поиска будет реализована здесь");
    console.log("Search icon clicked");
  });

  // Cart Icon
  const cartIcon = document.querySelector(".cart-icon");

  cartIcon.addEventListener("click", function () {
    // You can implement a cart modal here
    alert("Открытие корзины...");
    console.log("Cart icon clicked");
  });

  // Avatar/Profile
  const avatar = document.querySelector(".avatar");

  avatar.addEventListener("click", function () {
    // You can implement a user profile dropdown here
    alert("Профиль пользователя");
    console.log("Avatar clicked");
  });

  // Shoe Colors Selection
  const shoeColors = document.querySelector(".shoe-colors img");

  if (shoeColors) {
    shoeColors.addEventListener("click", function (e) {
      // Calculate which shoe was clicked based on the click position
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const shoeIndex = Math.floor((x / width) * 5); // 5 shoes/colors

      const colors = ["Красный", "Синий", "Белый", "Зелёный", "Фиолетовый"];
      const slideIndex = shoeIndex;

      console.log(`Выбран цвет: ${colors[shoeIndex]}`);

      // Change slide to match color
      goToSlide(slideIndex);

      // Show notification
      showNotification(`🎨 Выбран цвет: ${colors[shoeIndex]}`, "info");
    });

    // Add hover effect
    shoeColors.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const hoverIndex = Math.floor((x / width) * 5);

      // Add visual feedback (optional)
      this.style.filter = `brightness(${1 + hoverIndex * 0.05})`;
    });

    shoeColors.addEventListener("mouseleave", function () {
      this.style.filter = "brightness(1)";
    });
  }

  // Universal Notification System
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Add CSS animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
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

  // Smooth scrolling for better UX
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Parallax Effect on Mouse Move
  let mouseX = 0,
    mouseY = 0;
  let parallaxElements = [];

  function initParallax() {
    parallaxElements = [
      { el: document.querySelector(".jordan-logo"), speed: 0.02 },
      { el: document.querySelector(".nike-logo"), speed: 0.03 },
      { el: document.querySelector(".pricing-section"), speed: 0.04 },
      { el: document.querySelector(".inspiration-section"), speed: 0.03 },
      { el: document.querySelector(".navigation-bar"), speed: 0.02 },
    ];
  }

  initParallax();

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
  });

  function animateParallax() {
    parallaxElements.forEach((item) => {
      if (item.el) {
        const xMove = mouseX * 50 * item.speed;
        const yMove = mouseY * 50 * item.speed;
        item.el.style.transform = `translate(${xMove}px, ${yMove}px)`;
      }
    });

    requestAnimationFrame(animateParallax);
  }

  animateParallax();

  // Loading Animation
  function pageLoadAnimation() {
    const elements = [
      { selector: ".jordan-logo", delay: 0 },
      { selector: ".nike-logo", delay: 100 },
      { selector: ".menu-navigation", delay: 200 },
      { selector: ".header-actions", delay: 300 },
      { selector: ".pricing-section", delay: 400 },
      { selector: ".cta-buttons", delay: 500 },
      { selector: ".color-selector", delay: 600 },
      { selector: ".inspiration-section", delay: 700 },
      { selector: ".navigation-bar", delay: 800 },
    ];

    elements.forEach((item) => {
      const el = document.querySelector(item.selector);
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";

        setTimeout(() => {
          el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, item.delay);
      }
    });
  }

  // Run loading animation
  setTimeout(pageLoadAnimation, 100);

  // Add ripple effect to buttons
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  document.querySelectorAll(".btn").forEach((button) => {
    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.addEventListener("click", createRipple);
  });

  // Scroll Progress Indicator (for future content)
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });

  console.log("Jordan Shoes Website loaded successfully!");
  console.log(
    "🚀 Features: Auto-playing slider, touch swipe, keyboard navigation, parallax effects"
  );
});
