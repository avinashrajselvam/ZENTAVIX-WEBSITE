import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, RotateCcw, MessageCircle, ArrowRight } from 'lucide-react';
import { askZentaAI } from '../lib/aiChatbot';
import { Link } from 'react-router-dom';
import './AIChatbot.css';

const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    text: "Hello! 👋 I'm **Zenta AI**, your smart assistant. How can I help you explore our software, web, mobile, or AI automation solutions today?",
    time: 'Just now',
  },
];

const promptSuggestions = [
  'What services do you offer?',
  'How much does a custom app cost?',
  'Where is your office located?',
  'Tell me about AI & Automation',
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await askZentaAI(query, messages);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'I apologize, but I encountered an issue. You can reach out directly to our team on WhatsApp at **+91 94453 70088**.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages(initialMessages);
  };

  // Basic bold markdown parser for message bubbles
  const renderFormattedText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="ai-chatbot-container">
      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-header-profile">
              <div className="ai-avatar-icon">
                <Bot size={20} color="#fff" />
              </div>
              <div>
                <div className="ai-title-row">
                  <h4>Zenta AI</h4>
                  <span className="ai-badge-chip">
                    <Sparkles size={11} /> AI
                  </span>
                </div>
                <p className="ai-status-text">Zentavix Virtual Assistant</p>
              </div>
            </div>

            <div className="ai-header-actions">
              <button
                className="ai-icon-btn"
                onClick={handleReset}
                title="Reset Conversation"
                aria-label="Reset Chat"
              >
                <RotateCcw size={15} />
              </button>
              <button
                className="ai-icon-btn"
                onClick={() => setIsOpen(false)}
                title="Close"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="ai-chat-body">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`ai-message-row ${m.sender === 'user' ? 'user-row' : 'bot-row'}`}
              >
                {m.sender === 'bot' && (
                  <div className="ai-msg-avatar">
                    <Bot size={14} />
                  </div>
                )}
                <div className="ai-msg-bubble">
                  <p className="ai-msg-text">{renderFormattedText(m.text)}</p>
                  <span className="ai-msg-time">{m.time}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="ai-message-row bot-row">
                <div className="ai-msg-avatar">
                  <Bot size={14} />
                </div>
                <div className="ai-msg-bubble ai-typing-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions */}
          <div className="ai-suggestions-bar">
            {promptSuggestions.map((prompt) => (
              <button
                key={prompt}
                className="ai-prompt-pill"
                onClick={() => handleSend(prompt)}
                disabled={loading}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Bottom CTA Bar */}
          <div className="ai-chat-cta-bar">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="ai-cta-link"
            >
              Get a Quote <ArrowRight size={12} />
            </Link>
            <a
              href="https://wa.me/919445370088"
              target="_blank"
              rel="noopener noreferrer"
              className="ai-cta-link whatsapp"
            >
              <MessageCircle size={12} /> WhatsApp
            </a>
          </div>

          {/* Input Footer */}
          <form
            className="ai-chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Ask anything about our services..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="ai-chat-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="ai-send-btn"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        className={`ai-launcher-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
        title="Chat with Zenta AI"
      >
        <div className="ai-pulse-glow" />
        <Bot size={26} />
        {!isOpen && (
          <span className="ai-launcher-badge">
            <Sparkles size={11} />
          </span>
        )}
      </button>
    </div>
  );
}
