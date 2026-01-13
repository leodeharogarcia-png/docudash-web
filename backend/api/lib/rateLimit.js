/**
 * Rate Limiter para Vercel Serverless Functions
 * Usa memoria en caché (KV sería mejor para producción)
 */

const rateLimit = new Map();

// Configuración
const WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS_CLASSIFY = 30; // 30 clasificaciones por minuto
const MAX_REQUESTS_OCR = 20; // 20 OCR por minuto

function getClientIP(req) {
    return (
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.headers['x-real-ip'] ||
        req.connection?.remoteAddress ||
        'unknown'
    );
}

function cleanOldEntries() {
    const now = Date.now();
    for (const [key, data] of rateLimit.entries()) {
        if (now - data.windowStart > WINDOW_MS) {
            rateLimit.delete(key);
        }
    }
}

export function checkRateLimit(req, endpoint = 'default') {
    cleanOldEntries();

    const ip = getClientIP(req);
    const key = `${ip}:${endpoint}`;
    const now = Date.now();

    const maxRequests = endpoint === 'ocr' ? MAX_REQUESTS_OCR : MAX_REQUESTS_CLASSIFY;

    const current = rateLimit.get(key);

    if (!current) {
        rateLimit.set(key, { count: 1, windowStart: now });
        return { allowed: true, remaining: maxRequests - 1 };
    }

    // Ventana expirada, reiniciar
    if (now - current.windowStart > WINDOW_MS) {
        rateLimit.set(key, { count: 1, windowStart: now });
        return { allowed: true, remaining: maxRequests - 1 };
    }

    // Dentro de la ventana
    if (current.count >= maxRequests) {
        const retryAfter = Math.ceil((WINDOW_MS - (now - current.windowStart)) / 1000);
        return {
            allowed: false,
            remaining: 0,
            retryAfter
        };
    }

    current.count++;
    return { allowed: true, remaining: maxRequests - current.count };
}

export function rateLimitMiddleware(endpoint = 'default') {
    return (req, res) => {
        const result = checkRateLimit(req, endpoint);

        res.setHeader('X-RateLimit-Remaining', result.remaining);

        if (!result.allowed) {
            res.setHeader('Retry-After', result.retryAfter);
            res.status(429).json({
                error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.',
                retryAfter: result.retryAfter
            });
            return false;
        }

        return true;
    };
}
