import { Link } from "@remix-run/react";
import { BlobCard } from "~/components/cards/BlobCard";

export default function Index() {
  return (
    <main>
      <section>
        <h1 className="pt-8">Læringshub</h1>
      </section>
      <section className="grid grid-cols-1 gap-5 pt-20 lg:grid-cols-4">
        <Link to="blogposts">
          <BlobCard text="Bloggposter" bgColor="#028377" />
        </Link>

        <Link to="course">
          <BlobCard text="Kurs" bgColor="#028377" />
        </Link>
        <Link to="lecture">
          <BlobCard text="Foredrag" bgColor="#028377" />
        </Link>
        <Link to="videoes">
          <BlobCard text="Videoer" bgColor="#028377" />
        </Link>
      </section>
    </main>
  );
}
