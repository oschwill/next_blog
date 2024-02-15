import Link from 'next/link';

const NotFound = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae laboriosam hic ullam quidem
        deserunt unde maiores facere impedit enim tempora maxime pariatur, laudantium magnam soluta
        ducimus in laborum iure possimus!
      </p>
      <Link href="/">Return Home</Link>
    </div>
  );
};

export default NotFound;
