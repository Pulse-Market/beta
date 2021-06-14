export interface StorageManagerFormValues {
    amountFormatted: string;
    amount: string;
}

export default function createDefaultStorageManagerFormValues(): StorageManagerFormValues {
    return {
        amount: '0',
        amountFormatted: '0',
    }
}
