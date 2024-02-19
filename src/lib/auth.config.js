export const authConfig = {
  // Weiterleitung an die login falls nicht authorisiert
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      console.log(request);
      // Hier geben wir an welche Authorisierung der User hat wenn er bestimmte Seiten besucht
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith('/admin');
      const isOnBlogPage = request.nextUrl?.pathname.startsWith('/blog');
      const isOnLoginPage = request.nextUrl?.pathname.startsWith('/login');

      // Only for admin => wenn nicht admin dann returnen wir false auf dieser Seite
      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }
      // only for auth users => wenn nciht eingeloggt dann returnen wir false
      if (isOnBlogPage && !user) {
        return false;
      }

      // only for unauth user => wenn eingeloggt dann leiten wir auf die hauptseite um
      if (isOnLoginPage && user) {
        return Response.redirect(new URL('/', request.nextUrl));
      }

      return true;
    },
  },
};
