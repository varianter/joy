interface LevelProps {
  tag: string;
}

const Level = ({ tag }: LevelProps) => {
  return (
    <div>
      {tag == "beginner" ? (
        <img
          alt="Beginner icon"
          className="pl-3"
          src={"/assets/icons/beginner.svg"}
        />
      ) : tag == "intermediate" ? (
        <img
          alt="Intermediate icon"
          className="pl-3"
          src={"/assets/icons/intermediate.svg"}
        />
      ) : tag == "advanced" ? (
        <img
          alt="Advanced icon"
          className="pl-3"
          src={"/assets/icons/advanced.svg"}
        />
      ) : null}
    </div>
  );
};

export default Level;
