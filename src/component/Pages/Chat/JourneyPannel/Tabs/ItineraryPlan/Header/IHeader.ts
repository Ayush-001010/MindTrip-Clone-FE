export default interface IHeader {
    title: string;
    setLongitude: (longitude: number) => void;
    setLatitude: (latitude: number) => void;
    coordinates: {
        longitude: number;
        latitude: number;
    };
}