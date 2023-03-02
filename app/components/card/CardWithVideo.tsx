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
    <Card title={title} linkToId={linkToId} createdAt={createdAt}>
      <iframe
        title={title}
        className="block h-[20rem] w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?controls=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </Card>
  );
};

export default CardWithVideo;
