import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalClientComponent } from '../modal-client/modal-client.component';

export interface Cliente {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt?: string;
  updatedAt?: string;
}

export type CardMode = 'default' | 'selection';

@Component({
  selector: 'app-card-client',
  imports: [CommonModule,FormsModule, ModalClientComponent],
  templateUrl: './card-client.component.html',
  styleUrl: './card-client.component.scss'
})
export class CardClientComponent {

  @Input() cliente!: Cliente;
  @Input() mode: CardMode = 'default';

  @Output() addRequest = new EventEmitter<Cliente>();
  @Output() editRequest = new EventEmitter<Cliente>();
  @Output() deleteRequest = new EventEmitter<Cliente>();
  @Output() removeRequest = new EventEmitter<Cliente>();

  showModal = false;

  onAdd(): void {
    this.addRequest.emit(this.cliente);
  }

  onEdit(): void {
    this.editRequest.emit(this.cliente);
  }

  closeModal() {
    this.showModal = false;
  }

  onDelete(): void {
    this.deleteRequest.emit(this.cliente);
  }

  onRemove(): void {
    this.removeRequest.emit(this.cliente);
  }

}
