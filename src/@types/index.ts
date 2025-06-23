
export type StatusType = "CONECTADO" | "PENDENTE" | "CANCELADO";

export const StatusType = {
    CONECTADO: "CONECTADO" as StatusType,
    PENDENTE: "PENDENTE" as StatusType,
    CANCELADO: "CANCELADO" as StatusType,
} as const;

export type DataOrder = {
    id: string;
    number: number;
    local: string;
    schedulingDate: string;
    schudulingTime: string;
    price: number;
    contact: string;
    status: StatusType;
    createdAt: string;
    updatedAt: string;
};