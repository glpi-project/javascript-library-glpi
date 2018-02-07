import prepareRequest from './prepareRequest'
import config from './config'
import ITEMTYPE from './itemtype.json'

class GlpiApiClient { 
    
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

    _makeRequest = async (myRequest, functionName, responseHandler) => {
        try {
            const response = await fetch (myRequest)
            switch (functionName) {
                case 'killSession':
                    if (response.ok) {
                        responseHandler(await response.text(), response.ok)                            
                    } else {
                        responseHandler(await response.json(), response.ok) 
                    }
                break

                case 'changeActiveProfile':
                    if (response.ok) {
                        responseHandler(await response.text(), response.ok)                            
                    } else {
                        responseHandler(await response.json(), response.ok) 
                    } 
                break

                case 'genericRequest':
                    responseHandler(response, response.ok)                            
                break
                
                default:
                    responseHandler(await response.json(), response.ok)
                break   
            }
        }
        catch (err) {
            responseHandler(['Error', err.toString()], false)
        }
    }

    initSessionByCredentials ({userName, userPassword}) {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'initSessionByCredentials',
                    userName,
                    userPassword
                }
                this._makeRequest( prepareRequest(data), 'initSessionByCredentials', (response, isOk) => {
                    if (isOk) {
                        if (response.session_token) config.sessionToken = response.session_token
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    initSessionByUserToken ({userToken}) {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'initSessionByUserToken',
                    userToken
                }
                this._makeRequest( prepareRequest(data), 'initSessionByUserToken', (response, isOk) => {
                    if (isOk) {
                        if (response.session_token) config.sessionToken = response.session_token
                        resolve ( response ) 
                    } else {
                        reject (response)
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
                this._makeRequest( prepareRequest(data), 'killSession', (response, isOk) => {
                    if (isOk) {
                        config.sessionToken = ''
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    addItem ({itemtype, input}) {
        return new Promise((resolve, reject) => {
            try {
                if (!itemtype) {
                    reject('Invalid itemtype')
                } else {
                    const data = {
                        function: 'addItem',
                        itemtype,
                        input
                    }
                    this._makeRequest( prepareRequest(data), 'addItem', (response, isOk) => {
                        if (isOk) {
                            resolve ( response ) 
                        } else {
                            reject (response)
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
                this._makeRequest( prepareRequest(data), 'getFullSession', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
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
                this._makeRequest( prepareRequest(data), 'getActiveProfile', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
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
                this._makeRequest( prepareRequest(data), 'getMyProfiles', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
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
                this._makeRequest( prepareRequest(data), 'getMyEntities', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
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
                this._makeRequest( prepareRequest(data), 'getActiveEntities', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
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
                this._makeRequest( prepareRequest(data), 'getGlpiConfig', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getAllItems ({itemtype, queryString}) {
        return new Promise((resolve, reject) => {
            try {
                if (!itemtype) reject ('Invalid itemtype')

                const data = {
                    function: 'getAllItems',
                    itemtype,
                    queryString
                }

                this._makeRequest( prepareRequest(data), 'getAllItems', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getAnItem ({itemtype, id, queryString}) {
        return new Promise((resolve, reject) => {
            try {
                if (!itemtype) reject ('Invalid itemtype')

                const data = {
                    function: 'getAnItem',
                    itemtype,
                    queryString,
                    id
                }

                this._makeRequest( prepareRequest(data), 'getAnItem', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getSubItems ({itemtype, id, subItemtype, queryString}) {
        return new Promise((resolve, reject) => {
            try {
                if (!itemtype) reject ('Invalid itemtype')
                if (!subItemtype) reject ('Invalid subItemtype')

                const data = {
                    function: 'getSubItems',
                    itemtype,
                    queryString,
                    subItemtype,
                    id
                }

                this._makeRequest( prepareRequest(data), 'getSubItems', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    deleteItem ({itemtype, id, input, queryString}) {
        return new Promise((resolve, reject) => {
            try {
                if (!itemtype) reject ('Invalid itemtype')

                const data = {
                    function: 'deleteItem',
                    itemtype,
                    queryString,
                    input,
                    id
                }

                this._makeRequest( prepareRequest(data), 'deleteItem', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    updateItem ({itemtype, id, input}) {
        return new Promise((resolve, reject) => {
            try {
                if (!itemtype) reject ('Invalid itemtype')

                const data = {
                    function: 'updateItem',
                    itemtype,
                    input,
                    id
                }

                this._makeRequest( prepareRequest(data), 'updateItem', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    changeActiveEntities ({entitiesId, isRecursive}) {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'changeActiveEntities',
                    entitiesId,
                    isRecursive
                }

                this._makeRequest( prepareRequest(data), 'changeActiveEntities', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    changeActiveProfile ({profilesId}) {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'changeActiveProfile',
                    profilesId
                }

                this._makeRequest( prepareRequest(data), 'changeActiveProfile', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getMultipleItems ({items, options}) {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'getMultipleItems',
                    items,
                    options
                }

                this._makeRequest( prepareRequest(data), 'getMultipleItems', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    searchItems ({itemtype, criteria, metacriteria, options}) {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'searchItems',
                    itemtype,
                    criteria,
                    metacriteria,
                    options
                }

                this._makeRequest( prepareRequest(data), 'searchItems', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        }) 
    }

    listSearchOptions ({itemtype, queryString}) {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'listSearchOptions',
                    itemtype,
                    queryString
                }

                this._makeRequest( prepareRequest(data), 'listSearchOptions', (response, isOk) => {
                    if (isOk) {
                        resolve ( response ) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        }) 
    }

    registerUser ({userToken, userData, itemtype}) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.initSessionByUserToken(userToken)
                const response = await this.addItem(itemtype, userData)
                await this.killSession()
                resolve (response)
            }
            catch (err) {
                reject(err)
            }
        })
    }

    login ({userName, userPassword}) {
        return new Promise( async (resolve, reject) => {
            try {
                const sessionToken = await this.initSessionByCredentials(userName, userPassword)
                const fullSession = await this.getFullSession()
                const userData = await this.getAnItem(ITEMTYPE.User, fullSession.session.glpiID)
                const userEmails = await this.getSubItems(ITEMTYPE.User, fullSession.session.glpiID, ITEMTYPE.UserEmail)

                resolve ({
                    sessionToken: sessionToken.session_token,
                    userData,
                    userEmails
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getDevices () {
        return new Promise( async (resolve, reject) => {
            try {
                resolve (
                    await this.getAllItems('PluginFlyvemdmAgent')
                )
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getFiles () {
        return new Promise( async (resolve, reject) => {
            try {
                resolve (
                    await this.getAllItems('PluginFlyvemdmFile')
                )
            }
            catch (err) {
                reject(err)
            }
        })   
    }

    getInvitations () {
        return new Promise( async (resolve, reject) => {
            try {
                resolve (
                    await this.getAllItems('PluginFlyvemdmInvitation')
                )
            }
            catch (err) {
                reject(err)
            }
        })   
    }

    getApplications () {
        return new Promise( async (resolve, reject) => {
            try {
                resolve (
                    await this.getAllItems('PluginFlyvemdmPackage')
                )
            }
            catch (err) {
                reject(err)
            }
        })   
    }
    
    getUsers () {
        return new Promise( async (resolve, reject) => {
            try {
                resolve (
                    await this.getAllItems('User')
                )
            }
            catch (err) {
                reject(err)
            }
        })      
    }

    updateEmails ({userID, currentEmails, newEmails}) {
        return new Promise( async (resolve, reject) => {
            try {
                let emailsDelete = []
                let emailsUpdate = []
                let emailsAdd = []

                newEmails.forEach(newEmail => {
                    if (!newEmail.id) {
                        if (newEmail.email && newEmail.email !== '') {
                            emailsAdd.push({...newEmail, users_id: userID})
                        }
                    } else {
                        currentEmails.forEach(currentEmail => {
                            if (currentEmail.id === newEmail.id && currentEmail.email !== newEmail.email) {
                                emailsUpdate.push(newEmail)
                            }
                        })
                    }
                })
                currentEmails.forEach(currentEmail => {
                    let isDelete = true
                    newEmails.forEach(newEmail => {
                        if (newEmail.id === currentEmail.id) {
                            isDelete = false
                        }
                    })
                    if (isDelete) {
                        emailsDelete.push(currentEmail)
                    }
                })

                resolve ({
                    delete: (emailsDelete.length > 0) ? await this.deleteItem('UserEmail', null, emailsDelete) : [],
                    update: (emailsUpdate.length > 0) ? await this.updateItem('UserEmail', null, emailsUpdate) : [],
                    add: (emailsAdd.length > 0) ? await this.addItem('UserEmail', emailsAdd) : []
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    genericRequest ({path, queryString, requestParams}) {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'genericRequest',
                    path,
                    queryString,
                    requestParams
                }

                this._makeRequest( prepareRequest(data), 'genericRequest', (response, isOk) => {
                    if (isOk) {
                        resolve (response) 
                    } else {
                        reject (response)
                    }
                })
            }
            catch (err) {
                reject(err)
            }
        }) 
    }
}

export default GlpiApiClient
