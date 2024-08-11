// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const GET = async (req, res) => {
  return NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          // Retrieve environment variables
          const validAdminName = process.env.ADMIN_USERNAME;
          const validPassword = process.env.ADMIN_PASSWORD;

          if (
            credentials.adminname === validAdminName &&
            credentials.password === validPassword
          ) {
            return { id: 1, name: 'Admin' }; // Return user object
          } else {
            throw new Error('Invalid credentials');
          }
        }
      })
    ],
    pages: {
      signIn: '/', 
    },
  });
};

export const POST = async (req, res) => {
  return NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          // Retrieve environment variables
          const validAdminName = process.env.ADMIN_USERNAME;
          const validPassword = process.env.ADMIN_PASSWORD;

          if (
            credentials.adminname === validAdminName &&
            credentials.password === validPassword
          ) {
            return { id: 1, name: 'Admin' };
          } else {
            throw new Error('Invalid credentials');
          }
        }
      })
    ],
    pages: {
      signIn: '/',
    },
  });
};
