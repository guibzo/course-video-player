import { useCurrentLesson, useStore } from "../zustand-store";

import { Loader } from "lucide-react";
import ReactPlayer from "react-player";

export function Video() {
    const { currentLesson } = useCurrentLesson();
    const { isLoading, next } = useStore((state) => {
        return {
            isLoading: state.isLoading,
            next: state.next,
        };
    });

    function handlePlayNext() {
        next();
    }

    return (
        <div className="w-full bg-zinc-950 aspect-video">
            {isLoading && (
                <div className="flex h-full items-center justify-center">
                    <Loader className="w-6 h-6 text-zinc-300 animate-spin" />
                </div>
            )}

            {!isLoading && (
                <ReactPlayer
                    width="100%"
                    height="100%"
                    controls
                    playing
                    onEnded={handlePlayNext}
                    url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
                />
            )}
        </div>
    );
}
