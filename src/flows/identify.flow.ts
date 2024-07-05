import { addKeyword, EVENTS, utils} from "@builderbot/bot";
import { clearHistory } from "../utils/handleHistory";
import getUsuario from "src/services/user";
import { flowSeller } from "./seller.flow";
import { registerFlow } from "./register.flow";
import { flowConfirm } from "./confirm.flow";


/**
 * Encargado de pedir los datos necesarios para registrar el evento en el calendario
 */
const identifyFlow = addKeyword(utils.setEvent('IDENTIFY_FLOW')).addAction(async (_, { flowDynamic }) => {
    await flowDynamic('¿Cual es tu DNI?')
}).addAction({ capture: true }, async (ctx, { state, flowDynamic, endFlow, gotoFlow }) => {

    if (ctx.body.toLocaleLowerCase().includes('cancelar')) {
        clearHistory(state)
        return endFlow(`¿Como puedo ayudarte?`)

    }
    await state.update({ dni: ctx.body })
    const usuario = {
        dni: state.get('dni')
    }
    const empresaId = "hIntsAEzBwy8Hwi4DNcf"
    let persona = await getUsuario(usuario.dni, empresaId)
    if (!persona) {

            await flowDynamic('Aun no eres cliente!') 
            return gotoFlow(registerFlow)
        }
    else {

        await state.update({ persona: persona })
        }
    //clearHistory(state)
    await flowDynamic('Bienvenido '+  persona.nombres)
    gotoFlow(flowConfirm)
    
})
    

    
        


export { identifyFlow }