import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-7xl">FerreMYK</h1>
      <Link href="/ferremyk">
        <Button>Ir al Dashboard</Button>
      </Link>
    </div>
  );
}
