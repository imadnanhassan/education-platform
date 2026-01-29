import { Metadata } from 'next';
import MainHeader from '@/components/layouts/frontend/MainHeader';
import MainFooter from '@/components/layouts/frontend/MainFooter';

export const metadata: Metadata = {
    title: 'গ্র্যাভিটন একাডেমি',
    description: 'Education & Abroad Preparation Platform',
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <MainHeader />
            <main className="min-h-screen">
                {children}
            </main>
            <MainFooter />
        </div>
    );
}