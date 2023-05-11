import { type LoaderArgs, redirect } from "@remix-run/server-runtime";
import { getImage } from "~/models/content.server";

const notFound = () => redirect("/assets/default-article-image.svg", 302);

export async function loader({ params }: LoaderArgs) {
  try {
    const content = await getImage(params.id ?? "");
    if (!content?.dataUrl) {
      return notFound();
    }

    const { contentType, base64 } = extractImage(content.dataUrl);
    return new Response(Buffer.from(base64, "base64"), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Cache for a long time. Most likely image doesn't change that often...
        "Cache-Control": "max-age=604800, stale-while-revalidate=86400",
      },
    });
  } catch (e) {
    return notFound();
  }
}

function extractImage(imageStr: string): {
  contentType: string;
  base64: string;
} {
  const data = imageStr.match(/^data:([^;]+);base64,(.*)$/);
  if (!data) {
    return {
      contentType: "image/png",
      base64: imageStr,
    };
  }
  return {
    contentType: data[1],
    base64: data[2],
  };
}
