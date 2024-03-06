import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-colour-selection',
  templateUrl: './colour-selection.component.html',
  styleUrls: ['./colour-selection.component.scss'],
})
export class ColourSelectionComponent   {
  @Output() colourSelected: EventEmitter<string> = new EventEmitter<string>();
  colours: string[] = ['#FFD480', '#D1FFBD', '#ADDFFF',' #FFD1DF',' #FFA500','#CCCCFF'];
  selectedColour: string = '';
  constructor() {}

  selectColour(colour: string){
    this.selectedColour = colour;
    this.colourSelected.emit(this.selectedColour);

   }

}
