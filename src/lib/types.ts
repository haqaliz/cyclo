export type Activity = {
    id: string;
    type: string;
    name: string;
    category: string;
    content: { key: string; value: string }[];
};

export type Insight = {
    id: string;
    type: string;
    key: string;
    category: string;
    classes?: string;
    name: string;
    content?: { key: string; value: string }[];
};