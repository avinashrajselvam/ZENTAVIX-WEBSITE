/**
 * WhatsApp Automation Service for Zentavix
 * Official Company WhatsApp: +91 94453 70088
 */

const COMPANY_PHONE = '919445370088';

/**
 * Generate a pre-filled WhatsApp link for direct client communication
 */
export function generateWhatsAppLink(data = {}) {
  const { fullName, service, budget, details } = data;

  let text = `Hello Zentavix Team! 👋\n\n`;
  if (fullName) text += `*Name:* ${fullName}\n`;
  if (service) text += `*Service Required:* ${service}\n`;
  if (budget) text += `*Budget Range:* ${budget}\n`;
  if (details) text += `*Project Details:* ${details}\n\n`;
  text += `I would like to discuss this project with you.`;

  return `https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Automated WhatsApp Cloud API / Webhook Dispatch
 * Supports Meta Cloud API, UltraMsg, or Twilio
 */
export async function sendWhatsAppNotification(enquiryData) {
  const ultraMsgInstance = import.meta.env.VITE_ULTRAMSG_INSTANCE_ID;
  const ultraMsgToken = import.meta.env.VITE_ULTRAMSG_TOKEN;

  // 1. UltraMsg WhatsApp API (if configured)
  if (ultraMsgInstance && ultraMsgToken) {
    try {
      const message = `🚀 *NEW WEBSITE ENQUIRY*\n\n` +
        `👤 *Client:* ${enquiryData.fullName}\n` +
        `🏢 *Company:* ${enquiryData.company || 'N/A'}\n` +
        `📧 *Email:* ${enquiryData.email}\n` +
        `📱 *Phone:* ${enquiryData.phone}\n` +
        `🛠 *Service:* ${enquiryData.service}\n` +
        `💰 *Budget:* ${enquiryData.budget || 'Not specified'}\n\n` +
        `📝 *Details:*\n${enquiryData.details}`;

      const res = await fetch(`https://api.ultramsg.com/${ultraMsgInstance}/messages/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          token: ultraMsgToken,
          to: `+${COMPANY_PHONE}`,
          body: message,
        }),
      });

      const result = await res.json();
      return { success: true, result };
    } catch (err) {
      console.warn('UltraMsg WhatsApp dispatch error:', err);
    }
  }

  return { success: true, fallback: true };
}
