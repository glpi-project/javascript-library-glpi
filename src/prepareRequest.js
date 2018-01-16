import config from './config'

function prepareRequest (data) {

    let myHeaders = new Headers()
    let myInit = {}
    let url = config.url
    
    myHeaders.append('Content-Type', 'application/json')

    if (config.appToken) {
        myHeaders.append('App-Token', config.appToken)
    }
                         
    switch (data.function) {
        case 'initSessionByCredentials': 
            myHeaders.append('Authorization', `Basic ${Buffer.from(`${data.userName}:${data.userPassword}`).toString('base64')}`)
            url = `${url}/initSession`
            myInit = { method: 'GET' }
        break
        case 'initSessionByUserToken': 
            url = `${url}/initSession?user_token=${data.userToken}`
            myInit = { method: 'GET' }
        break
        case 'killSession': 
            myHeaders.append('Accept', 'text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8')
            url = `${url}/killSession`
            myInit = { method: 'GET' }
        break
        default:
        break
    }

    if (config.sessionToken) {
        url = `${url}?session_token=${config.sessionToken}`        
    }

    myInit = {
        ...myInit,
        headers: myHeaders
    }
    
    return new Request(url, myInit)
}

export default prepareRequest
