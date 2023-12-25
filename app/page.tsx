import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link
        className="bg-blue-300 px-5 py-3 rounded-md font-bold"
        href="/products"
      >
        Product
      </Link>
    </div>
  );
};

export default Home;
