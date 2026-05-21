import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { toast } from "react-hot-toast";

import {
  Download,
  PhoneCall,
  X,
} from "lucide-react";

import {
  CALLS_DATA,
  STATUS_BADGE,
  SENT_BADGE,
} from "../data/data";
export default function Calls() {
const [search, setSearch] = useState("");
const [statusF, setStatusF] = useState("All");
const [sentimentF,setSentimentF]= useState("All");
const [selected, setSelected] = useState(null);
const [playing, setPlaying] = useState(null);

const filtered = CALLS_DATA.filter(c=>
(statusF==="All"||c.status===statusF) &&
(sentimentF==="All"||c.sentiment===sentimentF) &&
c.name.toLowerCase().includes(search.toLowerCase())
);

return (
<div className="space-y-5">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h1 className="text-2xl font-bold text-white">Call History</h1>
<p className="text-sm text-slate-500 mt-0.5">All calls with transcripts & LLM analysis</p>
</div>
<button onClick={()=>toast.success("CSV exported!")}
className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl border border-white/10 text-slate-300 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all">
<Download size={14}/> Export CSV
</button>
</div>
{/* Filters */}
<div className="flex flex-wrap gap-3 items-center">
<input type="text" placeholder="🔍 Search by name..." value={search} onChange={e=>setSearch(e.target.value)}
className="bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-xl outline-none text-sm text-white placeholder-slate-600 focus:border-[#00d4ff]/40 transition-colors"/>
<select value={statusF} onChange={e=>setStatusF(e.target.value)}
className="bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-xl outline-none text-sm text-slate-300 focus:border-[#00d4ff]/40">
<option value="All">All Status</option>
<option value="Completed">Completed</option>
<option value="Busy">Busy</option>
<option value="No Answer">No Answer</option>
</select>
<select value={sentimentF} onChange={e=>setSentimentF(e.target.value)}
className="bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-xl outline-none text-sm text-slate-300 focus:border-[#00d4ff]/40">
<option value="All">All Sentiments</option>
<option value="Supporter">Supporter</option>
<option value="Neutral">Neutral</option>
<option value="Opposed">Opposed</option>
</select>
<span className="text-xs text-slate-500 ml-auto">{filtered.length} result{filtered.length!==1?"s":""}</span>
</div>

<div className={`grid gap-5 ${selected?"lg:grid-cols-5":"grid-cols-1"}`}>
{/* Table */}
<div className={`${selected?"lg:col-span-2":""} bg-[#0d1520] border border-white/[0.07] rounded-2xl overflow-hidden`}>
<table className="w-full">
<thead>
<tr className="border-b border-white/[0.07] bg-white/[0.02]">
{["Name","Status","Sentiment","Duration","Date","Actions"].map(h=>(
<th key={h} className="px-4 py-3 text-left text-[10px] tracking-widest text-slate-500 uppercase font-semibold">{h}</th>
))}
</tr>
</thead>
<tbody>
{filtered.map((call,i)=>(
<motion.tr key={call.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
onClick={()=>setSelected(call)}
className={`border-b border-white/[0.04] cursor-pointer transition-colors ${selected?.id===call.id?"bg-[#00d4ff]/5":"hover:bg-white/[0.02]"}`}>
<td className="px-4 py-3 text-sm font-medium text-white">{call.name}</td>
<td className="px-4 py-3"><span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${STATUS_BADGE[call.status]||"text-slate-400"}`}>{call.status}</span></td>
<td className="px-4 py-3"><span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${SENT_BADGE[call.sentiment]}`}>{call.sentiment}</span></td>
<td className="px-4 py-3 text-xs text-slate-400 font-mono">{call.duration}</td>
<td className="px-4 py-3 text-xs text-slate-500">{call.date}</td>
<td className="px-4 py-3" onClick={e=>e.stopPropagation()}>
<div className="flex gap-2">
<button onClick={()=>setSelected(call)}
className="text-[10px] px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all">
📄 Log
</button>
{(call.status==="Busy"||call.status==="No Answer") && (
<button onClick={()=>toast.success(`Callback scheduled for ${call.name}`)}
className="text-[10px] px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all">
<PhoneCall size={10} className="inline mr-1"/>Callback
</button>
)}
</div>
</td>
</motion.tr>
))}
{filtered.length===0 && (
<tr><td colSpan={6} className="text-center py-12 text-slate-500 text-sm">No calls found</td></tr>
)}
</tbody>
</table>
</div>

{/* Detail panel */}
<AnimatePresence>
{selected && (
<motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}}
className="lg:col-span-3 bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6 space-y-4">
<div className="flex items-start justify-between">
<div>
<h2 className="text-lg font-bold text-white">{selected.name}</h2>
<p className="text-xs text-slate-500 mt-0.5">{selected.phone} · {selected.date}</p>
</div>
<button onClick={()=>setSelected(null)}
className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white">
<X size={14}/>
</button>
</div>
<div className="flex flex-wrap gap-2">
<span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${STATUS_BADGE[selected.status]||""}`}>{selected.status}</span>
<span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${SENT_BADGE[selected.sentiment]}`}>{selected.sentiment}</span>
{selected.duration!=="-" && <span className="text-[10px] px-2 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-400 font-mono">{selected.duration}</span>}
</div>
{/* LLM analysis */}
{selected.confidence && (
<div className="grid grid-cols-2 gap-3">
{[{l:"Intent",v:selected.intent,c:"#00d4ff"},{l:"Issue",v:selected.issue,c:"#f59e0b"},{l:"Sentiment",v:selected.sentiment,c:"#10b981"},{l:"Confidence",v:selected.confidence,c:"#7c3aed"}].map(a=>(
<div key={a.l} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
<p className="text-[10px] text-slate-500 uppercase tracking-wider">{a.l}</p>
<p className="text-sm font-bold mt-0.5" style={{color:a.c}}>{a.v}</p>
</div>
))}
</div>
)}
{/* Recording */}
{selected.transcript && (
<div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
<button onClick={()=>{setPlaying(playing===selected.id?null:selected.id);toast(playing===selected.id?"Paused":"Playing recording...");}}
className="w-9 h-9 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-all shrink-0">
{playing===selected.id?"⏸":"▶"}
</button>
<div className="flex-1 flex items-end gap-0.5">
{Array.from({length:36},(_,i)=>(
<div key={i} className="rounded-sm flex-1" style={{height:`${Math.random()*18+4}px`,background:playing===selected.id&&i<18?"#00d4ff":"rgba(255,255,255,0.1)"}}/>
))}
</div>
<span className="text-xs text-slate-500 font-mono shrink-0">{selected.duration}</span>
</div>
)}
{/* Transcript */}
<div>
<p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Transcript</p>
<div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 max-h-52 overflow-y-auto">
{selected.transcript
? selected.transcript.split("\n").map((line,i)=>(
<p key={i} className={`text-xs py-0.5 ${line.startsWith("Agent:")?"text-[#00d4ff]/80":"text-slate-300"}`}>{line}</p>
))
: <p className="text-xs text-slate-500">No transcript available.</p>
}
</div>
</div>
<div className="flex gap-3">
<button onClick={()=>toast.success("Transcript copied!")} className="flex-1 py-2 text-xs rounded-xl border border-white/[0.08] text-slate-300 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all">📋 Copy</button>
<button onClick={()=>toast.success("Log exported!")} className="flex-1 py-2 text-xs rounded-xl border border-white/[0.08] text-slate-300 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all">⬇ Export</button>
</div>
</motion.div>
)}
</AnimatePresence>
</div>
</div>
);
}
