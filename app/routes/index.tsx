import { Link } from "@remix-run/react";
import { BlobWithNavigation } from "~/components/blobs/BlobWithNavigation";

export default function Index() {
  return (
    <main>
      <section className="grid grid-cols-1 gap-5 pt-20 lg:grid-cols-4">
        <Link to="blogposts">
          <BlobWithNavigation
            text="Bloggposter"
            blobPathNr={0}
          />
        </Link>

        <Link to="course">
          <BlobWithNavigation
            text="Kurs"
            blobPathNr={1}
          />
        </Link>
        <Link to="lecture">
          <BlobWithNavigation
            text="Foredrag"
            blobPathNr={2}
          />
        </Link>
        <Link to="videos">
          <BlobWithNavigation
            text="Videoer"
            blobPathNr={3}
          />
        </Link>
      </section>
    </main>
  );
}
