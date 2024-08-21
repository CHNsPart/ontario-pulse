import { useRouter } from 'next/router';

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="mb-4 text-gray-600 hover:text-gray-800">
      Go Back
    </button>
  );
};

export default BackButton;
