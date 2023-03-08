import { Link } from "@remix-run/react";
import AnimatedButton from "../buttons/AnimatedButton";
import Card from "./Card";

interface CardWithVideoProps {
  youtubeId: string;
  title: string;
  linkToId: string;
  createdAt: string;
}

const CardWithVideo = (props: CardWithVideoProps) => {
  const { youtubeId, title, linkToId, createdAt } = props;

  return (
    <Card>
      <div className="flex h-full flex-col justify-between py-2">
        <section>
          <iframe
            title={title}
            className="block h-[15rem] w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?controls=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <h1 className="my-4 text-left text-base">{title}</h1>
        </section>

        <footer className="inline-flex items-end justify-between leading-none">
          <Link to={linkToId}>
            <AnimatedButton text="Se mer" />
          </Link>

          <p className="text-variant-black">
            {new Date(createdAt).toLocaleDateString("nb")}
          </p>
        </footer>
      </div>
    </Card>
  );
};

export default CardWithVideo;
