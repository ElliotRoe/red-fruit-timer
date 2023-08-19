import { StateCreator } from 'zustand';

import { AppState, TimerInterval } from './index';

export interface ConfigState {
    sound: string,
    volume: number,
    darkMode: boolean,
    autoContinue: boolean,

    timerIntervals: { [key in TimerInterval]: number }

    longBreakInterval: number,
    longBreakIntervalEnabled: boolean,

    pomodoroCount: number,
    pomodoroCountEnabled: boolean,

    // Actions
    setSound: (sound: string) => void,
    setVolume: (volume: number) => void,
    setDarkMode: (darkMode: boolean) => void,
    setAutoContinue: (autoContinue: boolean) => void,

    setWorkingTime: (workingTime: number) => void,
    setShortBreakTime: (shortBreakTime: number) => void,
    setLongBreakTime: (longBreakTime: number) => void,

    setLongBreakInterval: (longBreakInterval: number) => void,
    setLongBreakIntervalEnabled: (longBreakIntervalEnabled: boolean) => void,

    setPomodoroCount: (pomodoroCount: number) => void,
    setPomodoroCountEnabled: (pomodoroCountEnabled: boolean) => void,
}

export const createConfigSlice: StateCreator<
    AppState,
    [],
    [],
    ConfigState
> = (set) => ({
    sound: 'default',
    volume: 0.5,
    darkMode: false,
    autoContinue: false,

    timerIntervals: {
        [TimerInterval.Working]: 25,
        [TimerInterval.ShortBreak]: 5,
        [TimerInterval.LongBreak]: 25,
    },

    longBreakInterval: 4,
    longBreakIntervalEnabled: false,

    pomodoroCount: 0,
    pomodoroCountEnabled: false,

    setSound: (sound) => set({ sound }),
    setVolume: (volume) => set({ volume }),
    setDarkMode: (darkMode) => set({ darkMode }),
    setAutoContinue: (autoContinue) => set({ autoContinue }),
    
    setWorkingTime: (workingTime) => set((state) => ({ timerIntervals: {...state.timerIntervals, Working: workingTime} })),
    setShortBreakTime: (shortBreakTime) => set((state) => ({ timerIntervals: {...state.timerIntervals, ShortBreak: shortBreakTime} })),
    setLongBreakTime: (longBreakTime) => set((state) => ({ timerIntervals: {...state.timerIntervals, LongBreak: longBreakTime} })),

    setLongBreakInterval: (longBreakInterval) => set({ longBreakInterval }),
    setLongBreakIntervalEnabled: (longBreakIntervalEnabled) => set({ longBreakIntervalEnabled }),

    setPomodoroCount: (pomodoroCount) => set({ pomodoroCount }),
    setPomodoroCountEnabled: (pomodoroCountEnabled) => set({ pomodoroCountEnabled }),
})