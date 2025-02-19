async function routes(fastify, options) {
    const whatsappService = fastify.whatsapp;

    fastify.post('/messages/send', {
        schema: {
            body: {
                type: 'object',
                required: ['to', 'message'],
                properties: {
                    to: { type: 'string' },
                    message: { type: 'string' }
                }
            }
        },
        handler: async (request, reply) => {
            const { to, message } = request.body;
            const result = await whatsappService.sendTextMessage(to, message);
            return result;
        }
    });

    fastify.get('/messages/:messageId', {
        schema: {
            params: {
                type: 'object',
                required: ['messageId'],
                properties: {
                    messageId: { type: 'string' }
                }
            }
        },
        handler: async (request, reply) => {
            const { messageId } = request.params;
            const result = await whatsappService.getMessageStatus(messageId);
            return result;
        }
    });
}

export default routes;