import { FaLocationCrosshairs } from 'react-icons/fa6';
import { useUserLocation } from '../../../hooks/useUserLocation';

export type MapRecenterEvent = (coords: { lat: number; lng: number }) => void;
type Props = { onRecenter: MapRecenterEvent };

export function CurrentLocationButton({ onRecenter }: Props) {
  const { location } = useUserLocation();

  return (
    <button
      className='absolute right-0 top-[calc(100vh-300px)] mx-2 rounded-full bg-brand p-2 text-[24px] text-white shadow'
      onClick={() => location && onRecenter(location)}
    >
      <FaLocationCrosshairs />
    </button>
  );
}
