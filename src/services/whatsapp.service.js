import axios from 'axios';

class WhatsAppService {
    constructor(config) {
        this.axios = axios.create({
            baseURL: `https://graph.facebook.com/${config.WHATSAPP_API_VERSION}/${config.WHATSAPP_PHONE_NUMBER_ID}`,
            headers: {
                'Authorization': `Bearer ${config.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async sendTextMessage(to, message) {
        try {
            const response = await this.axios.post('/messages', {
                messaging_product: 'whatsapp',
                to,
                type: 'text',
                text: {
                    body: message
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error sending WhatsApp message:', error.response?.data || error.message);
            throw error;
        }
    }

    async getMessageStatus(messageId) {
        try {
            const response = await this.axios.get(`/${messageId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting message status:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default WhatsAppService;