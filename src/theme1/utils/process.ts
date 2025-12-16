interface RawItem {
    id: number;
    group_id: number;
    group_name: string;
    group_order: number;
    type: string;
    [key: string]: any; // other fields
}

interface GroupedItem {
    group_id: number;
    group_name: string;
    group_order: number;
    items: {
        [type: string]: RawItem[];
    };
}

export const groupAndSort = (data: any) => {
    const groups: Record<number, GroupedItem> = {};

    for (const item of data) {
        if (!item) continue;

        const groupId = item.group_id;
        if (groupId == null) continue;

        if (!groups[groupId]) {
            groups[groupId] = {
                group_id: groupId,
                group_name: item.group_name || '',
                group_order: item.group_order || 0,
                items: {}
            };
        }

        if (!groups[groupId].items[item.type]) {
            groups[groupId].items[item.type] = [];
        }

        if (item.event) {
            groups[groupId].items[item.type].push(item.event);
        }
    }

    return Object.values(groups).sort(
        (a, b) => (a.group_order || 0) - (b.group_order || 0)
    );
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

        // If A already has this competition → deep merge
        if (A[compId]) {
            deepMerge(A[compId], BComp);

            // Otherwise create it
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


