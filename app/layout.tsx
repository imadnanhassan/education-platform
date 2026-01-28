import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Anek_Bangla } from 'next/font/google';

export const metadata: Metadata = {
    title: {
        template: '%s | গ্র্যাভিটন একাডেমি',
        default: 'গ্র্যাভিটন একাডেমি - Education & Abroad Preparation Platform',
    },
    description: 'Complete education platform for academic excellence and abroad preparation',
};

const nunito = Nunito({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
});

const anekBangla = Anek_Bangla({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['bengali', 'latin'],
    display: 'swap',
    variable: '--font-anek-bangla',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="bn">
            <body className={`${nunito.variable} ${anekBangla.variable}`}>
                <ProviderComponent>{children}</ProviderComponent>
            </body>
        </html>
    );
}
