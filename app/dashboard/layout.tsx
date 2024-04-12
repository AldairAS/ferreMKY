import Footer from "@components/ui/shared/footer";
import NavigationMenu from "@components/ui/shared/menu";

export default function FerreMKYLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen w-full  flex-col bg-muted/40">
      <NavigationMenu />
      {/* //FIXME: Add a some sort of margin that is applied to all the pages nested properly, the actual ml=14 is not working on all pages */}
      <main className="lg:ml-14">{children}</main>
      <Footer />
    </section>
  );
}
