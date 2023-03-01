import { Link } from "@remix-run/react";
import { BlobWithText } from "~/components/blobs/BlobWithText";

export default function Index() {
  return (
    <main>
      <section>
        <h1 className="pt-8">Læringshub</h1>
      </section>
      <section className="grid grid-cols-1 gap-5 pt-20 lg:grid-cols-4">
        <Link to="blogposts">
          <BlobWithText
            text="Bloggposter"
            blobPathNr={0}
          />
        </Link>

        <Link to="course">
          <BlobWithText
            text="Kurs"
            blobPathNr={1}
          />
        </Link>
        <Link to="lecture">
          <BlobWithText
            text="Foredrag"
            blobPathNr={2}
          />
        </Link>
        <Link to="videos">
          <BlobWithText
            text="Videoer"
            blobPathNr={3}
          />
        </Link>
      </section>
    </main>
  );
}
