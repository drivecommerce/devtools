// Redownload request body threshold, in bytes. 2MB to start.
const REDOWNLOAD_THRESHOLD = 2097152;

export const wireUpDataInterceptors = (
    state: any,
    handleAddBlueprint: any,
    handleAddRecipe: any,
    handleAddCustomServiceCall: any,
    handleAddModeration: any,
    handleAddDataGrid: any,
    handleAddAnalytics: any,
) => {
    if (!(window.chrome as any).devtools) {
        return;
    }

    (window.chrome as any).devtools.network.onRequestFinished.addListener(
        (req: any) => {
            const url = new URL(req.request.url);

            // Data retrieval.
            if (url.pathname.includes('/Customizer-')) {
                req.getContent(async (body: any) => {
                    const unformattedLabel = url.pathname
                        .split('/')
                        .find((str: string) => str.includes('Customizer-'));

                    const label = unformattedLabel?.trim();

                    handleAddCustomServiceCall(body, label, req.request.url);
                });

                return;
            }

            // Is this a direct recipe retrieval?
            if (url.hostname === 'cz.drrv.co') {
                const recipeIndex = url.pathname.lastIndexOf('/');
                const recipeJson = url.pathname.substr(recipeIndex + 1);
                const recipeId = recipeJson.replace('.json', '');

                handleAddRecipe(JSON.stringify({
                    id: recipeId,
                    location: req.request.url,
                }), 'recipe-load');

                return;
            }

            // Check if this is a Customizer API call.
            const validHostnames = [
                'localhost',
                'customizer.drivecommerce.com',
                'api.customizer.drivecommerce.com'
            ] as const;

            const isHostnameValid = validHostnames.includes(url.hostname);

            const isPathValid = url.pathname.startsWith('/api/v2/blueprint') ||
                url.pathname.startsWith('/api/v1/blueprint');

            if (!(isHostnameValid && isPathValid) || req.request.method === 'OPTIONS') {
                return;
            }

            // Retrieve the request body for analysis.
            req.getContent(async (body: any) => {
                const { size: sizeInBytes, mimeType } = req.response.content;

                switch (req.request.method) {
                    case 'POST':
                        // POST can be done to save a recipe or to perform moderation or query requests.
                        if (url.pathname.startsWith('/api/v2/blueprint/action/record')) {
                            handleAnalytics(req.request.postData?.text ?? '{}', body, req.request.url);
                        } else if (url.pathname.startsWith('/api/v2/blueprint/review/text')) {
                            handleAddModeration(req.request.postData?.text ?? '{}', body, req.request.url);
                        } else if (url.pathname.startsWith('/api/v2/blueprint/query/datagrid')) {
                            handleAddDataGrid(req.request.postData?.text ?? '{}', body, req.request.url);
                        } else {
                            handleAddRecipe(body, 'recipe-save');
                        }
                        break;

                    case 'GET':
                        // Problem: Chrome devtools tosses out request bodies if they are too large.
                        // In this case, try to redownload the whole thing again.
                        if (!body && sizeInBytes > REDOWNLOAD_THRESHOLD && mimeType === 'application/json') {
                            const res = await fetch(req.request.url);

                            const largeBody = await res.json();

                            handleAddBlueprint(
                                largeBody,
                                sizeInBytes,
                                req.request.url
                            );
                        } else {
                            handleAddBlueprint(
                                body,
                                sizeInBytes,
                                req.request.url
                            );
                        }
                        break;
                    default:
                        break;
                }
            });
        }
    );
};
