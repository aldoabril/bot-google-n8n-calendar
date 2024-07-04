import { addKeyword, utils } from "@builderbot/bot"
import { flowSeller } from "./seller.flow"

const registerFlow = addKeyword(utils.setEvent('REGISTER_FLOW'))
.addAnswer(`Ingresa tus apellidos:`, { capture: true }, async (ctx, { state }) => {
    let persona = state.get('persona')
    await state.update({ persona: {...persona,apellidos: ctx.body} })
})
    .addAnswer(`Ingresa tus nombres:`, { capture: true }, async (ctx, { state }) => {
        let persona = state.get('persona')
        await state.update({ persona: {...persona,nombres: ctx.body} })
    })
    .addAnswer('Ingresa tu correo:', { capture: true }, async (ctx, { state }) => {
        let persona = state.get('persona')
        await state.update({ persona: {...persona,correo: ctx.body} })
    })
    .addAction(async (_, { flowDynamic, state, gotoFlow }) => {
        let persona = state.get('persona')
        await flowDynamic(`${persona.nombres}, gracias por la informacion!`)
        return gotoFlow(flowSeller)
        
    })
export {registerFlow}