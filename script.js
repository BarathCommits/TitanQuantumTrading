// App state
let currentPage = 'home';

// Ticker data
const tickerItems = ["SPY", "QQQ", "NVDA", "AAPL"];
const liveMarketSymbols = ["SPY", "QQQ", "NVDA", "AAPL"];
const REFRESH_INTERVAL_MS = 70000;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Set theme
  document.documentElement.setAttribute("data-theme", "titan");
  
  // Initialize routing
  initializeRouting();
  
  // Initialize mobile menu
  initializeMobileMenu();
  
  // Load home page
  loadPage('home');
  
  // Load ticker data
  loadTickerData();
  setInterval(loadTickerData, REFRESH_INTERVAL_MS);
});

// Routing
function initializeRouting() {
  console.log('Initializing routing...');
  // Handle all navigation links
  const navigationLinks = document.querySelectorAll('a[href^="/"], .nav-link, .footer-link');
  console.log('Navigation links found:', navigationLinks.length);
  
  navigationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('Link clicked:', link);
      // Skip if it's an anchor link
      if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        return;
      }
      
      e.preventDefault();
      
      let pageName = 'home';
      
      // Determine the page to load based on data-page attribute or href
      if (link.getAttribute('data-page')) {
        pageName = link.getAttribute('data-page');
      } else {
        const href = link.getAttribute('href') || '';
        if (href.includes('about')) {
          pageName = 'about';
        } else if (href.includes('strategies')) {
          pageName = 'strategies';
        } else if (href === '/' || href === '') {
          pageName = 'home';
        }
      }
      
      console.log(`Navigating to: ${pageName}`);
      loadPage(pageName);
    });
  });
}

function loadPage(pageName) {
  console.log('Loading page:', pageName);
  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `/${pageName}` || (pageName === 'home' && link.getAttribute('href') === '/')) {
      link.classList.add('active');
    }
  });
  
  // Hide all pages
  const pages = ['home', 'about', 'strategies'];
  pages.forEach(page => {
    const element = document.getElementById(page);
    if (element) {
      element.style.display = 'none';
      console.log(`Hiding page: ${page}`);
    }
  });
  
  // Show selected page
  const pageElement = document.getElementById(pageName);
  if (pageElement) {
    pageElement.style.display = 'block';
    currentPage = pageName;
    console.log(`Showing page: ${pageName}`);
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Initialize page specific functionality
    if (pageName === 'home') {
      initializeHomePage();
    } else if (pageName === 'about') {
      initializeAboutPage();
    } else if (pageName === 'strategies') {
      initializeStrategiesPage();
    }
  }
  
  // Close mobile menu
  document.getElementById('mobileMenu').classList.remove('active');
}

function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// Ticker data
async function loadTickerData() {
  const tickerData = await fetchBulkTickerData(tickerItems);
  updateTickerTape(tickerData);
  
  const liveMarketData = tickerData.filter(ticker => liveMarketSymbols.includes(ticker.symbol));
  updateLiveMarketData(liveMarketData);
}

