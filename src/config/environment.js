const schema = {
  type: 'object',
  required: ['PORT', 'WHATSAPP_API_VERSION', 'WHATSAPP_PHONE_NUMBER_ID', 'WHATSAPP_ACCESS_TOKEN'],
  properties: {
    PORT: {
      type: 'number',
      default: 3000
    },
    WHATSAPP_API_VERSION: {
      type: 'string',
      default: 'v16.0'
    },
    WHATSAPP_PHONE_NUMBER_ID: {
      type: 'string'
    },
    WHATSAPP_ACCESS_TOKEN: {
      type: 'string'
    }
  }
};

export default schema;