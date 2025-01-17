import { navigationRef } from ".";
import { routeNames } from "./route_name";

export class AppNavigation {
    static navigateToLogin=()=>{
        if(navigationRef.isReady()){
            navigationRef?.navigate(routeNames.login);
        }
    }
}