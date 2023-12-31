import getRandomQuip from "@/lib/static/loading-quips";

const Loading: React.FC = () => {
  const quip = getRandomQuip()
  return (
    <div className='flex flex-col gap-12 w-[100dvw] h-[100dvh] bg-base-100 items-center justify-center text-6xl p-4'>
      <h3 className='text-xl text-primary text-center'>{quip}</h3>
      <span className='loading loading-bars loading-lg mb-96 text-primary' />
    </div>
  );
};

export default Loading;
