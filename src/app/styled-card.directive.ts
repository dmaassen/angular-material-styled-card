import { 
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CardVariant, CardColour } from './types';

@Directive({
  selector: '[styledCard]',
})
export class StyledCardDirective implements OnInit, OnChanges {
  baseCardClass = 'styled-card';
  colourClasses = ['styled-card-primary', 'styled-card-accent'];

  @Input() variant: CardVariant = 'outlined';
  @Input() colour: CardColour = 'primary';

  constructor(private card: ElementRef){}

  ngOnInit(): void {

    const classes = [
      this.baseCardClass,
      ...(this.styledVariant),
      ...(this.styledBackground)
    ];

    if (classes) {
      classes.forEach(c => {
        this.card.nativeElement.classList.add(c);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {    
    if (changes.colour) {
      this.colourClasses.forEach(c => this.card.nativeElement.classList.remove(c));      
      this.styledBackground.forEach(c => this.card.nativeElement.classList.add(c));
    }    
  }

  get styledVariant(): string[] {
    switch (this.variant) {
      case 'filled': return ['styled-card-filled'];
      case 'outlined': return ['styled-card-outlined'];
      case 'elevated': return [];
    }
  }

  get styledBackground(): string[] {
    switch (this.colour) {
      case 'primary': return [ 'styled-card-primary' ]
      case 'accent': return [ 'styled-card-accent' ]
      default: return []
    }
  }
}
