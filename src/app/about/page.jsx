import Image from 'next/image';

/* CSS */
import styles from './about.module.css';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/images/about.png" alt="About" fill className={styles.img} />
      </div>
    </div>
  );
};

export default AboutPage;
