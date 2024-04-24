import { HttpHeaders } from '@angular/common/http';

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
  sort?: string,
  order?: string
): Partial<{
  _page: number;
  _limit: number;
  _sort?: string;
  _order?: string;
}> => {
  const params: Partial<{
    _page: number;
    _limit: number;
    _sort?: string;
    _order?: string;
  }> = {
    _page: page,
    _limit: limit,
  };
  if (sort) params['_sort'] = sort;
  if (order) params['_order'] = order;
  return params;
};
