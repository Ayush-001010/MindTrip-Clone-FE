export default interface IAddActivityNotes {
    setNotes: React.Dispatch<React.SetStateAction<string>>;
    setIsStopEditing: React.Dispatch<React.SetStateAction<boolean>>;
}