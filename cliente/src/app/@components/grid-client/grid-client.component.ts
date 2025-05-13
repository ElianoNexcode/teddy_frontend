import { ClientesService } from '../../services/client.service';

import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardClientComponent, Cliente } from '../card-client/card-client.component';
import { ModalClientComponent, ModalMode } from '../modal-client/modal-client.component';

export interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClientResponse {
  clients: Client[];
  totalPages: number;
  currentPage: number;
}

@Component({
  selector: 'app-grid-client',
  imports: [CommonModule, FormsModule, CardClientComponent, ModalClientComponent],
  templateUrl: './grid-client.component.html',
  styleUrl: './grid-client.component.scss',
})
export class GridClientComponent implements OnInit, OnChanges {
  @Input() page: number = 1;
  @Input() pageSize: number = 16;
  @Input() mode: 'default' | 'selection' = 'default';
  @Input() showPagination: boolean = true;
  @Input() showPageSizeSelector: boolean = true;
  @Input() isSelected: boolean = false;

  @Output() pageChanged = new EventEmitter<number>();
  @Output() totalPagesChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageSizeOptions = [8, 12, 16, 24, 32];
  selectedPageSize = 16;
  totalClients: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  clientes: Client[] = [];
  showClientModal = false;
  selectedClientData: Cliente | null = null;
  currentModalMode: ModalMode = "create";
  removedClientIds = new Set<number>();

  idsSelected: Array<number> = [];

  private clienteService = inject(ClientesService);
  constructor() {}

  ngOnInit() {
    if (this.pageSize && this.pageSizeOptions.includes(this.pageSize)) {
      this.selectedPageSize = this.pageSize;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let needsReload = false;
    this.loadClientes();

    if (changes["page"]) {
      if (this.currentPage !== changes["page"].currentValue) {
        this.currentPage = changes["page"].currentValue;
        needsReload = true;
      }
    }

    if (changes["pageSize"]) {
      if (this.selectedPageSize !== changes["pageSize"].currentValue) {
        this.selectedPageSize = changes["pageSize"].currentValue;
        needsReload = true;
      }
    }

    if (needsReload) {
      this.loadClientes();
    }
  }

  loadClientes() {
    this.clienteService.getClientes(this.currentPage, this.selectedPageSize).subscribe({
      next: (data: ClientResponse) => {
        if(this.isSelected) {
          this.clientes = data.clients.filter(cliente => this.idsSelected?.includes(cliente.id));
        } else {
          this.clientes = data.clients;
        }

        this.totalPages = data.totalPages;
        if (data.currentPage) {
            this.currentPage = data.currentPage;
        }
        this.totalClients = data.clients.length;
        this.totalPagesChange.emit(this.totalPages);
      },
      error: (err) => console.error("Erro ao carregar clientes:", err),
    });
  }

  onPageChange(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.pageChanged.emit(this.currentPage);
      this.loadClientes();
    }
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.pageChanged.emit(this.currentPage);
    this.pageSizeChange.emit(this.selectedPageSize);
    this.loadClientes();
  }

  openModalForCreate(): void {
    this.selectedClientData = null;
    this.currentModalMode = "create";
    this.showClientModal = true;
  }

  openModalForEdit(cliente: any): void {
    this.selectedClientData = { ...cliente };
    this.currentModalMode = "edit";
    this.showClientModal = true;
  }

  openModalForDelete(cliente: Cliente): void {
    this.selectedClientData = { ...cliente };
    this.currentModalMode = "delete";
    this.showClientModal = true;
  }

  handleCloseModal(): void {
    this.showClientModal = false;
    this.selectedClientData = null;
  }

  handleSaveClient(cliente: Cliente): void {
    this.loadClientes();
    this.handleCloseModal();
  }

  handleDeleteConfirm(clientId: any): void {

    this.clienteService.deletarCliente(clientId).subscribe({
      next: () => {
        this.loadClientes();
      },
      error: (err) => console.error(`Erro ao deletar cliente ${clientId}:`, err),
    });
  }

  onAddToSelected(cliente: Cliente): void {
    this.idsSelected.push(cliente.id);
  }

  onRemoveFromSelected(cliente: Cliente): void {
    const index: number = this.idsSelected.findIndex(idSelected => idSelected == cliente.id);
    this.idsSelected.splice(index, 1);

    this.loadClientes();
  }

  onClearSelected(): void {
    this.idsSelected = [];

    this.loadClientes();
  }

}
