import { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import './WhatsAppWidget.css';

// Official Crisp WhatsApp Brand Logo
const WhatsAppIcon = ({ size = 34, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path
      d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.217 8.217 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.65.81-.79.98-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z"
      fill="#ffffff"
    />
  </svg>
);

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
        <WhatsAppIcon size={34} />
      </button>
    </div>
  );
}
