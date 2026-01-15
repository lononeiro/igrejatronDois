export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

// ==========================
// LISTAR IGREJAS (PÚBLICO)
// ==========================
export async function GET() {
  try {
    const igrejas = await prisma.igreja.findMany({
      orderBy: { nome: "asc" },
    });
    return NextResponse.json(igrejas);
  } catch (error) {
    console.error("Erro ao listar igrejas:", error);
    return NextResponse.json({ error: "Erro ao buscar igrejas" }, { status: 500 });
  }
}

// ==========================
// CRIAR IGREJA
// ==========================
export async function POST(request: Request) {
  const user = await getCurrentUser(request);
  if (!user || user.role !== "super_admin") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { nome, endereco } = body;

    if (!nome || !endereco) {
      return NextResponse.json({ error: "Nome e endereço são obrigatórios" }, { status: 400 });
    }

    const novaIgreja = await prisma.igreja.create({
      data: { nome, endereco },
    });

    return NextResponse.json(novaIgreja, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar igreja:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}