import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tabbed-button.component.html',
  styleUrl: './tabbed-button.component.css',
})
export class TabbedButtonComponent {
  constructor() {}

  @Input()
  public buttonText: string = '';

  @Input()
  public isTabbed: boolean = false;

  @Output()
  public buttonClick: EventEmitter<boolean> = new EventEmitter();

  public onClick(): void {
    this.isTabbed = !this.isTabbed;
    this.buttonClick.emit(this.isTabbed);
  }
}
