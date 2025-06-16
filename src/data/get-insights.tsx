"use client";

import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/axios";
import moment from "moment";



type Insights = {
    revenue: number;
    sales: number;
    completionRate: number;
    cancelledRate: number;
    connected: number;
    pending: number;
    cancelled: number;
};



export async function getInsights(userId?: string): Promise<Insights> {
    const dateIn = moment().startOf('month').format('YYYY-MM-DD');
    const dateOut = moment().format('YYYY-MM-DD');

    const response = await api.get(`insights?userId=${userId}&dateIn=${dateIn}&dateOut=${dateOut}`);
    
    const data: Insights = response.data;
    return data;
};