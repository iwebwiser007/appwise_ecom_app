import { Helper } from '../../helper/Helper';
import {apiUrl} from '../baseUrl';
import { getLoginForm } from '../form';
import {GetRequest, PostRequest, isSuccess} from '../request';



export const getHomeDataByApi=async()=>{
    const obj = {
        banner: [],
    }
    const res = await Promise.all([
        GetRequest({
            url: apiUrl.get_banner
        })
    ]);

    const bannerRes = res[0];

    if(bannerRes?.status){
        obj['banner'] = bannerRes?.data;
    }

    return obj;
}