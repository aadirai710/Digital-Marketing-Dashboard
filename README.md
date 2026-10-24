# Digital Marketing Analytics Dashboard

An analytics dashboard for tracking marketing performance across
**Meta Ads**, **Google Ads**, **GA4** and **Klaviyo Email Marketing** in one place.

---

## How to Run

1. Open this folder in **VS Code**
2. Install the **Live Server** extension (if not already installed)
3. Right-click **`index.html`** and choose **"Open with Live Server"**
4. The dashboard opens in your browser

> An internet connection is needed for the fonts and the chart library (Chart.js).

---

## Folder Structure

```
marketing-dashboard/
│
├── index.html          Page layout (HTML)
├── favicon.ico         Browser tab icon
│
├── css/
│   └── style.css       All styling, dark and light themes
│
├── js/
│   ├── data.js         All dashboard data (KPIs, campaigns, trends) in ₹
│   └── app.js          Logic: rendering, filters, chart, theme, CSV export
│
└── README.md
```

| What you need to change | File          |
| ----------------------- | ------------- |
| Layout / sections       | `index.html`  |
| Colours, fonts, spacing | `css/style.css` |
| Numbers and campaigns   | `js/data.js`  |
| Behaviour and chart     | `js/app.js`   |

---

## Features

- Platform tabs: Blended, Meta Ads, Google Ads, GA4, Klaviyo
- KPI cards that change for each platform
- Trend chart with 7 / 30 day view
- Channel health panel (click a channel to filter)
- Campaign table with status filter
- Dark / Light mode (remembers your choice)
- Fullscreen mode
- Export campaigns to CSV
- All amounts in Indian Rupees (₹)

---

## Tech Used

- HTML5, CSS3, JavaScript (ES6)
- [Chart.js](https://www.chartjs.org/) for charts
- Google Fonts: Plus Jakarta Sans, JetBrains Mono
