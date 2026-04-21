
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='mb-40'>
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        {children}
    </main>
  );
}