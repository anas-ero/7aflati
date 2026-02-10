// import React, { useState, useRef, useEffect } from 'react';
// import { MessageCircle, X, Send, Sparkles } from './Icons';
// // import { sendMessageToGemini } from '../services/geminiService';
// import { ChatMessage } from '../types';

// interface AIChatProps {
//   isOpen: boolean;
//   onToggle: () => void;
// }

// export const AIChat: React.FC<AIChatProps> = ({ isOpen, onToggle }) => {
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     { id: '0', role: 'model', text: 'Hi! I\'m Horizon. Looking for tech conferences or music festivals? Ask me anything!' }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     if (isOpen) {
//       scrollToBottom();
//     }
//   }, [messages, isOpen]);

//   const handleSend = async () => {
//     if (!inputValue.trim() || isLoading) return;

//     const userMsg: ChatMessage = {
//       id: Date.now().toString(),
//       role: 'user',
//       text: inputValue
//     };

//     setMessages(prev => [...prev, userMsg]);
//     setInputValue('');
//     setIsLoading(true);

//     const responseText = await sendMessageToGemini(userMsg.text);

//     const aiMsg: ChatMessage = {
//       id: (Date.now() + 1).toString(),
//       role: 'model',
//       text: responseText
//     };

//     setMessages(prev => [...prev, aiMsg]);
//     setIsLoading(false);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   if (!isOpen) {
//     return (
//       <button 
//         onClick={onToggle}
//         className="fixed bottom-6 right-6 p-4 bg-brand-accent text-brand-dark rounded-full shadow-lg shadow-brand-accent/30 hover:bg-white hover:scale-110 transition-all duration-300 z-50 group"
//       >
//         <Sparkles className="w-6 h-6 animate-pulse group-hover:animate-none" />
//       </button>
//     );
//   }

//   return (
//     <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-brand-card border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
//       {/* Header */}
//       <div className="bg-slate-800/50 backdrop-blur-md p-4 flex items-center justify-between border-b border-slate-700">
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//           <h3 className="font-semibold text-white flex items-center gap-2">
//             Horizon AI <span className="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">Gemini Powered</span>
//           </h3>
//         </div>
//         <button onClick={onToggle} className="text-slate-400 hover:text-white transition-colors">
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-card/95">
//         {messages.map((msg) => (
//           <div 
//             key={msg.id} 
//             className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div 
//               className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
//                 msg.role === 'user' 
//                   ? 'bg-brand-accent text-brand-dark rounded-br-none' 
//                   : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex justify-start">
//             <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl rounded-bl-none flex items-center gap-1">
//               <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//               <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//               <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="p-4 bg-slate-800/30 border-t border-slate-700">
//         <div className="relative">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Ask about events..."
//             className="w-full bg-slate-900/50 text-white placeholder-slate-500 rounded-xl pl-4 pr-12 py-3 border border-slate-700 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
//           />
//           <button 
//             onClick={handleSend}
//             disabled={!inputValue.trim() || isLoading}
//             className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-brand-accent hover:bg-brand-accent/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
