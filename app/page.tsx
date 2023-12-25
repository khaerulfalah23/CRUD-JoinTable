import Link from 'next/link';

const Home = () => {
  return (
    <Link
      className="bg-blue-300 px-5 py-3 rounded-md font-bold"
      href="/products"
    >
      Product
    </Link>
  );
};

export default Home;
