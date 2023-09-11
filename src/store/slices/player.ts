import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

type Course = {
    id: number;
    modules: Array<{
        // mesmo que []{}
        id: number;
        title: string;
        lessons: Array<{
            id: string;
            title: string;
            duration: string;
        }>;
    }>;
};

export type PlayerState = {
    course: Course | null;
    currentModuleIndex: number;
    currentLessonIndex: number;
};

const initialState: PlayerState = {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
};

export const loadCourse = createAsyncThunk("player/load", async () => {
    const response = await api.get("/courses/1");

    return response.data;
});

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        play: (state, action: PayloadAction<[number, number]>) => {
            state.currentModuleIndex = action.payload[0];
            state.currentLessonIndex = action.payload[1];
        },
        next: (state) => {
            const nextLessonIndex = state.currentLessonIndex + 1;
            const nextLesson =
                state.course?.modules[state.currentModuleIndex].lessons[
                    nextLessonIndex
                ];

            if (nextLesson) {
                state.currentLessonIndex = nextLessonIndex;
            } else {
                const nextModuleIndex = state.currentModuleIndex + 1;
                const nextModule = state.course?.modules[nextModuleIndex];

                if (nextModule) {
                    state.currentModuleIndex = nextModuleIndex;
                    state.currentLessonIndex = 0;
                }
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(loadCourse.fulfilled, (state, action) => {
            // fazer algo quando o fulfilled desse thunk for chamado
            state.course = action.payload;
        });
    },
});

export const useCurrentLesson = () => {
    return useAppSelector((state: any) => {
        const { currentModuleIndex, currentLessonIndex } = state.player;

        const currentModule = state.player.course?.modules[currentModuleIndex];
        const currentLesson = currentModule?.lessons[currentLessonIndex];

        return { currentModule, currentLesson };
    });
};

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;
