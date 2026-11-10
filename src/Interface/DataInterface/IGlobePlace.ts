import type { IconType } from 'react-icons';

export default interface Place {
    id: string;
    name: string;
    lat: number;
    lng: number;
    description: string;
    icon?: IconType;
};