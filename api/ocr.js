/**
 * API DE OCR CON CORS HABILITADO - VERSIÓN ROBUSTA
 * Endpoint: /api/ocr
 * Método: POST
 */

// ✅ HELPER PARA CORS
const setCorsHeaders = (req, res) => {
  // Obtener el origen de quien hace la petición (tu extensión)
  const origin = req.headers.origin;
  
  // Si hay origen (navegador/extensión), lo permitimos explícitamente. Si no, usamos *
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.setHeader('Access-Control-Max-Age', '86400');
};

export default async function handler(req, res) {
  // ✅ PASAR 'req' A LA FUNCIÓN PARA LEER EL ORIGIN
  setCorsHeaders(req, res);

  // ✅ MANEJAR PREFLIGHT
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // ✅ EXTRAER DATOS
    const { base64Image, mimeType } = req.body;

    // ✅ VALIDACIÓN
    if (!base64Image || typeof base64Image !== 'string') {
      return res.status(400).json({ 
        error: 'El parámetro "base64Image" es requerido y debe ser string' 
      });
    }

    console.log('📥 Recibida petición de OCR');
    console.log('🖼️ MimeType:', mimeType || 'image/jpeg (default)');

    // ✅ VALIDAR API KEY
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY no configurada');
      return res.status(500).json({ 
        error: 'Configuración del servidor incompleta. Contacta al administrador.' 
      });
    }

    // ✅ PREPARAR IMAGEN
    const imageData = base64Image.includes(',') 
      ? base64Image.split(',')[1] 
      : base64Image;

    const imageUrl = `data:${mimeType || 'image/jpeg'};base64,${imageData}`;

    console.log('🤖 Llamando a OpenAI Vision...');

    // ✅ LLAMADA A OPENAI VISION
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Extrae TODO el texto visible de esta imagen. Devuelve SOLO el texto extraído, sin comentarios adicionales. Si es una factura, incluye todos los datos: empresa, CIF, importes, fechas, conceptos, etc. Mantén el formato y la estructura.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: 2000,
        temperature: 0
      })
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}));
      console.error('❌ OpenAI Vision Error:', errorData);
      return res.status(500).json({ 
        error: `Error de OCR: ${errorData.error?.message || 'Error desconocido'}` 
      });
    }

    const data = await openaiResponse.json();
    const extractedText = data.choices?.[0]?.message?.content || '';

    if (!extractedText) {
      console.warn('⚠️ No se pudo extraer texto de la imagen');
      return res.status(200).json({ 
        text: '',
        success: false,
        message: 'No se detectó texto en la imagen'
      });
    }

    console.log('✅ Texto extraído correctamente');
    console.log('📏 Longitud:', extractedText.length, 'caracteres');

    // ✅ RETORNAR CON HEADERS CORS
    return res.status(200).json({ 
      text: extractedText,
      success: true 
    });

  } catch (error) {
    console.error('❌ Error general en OCR:', error);
    return res.status(500).json({ 
      error: error.message || 'Error interno del servidor',
      success: false,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}