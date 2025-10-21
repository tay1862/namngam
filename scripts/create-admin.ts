#!/usr/bin/env ts-node

/**
 * Script to create admin user
 * Run: npm run create-admin
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main() {
  console.log('\n🔐 Create Admin User for NAMNGAM\n');

  const name = await question('ຊື່ຜູ້ໃຊ້ (Name): ');
  const email = await question('ອີເມວ (Email): ');
  const password = await question('ລະຫັດຜ່ານ (Password): ');

  if (!name || !email || !password) {
    console.error('❌ ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ');
    process.exit(1);
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.error(`❌ ອີເມວ ${email} ມີຢູ່ແລ້ວ`);
    process.exit(1);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('\n✅ ສ້າງ Admin User ສຳເລັດ!');
  console.log(`\nUser ID: ${user.id}`);
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
  console.log(`Role: ${user.role}`);
  console.log('\n🎉 ສາມາດເຂົ້າສູ່ລະບົບໄດ້ທີ່: /admin/login\n');

  rl.close();
  await prisma.$disconnect();
}

main()
  .catch((error) => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  });
