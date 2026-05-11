import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) {}

  searchCountryByName(countryName: string): Observable<any> {

    return this.http
      .get<any>(
        'https://api.worldbank.org/v2/country?format=json&per_page=300'
      )
      .pipe(

        map((response) => {

          const countries = response[1];

          const foundCountry = countries.find(
            (country: any) =>
              country.name
                .toLowerCase()
                .includes(countryName.toLowerCase())
          );

          return foundCountry;
        })
      );
  }
}