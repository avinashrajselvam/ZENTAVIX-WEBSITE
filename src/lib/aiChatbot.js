/**
 * Zentavix AI Assistant Service
 * Knowledge-base & Gemini API integration for real-time customer assistance
 */

const SYSTEM_PROMPT = `
You are "Zenta AI", the official intelligent assistant for Zentavix Private Limited.
Your goal is to warmly welcome visitors, explain our services, and guide them to start a project with us.

About Zentavix:
- Company: Zentavix Private Limited
- Tagline: Smart Technology · Digital Solutions · Business Growth
- Location: No. 34, Sathyamoorthy Street (2nd Floor), Stuartpet, Arakkonam - 631001, Tamil Nadu, India.
- Phone & WhatsApp: +91 94453 70088
- Email: zentavix@gmail.com
- Hours: Mon – Sat, 9:00 AM – 6:00 PM IST

Core Services Offered:
1. Software & Business Solutions: Custom ERP, CRM, Billing & Invoicing, HR & Inventory management.
2. Web & Mobile Solutions: Modern corporate websites, E-commerce, Android, iOS, and Cross-Platform Apps.
3. AI & Intelligent Solutions: AI Chatbots, AI Customer Support, Automated lead generation, Intelligent workflows.
4. Business Automation: WhatsApp automation, Email automation, API & Workflow integrations.
5. Digital Marketing: SEO, Google Ads, Meta Ads, Social Media Growth, Lead Generation.
6. UI/UX & Product Design: Web & Mobile app interfaces, dashboard design, brand identity.
7. IT & Technology Consulting: Cloud solutions, digital transformation, system maintenance.

Instructions:
- Keep responses friendly, professional, concise, and structured.
- Highlight how Zentavix builds customized, scalable solutions for businesses.
- When visitors ask for a quote or project discussion, encourage them to visit the Contact page or click "Chat on WhatsApp".
`;

// Built-in offline knowledge responder for instant answers without API keys
function getOfflineResponse(message) {
  const query = message.toLowerCase();

  if (query.includes('service') || query.includes('offer') || query.includes('what do you do')) {
    return `At Zentavix, we specialize in:
• **Custom Software & ERP/CRM Systems**
• **Web & Mobile App Development** (Android & iOS)
• **AI Solutions & Chatbots**
• **WhatsApp & Workflow Automation**
• **Digital Marketing & SEO**
• **UI/UX Product Design**

Would you like to discuss a specific project? You can visit our Contact page or message us on WhatsApp!`;
  }

  if (query.includes('price') || query.includes('cost') || query.includes('budget') || query.includes('quote') || query.includes('rate')) {
    return `Our pricing depends on your project requirements and scope. We offer transparent and flexible packages tailored for startups, SMBs, and enterprises. 

You can fill out our **Contact Form** with your budget range or message us on **WhatsApp (+91 94453 70088)** for a fast, free quotation!`;
  }

  if (query.includes('contact') || query.includes('phone') || query.includes('email') || query.includes('number') || query.includes('call')) {
    return `You can reach the Zentavix team directly at:
• **Phone & WhatsApp:** +91 94453 70088
• **Email:** zentavix@gmail.com
• **Office:** No. 34, Sathyamoorthy Street (2nd Floor), Stuartpet, Arakkonam - 631001, Tamil Nadu.`;
  }

  if (query.includes('location') || query.includes('address') || query.includes('office') || query.includes('where')) {
    return `Our headquarters is located at:
**Zentavix Private Limited**
No. 34, Sathyamoorthy Street (2nd Floor),
Stuartpet, Arakkonam - 631001, Tamil Nadu, India.`;
  }

  if (query.includes('whatsapp') || query.includes('chat')) {
    return `You can chat with us on WhatsApp anytime at **+91 94453 70088**. Click the WhatsApp icon on the screen to start chatting instantly!`;
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return `Hello! 👋 Welcome to Zentavix. I'm Zenta AI. How can I help you with your software, web, mobile, or AI project today?`;
  }

  return `Thanks for reaching out! Zentavix helps businesses build modern software, websites, mobile apps, and AI automations. 

Would you like more details about our services, or would you like to speak directly with our engineering team on WhatsApp (+91 94453 70088)?`;
}

export async function askZentaAI(userMessage, conversationHistory = []) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // 1. If Gemini API key is configured, use live Google Gemini AI
  if (apiKey && apiKey !== 'your_gemini_api_key') {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const contents = [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${userMessage}` }],
        },
      ];

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      });

      const data = await res.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (err) {
      console.warn('Gemini API query error, falling back to knowledge base:', err);
    }
  }

  // 2. Fallback to instant built-in Zentavix Knowledge Engine
  await new Promise((resolve) => setTimeout(resolve, 600)); // natural typing delay
  return getOfflineResponse(userMessage);
}
