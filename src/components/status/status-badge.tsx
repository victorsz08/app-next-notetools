import {StatusType} from "@/@types";
import {CheckCircle, Clock, XCircle} from "lucide-react";

const statusLabel = {
    [StatusType.PENDENTE]: "Pendente",
    [StatusType.CONECTADO]: "Conectado",
    [StatusType.CANCELADO]: "Cancelado",
};

const statusClassesName = {
    [StatusType.PENDENTE]: "bg-orange-100 text-orange-700",
    [StatusType.CONECTADO]: "bg-green-100 text-green-700",
    [StatusType.CANCELADO]: "bg-red-100 text-red-700",
};

const StatusIcon = {
    [StatusType.PENDENTE]: Clock,
    [StatusType.CONECTADO]: CheckCircle,
    [StatusType.CANCELADO]: XCircle,
};

export function StatusBadge({status}: {status: StatusType}) {
    const Icon = StatusIcon[status];

    return (
        <div
            className={`${statusClassesName[status]} 
            w-fit py-1 px-2 flex items-center gap-1 rounded-full text-[12px] font-medium tracking-tight`}
        >
            <Icon className="w-4 h-4" />
            {statusLabel[status]}
        </div>
    );
}
