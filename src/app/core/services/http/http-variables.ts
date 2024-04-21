import { HttpHeaders } from '@angular/common/http';
import { OrderOptions, SortOptions } from '../../models/query-parametr';

export const url = 'http://127.0.0.1:3000';
export const basePath = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
};
export const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

export const getParams = (page: number, limit: number) => {
  const params = {
    _page: page,
    _limit: limit,
  };
  return params;
};

export const getParamsWinners = (
  page: number,
  limit: number,
  sort?: SortOptions,
  order?: OrderOptions
): Partial<{
  _page: number;
  _limit: number;
  _sort?: SortOptions;
  _order?: OrderOptions;
}> => {
  const params: Partial<{
    _page: number;
    _limit: number;
    _sort?: SortOptions;
    _order?: OrderOptions;
  }> = {
    _page: page,
    _limit: limit,
  };
  if (sort) params['_sort'] = sort;
  if (order) params['_order'] = order;
  return params;
};
