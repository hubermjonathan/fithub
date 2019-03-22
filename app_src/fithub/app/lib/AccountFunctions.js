//Global helper functions pertaining to local signed-in user data.
//Values are stored in Keychain Services and SharedPreferences for iOS and Android Respectively.
//All SecureStore elements are natively encrypted on Android. iOS can limit Access timing, but it is disabled.

import { Google, SecureStore } from 'expo';
import { BigInteger } from 'big-integer';

const log_in_config = {
    clientId: '708963865872-4r9nn2r5piaktpks7e4d74r03dmh6c60.apps.googleusercontent.com',
    scopes: ['email'],
    //All other fields are depreciated. CliendId now serves crossplatform 
};

//Promps the user to log in to an active google account. Creates/Refreshes all user data stored locally.
export async function logInToGoogle() {
    try {
        const google = await Google.logInAsync(log_in_config)
        if (google.type === 'success') {
            
            //API TOKEN IS VALID
            //Prompt backend for server authentication
            //await SecureStore.setItemAsync('user_google_auth_token', result.accessToken);
            // const result = await fetch('https://fithub-server.herokuapp.com/users/login', {
            //     method: "POST",
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify({access_token: google.accessToken})
            // });
            //     console.log("RESULT", result);
            //     if(result.ok === true) {
            //         await SecureStore.setItemAsync('user_id', result.JSON().body.id);
            //         await SecureStore.setItemAsync('user_uid', result.JSON().body.uid);
            //         await SecureStore.setItemAsync('user_token', result.JSON().body.token);
            //         console.log("ID", result.JSON().body.id);
            //     } 
            
            fetch('https://fithub-server.herokuapp.com/users/login', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({access_token: google.accessToken})
            }).then((res) => {
        return res.json();
        })
        .then((data) => {
                SecureStore.setItemAsync('user_id', data.id);
                SecureStore.setItemAsync('user_uid', data.uid);
                SecureStore.setItemAsync('user_token', data.token);
        });
            // if (result.refreshToken !== undefined) {
            //     await SecureStore.setItemAsync('user_google_auth_refresh_token', result.refreshToken);
            // }
            //await SecureStore.setItemAsync('user_id', result.user.id);
            //await SecureStore.setItemAsync('user_name', result.user.name);
            // await SecureStore.setItemAsync('user_given_name', result.user.givenName);
            // await SecureStore.setItemAsync('user_family_name', result.user.familyName);
            // await SecureStore.setItemAsync('user_photo_url', result.user.photoUrl);
            // await SecureStore.setItemAsync('user_email', result.user.email);
            return true;
        } else if (google.type === 'cancel') {
            //AUTHENTICATION PROCESS TIMED OUT OR WAS CANCELLED
            return false;
        }
    } catch(e) {
        console.log(e);
        return false;
    }
}

//Takes the user's authentication credentials and voids them.
export async function logOutFromGoogle() {
    try {
        const userToken = await getUserToken();
        const result = await Google.logOutAsync({ log_in_config, userToken});
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}

export async function verifyAuthToken() {
    return true;
}

//get function for current_user google_auth_token. 
//IF VALID: returns current_user google_auth_token
//IF INVALID: returns undefined (must prompt/reprompt user to login, or revalidate)
export async function getGoogleAuthToken() {
    try {
    const promise = await SecureStore.getItemAsync('user_google_auth_token');
    return promise;
    } catch(e) {
        console.log(e);
        //Attempt to refresh token with google API, else return undefined
        return undefined;
    }
}

export async function getUserToken() {
    try {
    const promise = await SecureStore.getItemAsync('user_token');
    return promise;
    } catch(e) {
        console.log(e);
        //Attempt to refresh token with google API, else return undefined
        return undefined;
    }
}

export async function getUserID() {
    try {
    const promise = await SecureStore.getItemAsync('user_id');
    return promise;
    } catch(e) {
        console.log(e);
        //Attempt to refresh token with google API, else return undefined
        return undefined;
    }
}

export async function getUserUID() {
    try {
    const promise = await SecureStore.getItemAsync('user_uid');
    return promise;
    } catch(e) {
        console.log(e);
        //Attempt to refresh token with google API, else return undefined
        return undefined;
    }
}








//get function for current_user google_auth_refresh_token. 
//IF VALID: returns current_user google_auth_refresh_token.
//IF INVALID: returns undefined (must prompt/reprompt user to login, or revalidate)
export async function getUserRefreshToken() {
    try {
    const promise = await SecureStore.getItemAsync('user_google_auth_refresh_token');
    return promise;
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

//set function for current_user google_auth_refresh_token.
//IF SUCCESSFUL: returns true
//IF UNSUCCESSFUL: returns false
export async function setUserRefreshToken(refresh_token) {
    try {
        const promise = await SecureStore.setItemAsync('user_google_auth_refresh_token', refresh_token)
        return true
    } catch(e) {
        console.log(e);
        return false;
    }
}


//get function for user_name. 
//IF VALID: returns user_name
//IF INVALID: returns undefined (must prompt/reprompt user to login, or revalidate)
export async function getUserName() {
    try {
    const promise = await SecureStore.getItemAsync('user_name');
    return promise;
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

//get function for user_given_name. 
//IF VALID: returns user_given_name
//IF INVALID: returns undefined (must prompt/reprompt user to login, or revalidate)
export async function getUserGivenName() {
    try {
    const promise = await SecureStore.getItemAsync('user_given_name');
    return promise;
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

//set function for user_given_name.
//IF SUCCESSFUL: returns true
//IF UNSUCCESSFUL: returns false
export async function setUserGivenName(given_name) {
    try {
        const promise = await SecureStore.setItemAsync('user_given_name', given_name)
        return true
    } catch(e) {
        console.log(e);
        return false;
    }
}

//get function for user_family_name. 
//IF VALID: returns user_family_name
//IF INVALID: returns undefined (must prompt/reprompt user to login, or revalidate)
export async function getUserFamilyName() {
    try {
    const promise = await SecureStore.getItemAsync('user_family_name');
    return promise;
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

//get function for user_photo_url. 
//IF VALID: returns user_photo_url
//IF INVALID: returns undefined (must prompt/reprompt user to login, or revalidate)
export async function getUserPhotoUrl() {
    try {
    const promise = await SecureStore.getItemAsync('user_photo_url');
    return promise;
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

//get function for user_email. 
//IF VALID: returns user_email
//IF INVALID: returns undefined (must prompt/reprompt user to login, or revalidate)
export async function getUserEmail() {
    try {
    const promise = await SecureStore.getItemAsync('user_email');
    return promise;
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

