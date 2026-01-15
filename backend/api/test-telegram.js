import { sendTelegramMessage } from './lib/telegram';

export default async function handler(req, res) {
    const origin = req.headers.origin || '*';
    res.setHeader('Access-Control-Allow-Origin', origin);

    try {
        await sendTelegramMessage('🚀 *¡Prueba de DocuDash Pro!*\n\nLeonardo, si estás leyendo esto, ¡tu bot de Telegram ya está configurado correctamente! 🎉');
        return res.status(200).json({ message: 'Mensaje de prueba enviado a Telegram' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
