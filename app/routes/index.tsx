import { Link } from "@remix-run/react";
import { BlobWithNavigation } from "~/components/blobs/BlobWithNavigation";

export default function Index() {
  return (
    <main className="flex items-center justify-center">
      <section className="grid max-w-xs grid-cols-1 md:max-w-2xl md:grid-cols-2 md:gap-5 lg:max-w-5xl lg:grid-cols-4 lg:pt-20">
        <Link to="blogposts">
          <BlobWithNavigation text="Bloggposter" blobPathNr={0} />
        </Link>

        <Link to="course">
          <BlobWithNavigation text="Kurs" blobPathNr={1} />
        </Link>
        <Link to="lecture">
          <BlobWithNavigation text="Foredrag" blobPathNr={2} />
        </Link>
        <Link to="videos">
          <BlobWithNavigation text="Videoer" blobPathNr={3} />
        </Link>
      </section>
    </main>
  );
}
