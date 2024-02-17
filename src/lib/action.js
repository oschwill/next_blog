'use server'; // Server side
import { revalidatePath } from 'next/cache';
import { connectToDb } from './db';
import { Post } from './models';

export const insertBlog = async (formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();

    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();

    // refreshen die Seite auf Blog
    revalidatePath('/blog');
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);

    // refreshen die Seite auf Blog
    revalidatePath('/blog');
  } catch (error) {
    console.log(error);
  }
};
