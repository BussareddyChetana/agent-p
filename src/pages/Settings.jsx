import { useState } from "react";
import { Save } from "lucide-react";
import {
  Toggle,
  PasswordField,
  InputField,
} from "../components/StatCard";
export default function SettingsPage() {
const [twilio, setTwilio] = useState({sid:"ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",token:"",phone:"+1 555 000 0000"});
const [groq, setGroq] = useState({key:"gsk_xxxxxxxxxxxxxxxxxxxx",model:"llama3-70b-8192"});
const [stt, setStt] = useState("Google Whisper");
const [tts, setTts] = useState("Google Sarvam");
const [script, setScript] = useState("Hello, may I speak with [Contact Name]?\n\nI am an AI calling agent conducting a voter survey on behalf of the constituency office. We would like to understand your concerns regarding:\n• Road and infrastructure conditions\n• Water supply and sanitation\n• Employment opportunities\n\nYour feedback will be recorded and forwarded to the appropriate authorities. Do you have any specific concerns you would like to share?");
const [notifs, setNotifs] = useState({email:true,webhook:false,slack:false,sms:false});
const [webhookUrl,setWebhookUrl]= useState("");

return (
<div className="space-y-6">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h1 className="text-2xl font-bold text-white">Settings</h1>
<p className="text-sm text-slate-500 mt-0.5">System configuration & API credentials</p>
</div>
<button onClick={()=>toast.success("All settings saved!")}
className="flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl bg-gradient-to-r from-[#00d4ff] to-violet-500 text-black font-bold hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00d4ff]/20 transition-all">
<Save size={14}/> Save All Settings
</button>
</div>
<div className="grid lg:grid-cols-2 gap-6">
{/* Twilio */}
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6 space-y-4">
<div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
<span className="text-2xl">📞</span>
<div><h2 className="text-base font-semibold text-white">Twilio Configuration</h2><p className="text-xs text-slate-500">Outbound call settings</p></div>
</div>
<InputField label="Account SID" value={twilio.sid} onChange={v=>setTwilio({...twilio,sid:v})} placeholder="ACxxxxxxxxxxxxxxxx"/>
<PasswordField label="Auth Token" value={twilio.token} onChange={v=>setTwilio({...twilio,token:v})} placeholder="Auth token"/>
<InputField label="Phone Number" value={twilio.phone} onChange={v=>setTwilio({...twilio,phone:v})} placeholder="+1 555 000 0000"/>
<button onClick={()=>toast.success("Twilio connection verified! ✓")}
className="w-full py-2.5 text-sm rounded-xl border border-white/[0.08] text-slate-300 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all">🔌 Test Connection</button>
</div>
{/* Groq */}
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6 space-y-4">
<div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
<span className="text-2xl">🤖</span>
<div><h2 className="text-base font-semibold text-white">Groq LLM Configuration</h2><p className="text-xs text-slate-500">AI analysis & response</p></div>
</div>
<PasswordField label="API Key" value={groq.key} onChange={v=>setGroq({...groq,key:v})} placeholder="gsk_xxxxxxxxxxxx"/>
<div>
<label className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold block mb-1.5">Model</label>
<select value={groq.model} onChange={e=>setGroq({...groq,model:e.target.value})}
className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 rounded-xl outline-none text-sm text-white focus:border-[#00d4ff]/40">
<option value="llama3-70b-8192">llama3-70b-8192 (Recommended)</option>
<option value="llama3-8b-8192">llama3-8b-8192 (Fast)</option>
<option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
<option value="gemma-7b-it">gemma-7b-it</option>
</select>
</div>
<div className="grid grid-cols-2 gap-3">
{[{l:"Max Tokens",v:"1000"},{l:"Temperature",v:"0.3"}].map(f=>(
<div key={f.l}>
<label className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold block mb-1.5">{f.l}</label>
<input defaultValue={f.v} className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 rounded-xl outline-none text-sm text-white focus:border-[#00d4ff]/40 transition-colors"/>
</div>
))}
</div>
<button onClick={()=>toast.success("Groq API key verified! ✓")}
className="w-full py-2.5 text-sm rounded-xl border border-white/[0.08] text-slate-300 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all">🔌 Test API Key</button>
</div>
{/* STT / TTS */}
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6 space-y-5">
<div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
<span className="text-2xl">🎙️</span>
<div><h2 className="text-base font-semibold text-white">Voice Services</h2><p className="text-xs text-slate-500">STT & TTS provider</p></div>
</div>
<div>
<p className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold mb-3">Speech-to-Text (STT)</p>
<div className="space-y-2">
{["Google Whisper","Azure Speech","AWS Transcribe"].map(opt=>(
<label key={opt} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${stt===opt?"bg-[#00d4ff]/5 border-[#00d4ff]/20":"bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1]"}`}>
<input type="radio" name="stt" checked={stt===opt} onChange={()=>setStt(opt)} className="accent-cyan-400"/>
<span className="text-sm text-slate-300 flex-1">{opt}</span>
{stt===opt && <span className="text-[10px] text-[#00d4ff] font-semibold">Active</span>}
</label>
))}
</div>
</div>
<div>
<p className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold mb-3">Text-to-Speech (TTS)</p>
<div className="space-y-2">
{["Google Sarvam","Azure Neural TTS","AWS Polly"].map(opt=>(
<label key={opt} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${tts===opt?"bg-[#00d4ff]/5 border-[#00d4ff]/20":"bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1]"}`}>
<input type="radio" name="tts" checked={tts===opt} onChange={()=>setTts(opt)} className="accent-cyan-400"/>
<span className="text-sm text-slate-300 flex-1">{opt}</span>
{tts===opt && <span className="text-[10px] text-[#00d4ff] font-semibold">Active</span>}
</label>
))}
</div>
</div>
</div>
{/* Notifications */}
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6 space-y-4">
<div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
<span className="text-2xl">🔔</span>
<div><h2 className="text-base font-semibold text-white">Notifications</h2><p className="text-xs text-slate-500">Alert preferences</p></div>
</div>
{[{k:"email",l:"Email Notifications",d:"Get notified on call completions"},{k:"webhook",l:"Webhook Alerts",d:"POST events to your server"},{k:"slack",l:"Slack Integration",d:"Send alerts to a Slack channel"},{k:"sms",l:"SMS Alerts",d:"Critical event alerts via SMS"}].map(n=>(
<div key={n.k} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
<div>
<p className="text-sm font-medium text-white">{n.l}</p>
<p className="text-xs text-slate-500 mt-0.5">{n.d}</p>
</div>
<Toggle checked={notifs[n.k]} onChange={v=>{setNotifs({...notifs,[n.k]:v});toast(v?`${n.l} enabled`:`${n.l} disabled`,{icon:v?"✅":"🔕"});}}/>
</div>
))}
<InputField label="Webhook URL" value={webhookUrl} onChange={setWebhookUrl} placeholder="https://your-server.com/webhook"/>
<button onClick={()=>toast.success("Test webhook sent!")}
className="w-full py-2.5 text-sm rounded-xl border border-white/[0.08] text-slate-300 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all">🧪 Send Test Webhook</button>
</div>
</div>
{/* Script editor */}
<div className="bg-[#0d1520] border border-white/[0.07] rounded-2xl p-6 space-y-4">
<div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
<div className="flex items-center gap-3">
<span className="text-2xl">📝</span>
<div><h2 className="text-base font-semibold text-white">Default Campaign Script</h2><p className="text-xs text-slate-500">Use <code className="text-[#00d4ff]">[Contact Name]</code> as placeholder</p></div>
</div>
<button onClick={()=>toast("Script reset to default.")} className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.08] text-slate-400 hover:text-white transition-colors">↺ Reset</button>
</div>
<textarea rows={7} value={script} onChange={e=>setScript(e.target.value)}
className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 rounded-xl outline-none text-sm text-white focus:border-[#00d4ff]/40 transition-colors resize-none font-mono leading-relaxed"/>
<div className="flex gap-3">
<button onClick={()=>toast.success("Script saved!")}
className="flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl bg-gradient-to-r from-[#00d4ff] to-violet-500 text-black font-bold hover:scale-[1.02] transition-all">
<Save size={13}/> Save Script
</button>
<button onClick={()=>toast.success("TTS preview playing...")}
className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl border border-white/[0.08] text-slate-300 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all">
🔊 Preview TTS
</button>
</div>
</div>
</div>
);
}