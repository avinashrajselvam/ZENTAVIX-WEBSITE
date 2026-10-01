import emailjs from '@emailjs/browser';

/**
 * Email Dispatch Service for Zentavix
 * Sends notifications to official company email
 */

export async function sendEnquiryEmail(enquiryData) {
  const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // 1. EmailJS Dispatch
  if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
    try {
      const templateParams = {
        // Standard & Aliased variables to support any EmailJS template configuration
        to_email: 'zentavix@gmail.com',
        from_name: enquiryData.fullName,
        name: enquiryData.fullName,
        client_name: enquiryData.fullName,
        company: enquiryData.company || 'Not specified',
        client_company: enquiryData.company || 'Not specified',
        email: enquiryData.email,
        client_email: enquiryData.email,
        reply_to: enquiryData.email,
        phone: enquiryData.phone,
        client_phone: enquiryData.phone,
        service: enquiryData.service,
        title: enquiryData.service,
        budget: enquiryData.budget || 'Not specified',
        contact_method: enquiryData.contactMethod || 'Email',
        message: enquiryData.details,
        details: enquiryData.details,
        time: new Date().toLocaleString(),
        submitted_at: new Date().toLocaleString(),
      };

      const result = await emailjs.send(
        emailjsServiceId.trim(),
        emailjsTemplateId.trim(),
        templateParams,
        emailjsPublicKey.trim()
      );

      return { success: true, result };
    } catch (err) {
      console.warn('EmailJS dispatch error:', err);
    }
  }

  // 2. Web3Forms Fallback
  const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (web3formsKey && web3formsKey !== 'your_web3forms_key') {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `🚀 New Project Enquiry: ${enquiryData.service} - ${enquiryData.fullName}`,
          from_name: 'Zentavix Website Enquiries',
          to_email: 'zentavix@gmail.com',
          'Client Name': enquiryData.fullName,
          'Company': enquiryData.company || 'N/A',
          'Client Email': enquiryData.email,
          'Client Phone': enquiryData.phone,
          'Service Requested': enquiryData.service,
          'Budget Range': enquiryData.budget || 'Not specified',
          'Preferred Contact Method': enquiryData.contactMethod || 'Email',
          'Project Details / Message': enquiryData.details,
          'Submitted At': new Date().toLocaleString(),
        }),
      });

      const result = await response.json();
      return { success: result.success, message: result.message };
    } catch (err) {
      console.warn('Web3Forms dispatch warning:', err);
    }
  }

  return { success: true, fallback: true };
}
