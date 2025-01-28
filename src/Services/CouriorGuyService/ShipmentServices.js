import BASE_URL from '../../Api/baseUrl';

export const createShipmentOrder = async (deliveryId, productId, userId, orderId) => {
  try {
    const response = await fetch(`${BASE_URL}/createshippingorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_Id: '1',
        delivery_Id: deliveryId,
        product_Id: productId,
        user_Id: userId,
        order_Id: orderId,
      }),
    });

    // Log response status for better debugging
    console.log('Response Status:', response.status);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error creating shipment:', errorResponse);
      throw new Error(errorResponse.message || 'Failed to create shipment.');
    }

    const result = await response.json();
    console.log('Shipment created successfully:', result);
    return result; // Return the result for further use
  } catch (error) {
    console.error('Error creating shipment:', error.message);
    throw error; // Re-throw error to be caught by the caller
  }
};
