/* =========================================================
   Dashboard Logic
   - Renders tabs, KPI cards, chart, channels and table
   - Handles filters, dark/light theme, fullscreen, CSV export
   Data comes from js/data.js
   ========================================================= */

const state = {
  platform: "all",   // selected platform tab
  status: "All",     // campaign status filter
  range: "30"        // date range: "7", "30" or "ytd"
};

let trendChart = null;

const $ = (selector) => document.querySelector(selector);


/* ---------- Helpers ---------- */

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function hexToRgba(hex, alpha) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

// 150000 -> 1.5L, 45000 -> 45k
function shortNumber(value) {
  if (value >= 100000) return parseFloat((value / 100000).toFixed(2)) + "L";
  if (value >= 1000) return Math.round(value / 1000) + "k";
  return value;
}

function getFilteredCampaigns() {
  return CAMPAIGNS.filter((c) => {
    const platformOk = state.platform === "all" || c.platform === state.platform;
    const statusOk = state.status === "All" || c.status === state.status;
    return platformOk && statusOk;
  });
}


/* ---------- Platform tabs ---------- */

function renderTabs() {
  $("#platformTabs").innerHTML = PLATFORMS.map((p) => `
    <button class="tab ${p.id === state.platform ? "active" : ""}" data-platform="${p.id}">
      ${p.label}
    </button>
  `).join("");
}


/* ---------- KPI cards ---------- */

function renderKpis() {
  $("#kpiGrid").innerHTML = KPI_DATA[state.platform].map((kpi) => `
    <article class="card kpi">
      <div class="kpi-title">${kpi.title}</div>
      <div class="kpi-row">
        <span class="kpi-value">${kpi.value}</span>
        <span class="badge ${kpi.good ? "badge-good" : "badge-neutral"}">${kpi.change}</span>
      </div>
      <div class="kpi-foot">
        <span>${kpi.note}</span>
        <span class="mono faint">vs Sept</span>
      </div>
    </article>
  `).join("");
}


/* ---------- Trend chart ---------- */

function renderChart() {
  const config = CHART_CONFIG[state.platform];
  $("#chartTitle").textContent = config.title;
  $("#chartSubtitle").textContent = config.subtitle;

  // Chart.js loads from a CDN, so it needs an internet connection
  if (typeof Chart === "undefined") {
    $(".chart-wrap").innerHTML = '<div class="chart-error">Chart could not load. Please check your internet connection.</div>';
    return;
  }

  const start = state.range === "7" ? TREND.labels.length - 7 : 0;
  const textColor = getCssVar("--text-faint");
  const gridColor = getCssVar("--border");

  const makeDataset = (series, axis) => ({
    label: series.label,
    data: TREND[series.key].slice(start),
    borderColor: series.color,
    backgroundColor: hexToRgba(series.color, 0.12),
    fill: true,
    tension: 0.35,
    borderWidth: 2,
    pointRadius: 3,
    pointHoverRadius: 5,
    yAxisID: axis
  });

  if (trendChart) trendChart.destroy();

  trendChart = new Chart($("#trendChart"), {
    type: "line",
    data: {
      labels: TREND.labels.slice(start),
      // Both series share one axis when they use the same unit (e.g. both in ₹)
      datasets: [makeDataset(config.left, "y"), makeDataset(config.right, config.sameAxis ? "y" : "y1")]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: textColor, usePointStyle: true, boxWidth: 8, padding: 18 }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString("en-IN")}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColor }
        },
        y: {
          position: "left",
          grid: { color: gridColor },
          ticks: { color: textColor, callback: shortNumber }
        },
        y1: {
          display: !config.sameAxis,
          position: "right",
          grid: { drawOnChartArea: false },
          ticks: { color: textColor, callback: shortNumber }
        }
      }
    }
  });
}


/* ---------- Channel health ---------- */

function renderChannels() {
  $("#channelList").innerHTML = CHANNELS.map((ch) => `
    <div class="channel ${ch.platform === state.platform ? "active" : ""}" data-platform="${ch.platform}">
      <div class="channel-top">
        <span class="channel-name">${ch.name}</span>
        <span class="badge ${ch.status === "Scaling" ? "badge-good" : "badge-neutral"}">${ch.status}</span>
      </div>
      <div class="channel-metrics">
        ${ch.metrics.map(([label, value], i) => `
          <div>
            <div class="label">${label}</div>
            <div class="value ${i === 1 ? "good" : ""}">${value}</div>
          </div>
        `).join("")}
      </div>
      <div class="channel-note">${ch.note}</div>
    </div>
  `).join("");
}


