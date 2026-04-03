import {Footer, Navbar} from "@/app/components";

export default function MainLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
        <Navbar />
          {children}
        <Footer />
        </>
    );
}

