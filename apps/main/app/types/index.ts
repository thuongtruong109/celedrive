import type { IconType } from 'react-icons';

export type IService = {
    id: number;
    name: string;
    icon: IconType;
    desc: string;
    matchIcon: IconType;
    link: string;
}

export type IServiceNav = {
    id: number;
    type: string;
    services: IService[];
}