/* ---------- Campaign table ---------- */

function renderCampaigns() {
  const rows = getFilteredCampaigns();
  $("#campaignCount").textContent = rows.length;

  if (rows.length === 0) {
    $("#campaignBody").innerHTML = '<tr><td colspan="7" class="empty-row">No campaigns match this filter.</td></tr>';
    return;
  }

  $("#campaignBody").innerHTML = rows.map((c) => `
    <tr>
      <td>
        <span class="pill pill-${c.platform}">${c.platformLabel}</span>
        <span class="campaign-id mono">${c.id}</span>
        <div class="campaign-name">${c.name}</div>
      </td>
      <td class="muted">${c.type}</td>
      <td class="mono">
        <strong>${c.budget}</strong>
        <span class="faint"> / ${c.spent}</span>
      </td>
      <td class="mono"><span class="cost-chip">${c.cost}</span></td>
      <td class="mono">${c.ctr.toFixed(2)}%</td>
      <td class="mono efficiency">${c.efficiency}</td>
      <td class="right">
        <span class="status status-${c.status.toLowerCase()}">${c.status}</span>
      </td>
    </tr>
  `).join("");
}


/* ---------- Render everything ---------- */

function renderAll() {
  renderTabs();
  renderKpis();
  renderChart();
  renderChannels();
  renderCampaigns();
}

function selectPlatform(platform) {
  state.platform = platform;
  renderAll();
}


/* ---------- Theme (dark / light) ---------- */

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  $("#themeLabel").textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  localStorage.setItem("dashboard-theme", theme);
  renderChart(); // chart colours depend on the theme
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
}


/* ---------- Fullscreen ---------- */

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener("fullscreenchange", () => {
  $("#fullscreenToggle").classList.toggle("is-fullscreen", !!document.fullscreenElement);
});


/* ---------- CSV export ---------- */

function exportCsv() {
  const header = ["ID", "Platform", "Campaign", "Format", "Budget", "Spent", "Cost Metric", "CTR (%)", "ROAS / Efficiency", "Status"];
  const rows = getFilteredCampaigns().map((c) => [
    c.id, c.platformLabel, c.name, c.type, c.budget, c.spent, c.cost, c.ctr, c.efficiency, c.status
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  // BOM so Excel shows the rupee symbol correctly
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `marketing-campaigns-${state.platform}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}


/* ---------- Refresh ---------- */

function refreshData() {
  const btn = $("#refreshBtn");
  btn.classList.add("spin");
  renderAll();
  setTimeout(() => btn.classList.remove("spin"), 600);
}


/* ---------- Segmented button groups ---------- */

function setActiveButton(group, button) {
  group.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
  button.classList.add("active");
}


/* ---------- Event listeners ---------- */

$("#platformTabs").addEventListener("click", (e) => {
  const tab = e.target.closest("[data-platform]");
  if (tab) selectPlatform(tab.dataset.platform);
});

$("#channelList").addEventListener("click", (e) => {
  const channel = e.target.closest("[data-platform]");
  if (channel) selectPlatform(channel.dataset.platform);
});

$("#resetChannels").addEventListener("click", () => selectPlatform("all"));

$("#dateRange").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-range]");
  if (!btn) return;
  state.range = btn.dataset.range;
  setActiveButton($("#dateRange"), btn);
  renderChart();
});

$("#statusFilter").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-status]");
  if (!btn) return;
  state.status = btn.dataset.status;
  setActiveButton($("#statusFilter"), btn);
  renderCampaigns();
});

$("#themeToggle").addEventListener("click", toggleTheme);
$("#fullscreenToggle").addEventListener("click", toggleFullscreen);
$("#exportBtn").addEventListener("click", exportCsv);
$("#refreshBtn").addEventListener("click", refreshData);


/* ---------- Start ---------- */

const savedTheme = localStorage.getItem("dashboard-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
$("#themeLabel").textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";
renderAll();
