import Image from 'next/image';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image src="/images/loading.gif" alt="is loading" width={300} height={300} />
    </div>
  );
};

export default Loading;
