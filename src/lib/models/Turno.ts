import mongoose from 'mongoose';

// Función para conectar a la base de datos
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://kimi:kimi1710@clustereres.odhmm.mongodb.net/Eres?retryWrites=true&w=majority&appName=ClusterEres');
        console.log('DB connected');
    } catch (error) {
        console.error('DB connection error:', error);
        process.exit(1); // Salir del proceso si no se puede conectar
    }
};

// Definición del esquema
const turnoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hora: {
        type: Date,
        default: () => new Date(),  
    },
    dia: {
        type: Date,
        default: () => new Date(),  
    },
    });

// Modelo de Mongoose
const Turno = mongoose.models.Turno || mongoose.model('Turno', turnoSchema);

export default Turno;
