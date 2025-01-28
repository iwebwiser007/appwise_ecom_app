// src/Api/homeApi.js

export const fetchBannersFromAPI = async () => {
    const response = await fetch('http://213.210.21.175:5000/AW0001/api/v1/getallbanner');
    const { data } = await response.json();
    return data.filter(banner => banner.image && banner.image !== 'null' && banner.status === '1');
  };

  export const fetchProductsFromAPI = async () => {
    const response = await fetch('http://213.210.21.175:5000/AW0001/api/v1/allproduct');
    const { data } = await response.json();

    return {
      newArrivals: data.filter(item => item.product_image && item.product_image !== 'null' && item.product_discount === 0),
      hotDeals: data.filter(item => item.product_image && item.product_image !== 'null' && Number(item.product_discount) > 0),
      featuredProducts: data.filter(item => item.product_image && item.product_image !== 'null' && item.is_featured === true),
      bestSellerProducts: data.filter(item => item.product_image && item.product_image !== 'null' && item.is_bestseller === true),
    };
  };
