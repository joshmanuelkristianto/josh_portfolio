// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe all animation elements
document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up').forEach(el => {
  observer.observe(el);
});

// Project modal functionality
const projectData = {
  project1: {
    title: "Options Pricing Heatmap Using Black-Scholes Monte Carlo Model",
    description: "Built a tool where users input key parameters (stock price, strike price, volatility, time to maturity) and instantly receive a heatmap visualization of option prices and risk ranges.",
    tech: "yfinance, Streamlit, NumPy, Matplotlib, Black-Scholes Model, Monte Carlo Simulation",
    bullets: [
      "Built a tool where users input key parameters (stock price, strike price, volatility, time to maturity) and instantly receive a heatmap visualization of option prices and risk ranges.",
      "Implemented the Black–Scholes formula for theoretical pricing and supplemented it with Monte Carlo simulations to model potential market scenarios and non-linear behaviors.",
      "Added a ticker selection feature where users can choose a stock or index within a specified time range to: Plot historical price trends, Calculate and display the Sharpe ratio Show return distributions, Compute realized volatility"
    ],
    images: ["./images/BSM_VID.gif"],
    link: { label: "View Live Deployment", url: "https://blackscholes-montecarlo.streamlit.app" }
  },
  project2: {
    title: "S&P 500 Pairs Trading Using Mean Reversion",
    description: "Added a correlation analysis feature to compute and visualize the correlation matrix of returns across all possible assets, assisting in pre-selection of highly correlated candidates before cointegration testing.  ",
    tech: "ADF-test, Engle Granger test, Cointegration, statsmodels, Plotly",
    bullets: [
      "Added a correlation analysis feature to compute and visualize the correlation matrix of returns across all possible assets, assisting in pre-selection of highly correlated candidates before cointegration testing.",
      "Wrote a scalable pipeline to test all possible ticker combinations for cointegration using Engle-Granger and Johansen tests, enabling systematic discovery of viable trading pairs.",
      "Developed a mean reversion model using z-scores to determine robust entry and exit signals for long/short positions."
    ],
    images: ["./images/snp.gif"],
    link: { label: "Strategy Notebook", url: "https://github.com/joshmanuelkristianto/pairs_trading_mean_reversion/blob/main/S%26P500_Cointegration_Mean_Reversion.ipynb" }
  },
  project3: {
    title: "Content Based Movie Recommendation System",
    description: "Modern, responsive corporate website with custom CMS. Features include multi-language support, SEO optimization, contact forms, and blog functionality. Built with performance and accessibility in mind.",
    tech: "Content-Based Recommender, Collaborative Learning, TF-IDF",
    bullets: [
      "Combines content-based filtering with collaborative filtering to improve recommendation quality.",
      "Leverages genres, keywords, cast, directors, and movie overviews to create detailed profiles.",
      "Uses TF-IDF vectorization to transform textual data into numerical vectors for similarity calculations.",
      "Employs Singular Value Decomposition (SVD) on user–movie rating data to uncover hidden patterns and predict ratings."
    ],
    images: ["./images/proj4.jpg"],
    link: { label: "View Notebook", url: "https://github.com/joshmanuelkristianto/movie_recommendation/blob/main/ML_Code.ipynb" }
  },
  project4: {
    title: "Bank Credit Loan Classification Using XGBoost   ",
    description: "Modern, responsive corporate website with custom CMS. Features include multi-language support, SEO optimization, contact forms, and blog functionality. Built with performance and accessibility in mind.",
    tech: "XGBoost, Fine Tuning, Feature Selection, One Hot Encoder",
    bullets: [
      "Comprehensive EDA & Data Cleaning: Explored loan applicant data to uncover trends, remove inconsistencies, and improve data quality.",
      "Object-Oriented Design: Built modular, reusable code structures to streamline development and deployment.",
      "Modeling with XGBoost: Implemented and fine-tuned an XGBoost classifier to predict loan approval status accurately.",
      "Performance Evaluation: Applied metrics such as accuracy, ROC-AUC, and confusion matrix to validate model performance.",
      "Streamlit Deployment: Developed a live, interactive web application allowing users to test the model with real inputs."
    ],
    images: ["./images/loan_decision.gif"],
    link: { label: "View Live Deployment", url: "https://bank-loan-decision-josh.streamlit.app/" }
  },
  project5: {
    title: "E-Commerce Customer Clustering with K-Means and Post EDA of Clusters",
    description: "Modern, responsive corporate website with custom CMS. Features include multi-language support, SEO optimization, contact forms, and blog functionality. Built with performance and accessibility in mind.",
    tech: "K-means clustering, Post Cluster Evaluation, Silhoutte Testing",
    bullets: [
      "Data Preparation: Cleaned, encoded, and explored customer data for better model performance.",
      "K-Means Modeling: Implemented and fine-tuned K-Means clustering to segment e-commerce customers.",
      "Cluster Evaluation: Applied metrics and visualizations to assess clustering quality.",
      "Post-Clustering EDA: Conducted in-depth analysis of each cluster to profile customer segments.",
      "Business Insight: Identified actionable insights for personalized marketing and customer strategies."
    ],
    images: ["./images/cluster.gif"],
    link: { label: "View Notebook", url: "https://github.com/joshmanuelkristianto/e-commerce_customer_clustering/blob/main/e-commerce_customer_clustering.ipynb" }
  }
};

