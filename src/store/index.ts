import { create } from 'zustand'

import { ConfigState, createConfigSlice } from './configStore';
import { createStatSlice,StatState } from './statStore';
import { createTimerSlice,TimerState } from './timerStore';

export enum TimerInterval {
    Working = "Working",
    ShortBreak = "ShortBreak",
    LongBreak = "LongBreak",
}

export interface AppState extends 
    ConfigState,
    TimerState,
    StatState {}

const useAppStore = create<AppState>()((...params) => ({
    ...createTimerSlice(...params),
    ...createConfigSlice(...params),
    ...createStatSlice(...params),
}))

export default useAppStore;