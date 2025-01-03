/**
 * Attempts to fully deconstruct JSON object.
 * That is, if a JSON property contains a string value, and that string is stringified JSON,
 * this function will attempt to parse out the embedded JSON as well.
 */
export function recursiveJsonParse(
    obj: any,
    depth = 0,
    maxDepth = 10,
    seenObjects = new WeakSet()
) {
    if (depth > maxDepth) {
        return obj;
    }

    // Does this look like potentially a JSON object?
    if (typeof obj === 'string' && (obj.indexOf('{') >= 0 || obj.indexOf('[') >= 0)) {
        try {
            obj = JSON.parse(obj);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return obj;
        }
    }

    if (typeof obj === 'object' && obj !== null) {
        if (seenObjects.has(obj)) {
            // Circular reference found
            return obj;
        }

        seenObjects.add(obj);

        for (const key of Object.keys(obj)) {
            obj[key] = recursiveJsonParse(
                obj[key],
                depth + 1,
                maxDepth,
                seenObjects
            );
        }
    }

    return obj;
}
