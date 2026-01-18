import { sendTelegramMessage } from './lib/telegram.js';

export default async function handler(req, res) {
    const origin = req.headers.origin || '';
    const EXTENSION_IDS = ['mlbhcjeajpgihflpoghpfannfbakfnlo', 'hicdgkaijiihjmgkacapdbekepldcbmk'];
    const isAllowedOrigin = EXTENSION_IDS.some(id => origin === `chrome-extension://${id}`);

    // Permitir solo nuestra extensión o peticiones locales para desarrollo
    if (!isAllowedOrigin && process.env.NODE_ENV !== 'development') {
        console.warn(`🛑 Bloqueada petición de error desde origen no autorizado: ${origin}`);
        return res.status(403).json({ error: 'Acceso denegado.' });
    }

    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { error, companyName, fileName, mode, context } = req.body;

    try {
        const message = `🚨 *PANIC BUTTON: ERROR DETECTADO* 🚨\n\n` +
            `🏢 *Empresa:* ${companyName || 'No especificada'}\n` +
            `📄 *Archivo:* ${fileName || 'Desconocido'}\n` +
            `🛠️ *Modo:* ${mode || 'Local'}\n` +
            `📍 *Contexto:* ${context || 'General'}\n` +
            `❌ *Error:* \`${error || 'Sin descripción'}\` \n\n` +
            `📅 *Fecha:* ${new Date().toLocaleString('es-ES')}\n\n` +
            `Leonardo, revisa los logs si esto ocurre con frecuencia. 🚑`;

        await sendTelegramMessage(message);

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Error en error-notify:', err);
        return res.status(500).json({ error: err.message });
    }
}
