import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../models/medicine';

@Injectable({
  providedIn: 'root',
})
export class medicineServices {
  constructor(private _http: HttpClient) {}
  baseURL = 'http://localhost:3000/api/medicines';
  medicine: Medicine | null = null;

  addMedicine(data: any): Observable<any> {
    return this._http.post(`${this.baseURL}/add`, data);
  }
  getAllMedicines(): Observable<any> {
    return this._http.get(`${this.baseURL}/`);
  }
  getSingleMedicine(id: string): Observable<any> {
    return this._http.get(`${this.baseURL}/single/${id}`);
  }
  updateMedicine(id: string, data: any): Observable<any> {
    return this._http.put(`${this.baseURL}/update/${id}`, data);
  }
  deleteMedicine(id: string): Observable<any> {
    return this._http.delete(`${this.baseURL}/delete/${id}`);
  }
}
