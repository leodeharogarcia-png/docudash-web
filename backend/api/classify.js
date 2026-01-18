import { sendTelegramMessage } from './lib/telegram.js';

export default async function handler(req, res) {
  // ✅ CONFIGURAR SEGURIDAD (CORS RESTRINGIDO)
  const EXTENSION_IDS = ['mlbhcjeajpgihflpoghpfannfbakfnlo', 'hicdgkaijiihjmgkacapdbekepldcbmk'];
  const origin = req.headers.origin || '';
  const isAllowedOrigin = EXTENSION_IDS.some(id => origin === `chrome-extension://${id}`);

  // Permitir solo nuestra extensión o peticiones locales para desarrollo
  if (!isAllowedOrigin && process.env.NODE_ENV !== 'development') {
    console.warn(`🛑 Bloqueada petición desde origen no autorizado: ${origin}`);
    return res.status(403).json({ error: 'Acceso denegado. Origen no autorizado.' });
  }

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // ✅ MANEJAR PREFLIGHT
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ✅ VALIDAR MÉTODO
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método no permitido. Usa POST.'
    });
  }

  try {
    // ✅ EXTRAER DATOS
    const { text, companyName, companyCIF } = req.body;

    // ✅ VALIDACIÓN
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: 'El parámetro "text" es requerido y debe ser string'
      });
    }

    console.log('🔥 Recibida petición de clasificación');
    console.log('🏢 Empresa:', companyName || 'No especificada');
    console.log('📄 Longitud texto:', text.length);

    // ✅ CONSTRUIR PROMPT
    let empresaInfo = "";
    if (companyName) {
      empresaInfo = `\n### INFORMACIÓN DE TU EMPRESA (EL TITULAR DEL SISTEMA)
Nombre: ${companyName}
${companyCIF ? `CIF: ${companyCIF}` : ''}

**REGLA CRÍTICA DE DETECCIÓN:**
- Si "${companyName}" aparece como EMISOR/VENDEDOR/PROVEEDOR → Es FACTURA EMITIDA (venta/ingreso)
- Si "${companyName}" aparece como CLIENTE/COMPRADOR/DESTINATARIO → Es FACTURA RECIBIDA (compra/gasto)
${companyCIF ? `- Si aparece el CIF "${companyCIF}" como emisor → Es FACTURA EMITIDA` : ''}
${companyCIF ? `- Si aparece el CIF "${companyCIF}" como cliente → Es FACTURA RECIBIDA` : ''}
`;
    }

    const prompt = `### ROL: Senior Accountant.
### OBJETIVO: Clasificar documento como EMITIDA o RECIBIDA.
${empresaInfo}
### INSTRUCCIONES:
1. **DIRECCIÓN**: "EMITIDA" si ${companyName || 'tu empresa'} es el emisor, "RECIBIDA" si es el cliente.
2. **TERCERO EXTERNO**: Nombre de la otra empresa (max 3 palabras, sin S.L./S.A.).
3. **CIF TERCERO**: NIF/CIF del tercero.
4. **IMPORTE**: Total con IVA.
5. **FECHA**: DD-MM-YYYY.
6. **NÚMERO**: Nº de factura/ticket.

### FORMATO JSON:
{
  "direccion": "RECIBIDA/EMITIDA",
  "tercero_externo": "NOMBRE",
  "cif_tercero": "NIF",
  "tipoDocumento": "Factura",
  "importe": 0.0,
  "fechaDocumento": "DD-MM-YYYY",
  "numeroDocumento": "000"
}
---
TEXTO:
${text.substring(0, 5000)}`;

    // ✅ VALIDAR API KEY
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY no configurada');
      return res.status(500).json({
        error: 'Configuración del servidor incompleta. Contacta al administrador.'
      });
    }

    console.log('🤖 Llamando a OpenAI...');

    // ✅ LLAMADA A OPENAI
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
            role: 'system',
            content: 'Eres un experto contable que clasifica documentos financieros. Responde SOLO con JSON válido, sin markdown ni texto adicional.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 800
      })
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}));
      console.error('❌ OpenAI Error:', errorData);
      return res.status(500).json({
        error: `Error de IA: ${errorData.error?.message || 'Error desconocido'}`
      });
    }

    const data = await openaiResponse.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      console.error('❌ Respuesta vacía de OpenAI');
      return res.status(500).json({
        error: 'La IA no devolvió ninguna respuesta'
      });
    }

    console.log('✅ Respuesta de OpenAI recibida');

    // ✅ PARSEAR JSON
    let classification;
    try {
      const cleanedText = assistantMessage
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      classification = JSON.parse(cleanedText);
      console.log('✅ JSON parseado correctamente');
    } catch (parseError) {
      console.error('❌ Error parsing JSON:', assistantMessage);
      return res.status(500).json({
        error: 'Error al interpretar respuesta de IA',
        rawResponse: assistantMessage.substring(0, 500)
      });
    }

    // ✅ VALIDAR ESTRUCTURA
    if (!classification.direccion) {
      console.warn('⚠️ Falta campo "direccion", usando valor por defecto');
      classification.direccion = 'RECIBIDA';
    }

    console.log('📤 Enviando clasificación al cliente');

    // 📢 NOTIFICACIÓN TELEGRAM (SIN BLOQUEAR EL ÉXITO)
    // 📢 NOTIFICACIÓN TELEGRAM ANONIMIZADA (PRIVACIDAD)
    const telegramText = `✅ *¡Nueva Factura Procesada!*\n🏢 *Empresa:* ${companyName || 'Usuario'}\n📢 El análisis ha finalizado exitosamente.`;
    await sendTelegramMessage(telegramText).catch(err => {
      console.error('❌ Error enviando a Telegram (DURANTE PROCESAMIENTO):', err.message);
    });

    // ✅ RETORNAR CON HEADERS CORS
    return res.status(200).json(classification);

  } catch (error) {
    console.error('❌ Error general:', error);
    console.error('📍 Stack completo:', error.stack);  // ✅ AÑADIR

    // ✅ AÑADIR: Notificar error crítico a Telegram
    await sendTelegramMessage(`🚨 *ERROR CRÍTICO EN API*\n\n${error.message}\n\nStack: ${error.stack?.substring(0, 200)}`).catch(() => { });

    return res.status(500).json({
      error: error.message || 'Error interno del servidor',
      errorType: error.name,  // ✅ AÑADIR
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}