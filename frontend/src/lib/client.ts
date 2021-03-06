const CosmosClient = require('@azure/cosmos').CosmosClient;

const client = new CosmosClient({
  endpoint: process.env.REACT_APP_ENDPOINT,
  key: process.env.REACT_APP_COSMOS_KEY,
  connectionPolicy: {
    enableEndpointDiscovery: false,
  },
});

export const database = client.database(
  process.env.NODE_ENV === 'development' ? 'dcms' : 'dcms_real'
);

export default client;
