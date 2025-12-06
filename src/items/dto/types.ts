export const ITEMS_LABELS = Object.freeze({
    FRUIT: "FRUIT",
    DAIRY: "DAIRY",
    BAKERY: "BAKERY",
    FRIG: "FRIG"
});

export type ItemLabel = typeof ITEMS_LABELS[keyof typeof ITEMS_LABELS];

export type Item = {
    id: string;
    name: string;
    labels: ItemLabel[];
};