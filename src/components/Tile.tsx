import Feels from '@/assets/Feels';
import Humidity from '@/assets/Humidity';
import Pop from '@/assets/Pop';
import Pressure from '@/assets/Pressure';
import Visibility from '@/assets/Visibility';
import Wind from '@/assets/Wind';

type Props = {
  // restricting what the icon can be
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop';
  title: string;
  info: string | JSX.Element;
  description: string;
};

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
  pressure: Pressure,
  pop: Pop,
};

export const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon];

  return (
    <article className="w-[140px] h-[130px] bg-white/20 backdrop-blur-lg rounded drop-shadow-lg p-2 mb-6 flex flex-col text-center justify-center gap-2">
      <div className="text-zinc-700 flex items-center justify-center text-sm font-bold">
        <Icon /> <h4 className="text-zinc-700 ml-1">{title}</h4>
      </div>
      <h3 className="text-zinc-700 mt-2 text-lg">{info}</h3>
      <p className="text-xs font-bold">{description}</p>
    </article>
  );
};
