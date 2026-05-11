import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { MapComponent } from './app/map/map.component';

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
  bootstrapApplication(MapComponent)
