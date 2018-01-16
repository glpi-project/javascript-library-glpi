import prepareRequest from './prepareRequest'
import config from './config'

class GlpiRestClient { 
    constructor (url, appToken = '') {
        config.url = url
        config.appToken = appToken
        config.sessionToken = ''
    }

    get url () {
        return config.url
    }

    set url (url) {
        config.url = url
    }

    get sessionToken () {
        return config.sessionToken
    }

    set sessionToken (sessionToken) {
        config.sessionToken = sessionToken
    }

    get appToken () {
        return config.appToken
    }

    set appToken (appToken) {
        config.appToken = appToken
    }

    _makeRequest (myRequest, responseHandler) {
        fetch (myRequest)
            .then((resp) => {        
                if (resp.headers.get('Content-Type').indexOf("application/json") >= 0) {
                    responseHandler(resp.json())
                } else {
                    responseHandler(resp.text())
                }
            }) 
            .catch((err) => {
                responseHandler(err)
            })
    }

    initSessionByCredentials (userName, userPassword) {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'initSessionByCredentials',
                    userName,
                    userPassword
                }
                this._makeRequest( prepareRequest(data), (response) => {
                    if (response.session_token) {
                        config.sessionToken = response.session_token
                    }
                    resolve ( response ) 
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    initSessionByUserToken (userToken) {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'initSessionByUserToken',
                    userToken
                }
                this._makeRequest( prepareRequest(data), (response) => {
                    if (response.session_token) {
                        config.sessionToken = response.session_token
                    }
                    resolve ( response ) 
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }
}

export default GlpiRestClient
