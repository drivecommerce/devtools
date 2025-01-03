import { reactive } from 'vue';

interface State {
    colorMode: 'light' | 'dark';
}

export function createSettings() {
    const state = reactive<State>({
        colorMode: 'dark',
    });

    const setColorMode = (mode: 'light' | 'dark') => {
        state.colorMode = mode;
    };

    return {
        state,
        setColorMode,
    };
}
