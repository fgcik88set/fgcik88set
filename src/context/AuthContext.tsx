// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';

// type User = {
//   id: string;
//   name: string;
//   email: string;
// } | null;

// type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

// interface AuthContextType {
//   user: User;
//   status: AuthStatus;
//   update: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const { data: session, status } = useSession();
//   const [user, setUser] = useState<User>(null);
//   const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');

//   const updateAuthState = async () => {
//     if (status === 'loading') {
//       setAuthStatus('loading');
//       return;
//     }

//     if (session?.user) {
//       setUser({
//         id: session.user.id,
//         name: session.user.name || '',
//         email: session.user.email || '',
//       });
//       setAuthStatus('authenticated');
//     } else {
//       setUser(null);
//       setAuthStatus('unauthenticated');
//     }
//   };

//   useEffect(() => {
//     updateAuthState();
//   }, [session, status]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         status: authStatus,
//         update: updateAuthState,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }