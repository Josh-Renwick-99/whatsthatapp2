import AsyncStorage from '@react-native-async-storage/async-storage';

const URL_ANDROID = `http://10.0.2.2:3333/api/1.0.0`;
const URL_WEB = `http://localhost:3333/api/1.0.0`;

export const postLogin = async (enableButton, showToast, email, password) => {
    if(email && password){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };   

        await fetch(
            `${URL_ANDROID}/login`, requestOptions)
            .then(async (response) => {
            if (response.status === 200) {
                showToast("Login Successful!")
                return response.json()
            } else if (response.status === 400){
                showToast("Invalid login credentials :(")
            } else {
                showToast("Oops, something went wrong")
            }
        })
        .then(async (responseJson) => {
            console.log(responseJson)
            try {
                await AsyncStorage.setItem("WhatsThat_usr_id", responseJson.id.toString())
                await AsyncStorage.setItem("WhatsThat_usr_token", responseJson.token)
            } catch {
                throw "Something went wrong"
            }
        })
        .then(() =>{
            enableButton
        })

    } else {
        showToast("Login credentials cannot be empty")
        enableButton
    }
}

export const postRegister = async (showToast, enableButton, firstName, lastName, email, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password})
      };
      
      await fetch(`${URL_ANDROID}/user`, requestOptions)
          .then(async (response) => {
            if (response.status === 201) {
                showToast("Registration Successful!")
                return response.json()
            } else if (response.status === 400){
                showToast("Invalid email address :( ")
            } else {
                showToast("Oops, something went wrong")
            }
        })
        .then(async (rJson) => {
            console.log(rJson)
        })
        .then(() =>{
            enableButton();
        })
}

export const postLogout = async() => {
    console.log("Logout request received")
    const requestOptions = {
        method: 'POST',
        headers: { 
            'X-Authorization': await AsyncStorage.getItem('WhatsThat_usr_token') 
        },
      };
    await fetch(`${URL_ANDROID}/logout`, requestOptions)
}

export const getUserInfo = async(handleProfileUpdate) => {
    const token = await AsyncStorage.getItem("WhatsThat_usr_token")
    const id = await AsyncStorage.getItem("WhatsThat_usr_id")
    const requestOptions = {
        method: 'GET',
        headers: { 
            'X-Authorization': token
        },
      };
    await fetch(
        `${URL_ANDROID}/user/${id}`, requestOptions)
        .then(async (response) => {
        if (response.status === 200 || response.status === 304) {
            return response.json()
        } else if (response.status === 400){
            console.log("UnAuthorized")
        } else {
            console.log("Something went wrong")
        }
    })
    .then(rJson => {
        handleProfileUpdate(rJson.first_name, rJson.last_name, rJson.email)
    })
}

export const patchUserInfo = async(showToast, first_name, last_name, email_address, pwd) => {
    const token = await AsyncStorage.getItem("WhatsThat_usr_token")
    const id = await AsyncStorage.getItem("WhatsThat_usr_id")
    console.log(`Received user detail patch request for ${id}`)
    const requestOptions = {
        method: 'PATCH',
        headers: { 'X-Authorization': token,
        'Content-Type': 'application/json',  },
        body: JSON.stringify({ 
            first_name: first_name, 
            last_name: last_name,
            email: email_address,
            password: pwd })
      };
      console.log(`${URL_ANDROID}/user/${id}`, requestOptions)
      await fetch(
        `${URL_ANDROID}/user/${id}`, requestOptions)
        .then(async (response) => {
        if (response.status === 200) {
            showToast("Details changed successfully")
            return response.json()
        } else if (response.status === 400){
            showToast("Bad inputs")
        } else {
            showToast("Oops, something went wrong")
        }
    })
    .then(async (responseJson) => {
        console.log(responseJson)
        try {
            await AsyncStorage.setItem("WhatsThat_usr_id", responseJson.id.toString())
            await AsyncStorage.setItem("WhatsThat_usr_token", responseJson.token)
        } catch {
            throw "Something went wrong"
        }
    })
}

export const getAvatar = async (handleSetAvatar) => {
    const id = await AsyncStorage.getItem("WhatsThat_usr_id");
    const token = await AsyncStorage.getItem("WhatsThat_usr_token");
    console.log("Get avatar request received")
    console.log(`${URL_ANDROID}/user/${id}/photo`, token)
    fetch(`${URL_ANDROID}/user/${id}/photo`, {
        method: "GET",
        headers: {
            "X-Authorization" : token,
        }
    })
    .then((response) => {
        return response.blob();
    })
    .then((responseBlob) => {
        let data = URL.createObjectURL(responseBlob);
        handleSetAvatar(data);
    })
    .catch(error => console.error(error));
}

export const postAvatar = async (blob, handleSetAvatar, showToast) => {
    try {
        const id = await AsyncStorage.getItem("WhatsThat_usr_id");
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        console.log(`Sending avatar for ${id}`)

        if (!id || !token) {
            throw new Error("User ID or token not found in AsyncStorage");
        }

        await fetch(`${URL_ANDROID}/user/${id}/photo`, {
            method: 'POST',
            headers: {
            'Content-Type': 'image/png',
            'X-Authorization' : token,
        },
            body: blob,
        })
        .then(response => {
            handleSetAvatar;
            showToast("Avatar changed successfully")
        })
        .catch(error => {
            console.log(error)
        });
    } catch {
        throw new Error("Something went wrong")
    }
}

