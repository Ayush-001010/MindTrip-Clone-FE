export default interface ICheckIn {
    id: number;
    userMember: string;
    status: "Reached" | "Not Reached Yet";
    reachWhen?: string | null;
    createdAt?: string;
}
