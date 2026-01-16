import { sendTelegramMessage } from './lib/telegram';

export default async function handler(req, res) {
  // ✅ CONFIGURAR SEGURIDAD (CORS RESTRINGIDO)
  const EXTENSION_ID = 'mlbhcjeajpgihflpoghpfannfbakfnlo';
  const allowedOrigin = `chrome-extension://${EXTENSION_ID}`;
  const origin = req.headers.origin || '';

  // Permitir solo nuestra extensión o peticiones locales para desarrollo
  if (origin !== allowedOrigin && process.env.NODE_ENV !== 'development') {
    console.warn(`🛑 Bloqueada petición desde origen no autorizado: ${origin}`);
    return res.status(403).json({ error: 'Acceso denegado. Origen no autorizado.' });
  }

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
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

    const prompt = `### ROL
Eres un Senior Accountant y Auditor Financiero experto en clasificación de documentos contables.
Tu objetivo es identificar con MÁXIMA PRECISIÓN si un documento es EMITIDO o RECIBIDO.
${empresaInfo}

### MÉTODO DE DETECCIÓN (EN ORDEN DE PRIORIDAD):

**1. DETECCIÓN POR NOMBRE DE EMPRESA (PRIORIDAD MÁXIMA):**
${companyName ? `
   - Busca "${companyName}" o variaciones similares en el documento
   - Si "${companyName}" es el EMISOR/VENDEDOR → EMITIDA
   - Si "${companyName}" es el CLIENTE/COMPRADOR → RECIBIDA
` : ''}
${companyCIF ? `
   - Busca el CIF "${companyCIF}" en el documento
   - Si este CIF es del EMISOR → EMITIDA
   - Si este CIF es del CLIENTE → RECIBIDA
` : ''}

**2. DETECCIÓN POR ESTRUCTURA DEL DOCUMENTO:**
   
   **FACTURA RECIBIDA (Compra/Gasto):**
   - Sección "EMISOR/PROVEEDOR/VENDEDOR" → Empresa EXTERNA
   - Sección "CLIENTE/COMPRADOR/DESTINATARIO" → Contiene "${companyName || 'tu empresa'}"
   - Es dinero que PAGAS a un proveedor
   - Representa un GASTO
   
   **FACTURA EMITIDA (Venta/Ingreso):**
   - Sección "EMISOR/PROVEEDOR/VENDEDOR" → Contiene "${companyName || 'tu empresa'}"
   - Sección "CLIENTE/COMPRADOR/DESTINATARIO" → Empresa EXTERNA
   - Es dinero que COBRAS a un cliente
   - Representa un INGRESO

**3. IDENTIFICACIÓN DEL TERCERO EXTERNO:**
   - Si es RECIBIDA: El tercero es el PROVEEDOR (quien emite)
   - Si es EMITIDA: El tercero es el CLIENTE (quien recibe)

### CONTEXTO
El texto corresponde a un documento contable (factura, ticket, recibo).

### TAREA
Analiza el texto y extrae la información solicitada.
Si un dato no aparece, devuelve null.

---
TEXTO DEL DOCUMENTO:
${text.substring(0, 6000)}
---

### INSTRUCCIONES DE EXTRACCIÓN:
1. **DIRECCIÓN** (CRÍTICO):
   - Busca primero "${companyName || 'el nombre de la empresa del usuario'}"
   - Si aparece como emisor → "EMITIDA"
   - Si aparece como cliente → "RECIBIDA"
   - Si no encuentras el nombre, analiza la estructura del documento

2. **TERCERO EXTERNO**: 
   - Nombre de la empresa que NO es "${companyName || 'tu empresa'}" (máximo 2-3 palabras)
   - Simplifica nombres largos, elimina S.L., S.A., etc.

3. **CIF TERCERO**: CIF de la empresa identificada como tercero externo

4. **IMPORTE**: Total final con IVA incluido

5. **FECHA**: Fecha de emisión en formato DD-MM-YYYY

6. **NÚMERO DOCUMENTO**: Número de factura/ticket

### FORMATO DE SALIDA (JSON ESTRICTO)
Devuelve SOLO este JSON sin texto adicional:
{
  "direccion": "RECIBIDA o EMITIDA",
  "tercero_externo": "NOMBRE EMPRESA EXTERNA",
  "cif_tercero": "B12345678",
  "tipoDocumento": "Factura",
  "importe": 100.50,
  "fechaDocumento": "15-11-2024",
  "numeroDocumento": "F2024-001"
}`;

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

    // 🔔 NOTIFICACIÓN TELEGRAM (ASÍNCRONA)
    const telegramText = `✅ *¡Nueva Factura Procesada!*\n📄 *Proveedor:* ${classification.tercero_externo || 'Desconocido'}\n💰 *Importe:* ${classification.importe || '0'}€\n📅 *Tipo:* ${classification.direccion}`;
    sendTelegramMessage(telegramText);

    // ✅ RETORNAR CON HEADERS CORS
    return res.status(200).json(classification);

  } catch (error) {
    console.error('❌ Error general:', error);
    return res.status(500).json({
      error: error.message || 'Error interno del servidor',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}