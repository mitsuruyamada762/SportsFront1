const mergeItems = (existing: any, newItem: any): any => {
    const merged = { ...existing };

    if (newItem.event) {
        const existingEvents = existing.event
            ? (Array.isArray(existing.event) ? existing.event : [existing.event])
            : [];
        merged.event = [...existingEvents, newItem.event];
    }

    for (const key in newItem) {
        if (key !== 'event' && newItem[key] !== undefined) {
            merged[key] = newItem[key];
        }
    }

    return merged;
};

export const groupAndSort = (data: any) => {
    if (!Array.isArray(data)) return { All: {} };

    const sortedData = [...data].sort((a: any, b: any) => (a?.order || 0) - (b?.order || 0));

    const result: Record<string, Record<string, any>> = {
        All: {}
    };

    const groupOrders: Record<string, number> = {
        All: 0
    };

    for (const item of sortedData) {
        if (!item || !item.name) continue;

        const itemName = item.name;
        const groupName = item.group_name || '';

        if (groupName && item.group_order !== undefined) {
            if (!groupOrders[groupName] || groupOrders[groupName] > item.group_order) {
                groupOrders[groupName] = item.group_order;
            }
        }

        if (!result.All[itemName]) {
            const processedItem = { ...item };
            if (processedItem.event) {
                processedItem.event = [processedItem.event];
            }
            result.All[itemName] = processedItem;
        } else {
            result.All[itemName] = mergeItems(result.All[itemName], item);
        }

        if (groupName) {
            if (!result[groupName]) {
                result[groupName] = {};
            }

            if (!result[groupName][itemName]) {
                const processedItem = { ...item };
                if (processedItem.event) {
                    processedItem.event = [processedItem.event];
                }
                result[groupName][itemName] = processedItem;
            } else {
                result[groupName][itemName] = mergeItems(result[groupName][itemName], item);
            }
        }
    }

    const sortedKeys = Object.keys(result).sort((a, b) => {
        if (a === 'All') return -1;
        if (b === 'All') return 1;
        return (groupOrders[a] || 0) - (groupOrders[b] || 0);
    });

    const sortedResult: Record<string, Record<string, any>> = {};
    for (const key of sortedKeys) {
        sortedResult[key] = result[key];
    }

    return sortedResult;
}

export const mergeCompetitionsIntoA = (A: any, B: any) => {
    if (B) {
        for (const compId in B) {
            if (A[compId]) {
                if (!A[compId].game) A[compId].game = {};
                deepMerge(A[compId]?.game, B[compId]?.game);
            } else {
                A[compId] = B[compId];
            }
        }
    }

    return A;
}

export const mergeGamesIntoA = (A: any, B: any) => {
    for (const compId in B) {
        const BComp = B[compId];
        if (!BComp) continue;

        if (A[compId]) {
            deepMerge(A[compId], BComp);

        } else {
            A[compId] = BComp;
        }
    }

    return A;
}

export const deepMerge = (target: any, source: any) => {
    for (const key in source) {
        if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
            if (!target[key] || typeof target[key] !== "object") target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}


