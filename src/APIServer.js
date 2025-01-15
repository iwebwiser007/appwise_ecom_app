const BASE_URL = 'http://213.210.21.175:5000/AW0001/api/v1';


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


// Fetch product details
export const fetchProductDetails = async productId => {
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


export const fetchColorsByGroupCode = async (groupCode) => {
  try {
    const response = await fetch(`${BASE_URL}/allproduct`);
    const result = await response.json();
    if (response.ok && result.statuscode === 200 && result.data) {
      const colors = result.data
        .filter(product => product.group_code === groupCode)
        .map(product => product.color_name);
      return [...new Set(colors)];
    } else {
      throw new Error(result.message || 'Failed to fetch colors');
    }
  } catch (error) {
    console.error('Error fetching colors:', error);
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


// Fetch wishlist items for a user
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


// Generate Payment
// export const generatePayment = async (paymentData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/generate-payment`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(paymentData),
//     });
//     const result = await response.json();
//     if (response.ok && result.statuscode === 200) {
//       return result.data;
//     } else {
//       throw new Error(result.message || 'Failed to generate payment');
//     }
//   } catch (error) {
//     console.error('Error generating payment:', error);
//     throw error;
//   }
// };

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
