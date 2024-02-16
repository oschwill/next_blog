import Image from 'next/image';
import styles from './contact.module.css';

// export const metadata = {
//   title: 'Contact Page',
//   description: 'Contact description',
// };

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/images/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <div>
            <label htmlFor="name"></label>
            <input type="text" placeholder="Name and Surname" name="name" id="name" />
          </div>
          <div>
            <label htmlFor="email"></label>
            <input type="text" placeholder="Email Address" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="phone"></label>
            <input type="text" placeholder="Phone Number (Optional)" name="phone" id="phone" />
          </div>
          <div>
            <label htmlFor="message"></label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder="Message"
            ></textarea>
          </div>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
