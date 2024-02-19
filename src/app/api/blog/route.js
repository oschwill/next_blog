import { Post } from '@/lib/models';
import { connectToDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
  try {
    connectToDb();

    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (err) {
    console.log(err);
  }
};
