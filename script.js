"use strict";

const APP_PAGES = ["home", "about", "strategies"];
const TICKER_ITEMS = ["SPY", "QQQ", "NVDA", "AAPL"];
const LIVE_MARKET_SYMBOLS = ["SPY", "QQQ", "NVDA", "AAPL"];
const REFRESH_INTERVAL_MS = 70000;
const ALPHA_VANTAGE_API_KEY = "demo";

let currentPage = "home";
let tickerIntervalId = null;

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.setAttribute("data-theme", "titan");
  bindNavigation();
  bindMobileMenu();
  bindVisibilityRefresh();

  const initialPage = pageFromLocation(window.location.hash);
  loadPage(initialPage, { replace: true, scrollTop: false });

  loadTickerData();
  tickerIntervalId = window.setInterval(loadTickerData, REFRESH_INTERVAL_MS);
});

function pageFromLocation(hash) {
  const normalized = (hash || "").replace("#", "").trim().toLowerCase();
  if (APP_PAGES.includes(normalized)) return normalized;
  return "home";
}

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;

    const href = link.getAttribute("href") || "";
    if (href.startsWith("mailto:") || href.startsWith("http://") || href.startsWith("https://")) return;

    const page = link.dataset.page || pageFromLocation(href);
    if (!APP_PAGES.includes(page)) return;

    event.preventDefault();
    loadPage(page, { replace: false, scrollTop: true });
  });

  window.addEventListener("hashchange", () => {
    loadPage(pageFromLocation(window.location.hash), { replace: true, scrollTop: false });
  });
}

function bindMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("active");
    mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.hidden = !isOpen;
  });
}

function closeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!mobileMenuBtn || !mobileMenu) return;
  mobileMenu.classList.remove("active");
  mobileMenu.hidden = true;
  mobileMenuBtn.setAttribute("aria-expanded", "false");
}

function loadPage(pageName, options = { replace: false, scrollTop: true }) {
  if (!APP_PAGES.includes(pageName)) pageName = "home";
  currentPage = pageName;

  APP_PAGES.forEach((page) => {
    const section = document.getElementById(page);
    if (!section) return;
    section.style.display = page === pageName ? "block" : "none";
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPage = link.dataset.page || pageFromLocation(link.getAttribute("href") || "#home");
    link.classList.toggle("active", linkPage === pageName);
  });

  const targetHash = `#${pageName}`;
  if (window.location.hash !== targetHash) {
    if (options.replace) {
      window.history.replaceState({}, "", targetHash);
    } else {
      window.location.hash = targetHash;
    }
  }

  if (options.scrollTop) window.scrollTo({ top: 0, behavior: "auto" });
  closeMobileMenu();
}

async function loadTickerData() {
  const tickerData = await fetchBulkTickerData(TICKER_ITEMS);
  updateTickerTape(tickerData);
  const liveData = tickerData.filter((item) => LIVE_MARKET_SYMBOLS.includes(item.symbol));
  updateLiveMarketData(liveData.length ? liveData : fallbackTickerData());
}

async function fetchGlobalQuote(symbol) {
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return null;

    const data = await response.json();
    if (data.Note || data.Information || data.ErrorMessage) return null;

    const quote = data["Global Quote"];
    if (!quote) return null;

    const price = Number(quote["05. price"]);
    const change = Number(quote["09. change"]);
    const rawChangePercent = quote["10. change percent"];
    if (!Number.isFinite(price) || !Number.isFinite(change) || !rawChangePercent) return null;

    return {
      symbol,
      price: price.toFixed(2),
      changePercent: rawChangePercent,
      positive: change >= 0,
    };
  } catch {
    return null;
  }
}

async function fetchBulkTickerData(symbols) {
  try {
    const quotes = await Promise.all(symbols.map((symbol) => fetchGlobalQuote(symbol)));
    const validQuotes = quotes.filter(Boolean);
    if (validQuotes.length) return validQuotes;
  } catch {
    // fall back to deterministic placeholder set
  }
  return fallbackTickerData();
}

function fallbackTickerData() {
  return [
    { symbol: "SPY", price: "489.23", changePercent: "+1.24%", positive: true },
    { symbol: "QQQ", price: "412.87", changePercent: "+1.89%", positive: true },
    { symbol: "NVDA", price: "892.45", changePercent: "+2.34%", positive: true },
    { symbol: "AAPL", price: "178.45", changePercent: "-0.89%", positive: false },
  ];
}

function updateTickerTape(data) {
  const tickerTape = document.getElementById("tickerTape");
  if (!tickerTape) return;
  tickerTape.replaceChildren();

  const repeated = [...data, ...data, ...data, ...data];
  repeated.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "flex items-center gap-2 mx-6 whitespace-nowrap";

    const symbol = document.createElement("span");
    symbol.className = "text-sm font-bold text-accent";
    symbol.textContent = item.symbol;

    const change = document.createElement("span");
    change.className = `text-xs ${item.positive ? "text-positive" : "text-negative"}`;
    change.textContent = item.changePercent;

    wrapper.append(symbol, change);
    tickerTape.appendChild(wrapper);
  });
}

function createMarketItem(item) {
  const row = document.createElement("div");
  row.className = "flex items-center justify-between p-4 rounded-xl bg-bg-tertiary";

  row.innerHTML = `
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent" aria-hidden="true">
          <path d="M16 7h6v6"></path>
          <path d="m22 7-8.5 8.5-5-5L2 17"></path>
        </svg>
      </div>
      <div>
        <div class="font-bold text-text-primary market-symbol"></div>
        <div class="text-xs text-muted">US Stock</div>
      </div>
    </div>
    <div class="text-right">
      <div class="font-semibold text-text-primary market-price"></div>
      <div class="text-xs market-change"></div>
    </div>
  `;

  row.querySelector(".market-symbol").textContent = item.symbol;
  row.querySelector(".market-price").textContent = `$${item.price}`;
  const change = row.querySelector(".market-change");
  change.textContent = item.changePercent;
  change.classList.add(item.positive ? "text-positive" : "text-negative");
  return row;
}

function updateLiveMarketData(data) {
  const container = document.getElementById("liveMarketData");
  if (!container) return;
  container.replaceChildren();
  data.forEach((item) => container.appendChild(createMarketItem(item)));
}

function bindVisibilityRefresh() {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) loadTickerData();
  });
}
