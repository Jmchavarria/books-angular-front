import { Component, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  page = input.required<number>();
  limit = input.required<number>();
  total = input.required<number>();
  totalPages = input.required<number>();

  pageSizeOptions: number[] = [3, 5, 7];

  pageChange = output<{ name: string; value: unknown }[]>();

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages()) {
      this.pageChange.emit([
        { name: 'takeQuery', value: this.limit() },
        { name: 'pageQuery', value: newPage },
      ]);
    }
  }

  ngOnInit(): void {
    console.log('total', this.total());
    console.log('limite', this.limit());
    console.log('pagina', this.page());
    console.log('total de pagina', this.totalPages());
  }

  onchangeLimit(newLimit: Event) {
    const element = newLimit.target as HTMLSelectElement;

    this.pageChange.emit([
      { name: 'takeQuery', value: Number(element.value) },
      { name: 'pageQuery', value: 1 },
    ]);
  }
}
