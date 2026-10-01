import { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import './WhatsAppWidget.css';

// Official WhatsApp Logo Icon
const WhatsAppIcon = ({ size = 28, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.495-.896-.799-1.501-1.787-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518-.175-.009-.376-.01-.577-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.511 0 1.481 1.079 2.91 1.23 3.111.15.201 2.124 3.243 5.145 4.549.719.311 1.281.497 1.719.636.722.23 1.378.197 1.898.12.579-.088 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.076-.126-.277-.201-.578-.351zM12.04 2C6.536 2 2.067 6.469 2.067 11.974c0 1.954.564 3.78 1.541 5.334L2 22l4.836-1.564a9.924 9.924 0 0 0 5.204 1.472h.004c5.503 0 9.972-4.47 9.972-9.975 0-2.668-1.039-5.176-2.925-7.062A9.897 9.897 0 0 0 12.04 2z" />
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
        <WhatsAppIcon size={30} />
        {!isOpen && <span className="whatsapp-badge">1</span>}
      </button>
    </div>
  );
}
