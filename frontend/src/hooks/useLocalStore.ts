import { useState, useEffect } from 'react';
import type { ILocalStore } from '../shared/types';

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
    const [instance] = useState(() => creator());

    useEffect(() => {
        return () => {
            instance.destroy();
        };
    }, [instance]);

    return instance;
};