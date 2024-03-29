import Sunrise from '@/assets/Sunrise';
import Sunset from '@/assets/Sunset';
import { getHumidityValue, getPop, getSunTime, getVisibilityValue, getWindDirection } from '@/helpers';
import { forecastType } from '@/types';
import Image from 'next/image';
import { Tile } from './Tile';

type Props = {
  data: forecastType;
  clearForecast: () => void;
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
export const Forecast = ({ data, clearForecast }: Props): JSX.Element => {
  const today = data.list[0];

  return (
    <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-zinc-700 text-2xl font-black">
            {data.name}
            <span className="font-thin text-white"> {data.country}</span>
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
                width={50}
                height={50}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>
        <section className="flex flex-wrap justify-between">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
            <Sunrise /> <span className="mt-2">{getSunTime(data.sunrise)}</span>
          </div>
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
            <Sunset /> <span className="mt-2">{getSunTime(data.sunset)}</span>
          </div>
          {/* WIND */}
          <Tile
            icon="wind"
            title="wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(Math.round(today.wind.deg))}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          />
          {/* FEELS LIKE */}
          <Tile
            icon="feels"
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${Math.round(today.main.feels_like) < Math.round(today.main.temp) ? 'colder' : 'warmer'}`}
          />
          {/* HUMIDITY */}
          <Tile icon="humidity" title="Humidity" info={`${today.main.humidity}%`} description={getHumidityValue(today.main.humidity)} />
          {/* POP */}
          <Tile
            icon="pop"
            title="Precipitation"
            info={`${Math.round(today.pop)}%`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          />
          {/* PRESSURE */}
          <Tile
            icon="pressure"
            title="Pressure"
            info={`${today.main.pressure} hPa`}
            description={`${Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'} than standard`}
          />
          {/* VISIBILITY */}
          <Tile
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
        <div className="flex justify-center">
          <button
            className="border-zinc-100 hover:bg-blue-600 text-zinc-100 px-2 py-1 text-center bg-blue-400 border-2 rounded-md cursor-pointer"
            onClick={clearForecast}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};
