import AsyncStorage from '@react-native-async-storage/async-storage';

export const postLogin = async (enableButton, showToast, email, password) => {

    if(email && password){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };   

        await fetch(
            'http://10.0.2.2:3333/api/1.0.0/login', requestOptions)
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
      
      await fetch(
          'http://10.0.2.2:3333/api/1.0.0/user', requestOptions)
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