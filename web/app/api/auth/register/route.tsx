export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se usuário já existe
    const userExiste = await prisma.user.findUnique({
      where: { email },
    });

    if (userExiste) {
      return NextResponse.json(
        { error: "Usuário já cadastrado" },
        { status: 409 }
      );
    }

    // Gerar hash da senha
    const senhaHash = await bcrypt.hash(password, 10);

    // Criar usuário
    const novoUsuario = await prisma.user.create({
      data: {
        email,
        password: senhaHash,
        role: role || "common", // default seguro
      },
    });

    return NextResponse.json(
      {
        message: "Usuário cadastrado com sucesso",
        user: {
          id: novoUsuario.id,
          email: novoUsuario.email,
          role: novoUsuario.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no cadastro:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
