interface BlobCardProps {
  text: string;
  bgColor: string;
}

export const BlobCard = (props: BlobCardProps) => {
  const { text, bgColor } = props;
  return (
    <div className="flex justify-center text-[#028377] hover:text-[#01574F]">
      <svg
        className="fill-current"
        width="402"
        height="373"
        viewBox="0 0 402 373"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M195.585 0.000136638C250.498 -0.0906958 290.11 45.1216 325.978 86.71C364.484 131.357 411.312 179.527 400.39 237.468C389.186 296.905 330.984 332.715 275.203 356.074C223.593 377.687 166.825 379.357 115.663 356.704C62.1945 333.03 12.3502 292.482 1.69839 234.976C-8.59236 179.42 29.7739 130.718 65.7314 87.1405C100.638 44.8367 140.745 0.0908474 195.585 0.000136638Z"
          fill="currentColor"
        />
      </svg>

      <div className="absolute mt-[9rem]">
        <p className="pb-5 text-4xl text-white">{text}</p>
        <svg
          width="157"
          height="48"
          viewBox="0 0 157 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.27573 24.2977C5.27573 24.2977 20.6786 9.43944 33.8571 8.80884C47.0357 8.17824 68.8066 22.5388 68.8066 22.5388C68.8066 22.5388 92.7033 39.7787 105.882 39.1481C119.06 38.5175 140.259 17.8386 140.259 17.8386"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="bevel"
          ></path>
          <path
            d="M123.386 8.77405L146.264 18.5305L143.3 43.218"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  );
};
