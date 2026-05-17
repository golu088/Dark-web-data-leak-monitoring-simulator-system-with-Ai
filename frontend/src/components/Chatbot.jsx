import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hi! I am your  AI cybersecurity assistant. How can I help you regarding the security of your email, username, or password?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isExpanded]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(userMessage);
      
      if (response.reply) {
        setMessages(prev => [...prev, { role: 'ai', content: response.reply }]);
      } else {
        const errorMsg = response.error || 'Sorry, I encountered an error. Please try again later.';
        setMessages(prev => [...prev, { role: 'ai', content: errorMsg }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'There was a connection error. Please make sure the backend is running.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isExpanded && isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={toggleExpand}></div>
      )}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out ${isExpanded && isOpen ? 'bottom-[5vh] right-[5vw] top-[5vh] left-[5vw]' : ''}`}>
        {isOpen ? (
          <div className={`${isExpanded ? 'w-full h-full' : 'w-80 sm:w-96 h-[500px]'} bg-gray-900 border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-500/20 overflow-hidden flex flex-col transition-all duration-500`}>
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex justify-between items-center shrink-0">
              <h3 className="font-bold flex items-center space-x-2">
                <svg className="w-5 h-5 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.071 2.018-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                <span>Cyber Assistant</span>
              </h3>
              <div className="flex items-center space-x-1">
                <button onClick={toggleExpand} title={isExpanded ? "Minimize" : "Expand"} className="text-white/80 hover:text-white transition-colors p-1 rounded hover:bg-white/10">
                  {isExpanded ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  )}
                </button>
                <button onClick={toggleChat} className="text-white/80 hover:text-white transition-colors p-1 rounded hover:bg-white/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            
            <div className={`flex-1 p-4 overflow-y-auto space-y-4 bg-[#0a0a0a] scrollbar-thin scrollbar-thumb-emerald-600 scrollbar-track-gray-900 ${isExpanded ? 'text-base' : 'text-sm'}`}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 shadow-lg ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-sm' 
                      : 'bg-gray-800 text-gray-100 border border-gray-700/50 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="max-w-[85%] rounded-2xl p-3 bg-gray-800 text-gray-100 border border-gray-700/50 rounded-tl-sm flex items-center space-x-2 shadow-lg">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-gray-900 border-t border-gray-800 shrink-0">
              <form onSubmit={handleSend} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about passwords, emails..."
                  className={`flex-1 bg-gray-950 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors ${isExpanded ? 'text-base' : 'text-sm'}`}
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-5 py-3 flex items-center justify-center transition-colors shadow-md shadow-emerald-500/20"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <button
            onClick={toggleChat}
            className="bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-110 flex items-center justify-center relative group"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </button>
        )}
      </div>
    </>
  );
};

export default Chatbot;
