import { EVENTS, addKeyword } from "@builderbot/bot";
import conversationalLayer from "src/layers/conversational.layer";
import mainLayer from "src/layers/main.layer";


export const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAnswer(["Hola Boni, tu asistente virtual?"])
    .addAction(conversationalLayer)
    .addAction(mainLayer)