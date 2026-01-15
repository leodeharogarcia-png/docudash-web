export async function sendTelegramMessage(text) {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
        console.warn('Telegram Bot Token or Chat ID not configured');
        return;
    }

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'Markdown',
            }),
        });

        if (!response.ok) {
            console.error('Failed to send Telegram message:', await response.text());
        }
    } catch (error) {
        console.error('Error sending Telegram message:', error);
    }
}
