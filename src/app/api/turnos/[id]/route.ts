import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';
import Turno from '@/lib/models/Turno';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await ConnectDB();
        const { id } = params;
        if (!id) {
            return NextResponse.json({ success: false, message: 'ID no proporcionado' }, { status: 400 });
        }
        const turno = await Turno.findById(id);
        if (!turno) {
            return NextResponse.json({ success: false, message: 'Turno no encontrado' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: turno });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error al obtener el turno' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await ConnectDB();
        const { id } = params;
        if (!id) {
            return NextResponse.json({ success: false, message: 'ID no proporcionado' }, { status: 400 });
        }

        const data = await request.json();
        const updatedTurno = await Turno.findByIdAndUpdate(id, data, { new: true });

        if (!updatedTurno) {
            return NextResponse.json({ success: false, message: 'Turno no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedTurno });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error al actualizar el turno' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await ConnectDB();
        const { id } = params;
        if (!id) {
            return NextResponse.json({ success: false, message: 'ID no proporcionado' }, { status: 400 });
        }

        const deletedTurno = await Turno.findByIdAndDelete(id);

        if (!deletedTurno) {
            return NextResponse.json({ success: false, message: 'Turno no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Turno eliminado' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error al eliminar el turno' }, { status: 500 });
    }
}
