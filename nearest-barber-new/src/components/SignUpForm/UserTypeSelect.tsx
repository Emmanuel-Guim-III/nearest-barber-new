import { UserType } from '../variables';

export function UserTypeSelect({
  onSelect,
}: {
  onSelect: (userType: UserType) => void;
}) {
  return (
    <div className='flex h-dvh w-full flex-col items-center justify-center gap-[80px] bg-brand'>
      <h1 className='text-white'>Welcome to Barber Finder!</h1>

      <div className='flex flex-col items-center gap-9 text-white'>
        <p className='max-w-[300px] text-xl'>
          How would you like to use our app today?
        </p>

        <div className='flex w-fit flex-col items-center gap-3'>
          <button
            className='w-full rounded-full border-2 border-base bg-base px-9 py-7 text-3xl leading-6 text-brand shadow-md hover:border-base hover:bg-brand hover:text-[#EDE9E3]'
            onClick={() => onSelect(UserType.NonWorker)}
          >
            I need a barber
          </button>
          <p className='text-xl leading-5 text-white/50'>or</p>
          <button
            className='rounded-full border-2 border-base bg-brand px-6 py-3 text-xl text-[#EDE9E3] shadow-md hover:bg-base hover:text-brand'
            onClick={() => onSelect(UserType.Worker)}
          >
            I'm a barber
          </button>
        </div>
      </div>
    </div>
  );
}
