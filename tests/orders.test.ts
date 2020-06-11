import {orders} from '../src/orders';
import vars from '../src/vars';
import {httpMockFactory} from './request/__mocks__';
import {RequestOptions} from 'https';

const expirationDate = new Date();
// add a day
expirationDate.setDate(expirationDate.getDate() + 3);

describe('orders', () => {
  let publicKey: string;
  let privateKey: string;

  // let createdOrderId: string;

  beforeEach(() => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      orders.createOrder(
        {
          amount: 1000,
          currency_code: 'PEN',
          description: 'Venta de prueba',
          order_number: 'pedido-9999',
          client_details: {
            first_name: 'Richard',
            last_name: 'Hendricks',
            email: 'richard@piedpiper.com',
            phone_number: '+51945145288',
          },
          expiration_date: expirationDate.getTime(),
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    /*it.only('should create order', async () => {
      const order = await orders.createOrder({
        amount: 1000,
        currency_code: 'PEN',
        description: 'Venta de prueba',
        order_number: 'pedido-9999',
        client_details: {
          first_name: 'Richard',
          last_name: 'Hendricks',
          email: 'richard@piedpiper.com',
          phone_number: '+51945145288',
        },
        expiration_date: expirationDate.getTime(),
      });
      console.log(order);
      createdOrderId = order.id;
      expect(order.object).toMatchSnapshot();
    });*/
  });

  /*describe('confirmOrder', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      orders.confirmOrder(
        {
          id: createdOrderId,
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    it('should confirm order', async () => {
      const order = await orders.confirmOrder({
        id: createdOrderId,
      });
      console.log(order);
      expect(order.state).toBe('confirmado');
    });
  });

  describe('getOrder', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      orders.getOrder(
        {
          id: createdOrderId,
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.orders}/${createdOrderId}`
      );
    });

    it('should get order', async () => {
      const resp = await orders.getOrder({
        id: createdOrderId,
      });
      expect(resp.object).toMatchSnapshot();
    });
  });

  describe('getCustomers', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      customers.getCustomers(
        {
          limit: '2',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    it('should get customers', async () => {
      const resp = await customers.getCustomers({
        limit: '2',
      });
      expect(resp.data.length).toBeGreaterThan(0);
    });
  });

  describe('updateCustomer', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      customers.updateCustomer(
        {
          id: createdCustomerId,
          metadata: {
            foo: 'bar',
          },
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.customers}/${createdCustomerId}`
      );
    });

    it('should update customer', async () => {
      const resp = await customers.updateCustomer({
        id: createdCustomerId,
        metadata: {
          foo: 'bar',
        },
      });
      expect(resp.object).toMatchSnapshot();
      expect(resp.metadata).toEqual({
        foo: 'bar',
      });
    });
  });

  describe('deleteCustomer', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      customers.deleteCustomer(
        {
          id: createdCustomerId,
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.customers}/${createdCustomerId}`
      );
    });

    it('should delete customer', async () => {
      const resp = await customers.deleteCustomer({
        id: createdCustomerId,
      });
      expect(resp.deleted).toBeTruthy();
    });
  });*/
});