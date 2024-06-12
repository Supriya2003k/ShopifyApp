// app/routes/orders.jsx
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  AppProvider,
  Page,
  Card,
  Button,
  Layout,
  Frame,
  DataTable,
  BlockStack,
  Select
} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import React, { useState } from 'react';

// Loader Function to Fetch Orders
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);

  try {
    let response = await admin.rest.resources.Order.all({ session: session, status: "any" });
    let orders = response.data;
    return json(orders);
  } catch (error) {
    console.log('error :', error);
    return json([]);
  }
};

// Function to cancel an order
const cancelOrder = async (orderId, token) => {
  const url = `https://pretestfinal1.myshopify.com/admin/api/2024-10/orders/${orderId}/cancel.json`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Order cancellation failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to cancel a fulfillment
const cancelFulfillment = async (fulfillmentId, token) => {
  const url = `https://publicapp-store1.myshopify.com/admin/api/2024-01/fulfillments/${fulfillmentId}/cancel.json`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Fulfillment cancellation failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Order Management Component
const OrderManagement = () => {
  const orders = useLoaderData();
  const [filter, setFilter] = useState('All');
  const shopifyAccessToken = 'shpua_ee937a305113c7a99a8c7abe560bfd3e'; // Replace with your actual token

  const handleAccept = async (id) => {
    const result = await cancelOrder(id, shopifyAccessToken);
    if (result) {
      // Handle successful cancellation (e.g., update state, show notification)
      console.log('Order cancelled successfully:', result);
    }
  };

  const handleDeny = async (id) => {
    const result = await cancelFulfillment(id, shopifyAccessToken);
    if (result) {
      // Handle successful cancellation (e.g., update state, show notification)
      console.log('Fulfillment cancelled successfully:', result);
    }
  };

  const filteredOrders = orders.filter(order =>
    filter === 'All' ? true : order.status === 'Cancellation Requested'
  );

  const rows = filteredOrders.map(order => [
    order.order_number,
    new Date(order.created_at).toLocaleString(),
    order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'No customer',
    `₹${order.current_total_price}`,
    order.financial_status,
    order.fulfillment_status,
    order.line_items.length,
    order.status === 'Cancellation Requested' ? (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button primary onClick={() => handleAccept(order.id)}>Accept</Button>
        <Button destructive onClick={() => handleDeny(order.id)}>Deny</Button>
      </div>
    ) : (
      'N/A'
    )
  ]);

  return (
    <AppProvider i18n={enTranslations}>
      <Frame>
        <Page title="Order Management">
          <Layout>
            <Layout.Section>
              <Card sectioned>
                <BlockStack>
                  <Select
                    label="Filter Orders"
                    options={[
                      { label: 'All Orders', value: 'All' },
                      { label: 'Cancellation Requested', value: 'Cancellation Requested' }
                    ]}
                    onChange={(value) => setFilter(value)}
                    value={filter}
                  />
                </BlockStack>
              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card sectioned>
                <DataTable
                  columnContentTypes={[
                    'text',
                    'text',
                    'text',
                    'numeric',
                    'text',
                    'text',
                    'numeric',
                    'text'
                  ]}
                  headings={[
                    'Order Number',
                    'Date',
                    'Customer',
                    'Total',
                    'Payment Status',
                    'Fulfillment Status',
                    'Items',
                    'Actions'
                  ]}
                  rows={rows}
                />
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </Frame>
    </AppProvider>
  );
};

export default OrderManagement;
