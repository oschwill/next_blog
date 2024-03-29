import { getAllPosts } from '@/lib/data';
import styles from '@/components/adminPosts/adminPosts.module.css';
import Image from 'next/image';
import { deleteBlog } from '@/lib/action';

const AdminPosts = async () => {
  const posts = await getAllPosts();

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <div className={styles.detail}>
            <Image src={post.img || '/noAvatar.png'} alt="" width={50} height={50} />
            <span className={styles.postTitle}>{post.title}</span>
          </div>
          <form action={deleteBlog}>
            <input type="hidden" name="id" value={post.id} />
            <button className={styles.postButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;
