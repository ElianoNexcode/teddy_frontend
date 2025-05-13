import { PaginationComponent } from './@components/pagination/pagination.component';
import { GridClientComponent } from './@components/grid-client/grid-client.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, GridClientComponent, PaginationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cliente';

  currentPage = 1;
  selectedPageSize = 16;
  totalPages = 1;

  selected: boolean = false;

  constructor(private activedRoute: ActivatedRoute) {
    this.activedRoute.queryParams
      .subscribe((param: any) => {
        this.selected = param?.selected;
      })
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
  }

  updateTotalPages(pages: number): void {
    this.totalPages = pages;
  }

  onPageSizeChange(newPageSize: number): void {
    this.selectedPageSize = newPageSize;
    this.currentPage = 1;
  }

}

