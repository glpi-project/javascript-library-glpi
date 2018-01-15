import prepareRequest from './prepareRequest'

class GlpiRestClient { 
    constructor (url, appToken = '') {
        this._url = url
        this._sessionToken = ''
        this._appToken = appToken
    }

    get url () {
        return this._url
    }

    set url (url) {
        this._url = url
    }

    get sessionToken () {
        return this._sessionToken
    }

    set sessionToken (sessionToken) {
        if (sessionToken) this._sessionToken = sessionToken
    }

    get appToken () {
        return this._appToken
    }

    set appToken (appToken) {
        if (appToken) this._appToken = appToken
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
                    endpoint: 'initSession',
                    method: 'GET',
                    url: this._url,
                    appToken: this._appToken,
                    userName,
                    userPassword
                }

                const myRequest = prepareRequest(data)

                this._makeRequest(myRequest, (response) => {
                    resolve (
                        response
                    ) 
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }
}

export default GlpiRestClient
