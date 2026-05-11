export interface User {
    id: number;
    firstName: string;
    lastName:string;
    role:string;
}

export interface TimeSlot {
    id:number;
    doctor:string;
    dateTime:string;
}