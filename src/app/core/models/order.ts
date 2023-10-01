export interface Order {
    _id?:string;
    userId:string;
    medicines: any[];
    totalPrice:number;
    dateCreated:string;
    delivered?:boolean;
}
