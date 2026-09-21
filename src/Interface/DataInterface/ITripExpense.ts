export default interface ITripExpense {
    id: number;
    tripID: string;
    paidByUserID: number;
    paidByUserName: string;
    title: string;
    totalAmount: number;
    category: string;
    splitMethod: string;
    notes: string;
    spendAt: string;
    createdAt: string;
    updatedAt: string;
}