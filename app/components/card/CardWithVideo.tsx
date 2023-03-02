import ShowMoreButton from "../buttons/ShowMoreButton";
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
      <>
        <iframe
          title={title}
          className="block h-[15rem] w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?controls=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <h1 className="my-6 ml-4 text-left text-base">{title}</h1>

        <footer className="flex items-center justify-between p-2 leading-none md:p-4">
          <ShowMoreButton linkToId={linkToId} />
          <p className="text-variant-black">
            {new Date(createdAt).toLocaleDateString("nb")}
          </p>
        </footer>
      </>
    </Card>
  );
};

export default CardWithVideo;
