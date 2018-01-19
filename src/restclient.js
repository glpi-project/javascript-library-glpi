import prepareRequest from './prepareRequest'
import config from './config'
import ITEMTYPE from './itemtype.json'

class GlpiRestClient { 
    
    constructor ({url, appToken}) {
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
            .then(resp => {     
                switch (funct) {
                    case 'killSession':
                        if (resp.ok) {
                            responseHandler(resp.text(), resp.ok)                            
                        } else {
                            responseHandler(resp.json(), resp.ok) 
                        }
                    break
                    
                    default:
                        responseHandler(resp.json(), resp.ok)
                    break
                }

            }) 
            .catch((err) => {
                responseHandler(err, false)
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
                this._makeRequest( prepareRequest(data), 'initSessionByCredentials', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                if (response.session_token) {
                                    config.sessionToken = response.session_token
                                }
                                resolve ( response ) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
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
                this._makeRequest( prepareRequest(data), 'initSessionByUserToken', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                if (response.session_token) {
                                    config.sessionToken = response.session_token
                                }
                                resolve ( response ) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
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
                this._makeRequest( prepareRequest(data), 'killSession', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            config.sessionToken = ''
                            if (isOk) {
                                resolve ( response ) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
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
                    this._makeRequest( prepareRequest(data), 'addItem', (promise, isOk) => {
                        if (promise.then) {
                            promise.then(response => {
                                if (isOk) {
                                    resolve ( response ) 
                                } else {
                                    reject (response)
                                }
                            })
                        } else {
                            reject (promise)
                        }
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
                this._makeRequest( prepareRequest(data), 'getFullSession', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                resolve ( response ) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
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
                this._makeRequest( prepareRequest(data), 'getActiveProfile', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                resolve ( response ) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
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
                this._makeRequest( prepareRequest(data), 'getMyProfiles', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                resolve ( response ) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
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
                this._makeRequest( prepareRequest(data), 'getMyEntities', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                resolve ( response ) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
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
                this._makeRequest( prepareRequest(data), 'getActiveEntities', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                resolve ( response ) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
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
                this._makeRequest( prepareRequest(data), 'getGlpiConfig', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                resolve ( response ) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getAllItems (itemtype, queryString) {
        return new Promise((resolve, reject) => {
            try {
                if (!itemtype) reject ('Invalid itemtype')
                if (itemtype !== ITEMTYPE[itemtype.name]) reject ('Invalid itemtype')

                const data = {
                    function: 'getAllItems',
                    itemtype,
                    queryString
                }

                this._makeRequest( prepareRequest(data), 'getAllItems', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                resolve (response) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getAnItem (itemtype, id, queryString) {
        return new Promise((resolve, reject) => {
            try {
                if (!itemtype) reject ('Invalid itemtype')
                if (itemtype !== ITEMTYPE[itemtype.name]) reject ('Invalid itemtype')

                const data = {
                    function: 'getAnItem',
                    itemtype,
                    queryString,
                    id
                }

                this._makeRequest( prepareRequest(data), 'getAnItem', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                resolve (response) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getSubItems (itemtype, id, subItemtype, queryString) {
        return new Promise((resolve, reject) => {
            try {
                if (!itemtype) reject ('Invalid itemtype')
                if (itemtype !== ITEMTYPE[itemtype.name]) reject ('Invalid itemtype')
                if (!subItemtype) reject ('Invalid subItemtype')
                if (subItemtype !== ITEMTYPE[subItemtype.name]) reject ('Invalid subItemtype')

                const data = {
                    function: 'getSubItems',
                    itemtype,
                    queryString,
                    subItemtype,
                    id
                }

                this._makeRequest( prepareRequest(data), 'getSubItems', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                resolve (response) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    deleteItem (itemtype, id, input, queryString) {
        return new Promise((resolve, reject) => {
            try {
                if (!itemtype) reject ('Invalid itemtype')
                if (itemtype !== ITEMTYPE[itemtype.name]) reject ('Invalid itemtype')

                const data = {
                    function: 'deleteItem',
                    itemtype,
                    queryString,
                    input,
                    id
                }

                this._makeRequest( prepareRequest(data), 'deleteItem', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                resolve (response) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    updateItem (itemtype, id, input) {
        return new Promise((resolve, reject) => {
            try {
                if (!itemtype) reject ('Invalid itemtype')
                if (itemtype !== ITEMTYPE[itemtype.name]) reject ('Invalid itemtype')

                const data = {
                    function: 'updateItem',
                    itemtype,
                    input,
                    id
                }

                this._makeRequest( prepareRequest(data), 'updateItem', (promise, isOk) => {
                    if (promise.then) {
                        promise.then(response => {
                            if (isOk) {
                                resolve (response) 
                            } else {
                                reject (response)
                            }
                        })
                    } else {
                        reject (promise)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    registerUser (userToken, userData) {
        return new Promise((resolve, reject) => {
            try {
                if (Array.isArray(userData)) {
                    userData.forEach(element => {
                        if (!element.name) {
                            reject('missing name in a user')
                        }
                        if (!element.realname) {
                            reject('missing realname in a user')
                        }           
                        if (!element.password) {
                            reject('missing password in a user')
                        } 
                        if (!element.password2) {
                            reject('missing password2 in a user')
                        }                    
                    })
                } else {
                    
                    if (!userData.name) {
                        reject('missing name')
                    }
                    if (!userData.realname) {
                        reject('missing realname')
                    }           
                    if (!userData.password) {
                        reject('missing password')
                    } 
                    if (!userData.password2) {
                        reject('missing password2')
                    }       
                }
                this.initSessionByUserToken(userToken)
                    .then(res1 => {
                        this.addItem(ITEMTYPE.User, userData)
                            .then(res2 => {
                                this.killSession()
                                    .then(res3 => {
                                        resolve ( res2 ) 
                                    })
                                    .catch(err3 => {
                                        resolve ( res2 ) 
                                    })
                            })
                            .catch (err2 => {
                                reject(err2)
                            })
                    })
                    .catch(err1 => {
                        reject(err1)
                    })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    login (userName, userPassword) {
        return new Promise((resolve, reject) => {
            try {
                this.initSessionByCredentials(userName, userPassword)
                    .then(res1 => {
                        this.getFullSession()
                            .then(res2 => {
                                this.getAnItem(ITEMTYPE.User, res2.session.glpiID)
                                    .then(res3 => {
                                        this.getSubItems(ITEMTYPE.User, res2.session.glpiID, ITEMTYPE.UserEmail)
                                            .then(res4 => {
                                                resolve ({
                                                    sessionToken: res1.session_token,
                                                    userData: res3, 
                                                    userEmails: res4
                                                })
                                            })
                                            .catch(err4 => {
                                                reject(err4)
                                            })
                                    })
                                    .catch(err3 => {
                                        reject(err3)
                                    })
                            })
                            .catch(err2 => {
                                reject(err2)
                            })
                    })
                    .catch(err1 => {
                        reject(err1)
                    })
            }
            catch (err) {
                reject(err)
            }
        })
    }
}

export default GlpiRestClient
