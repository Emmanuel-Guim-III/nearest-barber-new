import { FaMinus, FaPlus } from 'react-icons/fa';

type Props = { onZoomIn: () => void; onZoomOut: () => void };

export function ZoomButtons({ onZoomIn, onZoomOut }: Props) {
  const buttonStyles =
    'rounded-full bg-brand p-[11px] text-[18px] text-white shadow-md';

  return (
    <div className='absolute right-0 top-[calc(100vh-230px)] mx-2'>
      <div className='flex flex-col gap-[6px]'>
        <button onClick={onZoomIn} className={buttonStyles}>
          <FaPlus />
        </button>

        <button onClick={onZoomOut} className={buttonStyles}>
          <FaMinus />
        </button>
      </div>
    </div>
  );
}
