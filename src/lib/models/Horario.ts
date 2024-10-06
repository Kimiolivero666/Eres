import mongoose, { Schema, Document } from 'mongoose';

// Definición de la interfaz
export interface IHorario extends Document {
    mes: number; // 1-12
    año: number;
    dias: [
        {
            dia: number; // 1-31
            horarios: [
                {
                    inicio: string; // Formato "HH:MM"
                    fin: string; // Formato "HH:MM"
                }
            ];
        }
    ];
}

// Definición del esquema
const horarioSchema: Schema = new mongoose.Schema({
    mes: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
    },
    año: {
        type: Number,
        required: true,
    },
    dias: [
        {
            dia: {
                type: Number,
                required: true,
                min: 1,
                max: 31,
            },
            horarios: [
                {
                    inicio: {
                        type: String,
                        required: true,
                        match: /^([0-1]\d|2[0-3]):([0-5]\d)$/, // Validación para "HH:MM"
                    },
                    fin: {
                        type: String,
                        required: true,
                        match: /^([0-1]\d|2[0-3]):([0-5]\d)$/, // Validación para "HH:MM"
                    },
                }
            ],
        }
    ],
}, { timestamps: true });

// Modelo de Mongoose
const Horario = mongoose.models.Horario || mongoose.model<IHorario>('Horario', horarioSchema);

export default Horario;
