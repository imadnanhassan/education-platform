import { Metadata } from 'next';
import Navbar from '@/components/layouts/frontend/Navbar';
import Footer from '@/components/layouts/frontend/Footer';

export const metadata: Metadata = {
    title: 'গ্র্যাভিটন একাডেমি',
    description: 'Education & Abroad Preparation Platform',
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </div>
    );
}