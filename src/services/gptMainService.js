// import OpenAI from "openai";
// import config from '../config/config.js';
// import { executeActionWithParams } from '../functions/gptFunctions.js';
// import { createLead, getLeadByChatId } from '../dao/leadDAO.js';

// const openai = new OpenAI({ apiKey: config.OPEN_AI_API_KEY });

// export class OpenAIError extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'OpenAIError';
//     }
// };
// // distinta
// const createAndRun = async (msg) => {
//     console.log(`Assistant id: ${config.MAIN_ASSISTANT_ID}`)
//     try {
//         const run = await openai.beta.threads.createAndRun({
//             assistant_id: config.MAIN_ASSISTANT_ID,
//             thread: {
//                 messages: [{ role: "user", content: msg }],
//             },
//         });
//         return run;
//     } catch (error) {
//         throw new OpenAIError('Error al crear y ejecutar el hilo.');
//     }
// };

// const getThread = async (threadId) => {
//     try {
//         const runs = await openai.beta.threads.runs.list(threadId);
//         return runs.data[0];
//     } catch (error) {
//         throw new OpenAIError('Error al obtener el hilo.');
//     }
// };

// const addMessage = async (msg, threadId) => {
//     try {
//         const threadMessages = await openai.beta.threads.messages.create(threadId, {
//             role: "user",
//             content: msg,
//         });
//         return threadMessages;
//     } catch (error) {
//         throw new OpenAIError('Error al añadir mensaje al hilo.');
//     }
// };

// const listMessages = async (threadId) => {
//     try {
//         let threadMessages = await openai.beta.threads.messages.list(threadId);
//         while (threadMessages.data.length === 0 || threadMessages.data[0].role === 'user' || !threadMessages.data[0].content[0]) {
//             await sleep(2000);
//             threadMessages = await openai.beta.threads.messages.list(threadId);
//         }

//         return threadMessages.data;
//     } catch (error) {
//         throw new OpenAIError('Error al listar mensajes del hilo.');
//     }
// };

// // distinta
// const runThread = async (threadId) => {
//     console.log(`Running thread main assistant id: ${config.MAIN_ASSISTANT_ID}`)
//     try {
//         const run = await openai.beta.threads.runs.create(threadId, {
//             assistant_id: config.MAIN_ASSISTANT_ID,
//         });
//         return run;
//     } catch (error) {
//         throw new OpenAIError('Error al ejecutar el hilo.');
//     }
// };

// const submitToolOutputs = async (threadId, runId, callId) => {
//     const run = await openai.beta.threads.runs.submitToolOutputs(
//         threadId,
//         runId,
//         {
//             tool_outputs: [
//                 {
//                     tool_call_id: callId,
//                     output: "Recibido",
//                 },
//             ],
//         }
//     );
//     return run;
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// const validateThread = async (threadId) => {
//     let attempts = 5;

//     while (attempts > 0) {
//         try {
//             const run = await getThread(threadId);
//             console.log(`Status run: ${run.status}`)
//             if (run.status === 'requires_action') {
//                 console.log(`Requires action`)
//                 let params = JSON.parse(run.required_action.submit_tool_outputs.tool_calls[0].function
//                     .arguments);
//                 await createLead(threadId, params.email);
//                 await submitToolOutputs(threadId, run.id, run.required_action.submit_tool_outputs.tool_calls[0].id);
//                 return {
//                     response: {
//                         action: 'email',
//                         params
//                     }
//                 };
//             } else if (run.status === 'completed') { // queued tener en cuenta
//                 return {
//                     response: {
//                         result: run.status
//                     }
//                 };
//             } else if (run.status === 'queued' || run.status === 'in_progress') {
//                 console.log(`Still in progress or queued...`);
//                 await sleep(5000);
//                 attempts--;

//                 if (attempts === 0 && (run.status === 'queued' || run.status === 'in_progress')) {
//                     return {
//                         response: {
//                             result: 'timeout'
//                         }
//                     };
//                 }
//             }

//         } catch (error) {
//             throw new OpenAIError('Error al validar el hilo');
//         }
//     }

//     throw new OpenAIError('Se agotaron los intentos');
// };
// // distinta
// export const mainTelegramBotMsg = async (name, prompt, chatId) => {
//     try {
//         console.log(`Sending message to ${name} by main telegram bot`)
//         let lead = await getLeadByChatId(chatId);
//         let mainThreadId = lead ? lead.mainThreadId : null;
//         const response = await sendMessage(prompt, mainThreadId);
//         if (!mainThreadId && response.threadId) {
//             await createLead(response.threadId, name, chatId);
//         }
//         let message = response.response;

//         return message;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

// export const sendMessage = async (prompt, threadId) => {
//     let messages;
//     let response;
//     let respObj = {};
//     try {
//         if (!threadId) {
//             let thread = await createAndRun(prompt);
//             threadId = thread.thread_id;
//         }

//         let threadObj = await validateThread(threadId);

//         if (threadObj.response.action) {
//             response = await executeActionWithParams(threadObj.response.action, threadObj.response.params);
//             console.log(response)
//         } else if (threadObj.response.result === 'completed') {
//             console.log('El hilo se ha completado exitosamente');
//             await addMessage(prompt, threadId);
//             await runThread(threadId);
//             messages = await listMessages(threadId);
//             console.log(messages[0]);
//             response = messages ? messages[0].content[0].text.value : 'Aguardame un minuto';
//         } else {
//             console.log('El hilo no está en progreso ni requiere acción');
//             response = 'Aguardame cinco minutos, por favor.'
//         }

//     } catch (error) {
//         console.log(error);
//         throw error;
//     }

//     respObj.response = response;
//     respObj.threadId = threadId;

//     return respObj;
// };
