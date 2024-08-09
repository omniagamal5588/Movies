import Image from "next/image";
import MoviesTable from "./components/moviesTable";
import Link from "next/link";
import HomePage from "./pages/page";

export default function Home() {
  return (
  <main className="container mx-auto py-8  bg-red-50">
      <div className="mt-8">
         <HomePage />
      </div>
    </main>
  );
}
