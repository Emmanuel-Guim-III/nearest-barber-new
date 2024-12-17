import {
  APIProvider,
  InfoWindow,
  Map,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { getWorkers } from '../../data/workers.tsx';
import { useBreakpoint } from '../../hooks/useBreakpoint.tsx';
import { useUserLocation } from '../../hooks/useUserLocation.tsx';
import { WorkerList } from '../Worker/WorkerList.tsx';
import { Worker, WorkerView } from '../Worker/WorkerView.tsx';
import { WorkersMarkers } from '../Worker/WorkersMarkers.tsx';
import {
  CurrentLocationButton,
  NavigationButtons,
  SearchPlace,
  ZoomButtons,
} from './Controls';
import { G_MAPS_API_KEY } from './mapConfig.tsx';

export function MyMap() {
  const { isMobile } = useBreakpoint();
  const { location } = useUserLocation();

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(15);
  const [workerToInspect, setWorkerToInspect] = useState<Worker | null>(null);
  const [workersWithinBound, setWorkersWithinBound] = useState<Worker[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (location) setCenter(location);
  }, [location]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const workersData = await getWorkers();

      console.log('workersData', workersData);

      setWorkers(workersData);
    };

    fetchUsersData();
  }, []);

  const handleBoundsChanged = (e: MapCameraChangedEvent) => {
    if (!workers.length) return;

    const { bounds } = e.detail;
    const withinBounds = workers.filter((worker) => {
      if (worker.coordinates) {
        const { lat, lng } = worker.coordinates;

        return (
          lat >= bounds.south &&
          lat <= bounds.north &&
          lng >= bounds.west &&
          lng <= bounds.east
        );
      }
    });

    setWorkersWithinBound(withinBounds);
  };

  const handleRecenter = ({ lat, lng }: { lat: number; lng: number }) => {
    setCenter((prevCenter) => ({
      lat: prevCenter.lat + lat,
      lng: prevCenter.lng + lng,
    }));
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 1);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => prevZoom - 1);
  };

  return (
    <APIProvider apiKey={G_MAPS_API_KEY}>
      <Map
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
        defaultCenter={center}
        center={center}
        zoom={zoom}
        disableDefaultUI={true}
        onBoundsChanged={handleBoundsChanged}
        onCenterChanged={(e) =>
          setCenter({ lat: e.detail.center.lat, lng: e.detail.center.lng })
        }
        onZoomChanged={(e) => setZoom(e.detail.zoom)}
        onDragstart={() => setIsDragging(true)}
        onDragend={() => setIsDragging(false)}
      >
        <SearchPlace onRecenter={setCenter} />

        {!isDragging && (
          <WorkersMarkers
            workersList={workers || []}
            onInspectWorker={setWorkerToInspect}
          />
        )}

        {workerToInspect && (
          <InfoWindow
            position={workerToInspect?.coordinates}
            onClose={() => setWorkerToInspect(null)}
          >
            <WorkerView data={workerToInspect} isInspectMode />
          </InfoWindow>
        )}

        {isMobile && <NavigationButtons onRecenter={handleRecenter} />}

        <CurrentLocationButton
          onRecenter={(coords) => {
            setCenter(coords);
            setZoom(15);
          }}
        />

        <ZoomButtons onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />

        {workersWithinBound.length > 0 && (
          <WorkerList data={workersWithinBound} onSelect={setWorkerToInspect} />
        )}
      </Map>
    </APIProvider>
  );
}
