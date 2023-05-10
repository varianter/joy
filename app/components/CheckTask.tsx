interface CheckTaskProps {
  title: string;
  description: string;
  done: boolean;
}

const CheckTask = (props: CheckTaskProps) => {
  const { title, description, done } = props;

  return (
    <div className="mb-10 flex w-full flex-col items-start rounded-2xl bg-variant-blue-2 p-5">
      <h4 className="pl-4">{title}</h4>

      <div className="flex flex-row items-center justify-center">
        <label htmlFor="checkbox">{done}</label>
        <input type="checkbox" name="checkbox" className="m-4" checked={done} />
        <p className="text-left">{description}</p>
      </div>
    </div>
  );
};

export default CheckTask;
