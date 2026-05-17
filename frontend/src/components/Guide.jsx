import React from "react";
import Navbar from "./Navbar";

function Guide() {
  const guides = [
    {
      title: "Email Security Protocol",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "cyan",
      desc: "Protect your primary communication channel. Learn how to detect phishing, enable MFA, and secure your inbox from unauthorized access.",
      link: "https://www.cisa.gov/secure-our-world/recognize-and-report-phishing",
      linkText: "Read Email Guide"
    },
    {
      title: "Password Hardening",
      icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
      color: "purple",
      desc: "Implement cryptographic passphrases, utilize secure password managers, and enforce unique credentials across all digital assets.",
      link: "https://www.cisa.gov/secure-our-world/use-strong-passwords",
      linkText: "Read Password Guide"
    },
    {
      title: "Username & Alias Privacy",
      icon: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "amber",
      desc: "Trace your digital footprint. Discover why reusing usernames can link your separate identities and how to maintain anonymity online.",
      link: "https://ssd.eff.org/",
      linkText: "Read Privacy Guide"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505] text-gray-200">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15] animate-blob"></div>
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-emerald-600 rounded-full mix-blend-screen filter blur-[150px] opacity-[0.1] animate-blob" style={{animationDelay: "2s"}}></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex flex-col items-center flex-1 px-4 py-12 w-full max-w-6xl mx-auto">
          
          <div className="text-center space-y-4 mb-16 animate-[fadeIn_0.5s_ease-out]">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-lg">
              Security Resource Center
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Access comprehensive cybersecurity protocols and utilize our advanced AI assistant for real-time threat mitigation strategies.
            </p>
          </div>

          {/* AI Chatbot CTA Banner */}
          <div className="w-full glass-panel rounded-3xl p-8 md:p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.1)] hover:border-emerald-500/50 transition-all duration-500">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-emerald-500/30 transition-colors duration-700"></div>
            
            <div className="flex-1 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                CyberGuard AI Online
              </div>
              <h2 className="text-3xl font-black text-white mb-3">Need Custom Security Advice?</h2>
              <p className="text-gray-400 text-lg max-w-xl">
                Our advanced AI Chatbot is available 24/7. Ask it anything about data breaches, securing your accounts, or analyzing specific threats.
              </p>
            </div>

            <div className="z-10 flex flex-col items-center gap-4">
              <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 flex items-center gap-4 shadow-xl">
                <div className="w-14 h-14 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-400 animate-pulse">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-lg">Click the Chat Icon</p>
                  <p className="text-gray-500 text-sm">Bottom right of your screen</p>
                </div>
              </div>
              <svg className="w-6 h-6 text-emerald-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </div>
          </div>

          {/* Guide Bento Grid */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-800">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              <h2 className="text-2xl font-bold text-white tracking-wide">Standard Security Protocols</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((guide, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-gray-600 transition-colors duration-300 flex flex-col">
                  <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${
                    guide.color === 'purple' ? 'bg-purple-500' :
                    guide.color === 'cyan' ? 'bg-cyan-500' :
                    'bg-amber-500'
                  }`}></div>
                  
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
                    guide.color === 'purple' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    guide.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                    'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={guide.icon} />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{guide.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-light flex-1">{guide.desc}</p>
                  
                  <a href={guide.link} target="_blank" rel="noopener noreferrer" className={`mt-6 inline-flex items-center gap-2 font-semibold transition-colors ${
                    guide.color === 'purple' ? 'text-purple-400 hover:text-purple-300' :
                    guide.color === 'cyan' ? 'text-cyan-400 hover:text-cyan-300' :
                    'text-amber-400 hover:text-amber-300'
                  }`}>
                    {guide.linkText}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Guide;