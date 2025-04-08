import Fastify from 'fastify';
import cors from '@fastify/cors';
import formBody from '@fastify/formbody';
import employeeRoutes from './routes/Employee.route.js';
import connectDB from './database.js'

const fastify = Fastify({ logger: true });

fastify.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
fastify.register(formBody);
fastify.register(connectDB, {uri: "mongodb+srv://juan:<db_password>@clusterprueba.bofgmi9.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPrueba"})

fastify.register(employeeRoutes, {prefix: "/employee"})

const start = async () => {
    try {
        await fastify.ready()
        await fastify.listen({ port: 3000 });
        console.log('Servidor corriendo correctamente');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();