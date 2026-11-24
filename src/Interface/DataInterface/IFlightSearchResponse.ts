export default interface IFlightSearchResponse {
    type: "flight-results";
    origin: string;
    destination: string;
    flights: any[];
}