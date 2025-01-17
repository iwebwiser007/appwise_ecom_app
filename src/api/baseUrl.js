const server = "http://213.210.21.175:5000";

const baseUrl = `${server}/AW0001/api/v1/`

export const apiUrl = {
    login: `${baseUrl}signin`,
    register: `${baseUrl}signup`,
    verify_token: `${baseUrl}verify-token`,
}