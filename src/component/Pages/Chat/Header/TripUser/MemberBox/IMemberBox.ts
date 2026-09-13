export default interface IMemberBox {
    members: Array<{
        userId: string;
        userName: string;
        userEmail: string;
    }>;
}