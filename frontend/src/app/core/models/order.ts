export interface Order {
    _id?:string;
    userId:string;
    books: any[];
    totalPrice:number;
    dateCreated:string;
    delivered?:boolean;
}
