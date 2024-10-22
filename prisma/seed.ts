/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = "admin";
  const hashedPassword = await bcrypt.hash(password, 10);

  const positions = await prisma.workPosition.findMany();
  if (!positions.length) {
    await prisma.workPosition.createMany({
      data: [{ name: "HRD" }, { name: "Programmer" }, { name: "Admin" }],
    });
  }

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

  const wpHrd = await prisma.workPosition.findFirst({
    where: { name: "HRD" },
  });
  const wpProg = await prisma.workPosition.findFirst({
    where: { name: "Programmer" },
  });

  const trainer1 = await prisma.user.upsert({
    where: { username: "trainerhrd1" },
    update: {},
    create: {
      username: "trainerhrd1",
      name: "Trainer HRD 1",
      role: "trainer",
      workPositionId: wpHrd?.id ?? "",
      password: hashedPassword,
      updatedAt: new Date(),
    },
  });

  const trainer2 = await prisma.user.upsert({
    where: { username: "trainerprog1" },
    update: {},
    create: {
      username: "trainerprog1",
      name: "Trainer Programmer 1",
      role: "trainer",
      workPositionId: wpProg?.id ?? "",
      password: hashedPassword,
      updatedAt: new Date(),
    },
  });

  console.log({ admin, trainers: [trainer1, trainer2] });
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
