export async function sendTelegramMessage(text) {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.warn('⚠️ Telegram no configurado');
        return;
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: text,
                parse_mode: 'Markdown'
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('❌ Telegram error:', error);
            throw new Error(`Telegram API error: ${error.description}`);
        }

        console.log('✅ Mensaje enviado a Telegram');
    } catch (error) {
        console.error('❌ Error en sendTelegramMessage:', error);
        throw error;  // ✅ IMPORTANTE: Re-lanzar el error
    }
}
