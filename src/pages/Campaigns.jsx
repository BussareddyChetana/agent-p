
import { useState } from "react";

import { motion } from "framer-motion";

import { toast } from "react-hot-toast";

import {
  Upload,
  Download,
  Play,
  Pause,
  Square,
  RotateCcw,
} from "lucide-react";

import { InputField } from "../components/StatCard";

import {
  PAST_CAMPAIGNS,
} from "../data/data";
export default function Campaigns() {
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [script, setScript] = useState("");
const [fileName, setFileName] = useState("");
const [csvContacts, setCsvContacts] = useState([]); // validated contacts
const [csvRaw, setCsvRaw] = useState([]); // raw rows for preview
const [csvError, setCsvError] = useState("");
const [running, setRunning] = useState(true);

const handleStart = () => {
if (!name.trim()) { toast.error("Campaign name is required"); return; }
if (!description.trim()) { toast.error("Description is required"); return; }
if (!script.trim()) { toast.error("Agent script is required"); return; }
if (!csvContacts.length) { toast.error("Please upload a valid CSV file"); return; }
setRunning(true);
toast.success(`Campaign started with ${csvContacts.length} contacts!`);
};
const handleStop = () => { setRunning(false); toast.error("Campaign stopped."); };
const handlePause = () => { setRunning(false); toast("Campaign paused.", {icon:"⏸"}); };
const handleResume = () => { setRunning(true); toast.success("Campaign resumed!"); };

const handleFile = (e) => {
const file = e.target.files[0];
if (!file) return;
if (!file.name.toLowerCase().endsWith(".csv")) {
toast.error("Only .csv files are accepted.");
return;
}
setFileName(file.name);
setCsvError("");
setCsvContacts([]);
setCsvRaw([]);

const reader = new FileReader();
reader.onload = (ev) => {
const text = ev.target.result;
// Parse: split lines, split commas, trim whitespace
const rows = text.split("\n")
.map(line => line.replace(/\r/g,"").split(","))
.filter(row => row.some(c=>c.trim()!==""));

const result = validateCSV(rows);
setCsvRaw(rows.slice(0,7)); // store up to 7 rows for preview

if (!result.ok) {
setCsvError(result.error);
toast.error("CSV has errors — check the preview below.");
} else {
setCsvContacts(result.contacts);
toast.success(`CSV loaded — ${result.contacts.length} valid contacts found!`);
}
};
reader.readAsText(file);
};

return (
<div className="space-y-6">
<div className="flex items-center justify-between">
<div>
<h1 className="text-2xl font-bold text-white">Campaigns</h1>
<p className="text-sm text-slate-500 mt-0.5">Create & manage outreach campaigns</p>
</div>
</div>

<div className="grid lg:grid-cols-2 gap-6">
{/* ── CREATE FORM ── */}
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6 space-y-4">
<h2 className="text-lg font-semibold text-white">Create Campaign</h2>

<InputField label="Campaign Name *" value={name} onChange={setName} placeholder="e.g. Voter Awareness Drive 2026"/>

<div>
<label className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold block mb-1.5">Description *</label>
<textarea rows={2} value={description} onChange={e=>setDescription(e.target.value)}
placeholder="What is the purpose of this campaign?"
className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 rounded-xl outline-none text-sm text-white placeholder-slate-600 focus:border-[#00d4ff]/40 transition-colors resize-none"/>
</div>

{/* Agent Script */}
<div>
<label className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold block mb-1.5">Agent Script *</label>
<textarea rows={5} value={script} onChange={e=>setScript(e.target.value)}
placeholder={"Hello, may I speak with [Contact Name]?\n\nI am calling regarding the upcoming elections. Do you have any concerns about roads, water supply, or employment?\n\nYour feedback will be forwarded to the authorities."}
className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 rounded-xl outline-none text-sm text-white placeholder-slate-600 focus:border-[#00d4ff]/40 transition-colors resize-none font-mono"/>
<p className="text-[10px] text-slate-600 mt-1">Tip: Use <code className="text-[#00d4ff]">[Contact Name]</code> — the agent substitutes the actual name automatically.</p>
</div>

{/* CSV Upload */}
<div>
<label className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold block mb-1.5">
Contact List (CSV) *
</label>
{/* Format hint */}
<div className="mb-2 px-3 py-2 rounded-lg bg-[#00d4ff]/5 border border-[#00d4ff]/10 text-[10px] text-slate-400">
<span className="text-[#00d4ff] font-semibold">Required CSV columns:</span>{" "}
<code>name, phone</code> — optional: <code>area</code>
<br/>Example row: <code>Ravi Kumar, +91 9876543210, Hyderabad</code>
</div>
<label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all
${csvError ? "border-red-500/40 bg-red-500/5" : csvContacts.length ? "border-emerald-500/40 bg-emerald-500/5" : "border-white/[0.1] hover:border-[#00d4ff]/30 hover:bg-white/[0.02]"}`}>
<Upload size={28} className={`mb-3 ${csvError?"text-red-400":csvContacts.length?"text-emerald-400":"text-[#00d4ff]"}`}/>
<p className="text-sm font-semibold text-white">
{fileName ? fileName : "Click to upload CSV"}
</p>
<p className={`text-xs mt-1 ${csvError?"text-red-400":csvContacts.length?"text-emerald-400":"text-slate-500"}`}>
{csvContacts.length ? `✓ ${csvContacts.length} valid contacts loaded` : fileName ? "Processing…" : "Accepts .csv files only"}
</p>
<input type="file" accept=".csv" onChange={handleFile} className="hidden"/>
</label>
{/* Validation errors */}
{csvError && (
<div className="mt-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 whitespace-pre-line">
⚠️ {csvError}
</div>
)}
</div>

{/* Action Buttons */}
<div className="flex gap-3 pt-2">
<button onClick={handleStart}
className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-violet-500 text-black font-bold text-sm hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00d4ff]/20 transition-all">
<Play size={14}/> Start Campaign
</button>
<button onClick={handleStop}
className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-sm hover:bg-red-500/20 transition-all">
<Square size={13}/> Stop
</button>
</div>
</div>

{/* ── RIGHT PANEL ── */}
<div className="space-y-5">
{/* Active Campaign */}
<div className="bg-[#0d1520] border border-[#00d4ff]/20 rounded-2xl p-5">
<div className="flex items-start justify-between mb-3">
<div>
<div className="flex items-center gap-2 mb-1">
<span className={`w-1.5 h-1.5 rounded-full ${running?"bg-emerald-400 animate-pulse":"bg-amber-400"}`}/>
<h2 className="text-base font-semibold text-white">Active Campaign</h2>
<span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${running?"bg-emerald-500/10 text-emerald-400 border border-emerald-500/20":"bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
{running?"RUNNING":"PAUSED"}
</span>
</div>
<p className="text-sm text-slate-300">Election Awareness Drive</p>
<p className="text-xs text-slate-500 mt-0.5">Started: May 10, 2026</p>
</div>
{running
? <button onClick={handlePause} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition-all"><Pause size={12}/> Pause</button>
: <button onClick={handleResume} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all"><RotateCcw size={12}/> Resume</button>
}
</div>
<div className="h-2 rounded-full bg-white/[0.06] mb-1.5">
<div className="h-2 rounded-full bg-gradient-to-r from-[#00d4ff] to-violet-500" style={{width:"78%"}}/>
</div>
<div className="flex justify-between text-xs text-slate-500"><span>9,840 / 12,540 contacts</span><span>78%</span></div>
<div className="grid grid-cols-3 gap-3 mt-3">
{[{l:"Completed",v:"7,200",c:"#10b981"},{l:"No Answer",v:"1,840",c:"#f59e0b"},{l:"Remaining",v:"2,700",c:"#00d4ff"}].map(s=>(
<div key={s.l} className="text-center p-2 rounded-xl bg-white/[0.03]">
<p className="text-base font-bold" style={{color:s.c}}>{s.v}</p>
<p className="text-[10px] text-slate-500 mt-0.5">{s.l}</p>
</div>
))}
</div>
</div>

{/* Campaign Status */}
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-5">
<h2 className="text-base font-semibold text-white mb-4">All Campaign Status</h2>
<div className="grid grid-cols-3 gap-3">
{[{l:"Running",v:12,c:"#10b981",bg:"bg-emerald-500/10"},{l:"Paused",v:4,c:"#f59e0b",bg:"bg-amber-500/10"},{l:"Done",v:6,c:"#00d4ff",bg:"bg-cyan-500/10"}].map(s=>(
<div key={s.l} className={`${s.bg} p-4 rounded-xl text-center`}>
<p className="text-2xl font-bold" style={{color:s.c}}>{s.v}</p>
<p className="text-xs text-slate-400 mt-0.5">{s.l}</p>
</div>
))}
</div>
</div>

{/* Past campaigns */}
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-5">
<h2 className="text-base font-semibold text-white mb-4">Past Campaigns</h2>
<div className="space-y-3">
{PAST_CAMPAIGNS.map((c,i)=>(
<div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
<div className="flex justify-between items-start mb-2">
<p className="text-sm font-medium text-white">{c.name}</p>
<span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Completed</span>
</div>
<div className="h-1.5 rounded-full bg-white/[0.06]">
<div className="h-1.5 rounded-full bg-emerald-500/60" style={{width:`${(c.completed/c.contacts*100).toFixed(0)}%`}}/>
</div>
<div className="flex justify-between text-[10px] text-slate-500 mt-1">
<span>{c.completed.toLocaleString()} / {c.contacts.toLocaleString()} contacts</span>
<span>{c.date}</span>
</div>
</div>
))}
</div>
</div>

{/* CSV Preview — shown after upload */}
{csvRaw.length > 0 && (
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-5 overflow-auto">
<h2 className="text-base font-semibold text-white mb-3">CSV Preview</h2>
<table className="w-full text-xs">
<tbody>
{csvRaw.map((row,ri)=>(
<tr key={ri} className={`border-b border-white/[0.05] ${ri===0?"text-[#00d4ff] font-semibold":"text-slate-300"}`}>
{row.map((cell,ci)=><td key={ci} className="py-2 px-2">{cell.trim()}</td>)}
</tr>
))}
</tbody>
</table>
{csvContacts.length>0 && (
<p className="text-[10px] text-emerald-400 mt-2">✓ {csvContacts.length} contacts validated successfully</p>
)}
</div>
)}
</div>
</div>
</div>
);
}