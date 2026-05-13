export interface User {
    id: number;
    firstName: string;
    lastName:string;
    role:string;
}

export interface Doctor {
    id:number;
    firstName:string;
    lastName:string;
}

export interface TimeSlot {
    id:number;
    doctorID:number;
    doctorFirstName:string;
    doctorLastName:string;
    datetime:string;
}

export interface Appointment { 
    id:number;
    status:string;
    reason:string;
    details:string;
    timeSlot:TimeSlot;
}