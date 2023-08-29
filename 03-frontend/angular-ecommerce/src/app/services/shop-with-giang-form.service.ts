import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//
export class ShopWithGiangFormService {

  constructor() { }

  // return an Observabla array
  // angular components will subscribe to this method, to get result for the async call
  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    // build and array for "Month" dropdown list
    // - start at current month and loop

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    // 'of' Operator from fxjs, will wrap an object and present it as an Observable
    return of(data);
  }


  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    // build an array for "Year" dropdown list
    // - start at current year and loop for the next 10 years
    // getFullYear() return the current year 
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
