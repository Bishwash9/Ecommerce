import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}