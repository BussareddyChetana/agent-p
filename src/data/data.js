export const SENT_COLORS = [
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

export const INTENT_COLORS = [
  "#00d4ff",
  "#ef4444",
  "#f59e0b",
  "#94a3b8",
];

export const BAR_COLORS = [
  "#00d4ff",
  "#7c3aed",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

export const sentimentData = [
  { name: "Supporters", value: 65 },
  { name: "Neutral", value: 20 },
  { name: "Opposed", value: 15 },
];

export const intentData = [
  { name: "Support", value: 40 },
  { name: "Complaint", value: 35 },
  { name: "Query", value: 20 },
  { name: "Other", value: 5 },
];

export const barData = [
  { name: "Jobs", value: 90 },
  { name: "Roads", value: 70 },
  { name: "Water", value: 60 },
  { name: "Education", value: 80 },
  { name: "Healthcare", value: 50 },
];

export const lineDataWeek = [
  { day:"Mon", calls:300, completed:240 },
  { day:"Tue", calls:500, completed:410 },
  { day:"Wed", calls:700, completed:580 },
  { day:"Thu", calls:600, completed:510 },
  { day:"Fri", calls:900, completed:760 },
  { day:"Sat", calls:750, completed:620 },
];

export const lineDataMonth = [
  { day:"W1", calls:2100, completed:1700 },
  { day:"W2", calls:3400, completed:2900 },
  { day:"W3", calls:2900, completed:2400 },
  { day:"W4", calls:4200, completed:3600 },
];

export const CALLS_DATA = [
  {
    id:1,
    name:"Ravi Kumar",
    phone:"+91 9876543210",
    status:"Completed",
    sentiment:"Supporter",
    intent:"Support",
    issue:"Roads",
    duration:"4m 20s",
    date:"11 May 2026",
    transcript:"Agent call transcript...",
    confidence:0.94,
  },

  {
    id:2,
    name:"Priya Sharma",
    phone:"+91 9123456780",
    status:"Busy",
    sentiment:"Neutral",
    intent:"-",
    issue:"-",
    duration:"0m 12s",
    date:"10 May 2026",
    transcript:"",
    confidence:null,
  },

  {
    id:3,
    name:"Amit Verma",
    phone:"+91 9988776655",
    status:"Completed",
    sentiment:"Opposed",
    intent:"Complaint",
    issue:"Water",
    duration:"3m 11s",
    date:"09 May 2026",
    transcript:"Complaint call transcript...",
    confidence:0.88,
  },
];

export const STATUS_BADGE = {
  Completed:
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",

  Busy:
    "bg-red-500/10 text-red-400 border border-red-500/20",

  "No Answer":
    "bg-amber-500/10 text-amber-400 border border-amber-500/20",
};

export const SENT_BADGE = {
  Supporter:
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",

  Neutral:
    "bg-amber-500/10 text-amber-400 border border-amber-500/20",

  Opposed:
    "bg-red-500/10 text-red-400 border border-red-500/20",

  "-":
    "bg-slate-500/10 text-slate-400 border border-slate-500/20",
};

export const AGENT_MESSAGES = [
  {
    role:"AI",
    text:"Hello sir, may I speak with Ravi Kumar?",
  },

  {
    role:"User",
    text:"Yes, this is Ravi. Who is calling?",
  },

  {
    role:"AI",
    text:"I am an AI calling agent conducting a voter survey.",
  },
];

export const PIPELINE_STAGES = [
  "Audio In",
  "STT",
  "Groq LLM",
  "TTS",
  "Audio Out",
];

export const ENTITIES = [
  "Roads",
  "Water Supply",
  "Elections",
  "Jobs",
  "Healthcare",
];

export const PAST_CAMPAIGNS = [
  {
    name:"Voter Registration Drive",
    contacts:3200,
    completed:3200,
    date:"Apr 2026",
  },

  {
    name:"Ward 5 Outreach",
    contacts:800,
    completed:760,
    date:"Mar 2026",
  },
];