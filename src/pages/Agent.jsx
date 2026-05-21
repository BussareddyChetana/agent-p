import { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Mic,
  Bot,
  AudioWaveform,
  PhoneCall,
  PhoneOff,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
} from "lucide-react";

import StatCard from "../components/StatCard";

import {
  AGENT_MESSAGES,
} from "../data/data";

const fmt = (n) => Intl.NumberFormat().format(n);

export default function Agent() {

  const [live, setLive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [volume, setVolume] = useState(78);

  const [messages] = useState(AGENT_MESSAGES);

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            AI Voice Agent
          </h1>

          <p className="text-slate-400 mt-1">
            Real-time AI election campaign system
          </p>
        </div>

        <button className="px-5 py-3 rounded-xl bg-[#00d4ff] text-black font-semibold hover:scale-105 transition-all flex items-center gap-2">
          Launch Agent
          <ArrowUpRight size={18} />
        </button>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Total Calls"
          value={fmt(12450)}
          sub="12% growth"
          accent="#00d4ff"
          icon={<PhoneCall className="text-[#00d4ff]" />}
        />

        <StatCard
          title="AI Accuracy"
          value="98%"
          sub="Speech recognition"
          accent="#10b981"
          icon={<Bot className="text-emerald-400" />}
        />

        <StatCard
          title="Voice Quality"
          value="HD"
          sub="Natural voice"
          accent="#7c3aed"
          icon={<AudioWaveform className="text-violet-400" />}
        />

        <StatCard
          title="Avg Response"
          value="1.4s"
          sub="Realtime AI"
          accent="#f59e0b"
          icon={<Mic className="text-amber-400" />}
        />

      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT PANEL */}

        <div className="xl:col-span-2 bg-[#0d1520] border border-white/[0.08] rounded-3xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-2xl font-bold text-white">
                Live AI Calling
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Real-time voice interaction panel
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">

              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-xs text-emerald-400 font-semibold">
                LIVE
              </span>

            </div>

          </div>

          {/* WAVEFORM */}

          <div className="h-52 rounded-2xl bg-gradient-to-br from-[#111827] to-[#0f172a] border border-white/[0.05] flex items-center justify-center mb-6 overflow-hidden relative">

            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#00d4ff,_transparent_70%)]" />

            <div className="flex items-end gap-2 h-24">

              {[35, 55, 70, 40, 90, 65, 45, 80, 60, 30].map((h, i) => (

                <motion.div
                  key={i}
                  animate={{ height: [20, h, 35] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.08,
                  }}
                  className="w-3 rounded-full bg-gradient-to-t from-[#00d4ff] to-violet-500"
                />

              ))}

            </div>

          </div>

          {/* CONTROLS */}

          <div className="flex flex-wrap gap-4 items-center justify-center">

            <button
              onClick={() => setLive(!live)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                live
                  ? "bg-red-500 text-white"
                  : "bg-[#00d4ff] text-black"
              }`}
            >

              {live ? (
                <PhoneOff size={18} />
              ) : (
                <PhoneCall size={18} />
              )}

              {live ? "End Call" : "Start Call"}

            </button>

            <button
              onClick={() => setRecording(!recording)}
              className={`px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white flex items-center gap-2 ${
                recording ? "ring-2 ring-red-500" : ""
              }`}
            >

              <Mic size={18} />

              {recording ? "Recording" : "Mic"}

            </button>

            <button className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white flex items-center gap-2">
              <Play size={18} />
              Play
            </button>

            <button className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white flex items-center gap-2">
              <Pause size={18} />
              Pause
            </button>

          </div>

          {/* VOLUME */}

          <div className="mt-8">

            <div className="flex items-center justify-between mb-2">

              <div className="flex items-center gap-2 text-slate-300">
                <Volume2 size={16} />
                <span className="text-sm">
                  Voice Volume
                </span>
              </div>

              <span className="text-sm text-[#00d4ff] font-semibold">
                {volume}%
              </span>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full accent-cyan-400"
            />

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="bg-[#0d1520] border border-white/[0.08] rounded-3xl p-6">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-xl font-bold text-white">
                Live Speech Recognition
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Real-time voice to text conversion
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">

              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-xs text-emerald-400 font-semibold">
                Listening
              </span>

            </div>

          </div>

          <div className="space-y-4">

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06]">

              <p className="text-xs text-[#00d4ff] font-semibold mb-2">
                USER SPEECH
              </p>

              <p className="text-sm text-slate-200 leading-relaxed">
                “Road conditions in our area are very poor and
                streetlights are not working properly.”
              </p>

            </div>

            <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20">

              <p className="text-xs text-violet-300 font-semibold mb-2">
                AI RESPONSE
              </p>

              <p className="text-sm text-violet-100 leading-relaxed">
                “Your concern regarding roads and streetlights
                has been recorded successfully.”
              </p>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06]">

                <p className="text-xs text-slate-500 mb-1">
                  Confidence Score
                </p>

                <p className="text-2xl font-bold text-emerald-400">
                  98%
                </p>

              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06]">

                <p className="text-xs text-slate-500 mb-1">
                  Response Time
                </p>

                <p className="text-2xl font-bold text-cyan-400">
                  1.2s
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CHAT */}

      <div className="bg-[#0d1520] border border-white/[0.08] rounded-3xl p-6">

        <div className="mb-5">

          <h2 className="text-2xl font-bold text-white">
            Live Conversation
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Real-time AI interaction transcript
          </p>

        </div>

        <div
          ref={chatRef}
          className="space-y-4 max-h-[420px] overflow-y-auto pr-2"
        >

          <AnimatePresence>

            {messages.map((msg, i) => (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${
                  msg.role === "AI"
                    ? "justify-start"
                    : "justify-end"
                }`}
              >

                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 border ${
                    msg.role === "AI"
                      ? "bg-[#00d4ff]/10 border-[#00d4ff]/20 text-cyan-100"
                      : "bg-violet-500/10 border-violet-500/20 text-violet-100"
                  }`}
                >

                  <p className="text-xs font-bold mb-1 opacity-80">
                    {msg.role}
                  </p>

                  <p className="text-sm leading-relaxed">
                    {msg.text}
                  </p>

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}