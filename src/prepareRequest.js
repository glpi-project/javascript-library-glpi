

function prepareRequest (data) {

    let myHeaders = new Headers()
    let myInit = {  method: data.method }
    let url = `${data.url}/${data.endpoint}`
    
    myHeaders.append('Content-Type', 'application/json')

    if (data.appToken) {
        myHeaders.append('App-Token', data.appToken)
    }

    if (data.sessionToken) {
        myHeaders.append('Authorization', `user_token ${data.sessionToken}`)        
    }

    switch (data.function) {
        case 'initSessionByCredentials': 
            myHeaders.append('Authorization', `Basic  ${Buffer.from(`${data.userName}:${data.userPassword}`).toString('base64')}`)
        break
        default:
        break
    }

    myInit = {
        ...myInit,
        headers: myHeaders
    }

    return new Request(url, myInit)
}

export default prepareRequest
