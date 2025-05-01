export type Pagination = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
}

export type ExtendedMeta = Pagination & {companies: string[]; categories: string[] };

//  todo add meta
// todo check for <{ occurrences
