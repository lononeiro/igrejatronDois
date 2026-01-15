import { prisma } from "./prisma";

export async function getCurrentUser(request: Request) {
  const email = request.headers.get("x-user-email");
  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      role: true,
      churchId: true,
    },
  });

  return user;
}