'use client';

import { insertBlog } from '@/lib/action';
import styles from '@/components/adminPostForm/adminPostForm.module.css';
import { useFormState } from 'react-dom';

const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(insertBlog, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="slug" placeholder="slug" />
      <input type="text" name="img" placeholder="img" />
      <textarea type="text" name="desc" placeholder="desc" rows={10} />
      <button>Add</button>
      {state?.error && (
        <p style={{ backgroundColor: 'pink', color: 'darkred', padding: '5px' }}>{state.error}</p>
      )}
    </form>
  );
};

export default AdminPostForm;
