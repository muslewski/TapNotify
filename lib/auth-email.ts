import { EmailConfig } from "next-auth/providers/email";

interface EmailTemplateProps {
  url: string;
  host: string;
}

interface SendVerificationRequestParams {
  identifier: string;
  url: string;
  provider: EmailConfig;
  token: string;
  expires: Date;
  request: Request;
}

const EmailTemplate = ({ url, host }: EmailTemplateProps): string => `
<!DOCTYPE html>
<html>
<body style="background: #f9f9f9; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 10px; padding: 20px;">
    <h1 style="text-align: center; color: #484848; font-size: 24px; font-weight: normal;">
      Sign in to ${host}
    </h1>
    <p style="text-align: center; color: #484848; font-size: 15px;">
      Click the button below to sign in to your account:
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${url}" style="background: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-size: 15px;">
        Sign in
      </a>
    </div>
    <p style="text-align: center; color: #9ca299; font-size: 13px;">
      If you didn't request this email, you can safely ignore it.
    </p>
  </div>
</body>
</html>
`;

export async function sendVerificationRequest({
  identifier: email,
  url,
  provider,
}: SendVerificationRequestParams): Promise<void> {
  const { host } = new URL(url);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: provider.from,
      to: email,
      subject: `Sign in to ${host}`,
      html: EmailTemplate({ url, host }),
      text: `Sign in to ${host}\n${url}\n\n`,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send verification email.");
  }
}
