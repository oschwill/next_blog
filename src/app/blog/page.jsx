import PostCard from '@/components/postCard/PostCard';

/* CSS */
import styles from './blog.module.css';
import { getAllPosts } from '@/lib/data';

export const metadata = {
  title: 'Blog Page',
  description: 'Blog description',
};

const BlogPage = async () => {
  const posts = await getAllPosts();

  console.log(posts);

  return (
    <div className={styles.container}>
      {posts &&
        posts.map((post) => (
          <div className={styles.post} key={post._id}>
            <PostCard post={post} />
          </div>
        ))}
    </div>
  );
};

export default BlogPage;
