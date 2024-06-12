// src/utils/shopifyApi.ts

import { createAdminRestApiClient } from '@shopify/admin-api-client';

export const getLocations = async (shopifyAccessToken: string, storeDomain: string) => {
  try {
    const client = createAdminRestApiClient({ storeDomain, apiVersion: '2024-01', accessToken: shopifyAccessToken });
    const response = await client.get('/locations.json');

    if (response.ok) {
      const data = await response.json();
      return data.locations;
    } else {
      console.error('Failed to fetch locations:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.log('error:', error);
    return null;
  }
};
