import { useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

import StatCard, {
  TooltipStyle,
  CustomBar,
} from "../components/StatCard";

import {
  sentimentData,
  SENT_COLORS,
  intentData,
  INTENT_COLORS,
  lineDataWeek,
  lineDataMonth,
  barData,
  ENTITIES,
} from "../data/data";
export default function Analytics() {
const [range,setRange]=useState("week");
const data=range==="week"?lineDataWeek:lineDataMonth;
return (
<div className="space-y-6">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h1 className="text-2xl font-bold text-white">Analytics</h1>
<p className="text-sm text-slate-500 mt-0.5">Sentiment, intent & issue analysis</p>
</div>
<div className="flex gap-3">
<div className="flex bg-white/[0.04] border border-white/[0.08] rounded-xl p-1">
{["week","month"].map(r=>(
<button key={r} onClick={()=>setRange(r)}
className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize
${range===r?"bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20":"text-slate-500 hover:text-white"}`}>
This {r.charAt(0).toUpperCase()+r.slice(1)}
</button>
))}
</div>
<button onClick={()=>toast.success("Report exported!")}
className="px-4 py-2 text-sm rounded-xl border border-white/[0.08] text-slate-300 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all">
⬇ Export
</button>
</div>
</div>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
<StatCard title="Supporters" value="65%" sub="↑ 3% vs last week" accent="#10b981" icon="👍"/>
<StatCard title="Neutral" value="20%" sub="Unchanged" accent="#f59e0b" icon="😐"/>
<StatCard title="Opposed" value="15%" sub="↓ 2% vs last week" accent="#ef4444" icon="👎"/>
<StatCard title="Avg Confidence" value="0.91" sub="LLM analysis score" accent="#00d4ff" icon="🎯"/>
</div>
<div className="grid lg:grid-cols-2 gap-6">
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6">
<h2 className="text-base font-semibold text-white mb-4">Call Trends</h2>
<ResponsiveContainer width="100%" height={220}>
<LineChart data={data}>
<XAxis dataKey="day" stroke="#475569" tick={{fontSize:11}}/>
<YAxis stroke="#475569" tick={{fontSize:11}}/>
<Tooltip {...TooltipStyle}/>
<Legend wrapperStyle={{fontSize:"11px"}}/>
<Line type="monotone" dataKey="calls" stroke="#00d4ff" strokeWidth={2.5} dot={false} name="Total"/>
<Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2.5} dot={false} name="Completed"/>
</LineChart>
</ResponsiveContainer>
</div>
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6">
<h2 className="text-base font-semibold text-white mb-4">Campaign Performance</h2>
<ResponsiveContainer width="100%" height={220}>
<AreaChart data={data}>
<XAxis dataKey="day" stroke="#475569" tick={{fontSize:11}}/>
<YAxis stroke="#475569" tick={{fontSize:11}}/>
<Tooltip {...TooltipStyle}/>
<defs>
<linearGradient id="perfG" x1="0" y1="0" x2="0" y2="1">
<stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4}/>
<stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
</linearGradient>
</defs>
<Area type="monotone" dataKey="calls" stroke="#7c3aed" fill="url(#perfG)" strokeWidth={2.5}/>
</AreaChart>
</ResponsiveContainer>
</div>
</div>
{/* Pie charts */}
<div className="grid lg:grid-cols-2 gap-6">
{[{title:"Sentiment Breakdown",data:sentimentData,colors:SENT_COLORS},{title:"Intent Distribution",data:intentData,colors:INTENT_COLORS}].map(chart=>(
<div key={chart.title} className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6">
<h2 className="text-base font-semibold text-white mb-4">{chart.title}</h2>
<div className="flex items-center gap-4">
<ResponsiveContainer width="100%" height={180}>
<PieChart>
<Pie data={chart.data} dataKey="value" outerRadius={75} innerRadius={40} paddingAngle={3} label={false}>
{chart.data.map((_,i)=><Cell key={i} fill={chart.colors[i]}/>)}
</Pie>
<Tooltip {...TooltipStyle} formatter={(v,n)=>[`${v}%`,n]}/>
</PieChart>
</ResponsiveContainer>
<div className="space-y-2.5 shrink-0">
{chart.data.map((d,i)=>(
<div key={d.name} className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full" style={{background:chart.colors[i]}}/>
<div>
<p className="text-xs text-slate-300">{d.name}</p>
<p className="text-xs font-bold" style={{color:chart.colors[i]}}>{d.value}%</p>
</div>
</div>
))}
</div>
</div>
</div>
))}
</div>
{/* Issues + Entity cloud */}
<div className="grid lg:grid-cols-3 gap-6">
<div className="lg:col-span-2 bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6">
<h2 className="text-base font-semibold text-white mb-4">Top Issues Raised</h2>
<ResponsiveContainer width="100%" height={200}>
<BarChart data={barData} barSize={36}>
<XAxis dataKey="name" stroke="#475569" tick={{fontSize:11}}/>
<YAxis stroke="#475569" tick={{fontSize:11}}/>
<Tooltip {...TooltipStyle} cursor={{fill:"rgba(255,255,255,0.03)"}}/>
<Bar dataKey="value" fill="#00d4ff" shape={<CustomBar/>} label={{position:"top",fill:"#94a3b8",fontSize:10}}/>
</BarChart>
</ResponsiveContainer>
</div>
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6">
<h2 className="text-base font-semibold text-white mb-4">Entity Word Cloud</h2>
<div className="flex flex-wrap gap-2 items-center">
{ENTITIES.map((e,i)=>{
const sizes=["text-2xl","text-xl","text-lg","text-base","text-sm","text-xs"];
const colors=["#00d4ff","#10b981","#f59e0b","#7c3aed","#ef4444","#94a3b8"];
return <motion.span key={e} whileHover={{scale:1.1}} className={`${sizes[i%sizes.length]} font-bold cursor-default`} style={{color:colors[i%colors.length]}}>{e}</motion.span>;
})}
</div>
<div className="mt-4 pt-4 border-t border-white/[0.06] space-y-2">
<p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-2">LLM Extracts</p>
{[{l:"Sentiment",d:"Pos/Neutral/Neg",c:"#10b981"},{l:"Intent",d:"Support/Complaint",c:"#00d4ff"},{l:"Issue",d:"Roads/Water/Jobs",c:"#f59e0b"},{l:"Confidence",d:"Score 0–1",c:"#7c3aed"}].map(a=>(
<div key={a.l} className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
<span className="text-xs text-slate-400">{a.l}</span>
<span className="text-[10px]" style={{color:a.c}}>{a.d}</span>
</div>
))}
</div>
</div>
</div>
</div>
);
}
