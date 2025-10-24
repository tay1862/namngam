import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import bcrypt from 'bcrypt';
import { checkLoginRateLimit, recordLoginSuccess, recordLoginFailure } from './login-rate-limit';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'],
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('ກະລຸນາໃສ່ອີເມວແລະລະຫັດຜ່ານ');
        }

        // Check rate limit
        const rateLimit = checkLoginRateLimit(credentials.email);
        if (!rateLimit.allowed) {
          throw new Error(rateLimit.error || 'ພະຍາຍາມເຂົ້າລະບົບຫຼາຍເກີນໄປ');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          recordLoginFailure(credentials.email);
          throw new Error('ອີເມວຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          recordLoginFailure(credentials.email);
          throw new Error('ອີເມວຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ');
        }

        // Success - clear rate limit
        recordLoginSuccess(credentials.email);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours
    updateAge: 2 * 60 * 60, // Update session every 2 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};
