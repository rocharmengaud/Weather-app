import { optionType } from '@/types';
import { ChangeEvent } from 'react';
import { useForecast } from '@/hooks/useForecast';

type Props = {
  term: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

export const SearchBox = ({ term, options, onInputChange, onOptionSelect, onSubmit }: Props): JSX.Element => {
  return (
    <div className="md:mt-4 relative flex mt-10">
      <input
        type="text"
        value={term}
        className="rounded-l-md px-2 py-1 bg-white border-2 border-white"
        placeholder="Type a city"
        onChange={onInputChange}
      ></input>
      <ul className="top-9 rounded-b-md absolute ml-1 bg-white">
        {/* Here, optionType refers to src/types/index.ts */}
        {options.map((option: optionType, index: number) => (
          <li key={option.name + '-' + index}>
            <button
              className="hover:bg-zinc-700 hover:text-white w-full px-2 py-1 text-sm text-left cursor-pointer"
              onClick={() => onOptionSelect(option)}
            >
              {option.name}, {option.country}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="rounded-r-md border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 border-2 cursor-pointer"
        onClick={onSubmit}
      >
        Search
      </button>
    </div>
  );
};
