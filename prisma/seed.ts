import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Change this password after your first login — this is just the initial one.
  const adminPassword = await bcrypt.hash('ChangeThisPassword123!', 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@oakandcode.in' },
    update: {},
    create: {
      email: 'admin@oakandcode.in',
      password: adminPassword,
      name: 'Oak & Code Admin',
    },
  });

 

  console.log('✅ Database seeded — admin user + safe defaults only, no placeholder content.');
  console.log('📧 Admin login: admin@oakandcode.in / ChangeThisPassword123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });