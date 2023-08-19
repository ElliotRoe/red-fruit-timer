import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { StateCreator } from 'zustand';

import { AppState, TimerInterval } from './index';

dayjs.extend(duration);

const DURATION_FORMAT = "mm:ss"
const SECOND = 1000;

export interface TimerState {
    durationRemaining: duration.Duration,
    paused: boolean,
    timerInterval: number | undefined,
    timerString: string,
    currentIntervalType: TimerInterval,


    // Actions
    startTimer: () => void,
    pauseTimer: () => void,
    resetTimer: () => void,
    decrementTimer: () => void,
    setCurrentIntervalType: (intervalType: TimerInterval) => void,
}

export const createTimerSlice: StateCreator<
    AppState,
    [],
    [],
    TimerState
> = (set, get) => ({
    durationRemaining: dayjs.duration(0, "minutes"),
    timerInterval: undefined,
    paused: true,
    timerString: dayjs.duration(0, "minutes").format(DURATION_FORMAT),
    currentIntervalType: TimerInterval.Working,

    startTimer: () => {
        set((state) => ({ 
            paused: false, 
            timerInterval: setInterval(state.decrementTimer, SECOND) as any as number,
        }));
    },
    pauseTimer: () => {
        clearInterval(get().timerInterval);
        set({ 
            paused: true,
            timerInterval: undefined, 
        })
    },
    resetTimer: () => {
        const { paused } = get();
        get().pauseTimer();
        set(state => {
            const newDuration = dayjs.duration(state.timerIntervals[state.currentIntervalType], "minutes");
            return { 
                durationRemaining: newDuration,
                timerString: newDuration.format(DURATION_FORMAT),
            }
        })
        if (!paused) {
            get().startTimer();
        }
    },
    decrementTimer: () => {
        set(state => {
            const newDuration = state.durationRemaining.add(-1, "second");
            return { 
                durationRemaining: newDuration,
                timerString: newDuration.format(DURATION_FORMAT),
            }
        })
    },
    setCurrentIntervalType: (intervalType: TimerInterval) => {
        set({currentIntervalType: intervalType});
        get().resetTimer();
    }

})