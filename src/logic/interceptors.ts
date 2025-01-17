import { reactive } from 'vue';
import { wireUpDataInterceptors } from '@/logic/wireup-interceptors';
import { recursiveJsonParse } from '@/utils';

type BlueprintData = {
    label: string;
    url: string;
    dataType: string;
    responseSize?: number;
};

interface State {
    blueprintData: BlueprintData[];
    selectedBlueprintDataIndex: number;
    colorMode: 'light' | 'dark';
    jsonControlPanelMode: string;
}

export function createInterceptors() {
    const state = reactive<State>({
        blueprintData: [] as BlueprintData[],
        selectedBlueprintDataIndex: -1,
        colorMode: 'dark',
        jsonControlPanelMode: 'search',
    });

    const clearBlueprintData = () => {
        state.blueprintData = [];
        state.selectedBlueprintDataIndex = -1;
    };

    /**
     * Add parsed blueprint data.
     */
    const handleAddBlueprint = (
        body: any,
        sizeInBytes: number,
        url: string
    ) => {
        let parsed = {};

        try {
            parsed = recursiveJsonParse(body);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            // Nothing.
        }

        let label;
        if (parsed?.styleCode) {
            label = parsed.styleCode;
        } else if (parsed?.name) {
            label = parsed.name;
        } else {
            // What the heck is this then?
            label = 'Blueprint';
        }

        const parsedData = {
            label,
            url,
            dataType: 'blueprint',
            data: parsed,
        };

        state.blueprintData.unshift(parsedData);

        if (state.selectedBlueprintDataIndex < 0) {
            state.selectedBlueprintDataIndex = 0;
        }
    };

    /**
     * Add parsed recipe data.
     */
    const handleAddRecipe = async (body: any, type: string) => {
        let parsedBody = {};

        try {
            parsedBody = JSON.parse(body);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            // Nothing.
        }

        try {
            // Recipe body response will contain only an ID and a link to the recipe.
            // We need to retrieve the actual body.

            let location = parsedBody.location;
            if (location.startsWith('//')) {
                location = `https:${location}`;
            }

            const recipeData = await fetch(location);
            const recipeBody = await recipeData.json();

            const parsedData = {
                label: parsedBody.id,
                url: location,
                dataType: type,
                data: recipeBody,
            };

            state.blueprintData.unshift(parsedData);

            if (state.selectedBlueprintDataIndex < 0) {
                state.selectedBlueprintDataIndex = 0;
            }
        } catch (error) {
            console.error('Error fetching recipe data:', error);
        }
    };

    /**
     * Add custom service data.
     */
    const handleAddCustomServiceCall = async (
        body: any,
        label: string,
        url: string
    ) => {
        let parsedBody = {};

        try {
            parsedBody = JSON.parse(body);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            // Nothing.
        }

        const parsedData = {
            label,
            url,
            dataType: 'custom-service',
            data: parsedBody,
        };

        state.blueprintData.unshift(parsedData);

        if (state.selectedBlueprintDataIndex < 0) {
            state.selectedBlueprintDataIndex = 0;
        }
    };

    /**
     * Add moderation request.
     */
    const handleAddModeration = async (
        request: any,
        body: any,
        url: string
    ) => {
        let parsedRequest = {};

        try {
            parsedRequest = request ? JSON.parse(request) : null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            // Nothing.
        }

        let parsedBody = {};

        try {
            parsedBody = JSON.parse(body);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            // Nothing.
        }

        const parsedData = {
            label: 'Moderation',
            url,
            dataType: 'moderation',
            data: parsedBody,
            request: parsedRequest,
        };

        state.blueprintData.unshift(parsedData);

        if (state.selectedBlueprintDataIndex < 0) {
            state.selectedBlueprintDataIndex = 0;
        }
    };

    /**
     * Add analytics event.
     */
    const handleAddAnalytics = async (
        request: any,
        body: any,
        url: string
    ) => {
        let parsedRequest = {};

        try {
            parsedRequest = request ? JSON.parse(request) : null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            // Nothing.
        }

        let parsedBody = {};

        try {
            parsedBody = JSON.parse(body);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            // Nothing.
        }

        const parsedData = {
            label: 'Analytics',
            url,
            dataType: 'analytics',
            data: parsedBody,
            request: parsedRequest,
        };

        state.blueprintData.unshift(parsedData);

        if (state.selectedBlueprintDataIndex < 0) {
            state.selectedBlueprintDataIndex = 0;
        }
    };

    /**
     * Add datagrid query.
     */
    const handleAddDataGrid = async (
        request: any,
        body: any,
        url: string
    ) => {
        let parsedRequest = {};

        try {
            parsedRequest = request ? JSON.parse(request) : null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            // Nothing.
        }

        let label = 'Data grid';

        if (parsedRequest?.from) {
            label = parsedRequest?.from;
        }

        let parsedBody = {};

        try {
            parsedBody = JSON.parse(body);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            // Nothing.
        }

        const parsedData = {
            label,
            url,
            dataType: 'datagrid',
            data: parsedBody,
            request: parsedRequest,
        };

        state.blueprintData.unshift(parsedData);

        if (state.selectedBlueprintDataIndex < 0) {
            state.selectedBlueprintDataIndex = 0;
        }
    };

    /**
     * Integrate with the network monitor panel to intercept relevant requests.
     */
    const setupInterceptors = () => {
        wireUpDataInterceptors(
            state,

            // Note: order sensitive!

            handleAddBlueprint,
            handleAddRecipe,
            handleAddCustomServiceCall,
            handleAddModeration,
            handleAddDataGrid,
            handleAddAnalytics,
        );
    };

    /**
     * Cleanup interceptors.
     */
    const removeInterceptors = () => {
        if ((window.chrome as any).devtools == null) {
            return;
        }

        (
            window.chrome as any
        ).devtools.network.onRequestFinished.removeListener(
            wireUpDataInterceptors
        );
    };

    return {
        state,

        setupInterceptors,
        removeInterceptors,

        clearBlueprintData,

        handleAddBlueprint,
        handleAddRecipe,
        handleAddCustomServiceCall,
        handleAddModeration,
        handleAddDataGrid,
        handleAddAnalytics,
    };
}
