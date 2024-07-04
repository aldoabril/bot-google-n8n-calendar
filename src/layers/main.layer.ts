import { BotContext, BotMethods } from "@builderbot/bot/dist/types"
import { getHistoryParse } from "../utils/handleHistory"
import AIClass from "../services/ai"
import { flowSeller } from "../flows/seller.flow"
import { flowSchedule } from "../flows/schedule.flow"
import { identifyFlow } from "src/flows/identify.flow"

const PROMPT_DISCRIMINATOR = `### Historial de Conversación (Vendedor/Cliente) ###
{HISTORY}

### Intenciones del Usuario ###
**IDENTIFICAR***: Selecciona esta acción si el cliente no se ha identificado con su DNI.
**HABLAR**: Selecciona esta acción si el cliente ya se identifico y parece necesitar más información sobre el negocio, servicio o informarse del horario de atencion.
**PROGRAMAR**: Selecciona esta acción si el ciente ya se identificó y expresamente menciona la necesidad de programar una cita. Esto puede ser indicado directamente o implícitamente, por ejemplo, mencionando la necesidad de una visita a domicilio o solicitando una reserva para un servicio específico. Ten en cuenta que esta intención solo se aplica cuando el cliente determine la hora y fecha para programar una cita.

### Instrucciones ###

Analiza la siguiente conversación y determina la intención del usuario.`

export default async (_: BotContext, { state, gotoFlow, extensions }: BotMethods) => {
    const ai = extensions.ai as AIClass
    const history = getHistoryParse(state)
    const prompt = PROMPT_DISCRIMINATOR.replace('{HISTORY}', history)


    console.log(prompt)

    const { prediction } = await ai.determineChatFn([
        {
            role: 'system',
            content: prompt
        }
    ])


    console.log({ prediction })

    if (prediction.includes('HABLAR')) return gotoFlow(flowSeller)
    if (prediction.includes('PROGRAMAR')) return gotoFlow(flowSchedule)
    if (prediction.includes('IDENTIFICAR')) return gotoFlow(identifyFlow)
}