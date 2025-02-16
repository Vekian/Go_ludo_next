export interface ListPaginated<T> {
  items: T[];
  totalResults: number;
  page: number;
  totalPages: number;
  previousPage?: number;
  nextPage?: number;
}
