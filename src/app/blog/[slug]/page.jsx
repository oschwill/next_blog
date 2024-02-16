import Image from 'next/image';
/* CSS */
import styles from './singlePost.module.css';
import { Suspense } from 'react';
import PostUser from '@/components/postUser/PostUser';
import Loading from '@/app/loading';
import { getSinglePost } from '@/lib/data';

const SinglePostPage = async ({ params }) => {
  const { slug } = params;
  const post = {
    ...(await getSinglePost(slug)),
    img: '/images/placeholder.jpg',
    createdAt: new Date(),
  };

  return (
    <div className={styles.container}>
      {post && (
        <Suspense fallback={<Loading />}>
          <>
            {post.img && (
              <div className={styles.imgContainer}>
                <Image src={post.img} alt={post.title} fill className={styles.img} />
              </div>
            )}
            <div className={styles.textContainer}>
              <h1 className={styles.title}>{post.title}</h1>
              <div className={styles.detail}>
                <Suspense fallback={<div>Loading...</div>}>
                  <PostUser userId={post.userId} />
                </Suspense>

                <div className={styles.detailText}>
                  <span className={styles.detailTitle}>Published</span>
                  <span className={styles.detailValue}>
                    {post?.createdAt?.toString().slice(4, 16)}
                  </span>
                </div>
              </div>
              <div className={styles.content}>{post.body}</div>
            </div>
          </>
        </Suspense>
      )}
    </div>
  );
};

export default SinglePostPage;
