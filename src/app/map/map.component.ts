import { HttpClientModule } from '@angular/common/http';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface CountryInfo {
  name: string;
  capitalCity: string;
  region: string;
  incomeLevel: string;
  longitude: number;
  latitude: number;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NgIf, NgFor, HttpClientModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  selectedCountry: CountryInfo | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onCountryClick(event: MouseEvent) {
    const target = event.target as SVGPathElement;
    const countryCode = target.getAttribute('id');
    if (!countryCode) return;

    this.isLoading = true;
    this.error = null;
    this.selectedCountry = null;

    const url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`;

    this.http.get<any[]>(url).subscribe({
      next: (response) => {
        const data = response[1]?.[0];
        if (!data) {
          this.error = 'No data found for this country.';
          this.isLoading = false;
          return;
        }
        this.selectedCountry = {
          name: data.name,
          capitalCity: data.capitalCity || 'N/A',
          region: data.region?.value || 'N/A',
          incomeLevel: data.incomeLevel?.value || 'N/A',
          longitude: data.longitude || 'N/A',
          latitude: data.latitude || 'N/A'
        };
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to fetch country data.';
        this.isLoading = false;
      }
    });
}
  closePopup() {
    this.selectedCountry = null;
    this.error = null;
  }
}