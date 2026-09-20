export default interface ITripSplitWiseAnalytics {
    totalExpenses: number;
    ownedExpenses: number;
    receivedExpenses: number;
    balances: Array<{
        userName: string;
        amount: number;
        userID: number;
    }>;
    activities: number;
    hotel: number;
    transport: number;
    food: number;
    dress: number;
}