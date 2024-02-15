import Links from './links/Links';

/* CSS */
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>Logo</div>
      <Links />
    </header>
  );
};

export default Navbar;
