export class AppConstant {
    static userToken = "";
    static fcmToken = "";
    static userId = "";

    static setUserToken=(token)=>{
        this.userToken = token;
        console.log("=========user token==========", this.userToken);
    }

    static setUserId=(id)=>{
        this.userId = id;
        console.log("=========user id==========", this.userId);
    }

    static setFcmToken=(token)=>{
        this.fcmToken = token;
        console.log("=========fcm token==========", this.fcmToken);
    }
}