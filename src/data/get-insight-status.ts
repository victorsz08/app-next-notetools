import { api } from '@/lib/axios';
import moment from 'moment';

type InsightStatus = {
    connected: number;
    pending: number;
    cancelled: number;
};
export async function getInsightStatus(userId?: string) {
    const dateIn = moment().startOf('month').format('YYYY-MM-DD');
    const dateOut = moment().format('YYYY-MM-DD');

    const response = await api.get(
        `insights/status/${userId}?dateIn=${dateIn}&dateOut=${dateOut}`
    );
    const data: InsightStatus = response.data;

    return data;
}
