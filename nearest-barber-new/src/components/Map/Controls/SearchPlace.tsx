import { FaSearch } from 'react-icons/fa';
import { GoogleAutoComplete } from '../GoogleAutoComplete';
import { MapRecenterEvent } from './CurrentLocationButton';

type Props = { onRecenter: MapRecenterEvent };

export function SearchPlace({ onRecenter }: Props) {
  const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    const lat = place?.geometry?.location?.lat();
    const lng = place?.geometry?.location?.lng();

    if (!lat || !lng) return;

    const center = { lat, lng };
    onRecenter(center);
  };

  return (
    <div className='absolute top-7 w-full px-2'>
      <div className='mx-auto flex max-w-[500px] items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-lg'>
        <FaSearch className='text-[20px] text-tertiary' />

        <GoogleAutoComplete
          onPlaceSelect={handlePlaceSelect}
          className='w-full bg-transparent text-[18px]'
        />
      </div>
    </div>
  );
}
