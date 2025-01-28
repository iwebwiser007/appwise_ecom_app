export class GlobalConstant {
    static appName = 'AppName';
    static userToken = '';
    static refreshToken = '';
    static deviceId = 'This is device id';
    static fcmToken = '';


    static helpEmail = 'support@email.com';

    static insets = {
        top: 0,
        bottom: 0,
    };

    static updateUserToken = (token) => {
        this.userToken = token;
        console.log('========user token ==========', token);
    };

    static updateRefreshToken = (token) => {
        this.refreshToken = token;
        console.log('========user refresh token ==========', token);
    };

    static updateFcmToken = (token) => {
        this.fcmToken = token;
        console.log('========fcm token ==========', this.fcmToken);
    };
}
