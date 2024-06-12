import React, { useState, useEffect } from 'react';
import { AppProvider, Page, Card, TextContainer, Select, Button, Layout, Frame } from '@shopify/polaris';
import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { createAdminRestApiClient } from '@shopify/admin-api-client';
import { authenticate } from "C:\Users\HP\Desktop\Internship\eShipz_cancellation\app\routes\auth.$.tsx";


// Fetch Orders Function
const fetchOrders = async () => {
  const store = process.env.SHOP_NAME;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

  try {
    const client = createAdminRestApiClient({
      storeDomain: store,
      apiVersion: '2024-04',
      accessToken: accessToken,
    });

    const response = await client.get(`/orders.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const data = await response.json();
    return data.orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

// Loader Function
export const loader: LoaderFunction = async () => {
  const orders = await fetchOrders();
  return json(orders);
};

// Order Management Component
const OrderManagement: React.FC = () => {
  const orders = useLoaderData();
  const [filter, setFilter] = useState<string>('All');

  const handleAccept = (id: number) => {
    // Update the status logic here
  };

  const handleDeny = (id: number) => {
    // Update the status logic here
  };

  const filteredOrders = orders.filter((order: any) =>
    filter === 'All' ? true : order.status === 'Cancellation Requested'
  );

  const filterOptions = [
    { label: 'All Orders', value: 'All' },
    { label: 'Cancellation Requested', value: 'Cancellation Requested' },
  ];

  return (
    <AppProvider>
      <Frame>
        <Page title="Order Management">
          <Layout>
            <Layout.Section>
              <Card sectioned>
                <Select
                  label="Filter Orders"
                  options={filterOptions}
                  onChange={(value) => setFilter(value)}
                  value={filter}
                />
              </Card>
            </Layout.Section>
            <Layout.Section>
              {filteredOrders.length === 0 ? (
                <TextContainer>
                  <p className="text-center text-gray-500">No orders found.</p>
                </TextContainer>
              ) : (
                filteredOrders.map((order: any) => (
                  <Card key={order.id} sectioned>
                    <TextContainer>
                      <h3 className="text-lg font-semibold">{order.line_items[0]?.name || 'Unknown Product'}</h3>
                      <p>Customer: {`${order.customer?.first_name} ${order.customer?.last_name}`}</p>
                      <p>Total: {order.total_price}</p>
                      <p>Payment Status: {order.financial_status}</p>
                      <p>Fulfillment Status: {order.fulfillment_status}</p>
                      {order.status === 'Cancellation Requested' && (
                        <div className="flex justify-around mt-4">
                          <Button primary onClick={() => handleAccept(order.id)}>Accept</Button>
                          <Button destructive onClick={() => handleDeny(order.id)}>Deny</Button>
                        </div>
                      )}
                    </TextContainer>
                  </Card>
                ))
              )}
            </Layout.Section>
          </Layout>
        </Page>
      </Frame>
    </AppProvider>
  );
};

export default OrderManagement;
