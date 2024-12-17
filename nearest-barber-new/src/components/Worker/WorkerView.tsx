import classNames from 'classnames';
import {
  FaEnvelope,
  FaPhone,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from 'react-icons/fa';
import { Fragment } from 'react/jsx-runtime';

export type Worker = {
  id: string;
  firstName: string;
  lastName: string;
  rating: number;
  jobsAccomplished: number;
  contactNumber: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
};

type Props = { data: Worker; isInspectMode?: boolean };

const Stars = ({ count }: { count: number }) => {
  const stars = [];
  const fullStars = Math.floor(count);
  const hasHalfStar = count % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar />);
  }

  if (hasHalfStar) stars.push(<FaStarHalfAlt />);

  const totalStars = fullStars + (hasHalfStar ? 1 : 0);
  for (let i = totalStars; i < 5; i++) {
    stars.push(<FaRegStar />);
  }

  return (
    <div className='flex gap-1 text-lg text-yellow-star'>
      {stars.map((star, i) => (
        <Fragment key={i}>{star}</Fragment>
      ))}
    </div>
  );
};

export function WorkerView({ data, isInspectMode = false }: Props) {
  const {
    firstName,
    lastName,
    jobsAccomplished,
    rating,
    image,
    contactNumber,
  } = data;

  return (
    <div
      className={classNames(
        'flex w-[150px] flex-col items-center rounded-3xl bg-white',
        isInspectMode ? 'ml-[4px] gap-5 pb-2 pt-0' : 'gap-3 p-3 shadow-md',
      )}
    >
      <div className='flex flex-col items-center gap-2'>
        <img
          src={image}
          className={classNames(
            'rounded-full',
            isInspectMode ? 'size-[60px]' : 'size-[50px]',
          )}
        />
        <p
          className={classNames(
            'leading-[18px]',
            isInspectMode ? 'text-xl' : 'min-h-9 text-lg',
          )}
        >
          {firstName} {lastName}
        </p>
      </div>

      <div className='flex flex-col items-center gap-2'>
        <Stars count={rating} />
        <p className='text-sm leading-[14px]'>
          {jobsAccomplished} jobs accomplished
        </p>
      </div>

      {isInspectMode && (
        <div className='flex w-full justify-between text-lg'>
          <a href={`tel:${contactNumber}`} className='px-4 py-2'>
            <FaPhone />
          </a>

          <a href={`sms:${contactNumber}`} className='px-4 py-2'>
            <FaEnvelope />
          </a>
        </div>
      )}
    </div>
  );
}
