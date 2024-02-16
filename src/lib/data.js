export const getAllPosts = async (slug) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 3600 }, // refetch die Daten alle 3600 Sekunden neu, sonst holt er sich die Daten aus dem Cache
  });

  if (!res.ok) {
    throw new Error('something went wrong');
  }

  return res.json();
};

export const getSinglePost = async (slug) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  return res.json();
};

export const getUsers = async (userId) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  return res.json();
};
