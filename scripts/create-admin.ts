import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || 'admin@namngam.com';
  const password = process.argv[3] || 'admin123';
  const name = process.argv[4] || 'Admin';

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('❌ User already exists:', email);
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'admin',
    },
  });

  console.log('✅ Admin user created successfully!');
  console.log('📧 Email:', user.email);
  console.log('🔑 Password:', password);
  console.log('');
  console.log('⚠️  IMPORTANT: Change the password after first login!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
