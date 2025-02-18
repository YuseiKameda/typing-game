declare const keygraph: {
    build: (seq: string) => string | undefined;
    next: (key: string) => boolean;
    is_finished: () => boolean;
    reset: () => void;
    key_candidate: () => string;
    key_done: () => string;
    seq_candidates: () => string;
    seq_done: () => string;
};
export default keygraph;  