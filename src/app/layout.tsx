import './globals.css';
import { Inter, Poppins, Barlow } from 'next/font/google';
import { Providers } from './providers';

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});
const barlow = Barlow({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: '--font-barlow',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body
                className={`${poppins.className} ${inter.variable} ${barlow.variable} antialiased bg-background`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
