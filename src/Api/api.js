import request from './request';
export const BASE_URL = 'http://213.210.21.175:5000/AW0001/api/v1';


// API Call for Login
export const login = async (email, password) => {
  const data = { email, password };
  const response = await request.PostRequest({
    url: 'signin',
    data: data,
    method: 'POST',
  });
  return response;
};

// Fetch categories
export const fetchAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getallcategory`);
    const result = await response.json();
    if (response.ok && result.data) {
      return result.data;
    } else {
      throw new Error(result.message || 'Failed to fetch categories');
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Fetch sections
export const fetchAllSections = async () => {
  try {
    const response = await fetch(`${BASE_URL}/allsection`);
    const result = await response.json();
    if (response.ok && result.data) {
      return result.data;
    } else {
      throw new Error(result.message || 'Failed to fetch sections');
    }
  } catch (error) {
    console.error('Error fetching sections:', error);
    throw error;
  }
};


// Fetch items in the cart
export const fetchCartItems = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/getitemcart?user_id=${userId}`);
    const result = await response.json();
    if (response.ok && result.statuscode === 200) {
      return result.data;
    } else {
      throw new Error(result.message || 'Failed to fetch cart items');
    }
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (userId, productId) => {
  try {
    const response = await fetch(`${BASE_URL}/removeitemfromcart`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, product_id: productId }),
    });
    const result = await response.json();
    if (response.ok && result.statuscode === 200) {
      return result;
    } else {
      throw new Error(result.message || 'Failed to remove item from cart');
    }
  } catch (error) {
    console.log('Error removing item from cart:', error);
    throw error;
  }
};



// Add an item to the cart
export const addItemToCart = async (
  userId,
  productId,
  size,
  color,
  quantity,
) => {
  try {
    const response = await fetch(`${BASE_URL}/additemtocart`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: userId,
        product_id: productId,
        size: size,
        // color: color,
        quantity,
      }),
    });
    const result = await response.json();
    if (response.ok && result.statuscode === 200) {
      return result;
    } else {
      throw new Error(result.message || 'Failed to add item to cart');
    }
  } catch (error) {
    console.log('Error adding item to cart:', error);
    throw error;
  }
};

// Fetch product details by ID.
export const fetchProductDetailsById = async productId => {
  try {
    const response = await fetch(`${BASE_URL}/getproductbyid?id=${productId}`);
    const result = await response.json();
    if (response.ok && result.statuscode === 200) {
      return result.data;
    } else {
      throw new Error(result.message || 'Failed to fetch product details');
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

// Fetch product size from product
export const fetchProductSizeFromProduct = async productId => {
  try {
    const response = await fetch(`${BASE_URL}/getproductbyid?id=${productId}`);
    const result = await response.json();
    if (response.ok && result.statuscode === 200) {
      const sizes = result.data.attributes.map(attribute => attribute.size);
      return sizes;
    } else {
      throw new Error(result.message || 'Failed to fetch product details');
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};
export const fetchProductDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/getproductbyid?id=${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }
  const data = await response.json();
  return data.data; // Return the product data
};

//  Fetch product ratings by ID.
export const fetchProductRatingsById = async productId => {
  try {
    const response = await fetch(`${BASE_URL}/getratingbyid?id=${productId}`);
    const result = await response.json();
    if (response.ok && result.statuscode === 200) {
      return result.data.map(rating => rating.rating);
    } else {
      throw new Error(result.message || 'Failed to fetch product ratings');
    }
  } catch (error) {
    console.error('Error fetching product ratings:', error);
    throw error;
  }
};

// Fetch user wishlist
export const fetchUserWishlist = async userId => {
  try {
    const response = await fetch(`${BASE_URL}/getuserwishlist?user_id=${userId}`);
    const result = await response.json();
    if (response.ok && result.data) {
      return result.data;
    } else {
      throw new Error(result.message || 'Failed to fetch wishlist');
    }
  } catch (error) {
    console.log('Error fetching wishlist:', error);
    throw error;
  }
};

// Fetch wishlist for a user
export const fetchWishlist = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/getuserwishlist?user_id=${userId}`);
    const result = await response.json();
    if (response.ok && result.data) {
      return result.data;
    } else {
      throw new Error('Failed to fetch wishlist');
    }
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

// Add an item to the wishlist
export const addToWishlist = async (userId, productId) => {
  try {
    const response = await fetch(`${BASE_URL}/adduserwishlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, product_id: productId }),
    });
    const result = await response.json();
    if (response.ok && result.statuscode === 200) {
      return result;
    } else {
      throw new Error(result.message || 'Failed to add item to wishlist');
    }
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    throw error;
  }
};

// Remove an item from the wishlist
export const removeFromWishlist = async (userId, productId) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteuserwishlist`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, product_id: productId }),
    });
    const result = await response.json();
    if (response.ok && result.statuscode === 200) {
      return result;
    } else {
      throw new Error(result.message || 'Failed to remove item from wishlist');
    }
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
    throw error;
  }
};

// Fetch all products
export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/allproduct`);
    const result = await response.json();
    if (response.ok && result.data) {
      return result.data;
    } else {
      throw new Error(result.message || 'Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Generate payment
export const generatePayment = async (paymentData) => {
  try {
    const response = await fetch('http://213.210.21.175:5000/AW0001/api/v1/generate-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    return await response.json();
  } catch (error) {
    console.error('Payment API error:', error);
    return null;
  }
};



// Fetch delivery address
export const fetchDeliveryAddress = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/getDeliveryAddresses?userId=${userId}`);
    const result = await response.json();
    if (response.ok && result.statuscode === 200) {
      return result.data || [];
    } else {
      throw new Error(result.message || 'Failed to fetch addresses');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Add new address
export const addNewAddress = async (addressData) => {
  try {
    const response = await fetch(`${BASE_URL}/addDeliveryAddress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressData),
    });
    const result = await response.json();
    if (response.ok && result.statuscode === 200) {
      return result;
    } else {
      throw new Error(result.message || 'Failed to add address');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetch products
export const fetchProducts = async (categoryId) => {
  try {
    const response = await fetch(`${BASE_URL}/allproduct`);
    const result = await response.json();
    if (response.ok && result.data) {
      return result.data.filter(item => item.category_id === categoryId);
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


// Fetch ratings
export const fetchRatings = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getrating`);
    const result = await response.json();
    if (response.ok && result.data) {
      return result.data.reduce((acc, item) => {
        acc[item.product_id] = item.rating;
        return acc;
      }, {});
    } else {
      throw new Error('Failed to fetch ratings');
    }
  } catch (error) {
    console.error('Error fetching ratings:', error);
    throw error;
  }
};


