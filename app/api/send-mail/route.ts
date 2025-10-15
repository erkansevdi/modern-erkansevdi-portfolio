import { google } from "googleapis";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Eksik bilgi gönderildi." }), { status: 400 });
    }

    // 🔐 OAuth2 istemcisi oluştur
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    // 🚀 Erişim token’ı al
    const accessToken = await oAuth2Client.getAccessToken();

    // ✉️ Mail transport oluştur
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken?.token || "",
      },
    });

    // 📬 Mail içeriği
    const mailOptions = {
      from: `"Portfolio Mailer" <${process.env.GOOGLE_USER}>`,
      to: process.env.GOOGLE_USER,
      subject: `Yeni mesaj: ${name}`,
      text: `Gönderen: ${name} (${email})\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;line-height:1.6">
          <h2>📩 Yeni İletişim Mesajı</h2>
          <p><strong>Ad Soyad:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Mesaj:</strong><br>${message}</p>
        </div>
      `,
    };

    // 📤 Mail gönder
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Mail gönderilemedi:", error);
    return new Response(JSON.stringify({ error: "Mail gönderimi başarısız oldu." }), { status: 500 });
  }
}
