import Sunrise from '@/assets/Sunrise';
import Sunset from '@/assets/Sunset';
import { forecastType } from '@/types';
import Image from 'next/image';

type Props = {
  data: forecastType;
};
// Little component
const Degree = ({ temp }: { temp: number }): JSX.Element => {
  return (
    <span>
      {temp}
      {/* sup (for superscript) converts the o to make it look like the degree symbol*/}
      <sup>o</sup>
    </span>
  );
};
export const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0];

  return (
    <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name}
            <span className="font-thin"> {data.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            {/* Rounding the value with Math.round */}
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main} {''} {today.weather[0].description}
          </p>
          <p className="text-sm">
            H: <Degree temp={Math.ceil(today.main.temp_max)} /> {''}
            L: <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>
        <section className="flex pb-2 mt-4 mb-5 overflow-x-scroll">
          {data.list.map((item, index) => (
            // flex shring 0 to keep good icon sizes
            <div className="inline-block text-center w-[50px] flex-shrink-0" key={index}>
              {/* Way to convert data from item.dt */}
              <p className="text-sm">{index === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}</p>
              {/* Using icons from the API itself */}
              <Image
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={`weather-icon-${item.weather[0].description}`}
                width={100}
                height={100}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>
        <section className="text-zinc-700 flex justify-between">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
            <Sunrise />
          </div>
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
            <Sunset />
          </div>
        </section>
      </div>
    </div>
  );
};
