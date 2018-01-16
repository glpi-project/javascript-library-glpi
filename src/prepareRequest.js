import config from './config'

function prepareRequest (data) {

    let myHeaders = new Headers()
    let myInit = {}
    let url = config.url
    
    myHeaders.append('Content-Type', 'application/json')

    if (config.appToken) {
        myHeaders.append('App-Token', config.appToken)
    }

    if (config.sessionToken) {
        myHeaders.append('Authorization', `user_token ${config.sessionToken}`)        
    }

    switch (data.function) {
        case 'initSessionByCredentials': 
            myHeaders.append('Authorization', `Basic  ${Buffer.from(`${data.userName}:${data.userPassword}`).toString('base64')}`)
            url = `${url}/initSession`
            myInit = { method: 'GET' }
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