async function fetchGlobalQuote(symbol, apiKey) {
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    const response = await fetch(url, { cache: "no-store" });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${symbol}`);
    }
    
    const data = await response.json();
    
    if (data.Note || data.Information || data.ErrorMessage) {
      console.warn(`Alpha Vantage notice for ${symbol}:`, data.Note || data.Information || data.ErrorMessage);
      return null;
    }
    
    const quote = data["Global Quote"];
    if (!quote) return null;
    
    const rawPrice = quote["05. price"];
    const rawChange = quote["09. change"];
    const rawChangePercent = quote["10. change percent"];
    
    if (!rawPrice || !rawChange || !rawChangePercent) return null;
    
    const price = Number(rawPrice);
    const change = Number(rawChange);
    const positive = change >= 0;
    
    if (!Number.isFinite(price) || !Number.isFinite(change)) return null;
    
    return {
      symbol,
      price: price.toFixed(2),
      change: `${positive ? "+" : ""}${change.toFixed(2)}`,
      changePercent: rawChangePercent,
      positive,
    };
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    return null;
  }
}

async function fetchBulkTickerData(symbols) {
  try {
    const apiKey = 'demo'; // Using demo key for public access
    const quotes = await Promise.all(symbols.map((symbol) => fetchGlobalQuote(symbol, apiKey)));
    const validQuotes = quotes.filter((quote) => quote !== null);
    
    if (validQuotes.length > 0) return validQuotes;
    
    console.warn("Alpha Vantage returned no valid quotes, using fallback data");
  } catch (error) {
    console.error("Error fetching ticker data:", error);
  }
  
  // Fallback to mock data
  console.log("Using mock data for symbols:", symbols);
  return symbols.map((symbol) => {
    const mockPrice = (Math.random() * 500 + 100).toFixed(2);
    const mockChange = (Math.random() * 10 - 5).toFixed(2);
    const positive = parseFloat(mockChange) >= 0;
    
    return {
      symbol,
      price: mockPrice,
      change: `${positive ? "+" : ""}${mockChange}`,
      changePercent: `${positive ? "+" : ""}${(Math.random() * 5).toFixed(2)}%`,
      positive,
    };
  });
}

function updateTickerTape(data) {
  const tickerTape = document.getElementById('tickerTape');
  if (!tickerTape) return;
  
  tickerTape.innerHTML = '';
  
  // Duplicate data for infinite scroll effect
  const displayData = [...data, ...data, ...data, ...data];
  
  displayData.forEach((ticker) => {
    const tickerItem = document.createElement('div');
    tickerItem.className = 'flex items-center gap-2 mx-6 whitespace-nowrap';
    tickerItem.innerHTML = `
      <span class="text-sm font-bold text-accent">${ticker.symbol}</span>
      <span class="text-xs ${ticker.positive ? 'text-positive' : 'text-negative'}">${ticker.changePercent}</span>
    `;
    tickerTape.appendChild(tickerItem);
  });
}

function updateLiveMarketData(data) {
  const liveMarketContainer = document.getElementById('liveMarketData');
  if (!liveMarketContainer) return;
  
  liveMarketContainer.innerHTML = '';
  
  if (data.length > 0) {
    data.forEach((item) => {
      const marketItem = document.createElement('div');
      marketItem.className = 'flex items-center justify-between p-4 rounded-xl bg-bg-tertiary';
      marketItem.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent">
              <path d="M16 7h6v6"></path>
              <path d="m22 7-8.5 8.5-5-5L2 17"></path>
            </svg>
          </div>
          <div>
            <div class="font-bold text-text-primary">${item.symbol}</div>
            <div class="text-xs text-muted">US Stock</div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-semibold text-text-primary">$${item.price}</div>
          <div class="text-xs ${item.positive ? 'text-positive' : 'text-negative'}">${item.changePercent}</div>
        </div>
      `;
      liveMarketContainer.appendChild(marketItem);
    });
  } else {
    // Fallback data
    [
      { symbol: "SPY", price: "489.23", change: "+1.24%", positive: true },
      { symbol: "QQQ", price: "412.87", change: "+1.89%", positive: true },
      { symbol: "NVDA", price: "892.45", change: "+2.34%", positive: true },
      { symbol: "AAPL", price: "178.45", change: "-0.89%", positive: false },
    ].forEach((item) => {
      const marketItem = document.createElement('div');
      marketItem.className = 'flex items-center justify-between p-4 rounded-xl bg-bg-tertiary';
      marketItem.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent">
              <path d="M16 7h6v6"></path>
              <path d="m22 7-8.5 8.5-5-5L2 17"></path>
            </svg>
          </div>
          <div>
            <div class="font-bold text-text-primary">${item.symbol}</div>
            <div class="text-xs text-muted">US Stock</div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-semibold text-text-primary">$${item.price}</div>
          <div class="text-xs ${item.positive ? 'text-positive' : 'text-negative'}">${item.change}</div>
        </div>
      `;
      liveMarketContainer.appendChild(marketItem);
    });
  }
}

// Page initializers
function initializeHomePage() {
  // Initialize animations
  const animatedElements = document.querySelectorAll('#home .animate-fade-in-up, #home .animate-fade-in-left, #home .animate-fade-in-right');
  animatedElements.forEach((element, index) => {
    const delay = index * 0.1;
    element.style.opacity = '0';
    element.style.transform = element.classList.contains('animate-fade-in-left') ? 'translateX(-24px)' : 
                              element.classList.contains('animate-fade-in-right') ? 'translateX(24px)' : 'translateY(28px)';
    element.style.animation = `fadeInUp ${0.8 + delay}s ease-out ${delay}s forwards`;
  });
}

function initializeAboutPage() {
  const animatedElements = document.querySelectorAll('#about .animate-fade-in-up');
  animatedElements.forEach((element, index) => {
    const delay = index * 0.15;
    element.style.opacity = '0';
    element.style.transform = 'translateY(28px)';
    element.style.animation = `fadeInUp ${0.8 + delay}s ease-out ${delay}s forwards`;
  });
}

function initializeStrategiesPage() {
  const animatedElements = document.querySelectorAll('#strategies .animate-fade-in-up');
  animatedElements.forEach((element, index) => {
    const delay = index * 0.15;
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px)';
    element.style.animation = `fadeInUp ${0.8 + delay}s ease-out ${delay}s forwards`;
  });
}

// Utility functions
function formatNumber(num) {
  return num.toLocaleString();
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Page is visible again, refresh ticker data
    loadTickerData();
  }
});
