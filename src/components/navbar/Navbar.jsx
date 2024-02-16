import Link from 'next/link';
import Links from './links/Links';

/* CSS */
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.container}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>
      <Links />
    </header>
  );
};

export default Navbar;
