import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl:string = "http://localhost:3000/api/orders";

  constructor(private _http:HttpClient) { }

  getUserOrders():Observable<any>{
    return this._http.get(`${this.baseUrl}/`);
  }

  getUserSingleOrder(orderId:string):Observable<any>{
    return this._http.get(`${this.baseUrl}/single/${orderId}`);
  }

  cancelOrder(orderId:string):Observable<any>{
    return this._http.delete(`${this.baseUrl}/cancel/${orderId}`);
  }
}