function openModal(projectId) {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const project = projectData[projectId];
  if (!modal || !modalBody || !project) return;

  const gallery = (project.images || []).map(src => `
      <div class="modal-thumb"><img src="${src}" alt="${project.title} screenshot"></div>
  `).join('');

  const bullets = (project.bullets || []).map(item => `<li>${item}</li>`).join('');

  const link = project.link ? `<a class="link-button" href="${project.link.url}" target="_blank" rel="noopener">${project.link.label}</a>` : '';

  modalBody.innerHTML = `
    <h2 class="gradient-text" style="margin-bottom: 12px;">${project.title}</h2>
    <div class="modal-actions">${link}</div>
    <div class="modal-gallery">${gallery}</div>
    <ul class="modal-bullets">${bullets}</ul>
    <p style="color: #22c55e; font-weight: bold; margin-top: 8px;">Tech: ${project.tech}</p>
  `;

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('projectModal');
  if (event.target === modal) {
    closeModal();
  }
});

// Firebase init (replace with your actual config values)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let db = null;
try {
  if (window.firebase && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  db = window.firebase ? firebase.firestore() : null;
} catch (err) {
  console.error('Firebase initialization error:', err);
}

// Form submission -> save to Firestore
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    if (!(data.firstName && data.lastName && data.email && data.message)) {
      alert('Please fill in all fields.');
      return;
    }

    if (!db) {
      alert('Database not initialized. Please add your Firebase config.');
      return;
    }

    try {
      await db.collection('contacts').add({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        message: data.message,
        createdAt: new Date().toISOString(),
        userAgent: navigator.userAgent || ''
      });
      alert('Thank you! Your message has been saved.');
      this.reset();
    } catch (err) {
      console.error('Failed to save contact:', err);
      alert('Sorry, something went wrong saving your message.');
    }
  });
}

// Certificate modal
function openCertificateModal(imageSrc, captionText) {
  const modal = document.getElementById("certificateModal");
  const modalImg = document.getElementById("certificateImage");
  const caption = document.getElementById("certificateCaption");
  if (!modal || !modalImg || !caption) return;
  modal.style.display = "block";
  modalImg.src = imageSrc;
  caption.innerHTML = captionText;
  document.body.style.overflow = "hidden"; // prevent scroll behind modal
}

function closeCertificateModal() {
  const modal = document.getElementById("certificateModal");
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// About Me Carousel (fixed arrow button functionality)
(function() {
  // Get about section and carousel elements
  const about = document.getElementById("about");
  if (!about) return;

  const track = about.querySelector(".about-track");
  const slides = Array.from(about.querySelectorAll(".about-slide"));
  const dotsWrap = about.querySelector(".about-dots");
  const nextBtn = about.querySelector(".about-next");
  const prevBtn = about.querySelector(".about-prev");

  if (!track || !slides.length || !dotsWrap) return;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "about-dot";
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.children);

  let index = 0;
  let autoTimer = null;
  const DURATION_MS = 8000;
  const threshold = 50; // px swipe threshold

  function update() {
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
    dots.forEach((d, i) => d.setAttribute("aria-current", i === index ? "true" : "false"));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length; // wrap-around
    update();
    restartAuto();
  }

  function next() {
    goTo(index + 1);
  }
  function prev() {
    goTo(index - 1);
  }

  // Fix: Ensure arrow buttons work
  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  // Auto slide with pause on hover/focus
  function startAuto() {
    if (autoTimer) return;
    autoTimer = setInterval(next, DURATION_MS);
  }
  function stopAuto() {
    if (!autoTimer) return;
    clearInterval(autoTimer);
    autoTimer = null;
  }
  function restartAuto() {
    stopAuto();
    startAuto();
  }

  const carousel = about.querySelector(".about-carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);
    carousel.addEventListener("focusin", stopAuto);
    carousel.addEventListener("focusout", startAuto);
  }

  // Keyboard support
  about.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // Swipe support (pointer events)
  let startX = 0;
  let isDown = false;
  about.addEventListener("pointerdown", (e) => {
    isDown = true;
    startX = e.clientX;
  });
  about.addEventListener("pointerup", (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > threshold) {
      if (dx < 0) next();
      else prev();
    }
    isDown = false;
  });
  about.addEventListener("pointercancel", () => {
    isDown = false;
  });

  // Initialize
  update();
  startAuto();
})();

// Close certificate modal when clicking anywhere except the image
(function() {
  const certModal = document.getElementById("certificateModal");
  const certImg = document.getElementById("certificateImage");
  if (certModal && certImg) {
    certModal.addEventListener("click", function(e) {
      if (e.target !== certImg) {
        closeCertificateModal();
      }
    });
  }
})();
