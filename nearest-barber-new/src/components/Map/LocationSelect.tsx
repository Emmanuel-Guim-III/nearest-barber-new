import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useField } from 'formik';
import { useEffect, useState } from 'react';

import { useBreakpoint } from '../../hooks/useBreakpoint.tsx';
import { Coordinates, useUserLocation } from '../../hooks/useUserLocation.tsx';
import { NavigationButtons } from './Controls/NavigationButtons.tsx';
import { GoogleAutoComplete } from './GoogleAutoComplete.tsx';
import { G_MAPS_API_KEY } from './mapConfig.tsx';

export function LocationSelect() {
  const { isMobile } = useBreakpoint();
  const { location } = useUserLocation();

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [isMapVisible, setIsMapVisible] = useState(false);

  const [field, , helpers] = useField<Coordinates>('location');

  const { setValue } = helpers;
  const { value } = field;

  useEffect(() => {
    setValue(center);
  }, [center, setValue]);

  useEffect(() => {
    if (location) setCenter(location);
  }, [location]);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    const lat = place?.geometry?.location?.lat();
    const lng = place?.geometry?.location?.lng();

    if (!lat || !lng) return;

    setCenter({ lat, lng });
  };

  const handleRecenter = ({ lat, lng }: { lat: number; lng: number }) => {
    setCenter((prevCenter) => ({
      lat: prevCenter.lat + lat,
      lng: prevCenter.lng + lng,
    }));
  };

  return (
    <>
      <APIProvider apiKey={G_MAPS_API_KEY}>
        <div className='flex w-[300px] flex-col items-start gap-1'>
          <label className='ml-[2px] font-bold text-brand-light'>
            Location
          </label>
          <GoogleAutoComplete
            onPlaceSelect={handlePlaceSelect}
            onFocus={() => setIsMapVisible(true)}
            className='w-[300px] rounded-full border border-tertiary px-4 py-2 text-2xl'
          />
        </div>

        {isMapVisible && (
          <Map
            style={{
              width: '100vw',
              height: '400px',
              position: 'relative',
              overflow: 'hidden',
            }}
            defaultCenter={center}
            center={value}
            zoom={15}
            disableDefaultUI={true}
            onCenterChanged={(e) =>
              setCenter({ lat: e.detail.center.lat, lng: e.detail.center.lng })
            }
          >
            <Marker position={value} />

            {isMobile && (
              <NavigationButtons
                onRecenter={handleRecenter}
                moveStep={0.0005}
              />
            )}
          </Map>
        )}
      </APIProvider>
    </>
  );
}
