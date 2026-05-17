import React, { useState, useRef } from "react";
import { checkEmail } from "../api";
import Navbar from "./Navbar";
import { getGuide } from "../utils/guide";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function Dashboard() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const reportRef = useRef(null);

  const handleCheck = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setResult(null);
    
    try {
      const res = await checkEmail(email);
      setResult(res);

      const oldData = JSON.parse(localStorage.getItem("history")) || [];
      oldData.push({
        type: "email",
        query: email,
        result: res,
        time: new Date().toLocaleString()
      });
      localStorage.setItem("history", JSON.stringify(oldData));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getYearlyData = () => {
    if (!result || !result.breach_details) return [];
    
    const yearCounts = {};
    result.breach_details.forEach(b => {
      const year = b.year || "Unknown";
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    });

    const sortedYears = Object.keys(yearCounts).sort();
    if (sortedYears.length === 0) return [];
    
    const maxCount = Math.max(...Object.values(yearCounts));
    
    return sortedYears.map(year => ({
      year,
      count: yearCounts[year],
      heightPercentage: Math.max((yearCounts[year] / maxCount) * 100, 5) 
    }));
  };

  const handleDownloadReport = async () => {
    if (!reportRef.current) return;
    try {
      const downloadBtn = document.getElementById("download-btn");
      if (downloadBtn) downloadBtn.style.display = "none";

      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#0a0a0a', 
        scale: 2, 
        useCORS: true
      });

      if (downloadBtn) downloadBtn.style.display = "flex";

      const image = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(image, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${result?.email || "Check"}_scan_report.pdf`);
    } catch (e) {
      console.error("Failed to download report", e);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505] text-gray-200">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-4 w-[600px] h-[600px] bg-emerald-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob"></div>
      <div className="absolute -bottom-8 right-20 w-[600px] h-[600px] bg-cyan-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob" style={{animationDelay: "2s"}}></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex flex-col items-center flex-1 px-4 py-12 w-full max-w-6xl mx-auto">
          
          <div className="text-center space-y-4 mb-12 animate-[fadeIn_0.5s_ease-out]">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-lg">
              Check Your Identity
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Discover if your email address has been compromised in any known data breaches across the dark web
            </p>
          </div>

          {/* INPUT AREA */}
          <div className="w-full max-w-3xl relative group animate-[fadeIn_0.7s_ease-out]">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex flex-col sm:flex-row items-center bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-2 shadow-2xl">
              <div className="hidden sm:flex pl-6 pr-4 text-emerald-500">
                <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input
                type="email"
                placeholder="Enter email address to initiate deep scan..."
                className="flex-1 w-full bg-transparent px-4 py-4 sm:py-4 text-lg text-white outline-none placeholder-gray-600 font-medium"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              />
              <button
                onClick={handleCheck}
                disabled={loading}
                className="w-full sm:w-auto mt-2 sm:mt-0 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Scanning Matrix...
                  </>
                ) : (
                  "Execute Scan"
                )}
              </button>
            </div>
          </div>

          {/* DASHBOARD RESULT GRID */}
          {result && (
            <div ref={reportRef} className="mt-16 w-full animate-[fadeIn_0.5s_ease-out]">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-800/50">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className={`p-4 rounded-2xl ${result.breaches_found === 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {result.breaches_found === 0 ? (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    ) : (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Intelligence Report</h2>
                    <p className="text-gray-400 font-mono text-sm tracking-wide mt-1">{result.email}</p>
                  </div>
                </div>
                
                <button 
                  id="download-btn"
                  onClick={handleDownloadReport}
                  className="group px-6 py-3 bg-gray-900/50 hover:bg-gray-800 text-gray-300 font-semibold rounded-xl border border-gray-700/50 transition-all flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Export PDF
                </button>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Top Metrics Row */}
                <div className="col-span-1 md:col-span-4 glass-panel p-6 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800/20 rounded-full blur-3xl group-hover:bg-gray-700/30 transition-colors duration-500"></div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Network Status</p>
                  <p className="text-4xl font-bold capitalize text-white mb-2">{result.status}</p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/50 text-xs text-gray-400 font-medium">
                    <div className={`w-2 h-2 rounded-full ${result.status === 'found' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                    Live Scan
                  </div>
                </div>

                <div className="col-span-1 md:col-span-4 glass-panel p-6 rounded-3xl relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-colors duration-500 ${result.risk === 'Low' ? 'bg-emerald-500/10 group-hover:bg-emerald-500/20' : result.risk === 'Medium' ? 'bg-amber-500/10 group-hover:bg-amber-500/20' : 'bg-rose-500/10 group-hover:bg-rose-500/20'}`}></div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Threat Level</p>
                  <p className={`text-4xl font-bold mb-2 ${result.risk === 'Low' ? 'text-emerald-400' : result.risk === 'Medium' ? 'text-amber-400' : 'text-rose-400'}`}>
                    {result.risk}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">Calculated based on exposure severity</p>
                </div>

                <div className="col-span-1 md:col-span-4 glass-panel p-6 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors duration-500"></div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Total Breaches</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="text-5xl font-black text-white">{result.breaches_found}</p>
                    <p className="text-gray-500 font-medium text-sm">incidents</p>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">Cross-referenced databases</p>
                </div>

                {/* AI Recommendation (Spans Full Width) */}
                <div className="col-span-1 md:col-span-12 p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-indigo-900/40 border border-indigo-500/20 relative overflow-hidden group">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="p-4 bg-indigo-500/20 rounded-2xl border border-indigo-500/30 shrink-0">
                      <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-indigo-300 mb-2 uppercase tracking-wide">CyberGuard AI Analysis</h3>
                      <p className="text-indigo-100/90 leading-relaxed text-lg font-light">
                        {result.ai_recommendation || getGuide(result.risk, "email")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Left Column: Breach Details */}
                <div className="col-span-1 md:col-span-7 glass-panel p-8 rounded-3xl flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      Breach Chronicles
                    </h3>
                    <span className="text-xs font-bold px-3 py-1 bg-gray-800 text-gray-300 rounded-full">{result.breaches_found} Records</span>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 max-h-[400px] space-y-3 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                    {result.breaches_found > 0 ? (
                      result.breach_details?.map((b, i) => (
                        <div key={i} className="group flex items-center justify-between p-4 rounded-2xl bg-gray-900/50 border border-gray-800 hover:bg-rose-950/20 hover:border-rose-900/50 transition-all duration-300">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">
                              <span className="text-gray-400 font-bold text-sm group-hover:text-rose-400">{b.source.charAt(0).toUpperCase()}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-200 text-lg">{b.source}</p>
                              <p className="text-sm text-gray-500 font-medium">Data Compromise</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-3 py-1 rounded-lg bg-gray-800 text-gray-400 font-mono text-sm border border-gray-700">
                              {b.year}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-emerald-950/20 border border-emerald-900/30">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <p className="text-xl text-emerald-300 font-semibold mb-2">Zero Leaks Detected</p>
                        <p className="text-emerald-500/70 text-sm max-w-xs">Your identity remains hidden from our breach indexes.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Threat Assessment Gauge */}
                <div className="col-span-1 md:col-span-5 glass-panel p-8 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group min-h-[350px]">
                  <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] transition-colors duration-1000 ${
                    result.risk === 'Low' ? 'bg-emerald-500/20' : 
                    result.risk === 'Medium' ? 'bg-amber-500/20' : 'bg-rose-500/20'
                  }`}></div>
                  
                  <h3 className="text-xl font-bold text-white mb-6 self-start w-full flex items-center gap-3 relative z-10">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Threat Assessment
                  </h3>

                  {/* Custom SVG Gauge */}
                  <div className="w-full flex-1 flex flex-col items-center justify-center gap-6 relative z-10">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      {/* Background Track */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-800" />
                        {/* Progress Arc */}
                        <circle 
                          cx="50" cy="50" r="40" 
                          stroke="currentColor" 
                          strokeWidth="8" 
                          fill="transparent" 
                          strokeDasharray="251.2" 
                          strokeDashoffset={
                            result.risk === 'Low' ? 251.2 - (251.2 * 0.25) : 
                            result.risk === 'Medium' ? 251.2 - (251.2 * 0.60) : 
                            251.2 - (251.2 * 0.95)
                          } 
                          className={`transition-all duration-1500 ease-out ${
                            result.risk === 'Low' ? 'text-emerald-500' : 
                            result.risk === 'Medium' ? 'text-amber-500' : 'text-rose-500'
                          }`}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Center Text */}
                      <div className="absolute flex flex-col items-center justify-center mt-2">
                        <span className="text-3xl font-black text-white leading-none">{result.risk}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Risk Level</span>
                      </div>
                    </div>

                    {/* Labels */}
                    <div className="w-full flex justify-between px-2 text-[10px] font-bold uppercase tracking-widest mt-2">
                      <div className={`flex flex-col items-center gap-2 ${result.risk === 'Low' ? 'text-emerald-400' : 'text-gray-600'}`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${result.risk === 'Low' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-gray-800'}`}></div>
                        Safe
                      </div>
                      <div className={`flex flex-col items-center gap-2 ${result.risk === 'Medium' ? 'text-amber-400' : 'text-gray-600'}`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${result.risk === 'Medium' ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-gray-800'}`}></div>
                        Medium
                      </div>
                      <div className={`flex flex-col items-center gap-2 ${result.risk === 'High' ? 'text-rose-400' : 'text-gray-600'}`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${result.risk === 'High' ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'bg-gray-800'}`}></div>
                        High
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;