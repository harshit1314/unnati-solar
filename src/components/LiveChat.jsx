import React, { useState, useEffect, useRef } from 'react';
import { FiMessageCircle } from 'react-icons/fi';

const LiveChat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you with solar solutions today?' },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Close chat on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && chatOpen) {
        setChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chatOpen]);

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userMessage.trim() === '') return;

    const newUserMessage = { sender: 'user', text: userMessage };
    setChatMessages([...chatMessages, newUserMessage]);
    setUserMessage('');

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage.toLowerCase());
      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    if (message.includes('panel') || message.includes('system')) {
      return "We offer high-quality solar panels with 25-year performance warranties. Would you like to know more about our installation process?";
    } else if (message.includes('install') || message.includes('process')) {
      return "Our installation typically takes 2-4 weeks from assessment to completion. We handle all permits and paperwork.";
    } else if (message.includes('cost') || message.includes('price')) {
      return "Solar system costs vary based on size and requirements. A typical residential system ranges from ₹2-5 lakhs. Want a personalized quote?";
    } else if (message.includes('maintenance') || message.includes('service')) {
      return "Our maintenance services include regular inspections and cleaning to ensure optimal performance. We offer annual maintenance plans.";
    } else if (message.includes('incentive') || message.includes('subsidy')) {
      return "We help you apply for government solar subsidies, which can cover up to 30% of installation costs. Interested in details?";
    } else if (message.includes('battery') || message.includes('storage')) {
      return "Our battery storage solutions store excess energy for use during outages or peak hours. Want to explore options?";
    } else if (message.includes('contact') || message.includes('reach')) {
      return "You can call us at +91 98765 43210 or email support@unnati-renewables.com. Our team is available Mon-Sat 9AM-6PM.";
    } else if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I can help with information about solar systems, costs, installation, maintenance, incentives, and more. What would you like to know?";
    }
  };

  const handleQuickQuestion = (question) => {
    setUserMessage(question);
  };

  const handleQuoteClick = () => {
    const quoteButton = document.querySelector('.get-quote-button');
    if (quoteButton) {
      quoteButton.click();
    } else {
      console.warn('Get Quote button not found');
      window.location.href = '/contact';
    }
  };

  return (
    <div 
      className={`fixed bottom-8 left-8 transition-all duration-300 ${chatOpen ? 'h-96 w-80' : 'h-16 w-16'}`} 
      role="dialog" 
      aria-labelledby="chatbot-title"
      aria-hidden={!chatOpen}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-600 h-full flex flex-col">
        {chatOpen ? (
          <>
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-4 flex justify-between items-center">
              <h3 id="chatbot-title" className="text-lg font-medium text-white">Live Chat</h3>
              <button 
                onClick={handleChatToggle}
                className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Close live chat"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 dark:bg-gray-700">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`rounded-lg p-3 max-w-xs ${msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300'}`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
              <div className="flex flex-wrap gap-2 mb-2">
                <button 
                  onClick={() => handleQuickQuestion('What solar systems do you offer?')}
                  className="text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-300 rounded-full px-3 py-1"
                  aria-label="Ask about solar systems"
                >
                  Solar Systems
                </button>
                <button 
                  onClick={() => handleQuickQuestion('How does installation work?')}
                  className="text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-300 rounded-full px-3 py-1"
                  aria-label="Ask about installation"
                >
                  Installation
                </button>
                <button 
                  onClick={() => handleQuickQuestion('How much does a solar system cost?')}
                  className="text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-300 rounded-full px-3 py-1"
                  aria-label="Ask about costs"
                >
                  Costs
                </button>
                <button 
                  onClick={() => handleQuickQuestion('What maintenance services are available?')}
                  className="text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-300 rounded-full px-3 py-1"
                  aria-label="Ask about maintenance"
                >
                  Maintenance
                </button>
                <button 
                  onClick={() => handleQuickQuestion('Are there any government incentives?')}
                  className="text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-300 rounded-full px-3 py-1"
                  aria-label="Ask about incentives"
                >
                  Incentives
                </button>
                <button 
                  onClick={() => handleQuickQuestion('What battery storage options do you offer?')}
                  className="text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-300 rounded-full px-3 py-1"
                  aria-label="Ask about battery storage"
                >
                  Battery Storage
                </button>
                <button 
                  onClick={() => handleQuickQuestion('How can I contact support?')}
                  className="text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-300 rounded-full px-3 py-1"
                  aria-label="Ask about contact support"
                >
                  Contact Support
                </button>
              </div>
              
              <form onSubmit={handleSendMessage} className="flex">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
                  aria-label="Live chat input"
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 dark:hover:from-yellow-400 dark:hover:to-amber-500 text-white px-3 py-2 rounded-r-lg text-sm"
                  aria-label="Send live chat message"
                >
                  Send
                </button>
              </form>
              <button
                onClick={handleQuoteClick}
                className="mt-2 w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 dark:hover:from-yellow-400 dark:hover:to-amber-500 text-white px-3 py-2 rounded-lg text-sm"
                aria-label="Get a quote"
              >
                Get a Quote
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={handleChatToggle}
            className="h-full w-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 dark:hover:from-yellow-400 dark:hover:to-amber-500 text-white rounded-xl"
            aria-label="Open live chat"
          >
            <FiMessageCircle className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LiveChat;