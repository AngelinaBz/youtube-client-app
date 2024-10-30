import {
  Component, EventEmitter, Input, Output
} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() isDisabled: boolean = false;

  @Input() btnClass = '';

  @Output() clickHandler = new EventEmitter();

  handleClick() {
    this.clickHandler.emit();
  }
}
