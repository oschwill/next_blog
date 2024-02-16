import PostCard from '@/components/postCard/PostCard';

/* CSS */
import styles from './blog.module.css';
import { getAllPosts } from '@/lib/data';

const BlogPage = async () => {
  const posts = await getAllPosts();
  return (
    <div className={styles.container}>
      {posts &&
        posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <PostCard post={{ ...post, img: '/images/placeholder.jpg' }} />
          </div>
        ))}
    </div>
  );
};

export default BlogPage;
