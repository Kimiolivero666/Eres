import mongoose from 'mongoose';

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
