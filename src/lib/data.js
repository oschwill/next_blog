import { connectToDb } from './db';
import { Post, User } from './models';
import { unstable_noStore as noStore } from 'next/cache';

export const getAllPosts = async (slug) => {
  try {
    connectToDb();

    const posts = await Post.find();

    return posts;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch posts!');
  }
};

export const getSinglePost = async (slug) => {
  try {
    connectToDb();

    const post = await Post.findOne({ slug });

    return post;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch posts!');
  }
};

export const getUser = async (userId) => {
  noStore(); // caching deaktivieren
  try {
    connectToDb();

    const user = await User.findById({ _id: userId }).lean();

    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch posts!');
  }
};

export const getUsers = async () => {
  try {
    connectToDb();

    const user = await User.find();

    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch posts!');
  }
};
