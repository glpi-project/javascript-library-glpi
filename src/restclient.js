import prepareRequest from './prepareRequest'
import config from './config'
import ITEMTYPE from './itemtype.json'

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

    _makeRequest (myRequest, funct, responseHandler) {
        fetch (myRequest)
            .then((resp) => {        
  
                switch (funct) {
                    case 'killSession':
                        if (resp.ok) {
                            responseHandler(resp.text())                            
                        } else {
                            responseHandler(resp.json()) 
                        }
                    break
                    
                    default:
                        responseHandler(resp.json())
                    break
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
                this._makeRequest( prepareRequest(data), 'initSessionByCredentials', (promise) => {
                    promise.then(response => {
                        if (response.session_token) {
                            config.sessionToken = response.session_token
                        }
                        resolve ( response ) 
                    })
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
                this._makeRequest( prepareRequest(data), 'initSessionByUserToken', (promise) => {
                    promise.then(response => {
                        if (response.session_token) {
                            config.sessionToken = response.session_token
                        }
                        resolve ( response ) 
                    })
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    killSession () {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'killSession'
                }
                this._makeRequest( prepareRequest(data), 'killSession', (promise) => {
                    promise.then(response => {
                        config.sessionToken = ''
                        resolve ( response ) 
                    })
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    addItem (itemtype, input) {
        return new Promise((resolve, reject) => {
            try {
                if (!itemtype || itemtype !== ITEMTYPE[itemtype.name]) {
                    reject('Invalid itemtype')
                } else {
                    const data = {
                        function: 'addItem',
                        itemtype,
                        input
                    }
                    this._makeRequest( prepareRequest(data), 'addItem', (promise) => {
                        promise.then(response => {
                            resolve ( response ) 
                        })
                    })
                }
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getFullSession () {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'getFullSession'
                }
                this._makeRequest( prepareRequest(data), 'getFullSession', (promise) => {
                    promise.then(response => {
                        resolve ( response ) 
                    })
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getActiveProfile () {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'getActiveProfile'
                }
                this._makeRequest( prepareRequest(data), 'getActiveProfile', (promise) => {
                    promise.then(response => {
                        resolve ( response ) 
                    })
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getMyProfiles () {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'getMyProfiles'
                }
                this._makeRequest( prepareRequest(data), 'getMyProfiles', (promise) => {
                    promise.then(response => {
                        resolve ( response ) 
                    })
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getMyEntities () {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'getMyEntities'
                }
                this._makeRequest( prepareRequest(data), 'getMyEntities', (promise) => {
                    promise.then(response => {
                        resolve ( response ) 
                    })
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getActiveEntities () {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'getActiveEntities'
                }
                this._makeRequest( prepareRequest(data), 'getActiveEntities', (promise) => {
                    promise.then(response => {
                        resolve ( response ) 
                    })
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getGlpiConfig () {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'getGlpiConfig'
                }
                this._makeRequest( prepareRequest(data), 'getGlpiConfig', (promise) => {
                    promise.then(response => {
                        resolve ( response ) 
                    })
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

}

export default GlpiRestClient
