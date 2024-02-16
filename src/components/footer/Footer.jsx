/* CSS */
import styles from './footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Olli S.</div>
      <div className={styles.text}>Olli agency © All rights reserved.</div>
    </div>
  );
};

export default Footer;
