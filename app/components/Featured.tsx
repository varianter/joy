import type { Content, Tag } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/server-runtime";
import PreviewCard from "./card/PreviewCard";

interface FeaturedProps {
  newestFeaturedContent: SerializeFrom<(Content & { tags: Tag[] })[]>;
}

const Featured = ({ newestFeaturedContent }: FeaturedProps) => {
  const horizontalFeaturedContent = newestFeaturedContent?.slice(0, 2);
  const verticalFeaturedContent = newestFeaturedContent?.slice(2);

  return (
    <section>
      <h2 className="mb-8 text-left text-white">Fremhevet innhold</h2>
      {horizontalFeaturedContent?.map((content) => (
        <PreviewCard
          key={content.id}
          content={content}
          className="mb-8"
          horizontal
        />
      ))}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {verticalFeaturedContent?.map((content) => (
          <PreviewCard content={content} key={content.id} className="mb-8" />
        ))}
      </div>
    </section>
  );
};

export default Featured;
