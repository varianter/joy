import { Form } from "@remix-run/react";

interface SearchInput {
  onChange: (e: any) => void;
}

export const SearchInput = (props: SearchInput) => {
  const { onChange } = props;

  return (
    <Form>
      <div className="relative w-auto">
        <input
          type="search"
          className="block w-full rounded-full bg-variant-blue p-4 pl-8 text-sm text-white md:bg-variant-blue-2"
          placeholder="Søk ..."
          onChange={onChange}
        />
        <button
          type="submit"
          className="absolute right-2.5 bottom-2.5 rounded-lg px-4 py-2 "
        >
          <img
            alt={"Figur av læreglede"}
            className="fill-current h-[1rem]"
            src="/assets/icons/arrowRight.svg"
          />
        </button>
      </div>
    </Form>
  );
};
