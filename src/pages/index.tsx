import { ChangeEvent, useState } from 'react';
import { optionType } from '@/types';

export default function Home(): JSX.Element {
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);

  const getSearchOptions = (value: string) => {
    // See next.config.js for the process.env
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.NEXT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setOptions(data));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === '') return;
    getSearchOptions(value);
  };

  const onOptionSelect = (option: optionType) => {
    console.log(option.name);
  };

  return (
    <>
      <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
        <section className="text-zinc-700 bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px]">
          <h1 className="text-4xl text-zinc-700">
            Weather <span className="font-black">Forecast</span>
          </h1>
          <p className="text-sm mt-2">Enter below a place you want to know the weather of and select an option from the dropdown</p>
          <div className="relative flex mt-10 md:mt-4">
            <input
              type="text"
              value={term}
              className="px-2 py-1 rounded-l-md border-2 border-white bg-white"
              placeholder="City"
              onChange={onInputChange}
            ></input>
            <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
              {/* Here, optionType refers to src/types/index.ts */}
              {options.map((option: optionType, index: number) => (
                <li key={option.name + '-' + index}>
                  <button
                    className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}
                  </button>
                </li>
              ))}
            </ul>
            <button className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer">
              Search
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
