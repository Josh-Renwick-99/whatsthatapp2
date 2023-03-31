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

export const getUserInfo = async(handleProfileUpdate, justGet) => {
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
        if (justGet){
            return rJson
        } else {
            handleProfileUpdate(rJson.first_name, rJson.last_name, rJson.email)
        }
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
        mode: "cors",
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

export const getContacts = async () => {
    try {
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        const response = await fetch(`${URL_ANDROID}/contacts`, {
            method: 'GET',
            headers: {
            'X-Authorization' : token,
            },
        });
    
        if (response.status === 200) {
            console.log("Fetched contacts")
            const json = await response.json();
            return json;
        } else if (response.status === 400) {
            console.log("Unauthorized");
        } else {
            console.log("Oops, something went wrong");
        }
    } catch (error) {
        console.log("Error fetching contacts:", error);
    }
};

export const getUsers = async () => {
    try {
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        const response = await fetch(`${URL_ANDROID}/search?search_in=all&limit=20&offset=0`, {
            method: 'GET',
            headers: {
            'X-Authorization' : token,
            },
        });
    
        if (response.status === 200 || response.status === 304) {
            console.log("Fetched users");
            const json = await response.json();
            return json;
        } else if (response.status === 400) {
            console.log("Unauthorized");
        } else {
            console.log("Oops, something went wrong");
        }
    } catch (error) {
        console.log("Error fetching contacts:", error);
    }
};

export const addContact = async (id) => {
    try {
        console.log(`Attempting to add contact ${id}`)
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        const response = await fetch(`${URL_ANDROID}/user/${id}/contact`, {
            method: 'POST',
            headers: {
            'X-Authorization' : token,
            },
        });
    
        if (response.status === 200 || response.status === 304) {
            console.log("Added contact successfully");
        } else if (response.status === 400) {
            console.log("Unauthorized");
        } else {
            console.log("Oops, something went wrong");
        }
    } catch (error) {
        console.log(error);
    }
}

export const removeContact = async(id) => {
    try {
        console.log(`Attempting to remove contact ${id}`)
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        const response = await fetch(`${URL_ANDROID}/user/${id}/contact`, {
            method: 'DELETE',
            headers: {
            'X-Authorization' : token,
            },
        });
    
        if (response.status === 200 || response.status === 304) {
            console.log("Removed contact successfully");
        } else if (response.status === 400) {
            console.log("Unauthorized");
        } else {
            console.log("Oops, something went wrong");
        }
    } catch (error) {
        console.log(error);
    }
}

export const getBlockedContacts = async() => {
    try {
        console.log(`Attempting to fetch blocked contacts`)
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        const response = await fetch(`${URL_ANDROID}/blocked`, {
            method: 'GET',
            headers: {
            'X-Authorization' : token,
            },
        });
    
        if (response.status === 200 || response.status === 304) {
            console.log("Fetched blocked contacts");
            const json = await response.json();
            return json;
        } else if (response.status === 400) {
            console.log("Unauthorized");
        } else {
            console.log("Oops, something went wrong");
        }
    } catch (error) {
        console.log(error);
    }
}

export const postBlockContact = async (id) => {
    try {
        console.log(`Attempting to block contact ${id}`)
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        const response = await fetch(`${URL_ANDROID}/user/${id}/block`, {
            method: 'POST',
            headers: {
            'X-Authorization' : token,
            },
        });
    
        if (response.status === 200 || response.status === 304) {
            console.log("Blocked contact successfully");
        } else if (response.status === 400) {
            console.log("Unauthorized");
        } else {
            console.log("Oops, something went wrong");
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteBlockedContact = async (id) => {
    try {
        console.log(`Attempting to unblock contact ${id}`)
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        const response = await fetch(`${URL_ANDROID}/user/${id}/block`, {
            method: 'DELETE',
            headers: {
            'X-Authorization' : token,
            },
        });
    
        if (response.status === 200 || response.status === 304) {
            console.log("Unblocked contact successfully");
        } else if (response.status === 400) {
            console.log("Unauthorized");
        } else {
            console.log("Oops, something went wrong");
        }
    } catch (error) {
        console.log(error);
    }
}

export const getChats = async () => {
    try {
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        const id = await AsyncStorage.getItem("WhatsThat_usr_id");
        console.log(`Fetching chats for user ${id}`)
        const response = await fetch(`${URL_ANDROID}/chat`, {
            method: 'GET',
            headers: {
            'X-Authorization' : token,
            },
        });
    
        if (response.status === 200 || response.status === 304) {
            console.log("Fetched chats successfully");
            const json = await response.json();
            return json;
        } else if (response.status === 400) {
            console.log("Unauthorized");
        } else {
            console.log("Oops, something went wrong");
        }
    } catch (error) {
        console.log(error);
    }
}

export const postChat = async (chatName) => {
    try {
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        const id = await AsyncStorage.getItem("WhatsThat_usr_id");
        console.log(`Creating new chat for user ${id}`);

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'X-Authorization': token
            },
            body: JSON.stringify({ 
                name: chatName
            })
        };

        const response = await fetch(`${URL_ANDROID}/chat`, requestOptions);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        console.log("Chat created successfully");
    } catch (error) {
        console.log(error.message);
    }
};

export const getChatDetails = async (chatId) => {
    try {
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        const id = await AsyncStorage.getItem("WhatsThat_usr_id");
        console.log(`Fetching chat details for chat ${chatId}`)
        const response = await fetch(`${URL_ANDROID}/chat/${chatId}?limit=20&offset=0`, {
            method: 'GET',
            headers: {
            'X-Authorization' : token,
            },
        });
    
        if (response.status === 200 || response.status === 304) {
            console.log("Fetched chat successfully");
            const json = await response.json();
            return json;
        } else if (response.status === 400) {
            console.log("Unauthorized");
        } else {
            console.log("Oops, something went wrong");
        }
    } catch (error) {
        console.log(error);
    }
}

export const postChatMessage = async(chatId, m) => {
    try {
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        const id = await AsyncStorage.getItem("WhatsThat_usr_id");
        console.log(`Posting message {${m}} to chat: ${chatId}`)
        const response = await fetch(`${URL_ANDROID}/chat/${chatId}/message`, {
            method: 'POST',
            headers: {
            'X-Authorization' : token,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: m })
        });
    
        if (response.status === 200 || response.status === 304) {
            console.log("posted message successfully");
            const json = await response.json();
            return json;
        } else if (response.status === 400) {
            console.log("Unauthorized");
        } else {
            console.log("Oops, something went wrong");
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteMemberFromChat = async(chatId, id) => {
    try {
        const token = await AsyncStorage.getItem("WhatsThat_usr_token");
        console.log(`Removing user {${id}} from chat: ${chatId}`)
        const response = await fetch(`${URL_ANDROID}/chat/${chatId}/user/${id}`, {
            method: 'DELETE',
            headers: {
            'X-Authorization' : token,
            },
        });
    
        if (response.status === 200 || response.status === 304) {
            console.log("Removed user successfully");
        } else if (response.status === 400) {
            console.log("Unauthorized");
        } else {
            console.log("Oops, something went wrong");
        }
    } catch (error) {
        console.log(error);
    }
}