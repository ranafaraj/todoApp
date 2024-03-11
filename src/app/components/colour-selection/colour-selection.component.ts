import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-colour-selection',
  templateUrl: './colour-selection.component.html',
  styleUrls: ['./colour-selection.component.scss'],
})
export class ColourSelectionComponent   {
  @Output() colourSelected: EventEmitter<string> = new EventEmitter<string>();
  colours: string[] = ['#C40234', '#ADFF2F', '#89CFF0',' #FFD1DF',' #FFEF00','#CCCCFF'];
  selectedColour: string = '';
  constructor() {}

  selectColour(colour: string){
    this.selectedColour = colour;
    this.colourSelected.emit(this.selectedColour);

   }

}
