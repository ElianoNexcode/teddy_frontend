import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-side-navigation',
  imports: [CommonModule],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent implements OnChanges {

  @Input() isOpen: boolean = false; // Recebe do componente pai
  @Output() menuClosed: EventEmitter<void> = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
    }
  }

  onCollapseClick(): void {
    this.isOpen = false
    this.menuClosed.emit();
  }

}
