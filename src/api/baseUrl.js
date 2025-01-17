const server = "http://213.210.21.175:5000";

const baseUrl = `${server}/AW0001/api/v1/`

export const apiUrl = {
    //Auth process
    login: `${baseUrl}signin`,
    register: `${baseUrl}signup`,
    verify_token: `${baseUrl}verify-token`,
    forget_password: `${baseUrl}forgotpassword`,

    //Home
    get_banner: `${baseUrl}getallbanner`,
    get_home_product: `${baseUrl}getHomeProducts`,
}