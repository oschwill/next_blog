'use server'; // Server side
import { revalidatePath } from 'next/cache';
import { connectToDb } from './db';
import { Post, User } from './models';
import { signIn, signOut } from './auth';
import bcrypt from 'bcrypt';

export const insertBlog = async (previousState, formData) => {
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
    revalidatePath('/admin');
  } catch (error) {
    console.log(error);
    return { error: 'Something went wrong' };
  }
};

export const deleteBlog = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);

    // refreshen die Seite auf der wir uns befinden
    revalidatePath('/blog');
    revalidatePath('/admin');
  } catch (error) {
    console.log(error);
  }
};

export const handleGithubLogin = async () => {
  'use server';
  await signIn('github');
};

export const handleLogout = async () => {
  await signOut('github');
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData);

  if (password !== passwordRepeat) return { error: 'Passwords do not match' };

  try {
    connectToDb();

    // checken ob User schon existiert
    const user = await User.findOne({ username });

    if (user) {
      return { error: 'Username already exists' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPost = new User({
      username,
      email,
      password: hashedPassword,
      img,
      passwordRepeat,
    });

    await newPost.save();

    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', { username, password });
  } catch (error) {
    if (error.type && error.type.includes('CredentialsSignin')) {
      return { error: 'Invalid username or password' };
    }

    throw error;
  }
};

/* ONLY FOR ADMIN */
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await User.deleteMany({ userId: id }); // Die Posts löschen
    await User.findByIdAndDelete(id);

    // refreshen die Seite auf der wir uns befinden
    revalidatePath('/admin');
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (previousState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();

    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();

    // refreshen die Seite auf Blog
    revalidatePath('/admin');
  } catch (error) {
    console.log(error);
    return { error: 'Something went wrong' };
  }
};
