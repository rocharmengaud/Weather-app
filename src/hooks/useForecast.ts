import { useState, useEffect, ChangeEvent } from 'react';
import { optionType } from '@/types';
import { forecastType } from '@/types';

export const useForecast = () => {
  const [term, setTerm] = useState<string>('');
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  // Refreshing whenever the user types into the input for cities
  const getSearchOptions = (value: string) => {
    // See next.config.js for the process.env
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.NEXT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((e) => console.log(e));
  };

  // Listening whenever the user types into the input for cities
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === '') return;
    getSearchOptions(value);
  };

  const getForecast = (city: optionType) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.NEXT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          // spread operator to access keys easily
          ...data.city,
          list: data.list.slice(0, 16),
        };
        setForecast(forecastData);
      })
      .catch((e) => console.log(e));
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
    setTerm('');
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  const clearForecast = () => {
    setForecast(null);
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
    clearForecast,
  };
};
