export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ==========================
// LISTAR EVENTOS
// ==========================
export async function GET() {
  try {
    const eventos = await prisma.evento.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(eventos);
  } catch (error) {
    console.error("Erro ao listar eventos:", error);

    return NextResponse.json(
      { error: "Erro ao buscar eventos" },
      { status: 500 }
    );
  }
}

// ==========================
// CRIAR EVENTO
// ==========================
export async function POST(request: Request) {
  try {
    const body: {
      title: string;
      date: string;
      description?: string;
      backgroundColor?: string;
      igrejaId: string;
    } = await request.json();

    // Validação básica
    if (!body.title || !body.date || !body.igrejaId) {
      return NextResponse.json(
        { error: "Título, data e igrejaId são obrigatórios" },
        { status: 400 }
      );
    }

    // Ajuste de fuso horário
    const dataAjustada = new Date(`${body.date}T12:00:00Z`);

    const novoEvento = await prisma.evento.create({
      data: {
        title: body.title,
        date: dataAjustada,
        backgroundColor: body.backgroundColor ?? "#1e3a8a",
        textColor: "#ffffff",
        description: body.description ?? "",
        igreja: {
          connect: {
            id: body.igrejaId,
          },
        },
      },
    });

    return NextResponse.json(novoEvento, { status: 201 });

  } catch (error: unknown) {
    console.error("ERRO CRÍTICO NO PRISMA:", error);

    let message = "Erro interno do servidor";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      {
        error: "Erro interno",
        details: message,
      },
      { status: 500 }
    );
  }
}
