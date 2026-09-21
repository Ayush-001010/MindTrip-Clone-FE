export default interface IExpenceDetailsForm {
    expenseTotalAmount: number;
    setExpenseTotalAmount: React.Dispatch<React.SetStateAction<number>>;
    expenseDescription: string;
    setExpenseDescription: React.Dispatch<React.SetStateAction<string>>;
    expenseDate: string;
    setExpenseDate: React.Dispatch<React.SetStateAction<string>>;
    expenseTitle: string;
    setExpenseTitle: React.Dispatch<React.SetStateAction<string>>;
    setExpenseCategory: React.Dispatch<React.SetStateAction<string>>;
}