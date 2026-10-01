import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import './WhatsAppWidget.css';

const quickOptions = [
  'Software / ERP Solutions',
  'Web & Mobile App Development',
  'AI & Business Automation',
  'Get a Free Project Quote',
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const companyNumber = '919445370088';

  const handleSend = (textToSend) => {
    const finalMsg = textToSend || message || 'Hello Zentavix, I am interested in your digital technology services.';
    const url = `https://wa.me/${companyNumber}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="whatsapp-widget-container">
      {/* Floating Popup Window */}
      {isOpen && (
        <div className="whatsapp-popup">
          {/* Header */}
          <div className="whatsapp-popup-header">
            <div className="whatsapp-header-avatar">
              <div className="whatsapp-avatar-img">
                <img src="/logo.png" alt="Zentavix" />
              </div>
              <span className="online-indicator" />
            </div>
            <div className="whatsapp-header-info">
              <h4>Zentavix Support</h4>
              <p>Typically replies in minutes</p>
            </div>
            <button
              className="whatsapp-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="whatsapp-popup-body">
            <div className="whatsapp-chat-bubble">
              <p>
                Hi there! 👋 How can we help you build your digital project today?
              </p>
              <span className="whatsapp-time">Just now</span>
            </div>

            <div className="whatsapp-quick-prompts">
              <p className="quick-prompts-label">
                <Sparkles size={12} /> Popular Inquiries:
              </p>
              <div className="quick-chips">
                {quickOptions.map((opt) => (
                  <button
                    key={opt}
                    className="quick-chip-btn"
                    onClick={() => handleSend(`Hi Zentavix! I want to discuss: ${opt}`)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Input */}
          <form
            className="whatsapp-popup-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="whatsapp-input"
            />
            <button
              type="submit"
              className="whatsapp-send-btn"
              aria-label="Send WhatsApp message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        className={`whatsapp-float-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Zentavix on WhatsApp"
        title="Chat on WhatsApp"
      >
        <div className="whatsapp-pulse-ring" />
        <MessageCircle size={28} />
        {!isOpen && <span className="whatsapp-badge">1</span>}
      </button>
    </div>
  );
}
