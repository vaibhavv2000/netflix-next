import Link from 'next/link';
 
export default function NotFound() {
 return (
  <main className='grid h-screen place-items-center bg-black text-white'>
   <div className='bg-[#151515] p-4 rounded-lg max-w-80'>
    <h2 className='text-3xl font-bold'>Page Not Found</h2>
    <p className='text-lg my-2 text-white/80'>
     The page you request currently does not exist.
    </p>
    <Link href="/" className='underline text-blue-500 text-center'>
     Return Home
    </Link>
   </div>
  </main>
 );
};