export interface ILocalStore {
    destroy(): void;
}

export type AiStatus = 'idle' | 'loading' | 'success' | 'error';
