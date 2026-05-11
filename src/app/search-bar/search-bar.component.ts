import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchTerm: string = '';

  country: any = null;

  loading: boolean = false;

  errorMessage: string = '';

  constructor(private countryService: CountryService) {}

  searchCountry() {

  if (!this.searchTerm.trim()) {
    return;
  }

  this.loading = true;

  this.errorMessage = '';

  this.countryService
    .searchCountryByName(this.searchTerm)
    .subscribe({

      next: (data) => {

        if (!data) {

          this.errorMessage = 'Country not found';

          this.country = null;

        } else {

          this.country = data;
        }

        this.loading = false;
      },

      error: () => {

        this.loading = false;

        this.errorMessage = 'Error fetching country';

        this.country = null;
      }
    });
}}