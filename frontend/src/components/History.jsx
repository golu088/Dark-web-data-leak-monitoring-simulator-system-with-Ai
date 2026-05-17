import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history")) || [];
    setData(stored.reverse());
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("history");
    setData([]);
  };



  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505] text-gray-200">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob" style={{animationDelay: "2s"}}></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex flex-col flex-1 px-4 py-12 max-w-5xl mx-auto w-full">
          
          <div className="flex justify-between items-end mb-10 pb-6 border-b border-gray-800 animate-[fadeIn_0.5s_ease-out]">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                Activity Log
              </h1>
              <p className="text-gray-400">Review your past forensic scans and security sweeps.</p>
            </div>
            {data.length > 0 && (
              <button
                onClick={clearHistory}
                className="group flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Clear All
              </button>
            )}
          </div>

          {/* DATA CONTAINER */}
          <div className="space-y-4 animate-[fadeIn_0.7s_ease-out]">
            {data.length === 0 ? (
              <div className="text-center p-12 glass-panel rounded-2xl">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-xl text-gray-400 font-medium">No activity history found.</p>
                <p className="text-gray-600 mt-2">Any checks you perform will be saved locally here.</p>
              </div>
            ) : (
              data.map((item, i) => {
                const isEmail = item.type === "email";
                const isPassword = item.type === "password";
                const colorTheme = isEmail ? "emerald" : isPassword ? "purple" : "blue";
                
                return (
                  <div key={i} className="glass-panel p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${colorTheme}-500/10 text-${colorTheme}-400`}>
                          {isEmail && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>}
                          {isPassword && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>}
                          {!isEmail && !isPassword && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                        </div>
                        <div>
                          <p className="font-semibold text-white capitalize">{item.type} Check</p>
                          <p className="text-xs text-gray-500">{item.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-mono font-medium truncate max-w-[200px] md:max-w-xs text-${colorTheme}-300`} title={item.query}>{item.query}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-800/50">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Risk Level</p>
                        <p className={`text-sm font-semibold ${item.result.risk === 'Low' || item.result.strength === 'Strong' ? 'text-emerald-400' : 'text-amber-400'}`}>{item.result.risk || item.result.strength}</p>
                      </div>
                      
                      {isEmail && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Breaches Found</p>
                          <p className="text-sm font-semibold text-white">{item.result.breaches_found}</p>
                        </div>
                      )}

                      {isPassword && (
                        <>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Strength</p>
                            <p className="text-sm font-semibold text-white">{item.result.strength}</p>
                          </div>
                        </>
                      )}

                      {!isEmail && !isPassword && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Breaches Found</p>
                          <p className="text-sm font-semibold text-white">{item.result.breaches}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default History;