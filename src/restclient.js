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

    _prepareRequest (method, endpoint, options) {
        fetch (
            `${this._url}/${endpoint}`,
            {
                method,
                headers: {
                    "Content-type": "application/json",
                    ...options.headers
                },
                body: options.body
            }
        )
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export default GlpiRestClient
