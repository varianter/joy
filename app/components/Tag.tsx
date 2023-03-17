interface TagProps {
  children: JSX.Element;
}

const Tag = (props: TagProps) => {
  const { children } = props;

  return <div>{children}</div>;
};

export default Tag;
