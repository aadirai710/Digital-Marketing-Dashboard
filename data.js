/* =========================================================
   Dashboard Data
   All amounts are in Indian Rupees (INR).
   To plug in real data, replace the values below with
   numbers from Meta Ads, Google Ads, GA4 and Klaviyo exports.
   ========================================================= */


/* ---------- Platform tabs ---------- */

const PLATFORMS = [
  { id: "all",    label: "Blended (All Channels)" },
  { id: "meta",   label: "Meta Ads (IG & FB)" },
  { id: "google", label: "Google Ads (P-Max)" },
  { id: "ga4",    label: "GA4 Web Analytics" },
  { id: "email",  label: "Klaviyo Email Marketing" }
];


/* ---------- KPI cards (4 per platform) ----------
   good: true  -> change shown in green
   good: false -> change shown in grey               */

const KPI_DATA = {
  all: [
    { title: "Total Marketing Spend", value: "₹37,22,550", change: "-4.2%",  good: true, note: "Across Meta, Google & Klaviyo" },
    { title: "Blended ROAS (MER)",    value: "4.12x",      change: "+0.45x", good: true, note: "₹1,53,38,400 attributed revenue" },
    { title: "Blended CAC",           value: "₹2,357",     change: "-12.5%", good: true, note: "1,580 paid customers acquired" },
    { title: "GA4 Inbound Sessions",  value: "1.28M",      change: "+14.8%", good: true, note: "4.82% blended site conversion" }
  ],
  meta: [
    { title: "Meta Ad Spend",              value: "₹17,76,200",    change: "+8.2%",  good: false, note: "Instagram & Facebook Reels" },
    { title: "Meta Blended ROAS",          value: "3.85x",         change: "+0.32x", good: true,  note: "₹68,39,200 purchase value" },
    { title: "Cost Per Acquisition (CPA)", value: "₹2,590",        change: "-6.4%",  good: true,  note: "686 purchases via Advantage+" },
    { title: "Meta CPM / CTR",             value: "₹1,179 / 3.4%", change: "+0.4%",  good: true,  note: "1.5M total ad impressions" }
  ],
  google: [
    { title: "Google Ads Spend",  value: "₹15,14,750", change: "-2.1%",  good: true, note: "P-Max, Search & YouTube" },
    { title: "Google Ads ROAS",   value: "4.45x",      change: "+0.60x", good: true, note: "₹67,39,600 high-intent revenue" },
    { title: "Average CPC",       value: "₹122.84",    change: "-8.5%",  good: true, note: "Quality score 8.6/10 avg" },
    { title: "Search Conv. Rate", value: "5.82%",      change: "+0.80%", good: true, note: "715 high-intent buyers" }
  ],
  ga4: [
    { title: "GA4 Total Sessions",      value: "12,84,920", change: "+14.8%", good: true, note: "8,42,000 unique visitors" },
    { title: "Site Conversion Rate",    value: "4.82%",     change: "+0.64%", good: true, note: "Goal: checkout completed" },
    { title: "Avg Engagement Time",     value: "2m 48s",    change: "+18s",   good: true, note: "Key landing pages above 3m" },
    { title: "Engaged Sessions / User", value: "1.64",      change: "+9.2%",  good: true, note: "Strong returning traffic" }
  ],
  email: [
    { title: "Email Attributed Revenue", value: "₹17,59,600", change: "+24.5%", good: true, note: "Klaviyo flows & campaigns" },
    { title: "Average Open Rate",        value: "41.8%",      change: "+3.2%",  good: true, note: "Industry benchmark ~28%" },
    { title: "Click-Through Rate",       value: "4.85%",      change: "+0.45%", good: true, note: "Abandoned cart flow at 9.2%" },
    { title: "Active Subscribers",       value: "74,500",     change: "+4,200", good: true, note: "Unsubscribe rate 0.18%" }
  ]
};


/* ---------- Daily trend data (used by the chart) ---------- */

const TREND = {
  labels: ["Oct 01", "Oct 02", "Oct 03", "Oct 04", "Oct 05", "Oct 06", "Oct 07", "Oct 08", "Oct 09", "Oct 10"],

  blendedRevenue: [431600, 464800, 506300, 535350, 564400, 601750, 630800, 659850, 697200, 738700],
  totalAdSpend:   [112050, 117860, 123670, 125330, 131140, 136950, 141100, 145250, 151060, 157700],

  metaSpend:      [62250, 64740, 67230, 68060, 71380, 74700, 77190, 79680, 82170, 86320],
  metaROAS:       [3.6, 3.7, 3.9, 4.0, 4.1, 4.2, 4.3, 4.3, 4.4, 4.5],

  googleSpend:    [49800, 53120, 56440, 57270, 59760, 62250, 63910, 65570, 68890, 71380],
  googleROAS:     [4.1, 4.2, 4.3, 4.5, 4.6, 4.6, 4.7, 4.8, 4.9, 4.9],

  ga4Sessions:    [38200, 40100, 42800, 44200, 46100, 48900, 51200, 53400, 56100, 58800],
  ga4ConvRate:    [4.6, 4.7, 4.8, 4.9, 4.95, 5.1, 5.15, 5.2, 5.28, 5.35],

  emailSent:      [4200, 1500, 1800, 6500, 2100, 18500, 2400, 2200, 25000, 3100],
  emailRevenue:   [70550, 34860, 40670, 103750, 45650, 232400, 50630, 48140, 282200, 64740]
};


