interface IPropsResend {
  to: string;
  from: string;
  url: string;
  apiKey: string;
}

export async function sendVerificationRequest({
  to,
  from,
  url,
  apiKey,
}: IPropsResend) {
  const { host } = new URL(url);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`, // Используем API ключ
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: from, // Адрес отправителя
      to: to, // Email получателя
      subject: `Sign in to ${host}`,
      html: html({ url, host }),
      text: text({ url, host }),
    }),
  });

  if (!res.ok) {
    throw new Error("Resend error: " + JSON.stringify(await res.json()));
  }
}

function html({ url, host }: any) {
  return `
    <p>Sign in to <strong>${host}</strong> by clicking the link below:</p>
    <p><a href="${url}">Sign in</a></p>
  `;
}

function text({ url, host }: any) {
  return `Sign in to ${host} by clicking the link: ${url}`;
}
