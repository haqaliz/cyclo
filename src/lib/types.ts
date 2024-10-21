export type Activity = {
    id: string;
    type: string;
    name: string;
    category: string;
    content: { key: string; value: string }[];
};

export type Insight = {
    id: string;
    key: string;
    name: string;
    category?: string;
    type?: string;
    classes?: string;
    content?: { key: string; value: string }[];
};