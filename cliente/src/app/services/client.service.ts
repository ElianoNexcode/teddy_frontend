import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
export interface Cliente {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ClientesService {
  private http = inject(HttpClient);
  private baseUrl = 'https://boasorte.teddybackoffice.com.br';


  getClientes(page: number = 1, limit: number = 16): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(`${this.baseUrl}/users?page=${page}&limit=${limit}`);
  }

  criarCliente(cliente: Omit<Cliente, 'id'>): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/users`, cliente);
  }

  atualizarCliente(id: number, cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.patch<Cliente>(`${this.baseUrl}/users/${id}`, cliente);
  }

  deletarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`, { responseType: 'text' as 'json' });
  }
}
