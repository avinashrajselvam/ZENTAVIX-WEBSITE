import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = "zentavix@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { fullName, company, email, phone, service, details, budget, contactMethod } = await req.json();

    if (!fullName || !email || !phone) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: #0d131f; color: #fff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; color: #168bff;">ZENTAVIX</h2>
          <p style="margin: 4px 0 0; font-size: 14px; color: #94a3b8;">New Client Project Enquiry</p>
        </div>
        <div style="padding: 24px;">
          <h3 style="margin-top: 0; color: #1e293b;">Client Contact Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 140px;">Name:</td><td style="padding: 8px 0; color: #0f172a;">${fullName}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Company:</td><td style="padding: 8px 0; color: #0f172a;">${company || 'Not Provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #168bff;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #168bff;">${phone}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Service:</td><td style="padding: 8px 0; font-weight: bold; color: #168bff;">${service}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Budget:</td><td style="padding: 8px 0; color: #0f172a;">${budget || 'Not Specified'}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Preferred Contact:</td><td style="padding: 8px 0; color: #0f172a;">${contactMethod || 'Email'}</td></tr>
          </table>

          <h3 style="color: #1e293b; margin-bottom: 8px;">Project Details / Message:</h3>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; white-space: pre-wrap; font-size: 14px; color: #334155;">
            ${details}
          </div>
        </div>
        <div style="background: #f1f5f9; padding: 12px 24px; text-align: center; font-size: 12px; color: #64748b;">
          Received from Zentavix Website Contact Form on ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Zentavix Website <onboarding@resend.dev>",
          to: [TO_EMAIL],
          subject: `🚀 New Project Enquiry from ${fullName} (${service})`,
          html: htmlContent,
          reply_to: email,
        }),
      });

      const data = await res.json();
      return new Response(JSON.stringify(data), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, message: "No RESEND_API_KEY configured" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
