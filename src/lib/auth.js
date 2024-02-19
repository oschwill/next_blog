import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDb } from './db';
import { User } from './models';
import bcrypt from 'bcrypt';
import { authConfig } from './auth.config';

const login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error('Wrong credentials!');

    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordCorrect) throw new Error('Wrong credentials!');

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = login(credentials);
          return user;
        } catch (error) {
          console.log(error);
          console.log('TESTTTTTTT!!!!!!!');
          return null;
        }
      },
    }),
  ],
  // Wird genutzt um nach dem oauth verifizierung den User in die Datenbank zu schreiben
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'github') {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url,
            });

            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
