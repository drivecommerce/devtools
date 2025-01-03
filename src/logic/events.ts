import { useEventBus } from '@vueuse/core';

export function useEvents() {
    const eventBus = useEventBus('drive-devtools-events');

    const emitEvent = (eventName: string, eventData: any) => {
        eventBus.emit(eventName, eventData);
    };

    const listenToEvent = (eventHandler: any) => {
        eventBus.on(eventHandler);
    };

    const stopListeningToEvent = (eventHandler: any) => {
        eventBus.off(eventHandler);
    };

    return {
        emitEvent,
        listenToEvent,
        stopListeningToEvent,
    };
}
