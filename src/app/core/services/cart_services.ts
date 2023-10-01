import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  baseUrl = 'http://localhost:3000/api/carts';
  constructor(private http: HttpClient) {}

  addToCart(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/show`);
  }
  deleteCart(id: string,medicineCount:number,medicinePrice:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}?medicinePrice=${medicinePrice}&medicineCount=${medicineCount}`);
  }
  checkOut(data: {}): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkout`, data);
  }
  changemedicineCount(data:any,medicineId:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/changemedicinecount/${medicineId}`,data);
  }
}
