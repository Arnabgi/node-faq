import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  setToken(value: string): void {
    console.log("value..",value);
    localStorage.setItem('token', value)
  }

  setValue(key:string, value:string):void {
    localStorage.setItem(key, value);
  }

  getValue(key:string, defaultValue:string=""):string {
    let data = localStorage.getItem(key);
    if(!data) return defaultValue ? defaultValue : "";
    return data;
  }
  
}
