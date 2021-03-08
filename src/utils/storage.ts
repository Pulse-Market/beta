export function getNumberFromStorage(storage: Storage, key: string): number | null {
    const item = storage.getItem(key);

    if (!item) {
        return null;
    }

    const parsedNum = Number(item);

    if (Number.isNaN(parsedNum)) {
        return null;
    }

    return parsedNum;
}
