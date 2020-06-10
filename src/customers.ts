import {get, post, patch, delete_, HttpRequestOptions} from './request';
import vars from './vars';

export type Customer = {
  object: string;
  id: string;
  creation_date: number;
  email: string;
  antifraud_details: {
    country_code: string;
    first_name: string;
    last_name: string;
    address_city: string;
    address: string;
    phone: string;
    object: string;
  };
  metadata: {[key: string]: string};
};

type CreateCustomerRequest = {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  address_city: string;
  country_code: string;
  phone_number: string;
};

type GetCustomerRequest = {
  id: string;
};

type GetCustomersRequest = {
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  address_city?: string;
  phone_number?: string;
  country_code?: string;
  limit?: string;
  before?: string;
  after?: string;
};

type GetCustomersResponse = {
  data: Customer[];
  paging: {
    previous: string;
    next: string;
    cursors: {
      before: string;
      after: string;
    };
    remaining_items: number;
  };
};

type UpdateCustomerRequest = {
  id: string;
  metadata?: {[key: string]: string};
};

type DeleteCustomerRequest = {
  id: string;
};

type DeleteCustomerResponse = {
  id: string;
  deleted: boolean;
  merchant_message: string;
};

export const customers = {
  createCustomer: (
    req: CreateCustomerRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) => post<Customer>(vars.basePaths.customers, req, extraHttpOptions),
  getCustomer: (
    req: GetCustomerRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<Customer>(
      `${vars.basePaths.customers}/${req.id}`,
      undefined,
      extraHttpOptions
    ),
  getCustomers: (
    req?: GetCustomersRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<GetCustomersResponse>(
      vars.basePaths.customers,
      req as {[key: string]: string},
      extraHttpOptions
    ),
  updateCustomer: (
    req: UpdateCustomerRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    patch<Customer>(
      `${vars.basePaths.customers}/${req.id}`,
      req,
      extraHttpOptions
    ),
  deleteCustomer: (
    req: DeleteCustomerRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    delete_<DeleteCustomerResponse>(
      `${vars.basePaths.customers}/${req.id}`,
      extraHttpOptions
    ),
};
