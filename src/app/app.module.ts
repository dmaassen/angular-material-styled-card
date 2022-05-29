import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';
import {CardOverviewExample} from './card-overview-example';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {StyledCardDirective} from './styled-card.directive';
import {ThemeService} from './theme.service';

@NgModule({
  declarations: [
    CardOverviewExample,
    StyledCardDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [ThemeService],
  bootstrap: [CardOverviewExample],
})
export class AppModule {}
