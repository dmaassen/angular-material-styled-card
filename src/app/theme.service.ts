import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Theme } from './types';

const themeMap = new Map<Theme, string>([
  ['light', 'light'],
  ['dark', 'dark']
]);

@Injectable({providedIn: 'root'})
export class ThemeService {

  themeSubject = new BehaviorSubject<Theme>('light');
  theme$ = this.themeSubject.asObservable();

  constructor(private overlay: OverlayContainer){}  

  setTheme(theme: Theme) {

    // Clear theme.
    themeMap.forEach(theme => {
      if (document.body.classList.contains(theme)) {
        document.body.classList.remove(theme);
        this.overlay.getContainerElement().classList.remove(theme);
        this.removeTheme(theme);
      }       
    });

    // Set theme attribute.
    document.documentElement.setAttribute('theme', themeMap.get(theme) || '');

    // Handle dark theme stylesheet link.
    if (theme === 'dark') {
      const href = 'dark.css';
      const themeElement = getTheme(theme);
      themeElement.setAttribute('href', href);

      document.body.classList.add(theme);
      this.overlay.getContainerElement().classList.add(theme);
    }

   // this.theme = theme;
    this.themeSubject.next(theme);
  }

  removeTheme(key: string) {
    const linkElement = getThemeElement(key);

    if (linkElement) {
      document.head.removeChild(linkElement);
    }
  }
}


const getTheme = (elementKey: string) => getThemeElement(elementKey) || createThemeElement(elementKey);
const themeClassName = (key: string) => `theme-service-${key}`;
const getThemeElement = (elementKey: string) => document.head.querySelector(`link[rel="stylesheet"].${themeClassName(elementKey)}`);

const createThemeElement = (themeKey: string) => {
  const element = document.createElement('link');

  element.setAttribute('rel', 'stylesheet');
  element.classList.add(themeClassName(themeKey));
  
  document.head.appendChild(element);
  return element;
}
