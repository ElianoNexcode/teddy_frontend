import { ClientesService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../card-client/card-client.component';


export type ModalMode = 'create' | 'edit' | 'delete';

@Component({
  selector: 'app-modal-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-client.component.html',
  styleUrl: './modal-client.component.scss',
})
export class ModalClientComponent {
  @Input() clientData: Cliente | null = null;
  @Input() mode: ModalMode = 'create';
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveClient = new EventEmitter<Cliente>();
  @Output() deleteConfirm = new EventEmitter<number>();

  formData: {
    name: string;
    salary: number | null;
    companyValuation: number | null;
  } = {
    name: '',
    salary: null,
    companyValuation: null,
  };

  isEditMode = false;
  modalTitle = 'Criar Cliente';
  submitButtonText = 'Criar Cliente';
  confirmationMessage = '';

  private clienteService = inject(ClientesService);

  ngOnInit(): void {
    this.initializeModal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientData']) {
      this.initializeModal();
    }
  }

  initializeModal(): void {
    if (this.mode === 'edit' && this.clientData && this.clientData.id) {
      this.modalTitle = 'Editar cliente:';
      this.submitButtonText = 'Editar cliente';
      this.formData = {
        name: this.clientData.name,
        salary: this.clientData.salary,
        companyValuation: this.clientData.companyValuation,
      };
      this.confirmationMessage = '';
    } else if (
      this.mode === 'delete' &&
      this.clientData &&
      this.clientData.id
    ) {
      this.modalTitle = 'Excluir cliente:';
      this.submitButtonText = 'Excluir cliente';
      this.formData = { name: '', salary: null, companyValuation: null }; // Clear form for delete view
      this.confirmationMessage = this.clientData.name;
    } else {
      // Create mode
      this.mode = 'create'; // Ensure mode is set to create if not edit/delete
      this.modalTitle = 'Criar cliente:';
      this.submitButtonText = 'Criar cliente';
      this.formData = { name: '', salary: null, companyValuation: null };
      this.clientData = null; // Ensure clientData is null for create mode
      this.confirmationMessage = '';
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }


  onSubmit(): void {
    if (this.mode === "delete" && this.clientData && this.clientData.id) {
      this.deleteConfirm.emit(this.clientData.id);
      this.onClose();
      return;
    }

    if (this.mode === "create" || this.mode === "edit") {
      if (
        !this.formData.name ||
        this.formData.salary === null ||
        this.formData.companyValuation === null
      ) {
        console.error("Formulário inválido");
        return;
      }

      const clientPayload = {
        name: this.formData.name,
        salary: Number(this.formData.salary),
        companyValuation: Number(this.formData.companyValuation),
      };

      if (this.mode === "edit" && this.clientData && this.clientData.id) {
        this.clienteService
          .atualizarCliente(this.clientData.id, clientPayload as Partial<Cliente>)
          .subscribe({
            next: (updatedClient) => {
              this.saveClient.emit(updatedClient);
              this.onClose();
            },
            error: (err) => console.error("Erro ao atualizar cliente:", err),
          });
      } else if (this.mode === "create"){
        this.clienteService
          .criarCliente(clientPayload as Omit<Cliente, "id">)
          .subscribe({
            next: (newClient) => {
              this.saveClient.emit(newClient);
              this.onClose();
            },
            error: (err) => console.error("Erro ao criar cliente:", err),
          });
      }
    }
  }
}
