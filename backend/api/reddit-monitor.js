import { sendTelegramMessage } from './lib/telegram.js';

export default async function handler(req, res) {
    // Solo permitir GET (para el cron) u OPTIONS
    if (req.method !== 'GET' && req.method !== 'OPTIONS') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const subreddits = ['ESLegal', 'Emprendedores', 'spain', 'AutonomosEs'];
    const keywords = ['factura', 'trimestre', 'gestoría', 'autónomo', 'nif', 'cif', 'hacienda', 'papeleo', 'iva', 'irpf'];

    // Configuración del intervalo (24 horas = 86400 segundos)
    const now = Math.floor(Date.now() / 1000);
    const interval = 86400 + 1200; // 24h + 20 min de margen

    let findings = [];

    try {
        for (const sub of subreddits) {
            console.log(`🔍 Monitorizando r/${sub}...`);
            const response = await fetch(`https://www.reddit.com/r/${sub}/new.json?limit=15`, {
                headers: { 'User-Agent': 'DocuDashBot/1.0 by Leonardo' }
            });

            if (!response.ok) {
                console.error(`❌ Error fetching r/${sub}: ${response.status}`);
                continue;
            }

            const data = await response.json();
            if (!data.data || !data.data.children) continue;

            const posts = data.data.children;

            for (const post of posts) {
                const p = post.data;
                const createdAt = p.created_utc;

                // Solo procesar posts nuevos del último intervalo
                if (createdAt < now - interval) continue;

                const title = p.title.toLowerCase();
                const text = (p.selftext || '').toLowerCase();

                const match = keywords.find(k => title.includes(k) || text.includes(k));

                if (match) {
                    findings.push({
                        subreddit: sub,
                        title: p.title,
                        url: `https://www.reddit.com${p.permalink}`,
                        author: p.author,
                        keyword: match
                    });
                }
            }
        }

        // Enviar alertas individuales a Telegram
        for (const item of findings) {
            const message = `🚨 **NUEVO POST EN REDDIT** (r/${item.subreddit})\n\n` +
                `📌 **Título:** ${item.title}\n` +
                `👤 **Autor:** u/${item.author}\n` +
                `🔑 **Motivo:** Coincidencia con "${item.keyword}"\n\n` +
                `🔗 [VER POST EN REDDIT](${item.url})`;

            await sendTelegramMessage(message);
            // Pequeño delay para no saturar la API de Telegram
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        return res.status(200).json({
            status: 'success',
            posts_checked: 15 * subreddits.length,
            alerts_sent: findings.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Reddit Monitor Error:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
}
