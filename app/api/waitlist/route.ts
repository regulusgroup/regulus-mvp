import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, role, company } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("waitlist")
    .insert({
      email:   email.trim().toLowerCase(),
      name:    name?.trim()    || null,
      role:    role            || null,
      company: company?.trim() || null,
    });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Already on the list." }, { status: 409 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }

  // Send confirmation email — fire and forget, never blocks the 201
  const firstName = name?.trim().split(" ")[0] || "there";
  resend.emails.send({
    from:    "Regulus <hello@regulus.eu>",
    to:      email.trim().toLowerCase(),
    subject: "You're on the Regulus waitlist.",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#1a1f18;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1f18;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:40px;">
              <span style="font-size:18px;font-weight:600;color:#b5b99f;letter-spacing:0.05em;">REGULUS</span>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding-bottom:20px;">
              <h1 style="margin:0;font-size:28px;font-weight:400;color:#b5b99f;line-height:1.2;">
                You&rsquo;re on the list, ${firstName}.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0 0 16px;font-size:14px;color:#7a7f6a;line-height:1.7;">
                We&rsquo;re onboarding a small group of design partners &mdash; founders, compliance leads,
                and investors who want to shape what we build and get first access.
              </p>
              <p style="margin:0;font-size:14px;color:#7a7f6a;line-height:1.7;">
                We&rsquo;ll reach out personally when your spot is ready. In the meantime,
                try the free compliance snapshot below.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding-bottom:40px;">
              <a href="https://regulus.eu/scan"
                 style="display:inline-block;padding:12px 28px;background:#3f4e40;color:#b5b99f;
                        text-decoration:none;font-size:13px;font-weight:500;border-radius:8px;">
                Get your compliance snapshot &rarr;
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-top:1px solid #2e3329;padding-top:28px;">
              <p style="margin:0;font-size:11px;color:#3f4e40;line-height:1.6;">
                No spam. We reach out personally when it matters.<br />
                &copy; 2026 Regulus &mdash; <a href="https://regulus.eu" style="color:#3f4e40;text-decoration:none;">regulus.eu</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  }).catch((err) => {
    console.error("[resend] failed to send confirmation email:", err);
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
