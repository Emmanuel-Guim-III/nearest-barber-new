import { ReactNode, useEffect, useState } from 'react';
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from 'react-icons/fa';
import { MapRecenterEvent } from './CurrentLocationButton';

type NavigationButtonProps = {
  children: ReactNode;
  onPress: () => void;
  onRelease: () => void;
};

export function NavigationButton({
  children,
  onPress,
  onRelease,
}: NavigationButtonProps) {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      onMouseUp={(e) => {
        e.preventDefault();
        onRelease();
      }}
      onMouseLeave={(e) => {
        e.preventDefault();
        onRelease();
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        onPress();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onRelease();
      }}
      className='rounded-full bg-brand/70 p-2 text-white/70 shadow-md'
    >
      {children}
    </button>
  );
}

type Props = { onRecenter: MapRecenterEvent; moveStep?: number };

export function NavigationButtons({ onRecenter, moveStep = 0.005 }: Props) {
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const moveUp = () => onRecenter({ lat: moveStep, lng: 0 });
  const moveDown = () => onRecenter({ lat: -moveStep, lng: 0 });
  const moveLeft = () => onRecenter({ lat: 0, lng: -moveStep });
  const moveRight = () => onRecenter({ lat: 0, lng: moveStep });

  const handlePress = (moveFunction: () => void) => {
    const id = window.setInterval(moveFunction, 100); // Move every 100ms
    setIntervalId(id);
  };

  const handleRelease = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
      <div className='flex flex-col items-center'>
        <NavigationButton
          onPress={() => handlePress(moveUp)}
          onRelease={handleRelease}
        >
          <FaArrowUp />
        </NavigationButton>

        <div className='flex gap-[34px]'>
          <NavigationButton
            onPress={() => handlePress(moveLeft)}
            onRelease={handleRelease}
          >
            <FaArrowLeft />
          </NavigationButton>

          <NavigationButton
            onPress={() => handlePress(moveRight)}
            onRelease={handleRelease}
          >
            <FaArrowRight />
          </NavigationButton>
        </div>

        <NavigationButton
          onPress={() => handlePress(moveDown)}
          onRelease={handleRelease}
        >
          <FaArrowDown />
        </NavigationButton>
      </div>
    </div>
  );
}
