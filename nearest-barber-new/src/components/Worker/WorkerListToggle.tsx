import classNames from 'classnames';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import { FaUser, FaUsers } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
// import { useSwipeable } from 'react-swipeable';
import { Worker } from './WorkerView';

type Props = {
  data: Worker[];
  isToggledOn: boolean;
  // onToggle: (v: boolean) => void;
  onToggle: () => void;
};

const VARIANTS = {
  open: { y: -250 },
  closed: { y: 0 },
};

const SPRING = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export function WorkerListToggle({ data, isToggledOn, onToggle }: Props) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start(isToggledOn ? 'open' : 'closed');
  }, [controls, isToggledOn]);

  // const handlers = useSwipeable({
  //   onSwipedUp: () => onToggle(true),
  //   onTap: () => onToggle(false),
  //   swipeDuration: 500,
  //   preventScrollOnSwipe: true,
  //   trackMouse: true,
  // });

  return (
    <div className='absolute bottom-0 left-0 right-0'>
      <motion.button
        // {...handlers}
        onClick={onToggle}
        animate={controls}
        transition={SPRING}
        variants={VARIANTS}
        className={classNames(
          'mx-auto w-fit shadow-md',
          isToggledOn
            ? '!rounded-full bg-brand/70 p-2 text-white/70'
            : 'flex items-center justify-center !rounded-[0px] !rounded-t-2xl bg-brand px-3 py-1 text-white',
        )}
      >
        {isToggledOn ? (
          <FaXmark />
        ) : (
          <div className='flex items-center gap-[6px]'>
            {data.length > 1 ? <FaUsers /> : <FaUser className='text-xs' />}

            <p>
              VIEW {data.length} RESULT{data.length > 1 && 'S'}
            </p>
          </div>
        )}
      </motion.button>
    </div>
  );
}
