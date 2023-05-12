import { SearchBox } from '@/components/SearchBox';
import { optionType } from '@/types';
import { ChangeEvent } from 'react';

type Props = {
  term: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

export default function Search({ term, options, onInputChange, onOptionSelect, onSubmit }: Props): JSX.Element {
  return (
    <>
      <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 h-[100vh] w-full">
        <section className="text-zinc-700 bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px]">
          <h1 className="text-zinc-700 text-4xl">
            Weather <span className="font-black text-white">Forecast</span>
          </h1>
          <p className="mt-2 text-sm">Enter below a place you want to know the weather of and select an option from the dropdown</p>
          <SearchBox term={term} options={options} onInputChange={onInputChange} onOptionSelect={onOptionSelect} onSubmit={onSubmit} />
        </section>
      </main>
    </>
  );
}
