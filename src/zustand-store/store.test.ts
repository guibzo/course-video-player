import { beforeEach, describe, expect, it } from "vitest";
import { useStore as store } from ".";

const course = {
    id: 1,
    modules: [
        {
            id: 1,
            title: "Iniciando com React",
            lessons: [
                {
                    id: "OmmJBfcMJA8",
                    title: "CSS Modules",
                    duration: "13:45",
                },
                {
                    id: "Nf0uyb7u4_Y",
                    title: "Estilização do Post",
                    duration: "10:05",
                },
            ],
        },
        {
            id: 2,
            title: "Estrutura da aplicação",
            lessons: [
                {
                    id: "0apUGZTyLDE",
                    title: "Componente: Comment",
                    duration: "13:45",
                },
                {
                    id: "GWwuQl0jXU4",
                    title: "Responsividade",
                    duration: "10:05",
                },
            ],
        },
    ],
};

const initialState = store.getState();

describe("zustand store", () => {
    beforeEach(() => {
        store.setState(initialState);
    });

    it("should be able to play", () => {
        const { play } = store.getState();

        play([1, 2]);

        const { currentModuleIndex, currentLessonIndex } = store.getState();

        expect(currentModuleIndex).toEqual(1);
        expect(currentLessonIndex).toEqual(2);
    });

    it("should be able to play next video automatically", () => {
        store.setState({ course });

        const { next } = store.getState();

        next();

        const { currentModuleIndex, currentLessonIndex } = store.getState();

        expect(currentModuleIndex).toEqual(0);
        expect(currentLessonIndex).toEqual(1);
    });

    it("should be able to jump to the next module automatically", () => {
        store.setState({ course });

        const { next } = store.getState();

        store.setState({ currentLessonIndex: 1 });

        next();

        const { currentModuleIndex, currentLessonIndex } = store.getState();

        expect(currentModuleIndex).toEqual(1);
        expect(currentLessonIndex).toEqual(0);
    });

    it("should not update the current module and lesson index if there is not next lesson available", () => {
        store.setState({ course });

        const { next } = store.getState();

        store.setState({
            currentModuleIndex: 1,
            currentLessonIndex: 1,
        });

        next();

        const { currentModuleIndex, currentLessonIndex } = store.getState();

        expect(currentModuleIndex).toEqual(1);
        expect(currentLessonIndex).toEqual(1);
    });
});
