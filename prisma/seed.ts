/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = "admin";
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.workPosition.createMany({
    data: [{ name: "HRD" }, { name: "Programmer" }, { name: "Admin" }],
  });
  const workPosition = await prisma.workPosition.findFirst({
    where: { name: "Admin" },
  });

  const admin = await prisma.user.upsert({
    where: { username: "superadmin" },
    update: {},
    create: {
      username: "superadmin",
      role: "superadmin",
      name: "Super Admin",
      updatedAt: new Date(),
      password: hashedPassword,
      workPositionId: workPosition?.id ?? "",
    },
  });

  console.log({ admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
