import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, ReactNode, useState } from 'react';
import { WorkerListToggle } from './WorkerListToggle';
import { Worker, WorkerView } from './WorkerView';

type Props = {
  data: Worker[];
  onSelect: (worker: Worker) => void;
};

export function WorkerList({ data, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <WorkerListToggle
        data={data}
        isToggledOn={isOpen}
        onToggle={() => setIsOpen((prevState) => !prevState)}
      />

      <CollapsibleSection isOpen={isOpen}>
        <div
          style={{
            WebkitOverflowScrolling: 'touch',
            overflowY: 'auto',
          }}
        >
          <div className='flex w-full min-w-fit justify-center gap-2 overflow-hidden p-2'>
            <AnimatePresence>
              {data.map((worker, i) => (
                <Fragment key={i}>
                  <motion.div
                    className='cursor-pointer'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    onClick={() => onSelect(worker)}
                  >
                    <WorkerView data={worker} />
                  </motion.div>
                </Fragment>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </CollapsibleSection>
    </>
  );
}

function CollapsibleSection({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) {
  return (
    <>
      {isOpen && (
        <div className='absolute bottom-7 w-full rotate-180'>
          <div className='rotate-180'>{children}</div>
        </div>
      )}
    </>
  );
}
