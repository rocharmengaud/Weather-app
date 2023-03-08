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

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${option.lat}&lon=${option.lon}&units=metric&appid=${process.env.NEXT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((data) => console.log({ data }));
  };

  return (
    <>
      <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
        <section className="text-zinc-700 bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px]">
          <h1 className="text-zinc-700 text-4xl">
            Weather <span className="font-black">Forecast</span>
          </h1>
          <p className="mt-2 text-sm">Enter below a place you want to know the weather of and select an option from the dropdown</p>
          <div className="md:mt-4 relative flex mt-10">
            <input
              type="text"
              value={term}
              className="rounded-l-md px-2 py-1 bg-white border-2 border-white"
              placeholder="City"
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
                    {option.name}
                  </button>
                </li>
              ))}
            </ul>
            <button className="rounded-r-md border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 border-2 cursor-pointer">
              Search
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
