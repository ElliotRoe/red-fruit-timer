
import useAppStore, { TimerInterval } from "../store";

type ButtonProps = {
  onClick: () => void,
}

const WorkButton = ({ onClick }: ButtonProps) => <button type="button" onClick={onClick} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-l-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Work</button>;
const ShortPauseButton = ({ onClick }: ButtonProps) => <button type="button" onClick={onClick} className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">Short</button>;
const LongButton = ({ onClick }: ButtonProps) => <button type="button" onClick={onClick} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-r-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Long</button>;

const StartButton = ({ onClick }: ButtonProps) => <button type="button" onClick={onClick} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-l-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Start</button>;
const PauseButton = ({ onClick }: ButtonProps) => <button type="button" onClick={onClick} className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">Pause</button>;
const ResetButton = ({ onClick }: ButtonProps) => <button type="button" onClick={onClick} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-r-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reset</button>;

const ControlCenter = () => {
  const timerString = useAppStore((state) => state.timerString);
  const startTimer = useAppStore((state) => state.startTimer);
  const pauseTimer = useAppStore((state) => state.pauseTimer);
  const resetTimer = useAppStore((state) => state.resetTimer);
  const setCurrentIntervalType = useAppStore((state) => state.setCurrentIntervalType); 
  const totalSeconds = useAppStore((state) => state.totalSeconds);

  const onWorkClick = () => {
    setCurrentIntervalType(TimerInterval.Working);
  }

  const onShortClick = () => {
    setCurrentIntervalType(TimerInterval.ShortBreak);
  }

  const onLongClick = () => {
    setCurrentIntervalType(TimerInterval.LongBreak);
  }
  

  return (
    <div className='mx-auto max-w-2xl py-32'>
      <div className='text-center'>
        <WorkButton onClick={onWorkClick}/>
        <ShortPauseButton onClick={onShortClick}/>
        <LongButton onClick={onLongClick}/>
      </div>
      <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
        <div className='relative rounded-full bg-white bg-opacity-70 py-3 px-10 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            {timerString}
          </h1>
        </div>
      </div>
      <div className='text-center'>
        <StartButton onClick={startTimer}/>
        <PauseButton onClick={pauseTimer}/>
        <ResetButton onClick={resetTimer}/>
      </div>
      <h1 className='text-m font-bold tracking-tight text-gray-900 sm:text-m'>
        {`Hours Worked: ${totalSeconds/3600}`}
      </h1>
    </div>
  );
}

export default ControlCenter;