import Link from 'next/link';
import Links from './links/Links';

/* CSS */
import styles from '@/components/navbar/navbar.module.css';
import { auth } from '@/lib/auth';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className={styles.container}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>
      <Links session={session} />
    </header>
  );
};

export default Navbar;
