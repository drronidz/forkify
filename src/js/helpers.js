import {TIMEOUT_SEC} from "./config.js";



export const AJAX = async function(url, uploadDATA = undefined) {
    try {
    const fetchPro = uploadDATA
        ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadDATA)
        })
        : fetch(url);
        const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
        const data = await response.json()

        if(!response.ok) throw new Error(`${data.message} (${response.status})`)
        return data
    }
    catch (error) {
        throw error
    }
}
/*
export const sendJSON = async function (url, uploadDATA) {
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadDATA)
        })

        const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
        const data = await response.json()

        if(!response.ok) throw new Error(`${data.message} (${response.status})`)
        return data
    }
    catch (error) {

    }
}

export const getJSON = async function (url) {
    try {
        const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)])
        const data = await response.json()

        if(!response.ok) throw new Error(`${data.message} (${response.status})`)
        return data
    }
    catch (error) {
        throw error
    }
}
*/
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};