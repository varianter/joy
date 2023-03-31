interface LevelProps {
  tag: string;
}

const Level = ({ tag }: LevelProps) => {
  return (
    <div>
      {tag == "Nybegynner" ? (
        <div className="flex">
          <img
            alt="Beginner icon"
            className="pr-2"
            src={"/assets/icons/beginner.svg"}
          />
          <p className="text-white">Nybegynner</p>
        </div>
      ) : tag == "Middels" ? (
        <div className="flex">
          <img
            alt="Intermediate icon"
            className="pr-2"
            src={"/assets/icons/intermediate.svg"}
          />
          <p className="text-white">Middels</p>
        </div>
      ) : tag == "Avansert" ? (
        <div className="flex">
          <img
            alt="Advanced icon"
            className="pr-2"
            src={"/assets/icons/advanced.svg"}
          />
          <p className="text-white">Avansert</p>
        </div>
      ) : null}
    </div>
  );
};

export default Level;
