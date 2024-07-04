import { addKeyword, EVENTS } from "@builderbot/bot";
import { generateTimer } from "../utils/generateTimer";
import { getHistory, getHistoryParse, handleHistory } from "../utils/handleHistory";
import AIClass from "../services/ai";
import { getFullCurrentDate } from "src/utils/currentDate";
import { pdfQuery } from "src/services/pdf";

const PROMPT_SELLER = `Tu nombre es Boni, asistente virtual de Clarus Dent, ayudas a   concretar citas en link de Google calendar, e informar los clientes de las campañas promocionales . Utiliza mensajes en párrafos cortos para facilitar la lectura, siempre  busca la interacción haciendo una pregunta de cierre  al final del párrafo, que genere el deseo de cita. Lo primero que tienes que hacer es presentarte:

### DÍA ACTUAL
{CURRENT_DAY}

### HISTORIAL DE CONVERSACIÓN (Cliente/Vendedor)
{HISTORY}

### BASE DE DATOS
{DATABASE}

Para proporcionar respuestas más útiles, puedes utilizar la información proporcionada en la base de datos. El contexto es la única información que tienes. Ignora cualquier cosa que no esté relacionada con el contexto.

### EJEMPLOS DE RESPUESTAS IDEALES:

- buenas bienvenido a..
- un gusto saludarte en..
- por supuesto tenemos eso y ...

### INTRUCCIONES
- Mantén un tono profesional y siempre responde en primera persona.
- NO ofrescas promociones que no existe en la BASE DE DATOS
- Finaliza la conversacion con CTA ¿Te gustaria agendar un cita? ¿Quieres reservas una cita?
- Continua la conversacion sin saludar en primera persona

Respuesta útil adecuadas para enviar por WhatsApp (en español):`


export const generatePromptSeller = (history: string, database: string) => {
    const nowDate = getFullCurrentDate()
    return PROMPT_SELLER
        .replace('{HISTORY}', history)
        .replace('{CURRENT_DAY}', nowDate)
        .replace('{DATABASE}', database)
};

const flowSeller = addKeyword(EVENTS.ACTION)
    .addAnswer(`⏱️`)
    .addAction(async (_, { state, flowDynamic, extensions }) => {
        try {

            const ai = extensions.ai as AIClass
            const lastMessage = getHistory(state).at(-1)
            const history = getHistoryParse(state)

            const dataBase = await pdfQuery(lastMessage.content)
            console.log({ dataBase })
            const promptInfo = generatePromptSeller(history, dataBase)

            const response = await ai.createChat([
                {
                    role: 'system',
                    content: promptInfo
                }
            ])

            await handleHistory({ content: response, role: 'assistant' }, state)

            const chunks = response.split(/(?<!\d)\.\s+/g);

            for (const chunk of chunks) {
                await flowDynamic([{ body: chunk.trim(), delay: generateTimer(150, 250) }]);
            }
        } catch (err) {
            console.log(`[ERROR]:`, err)
            return
        }
    })

export { flowSeller }