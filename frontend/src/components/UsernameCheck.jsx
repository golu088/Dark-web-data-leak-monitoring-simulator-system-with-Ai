import React, { useState, useRef } from "react";
import { checkUsername } from "../api";
import Navbar from "./Navbar";
import { getGuide } from "../utils/guide";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function UsernameCheck() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const reportRef = useRef(null);

  const handleCheck = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await checkUsername(username);
      setResult(res);

      const oldData = JSON.parse(localStorage.getItem("history")) || [];
      oldData.push({
        type: "username",
        query: username,
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

  const handleDownloadReport = async () => {
    if (!reportRef.current) return;
    try {
      const downloadBtn = document.getElementById("download-btn-usr");
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
      pdf.save(`${result?.username || "Username"}_scan_report.pdf`);
    } catch (e) {
      console.error("Failed to download report", e);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505] text-gray-200">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-4 w-[600px] h-[600px] bg-amber-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob"></div>
      <div className="absolute -bottom-8 right-20 w-[600px] h-[600px] bg-orange-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob" style={{animationDelay: "2s"}}></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex flex-col items-center flex-1 px-4 py-12 w-full max-w-6xl mx-auto">
          
          <div className="text-center space-y-4 mb-12 animate-[fadeIn_0.5s_ease-out]">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 drop-shadow-lg">
              Username Exposure
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Check if your alias has been reused or exposed in past breaches.
            </p>
          </div>

          {/* INPUT AREA */}
          <div className="w-full max-w-3xl relative group animate-[fadeIn_0.7s_ease-out]">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex flex-col sm:flex-row items-center bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-2 shadow-2xl">
              <div className="hidden sm:flex pl-6 pr-4 text-amber-500">
                <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <input
                type="text"
                placeholder="Enter target username..."
                className="flex-1 w-full bg-transparent px-4 py-4 sm:py-4 text-lg text-white outline-none placeholder-gray-600 font-medium"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              />
              <button
                onClick={handleCheck}
                disabled={loading}
                className="w-full sm:w-auto mt-2 sm:mt-0 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Tracing...
                  </>
                ) : (
                  "Trace Alias"
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
                  <div className={`p-4 rounded-2xl ${result.breaches === 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {result.breaches === 0 ? (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    ) : (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Footprint Report</h2>
                    <p className="text-gray-400 font-mono text-sm tracking-wide mt-1">@{result.username}</p>
                  </div>
                </div>
                
                <button 
                  id="download-btn-usr"
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
                    <div className={`w-2 h-2 rounded-full ${result.status === 'Found' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                    Live Scan
                  </div>
                </div>

                <div className="col-span-1 md:col-span-4 glass-panel p-6 rounded-3xl relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-colors duration-500 ${result.risk === 'Low' ? 'bg-emerald-500/10 group-hover:bg-emerald-500/20' : 'bg-amber-500/10 group-hover:bg-amber-500/20'}`}></div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Exposure Risk</p>
                  <p className={`text-4xl font-bold mb-2 ${result.risk === 'Low' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {result.risk}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">Potential tracking danger</p>
                </div>

                <div className="col-span-1 md:col-span-4 glass-panel p-6 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors duration-500"></div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Linked Profiles</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="text-5xl font-black text-white">{result.breaches}</p>
                    <p className="text-gray-500 font-medium text-sm">matches</p>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">Found in public OSINT records</p>
                </div>

                {/* AI Recommendation (Spans Full Width) */}
                <div className="col-span-1 md:col-span-12 p-8 rounded-3xl bg-gradient-to-r from-orange-900/40 via-amber-900/20 to-orange-900/40 border border-orange-500/20 relative overflow-hidden group">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="p-4 bg-orange-500/20 rounded-2xl border border-orange-500/30 shrink-0">
                      <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-orange-300 mb-2 uppercase tracking-wide">CyberGuard Strategy</h3>
                      <p className="text-orange-100/90 leading-relaxed text-lg font-light">
                        {getGuide(result.risk, "username")}
                      </p>
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

export default UsernameCheck;
