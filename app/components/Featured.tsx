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
    <div>
      <section>
        <h3 className="mb-8 text-left text-white">Fremhevet innhold</h3>
        <div>
          <div className="grid grid-cols-1 gap-7">
            {horizontalFeaturedContent?.map((content) => (
              <PreviewCard
                key={content.id}
                className="my-5"
                content={content}
                direction="horizontal"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {verticalFeaturedContent?.map((content) => (
              <PreviewCard
                content={content}
                key={content.id}
                className="my-5"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Featured;
