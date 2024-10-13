const mongoose = require('mongoose');
const Horario = require('./src/lib/models/Horario'); // Ajusta la ruta según sea necesario

async function testInsert() {
    await mongoose.connect('mongodb+srv://kimi:aluMoreno@clustereres.odhmm.mongodb.net/Eres?retryWrites=true&w=majority&appName=ClusterEres', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const data = {
        mes: "Octubre",
        año: 2024,
        dias: [
            {
                dia: 1,
                horarios: [
                    { inicio: "09:00", fin: "12:00" },
                    { inicio: "13:00", fin: "16:00" },
                ],
            },
            {
                dia: 2,
                horarios: [{ inicio: "09:00", fin: "12:00" }],
            },
        ],
    };

    try {
        const horario = await Horario.create(data);
        console.log("Horario creado:", horario);
    } catch (error) {
        console.error("Error al crear horario:", error);
    } finally {
        await mongoose.disconnect();
    }
}

testInsert();
