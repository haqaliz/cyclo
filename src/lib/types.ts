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
    content?: {
        key: string;
        value: string;
    }[];
};

export type Recommendation = {
    id: string;
    brand: string;
    url: string;
    name: string;
    img: string;
    type: string;
    price: {
        currency: string;
        value: string;
    };
    features: {
        title: string;
        content: string;
    }[];
};

export type HealthRegularity = {
    mean: number;
    median: number;
    standard_deviation: number;
    lower_bound: number;
    upper_bound: number;
    cycles: {
        from: number;
        to: number;
        recorded_day_id: string;
        diff: number;
        is_regular: boolean;
    }[],
};

export type HealthScore = {
    score?: number;
};