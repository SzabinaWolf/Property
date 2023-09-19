import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  //létrehozzuk a json adatokhoz történő hozzáférést, get, post, put és delete
  //add, hozzáadunk a post methoddal
  addListing(data: any) {
    return this.http.post('http://localhost:3000/properties', data).pipe(map((res: any) => {
      return res;
    }))
  }

  //get all property a get methoddal

  getAllProperty() {
    return this.http.get(' http://localhost:3000/properties').pipe(map((res: any) => {
      return res;
    }))
  }

  //update put methoddal

  updateProperty(data: any, id: number) {
    return this.http.put(' http://localhost:3000/properties/' + id, data).pipe(map((res: any) => {
      return res;
    }))
  }

  //delete method

  deleteProperty(id: number) {
    return this.http.delete(' http://localhost:3000/properties/' + id).pipe(map((res: any) => {
      return res;
    }))
  }
}