/* ---------- Chart setup per platform ---------- */

const CHART_CONFIG = {
  all: {
    title: "Blended Revenue vs Total Ad Spend",
    subtitle: "Cross-platform marketing efficiency",
    sameAxis: true,
    left:  { key: "totalAdSpend",   label: "Total Ad Spend (₹)", color: "#2563eb" },
    right: { key: "blendedRevenue", label: "Gross Revenue (₹)",  color: "#10b981" }
  },
  meta: {
    title: "Meta Ads Spend vs ROAS",
    subtitle: "Daily spend on Instagram & Facebook against return on ad spend",
    left:  { key: "metaSpend", label: "Meta Spend (₹)", color: "#2563eb" },
    right: { key: "metaROAS",  label: "ROAS (x)",       color: "#10b981" }
  },
  google: {
    title: "Google Ads Spend vs ROAS",
    subtitle: "Search and Performance Max spend against return",
    left:  { key: "googleSpend", label: "Search Spend (₹)", color: "#2563eb" },
    right: { key: "googleROAS",  label: "ROAS (x)",         color: "#10b981" }
  },
  ga4: {
    title: "GA4 Sessions vs Site Conversion Rate",
    subtitle: "Daily sessions and checkout completion rate",
    left:  { key: "ga4Sessions", label: "Sessions",            color: "#0284c7" },
    right: { key: "ga4ConvRate", label: "Conversion Rate (%)", color: "#10b981" }
  },
  email: {
    title: "Klaviyo Emails Sent vs Revenue",
    subtitle: "Automated flows and campaign sends against attributed revenue",
    left:  { key: "emailSent",    label: "Emails Sent",   color: "#9333ea" },
    right: { key: "emailRevenue", label: "Revenue (₹)",   color: "#10b981" }
  }
};


/* ---------- Channel health panel ---------- */

const CHANNELS = [
  {
    platform: "meta", name: "Meta Ads (IG & FB)", status: "Scaling",
    metrics: [["Spend", "₹17.7L"], ["ROAS", "3.85x"], ["CPA", "₹2,590"]],
    note: "Advantage+ shopping scaling profitably"
  },
  {
    platform: "google", name: "Google Ads", status: "Optimal",
    metrics: [["Spend", "₹15.1L"], ["ROAS", "4.45x"], ["Avg CPC", "₹122.84"]],
    note: "P-Max delivering 715 buyers at 5.8% CR"
  },
  {
    platform: "ga4", name: "GA4 Web Analytics", status: "Optimal",
    metrics: [["Sessions", "1.28M"], ["Site CR", "4.82%"], ["Avg Time", "2m 48s"]],
    note: "Organic and direct traffic up 14.8%"
  },
  {
    platform: "email", name: "Klaviyo Email Flows", status: "Scaling",
    metrics: [["Revenue", "₹17.5L"], ["Open Rate", "41.8%"], ["CTR", "4.85%"]],
    note: "Abandoned cart recovering ₹11.7L monthly"
  }
];


/* ---------- Campaigns table ---------- */

const CAMPAIGNS = [
  { id: "META-01", platform: "meta",   platformLabel: "Meta Ads",        name: "Advantage+ Shopping: Dynamic Product Ads", type: "Advantage+ Catalog",    budget: "₹9,96,000", spent: "₹7,84,350", cost: "CPM ₹1,095",  ctr: 3.82, efficiency: "4.10x ROAS", status: "Active" },
  { id: "GOOG-01", platform: "google", platformLabel: "Google Ads",      name: "Performance Max: High-Margin E-Commerce",  type: "Performance Max",       budget: "₹8,30,000", spent: "₹7,38,700", cost: "CPC ₹112",    ctr: 4.90, efficiency: "4.85x ROAS", status: "Active" },
  { id: "META-02", platform: "meta",   platformLabel: "Meta Ads",        name: "Top-of-Funnel UGC Reels Awareness",        type: "Video Views & Traffic", budget: "₹5,39,500", spent: "₹4,23,300", cost: "CPM ₹863",    ctr: 2.75, efficiency: "2.40x ROAS", status: "Optimizing" },
  { id: "GOOG-02", platform: "google", platformLabel: "Google Ads",      name: "Brand Search Exact Match Defense",         type: "Search (Exact)",        budget: "₹3,32,000", spent: "₹3,02,950", cost: "CPC ₹70.50",  ctr: 8.40, efficiency: "7.20x ROAS", status: "Active" },
  { id: "KLAV-01", platform: "email",  platformLabel: "Email (Klaviyo)", name: "Automated 3-Step Abandoned Cart Flow",     type: "Triggered Flow",        budget: "₹41,500",   spent: "₹41,500",   cost: "12.4k Sent",  ctr: 8.60, efficiency: "52.4% Open", status: "Active" },
  { id: "KLAV-02", platform: "email",  platformLabel: "Email (Klaviyo)", name: "VIP Early-Bird Product Drop Blast",        type: "Broadcast Campaign",    budget: "₹33,200",   spent: "₹33,200",   cost: "62.1k Sent",  ctr: 4.10, efficiency: "38.2% Open", status: "Completed" },
  { id: "META-03", platform: "meta",   platformLabel: "Meta Ads",        name: "Retargeting 30D Website Visitors",         type: "Custom Audience",       budget: "₹2,40,700", spent: "₹53,950",   cost: "CPM ₹1,394",  ctr: 3.10, efficiency: "3.20x ROAS", status: "Paused" }
];
