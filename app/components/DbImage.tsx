export default function DbImage({
  id,
  alt,
  className,
}: {
  alt?: string;
  id: string;
  className?: string;
}) {
  return <img alt={alt} className={className} src={`/cover/${id}`} />;
}
