import fastifyPlugin from 'fastify-plugin'
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const uri = "mongodb+srv://juan:123@clusterprueba.bofgmi9.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPrueba";

async function connectDB(fastify, options){
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 3000
        });
        fastify.log.info('Base de datos conectada');
    } catch (error) {
        fastify.log.error('Error al conectar con la base de datos', error.message);
        throw error;
    }
};

export default fastifyPlugin(connectDB);