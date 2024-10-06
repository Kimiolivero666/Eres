import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';
import Horario from '@/lib/models/Horario';

// Obtener, actualizar o eliminar un horario específico
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await ConnectDB();
        const { id } = params;
        if (!id) {
            return NextResponse.json({ success: false, message: 'ID no proporcionado' }, { status: 400 });
        }
        const horario = await Horario.findById(id);
        if (!horario) {
            return NextResponse.json({ success: false, message: 'Horario no encontrado' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: horario });
    } catch (error: any) {
        console.error("Error al obtener el horario:", error);
        return NextResponse.json({ success: false, message: 'Error al obtener el horario' }, { status: 500 });
    }
}



export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await ConnectDB(); // Asegúrate de que la conexión a la base de datos se establezca correctamente
        const { id } = params;
        const data = await request.json(); // Obtiene los datos del cuerpo de la solicitud

        console.log('ID recibido en PATCH:', id);
        console.log('Datos recibidos en PATCH:', data);

        // Obtener el horario actual
        const horario = await Horario.findById(id); // Busca el horario por ID
        if (!horario) {
            return NextResponse.json({ success: false, message: 'Horario no encontrado' }, { status: 404 });
        }

        // Definir el tipo para los días
        type DiaType = { dia: number; horarios: { inicio: string; fin: string }[] };

        // Buscar si ya existe el día que estás intentando modificar
        const diaIndex = horario.dias.findIndex((d: DiaType) => d.dia === data.dia);

        if (diaIndex !== -1) {
            // Si el día existe, actualiza sus horarios
            horario.dias[diaIndex].horarios = data.horarios; // Actualiza horarios existentes
            console.log(`Actualizado horarios para el día ${data.dia}:`, horario.dias[diaIndex].horarios);
        } else {
            // Si el día no existe, agrégalo
            horario.dias.push({ dia: data.dia, horarios: data.horarios }); // Agrega nuevo día y horarios
            console.log(`Añadido nuevo día ${data.dia} con horarios:`, data.horarios);
        }

        // Guardar los cambios
        const updatedHorario = await horario.save(); // Guarda los cambios en la base de datos
        console.log('Horario actualizado:', updatedHorario);
        return NextResponse.json({ success: true, data: updatedHorario });
    } catch (error: any) {
        console.error("Error al actualizar el horario:", error);
        return NextResponse.json({ success: false, message: 'Error al actualizar el horario' }, { status: 500 });
    }
}



































export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await ConnectDB();
        const { id } = params;
        const deletedHorario = await Horario.findByIdAndDelete(id);
        if (!deletedHorario) {
            return NextResponse.json({ success: false, message: 'Horario no encontrado' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'Horario eliminado' });
    } catch (error: any) {
        console.error("Error al eliminar el horario:", error);
        return NextResponse.json({ success: false, message: 'Error al eliminar el horario' }, { status: 500 });
    }
}
