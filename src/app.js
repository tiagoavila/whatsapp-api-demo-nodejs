import Fastify from 'fastify';
import fastifyEnv from '@fastify/env';
import WhatsAppService from './services/whatsapp.service.js';
import envSchema from './config/environment.js';
import whatsappRoutes from './routes/whatsapp.routes.js';

const build = async () => {
    const fastify = Fastify({
        logger: true
    });

    // Register environment configuration
    await fastify.register(fastifyEnv, {
        schema: envSchema,
        dotenv: true
    });

    // Initialize WhatsApp service
    const whatsappService = new WhatsAppService(fastify.config);
    fastify.decorate('whatsapp', whatsappService);

    // Register routes
    fastify.register(whatsappRoutes, { prefix: '/api/whatsapp' });

    return fastify;
};

const start = async () => {
    try {
        const fastify = await build();
        await fastify.listen({ port: fastify.config.PORT });
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();