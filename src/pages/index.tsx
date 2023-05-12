import { Forecast } from '@/components/Forecast';
import { useForecast } from '@/hooks/useForecast';
import Search from './search';

export default function Home(): JSX.Element {
  // This const is using my custom hook
  // It means that all the JS that was on this file has been transfered on useForecast.ts
  // And here is a way of using any of this JS :
  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit, clearForecast } = useForecast();

  return (
    <>
      <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 h-[100vh] w-full">
        {forecast ? (
          <Forecast data={forecast} clearForecast={clearForecast} />
        ) : (
          <Search term={term} options={options} onInputChange={onInputChange} onOptionSelect={onOptionSelect} onSubmit={onSubmit} />
        )}
      </main>
    </>
  );
}
