import {Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from './theme.service';

import { Theme } from './types';

@Component({
  selector: 'card-overview-example',
  templateUrl: 'card-overview-example.html',
  styleUrls: [ './demo.scss' ]
})
export class CardOverviewExample implements OnInit {
  loading = false;
  theme = new FormControl('light');
  colour = new FormControl('default');

  constructor(private themeService: ThemeService){}

  ngOnInit(): void {
    this.theme.valueChanges.subscribe((theme: Theme) => {
      this.themeService.setTheme(theme);
    });
  }
}
