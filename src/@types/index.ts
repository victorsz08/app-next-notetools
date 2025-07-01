export type StatusType = 'CONECTADO' | 'PENDENTE' | 'CANCELADO' | 'ALL';

export const StatusType = {
    CONECTADO: 'CONECTADO' as StatusType,
    PENDENTE: 'PENDENTE' as StatusType,
    CANCELADO: 'CANCELADO' as StatusType,
    ALL: 'ALL' as StatusType,
} as const;

export type DataOrder = {
    id: string;
    number: number;
    local: string;
    schedulingDate: string;
    schedulingTime: string;
    price: number;
    contact: string;
    status: StatusType;
    createdAt: string;
    updatedAt: string;
};

export type DataInsights = {
    revenue: number;
    sales: number;
    completionRate: number;
};

export type DataInsightsStatus = {
    connected: number;
    pending: number;
    cancelled: number;
};

export type DataInsightsPerDay = {
    day: string;
    quantity: number;
};

export type DataNote = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};
