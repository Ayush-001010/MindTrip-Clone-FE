export default interface IAddTips{
    setTips: React.Dispatch<React.SetStateAction<string[]>>;
    setIsStopEditing: React.Dispatch<React.SetStateAction<boolean>>;
}