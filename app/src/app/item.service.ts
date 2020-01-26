import { Item } from './models/item';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const ENDPOINT = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Item[]> {
    return this.http.get<Item[]>(`${ENDPOINT}/items`);
  }

  create(item: Item): Observable<Item> {
    return this.http.post<Item>(`${ENDPOINT}/items`, { name: item.name });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${ENDPOINT}/items/${id}`, { observe: 'response' });
  }

  update(item: Item): Observable<Item> {
    return this.http.put<Item>(`${ENDPOINT}/items/${item.id}`, { name: item.name, done: item.done });
  }

}
