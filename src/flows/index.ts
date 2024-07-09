import { createFlow } from "@builderbot/bot";

import { welcomeFlow } from "./welcome.flow";
import { flowSeller } from "./seller.flow";
import { flowSchedule } from "./schedule.flow";
import { flowConfirm, isClientFlowConfirm, notClientFlowConfirm } from "./confirm.flow";
import { voiceFlow } from "./voice.flow";
import { registerFlow } from "./register.flow";
import { identifyFlow,identifyByFhoneFlow } from "./identify.flow"

export default createFlow([
    welcomeFlow,
    flowSeller,
    flowSchedule,
    flowConfirm,
    isClientFlowConfirm,
    notClientFlowConfirm,
    voiceFlow,
    registerFlow,
    identifyFlow ,
    identifyByFhoneFlow
])