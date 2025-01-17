import {homeProductTypes} from '../../constant/type';
import {Helper} from '../../helper/Helper';
import {apiUrl} from '../baseUrl';
import {getLoginForm} from '../form';
import {GetRequest, PostRequest, isSuccess} from '../request';

export const getHomeDataByApi = async () => {
  const obj = {
    banner: [],
    productSections: [],
  };
  const res = await Promise.all([
    GetRequest({
      url: apiUrl.get_banner,
    }),
    GetRequest({
      url: apiUrl.get_home_product,
    }),
  ]);

  const bannerRes = res[0];
  const productRes = res[1];

  if (bannerRes?.status) {
    obj['banner'] = bannerRes?.data;
  }
  if (productRes?.status) {
    const arr = [];
    if (productRes?.data?.newArrivals?.products?.length > 0) {
      arr.push({
        title: 'New Arrivals',
        type: homeProductTypes.newArrivals,
        list: productRes?.data?.newArrivals?.products,
      });
    }
    if (productRes?.data?.hotDeals?.products?.length > 0) {
      arr.push({
        title: 'Hot Deals',
        type: homeProductTypes.hotDeals,
        list: productRes?.data?.hotDeals?.products,
      });
    }
    if (productRes?.data?.bestseller?.products?.length > 0) {
      arr.push({
        title: 'Best Seller',
        type: homeProductTypes.bestseller,
        list: productRes?.data?.bestseller?.products,
      });
    }
    if (productRes?.data?.featured?.products?.length > 0) {
      arr.push({
        title: 'Featured Products',
        type: homeProductTypes.featured,
        list: productRes?.data?.featured?.products,
      });
    }
    obj['productSections'] = arr;
  }

  return obj;
};
