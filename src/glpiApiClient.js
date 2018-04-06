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

    _parser (element, responseType) {
        try {
            if (responseType === "text") {
                return (JSON.parse(element))
            }
            return (element)
        } catch (err) {
            return (element)
        }
    }

    _makeRequest = async ({myRequest, resolve, reject }) => {
        try {
            let xhr = new XMLHttpRequest()
            xhr.open(myRequest.method, myRequest.url, true)
            xhr.responseType = myRequest.responseType
            if (myRequest.headers) {
                Object.keys(myRequest.headers).forEach(key => {
                    xhr.setRequestHeader(key, myRequest.headers[key])
                })
            }
            xhr.onload = () => {
                const response = this._parser(xhr.response, myRequest.responseType)
                if (xhr.status >= 200 && xhr.status < 300) {
                    if (response.session_token) config.sessionToken = response.session_token
                    resolve(response)
                } else if (xhr.status === 504) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        data: [['Error', 'Connection timeout']]
                    })
                } else if (xhr.status >= 500) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        data: [['Error', xhr.statusText]]
                    })                    
                } else {
                    if (Array.isArray(response)) {
                        let specialCase = false
                        response.forEach(element => {
                            if (Array.isArray(element)) 
                                specialCase = true
                        })
                        if (specialCase || response.length > 2) {
                            reject ({
                                status: xhr.status,
                                statusText: xhr.statusText,
                                data: response
                            })
                        } else {
                            reject ({
                                status: xhr.status,
                                statusText: xhr.statusText,
                                data: [response]
                            })                          
                        }
                    } else {
                        reject ({
                            status: xhr.status,
                            statusText: xhr.statusText,
                            data: [['Error', response]]
                        })
                    }
                }
            }
            xhr.onerror = () => {
                reject ({
                    status: xhr.status,
                    statusText: xhr.statusText,
                    data: [['Error', xhr.statusText]]
                })
            }
            xhr.send(myRequest.body)
        }
        catch (err) {
            reject ({
                status: xhr.status,
                statusText: err.toString(),
                data: [['Error', err.toString()]]
            })
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
                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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
                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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
                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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
                    this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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
                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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
                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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
                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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
                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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
                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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
                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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

                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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

                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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

                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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

                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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

                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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

                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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

                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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

                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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

                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
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

                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
            }
            catch (err) {
                reject(err)
            }
        }) 
    }

    registerUser ({userToken, userData, itemtype}) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.initSessionByUserToken({userToken})
                const response = await this.addItem({itemtype, input: userData})
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
                const sessionToken = await this.initSessionByCredentials({userName, userPassword})
                const fullSession = await this.getFullSession()
                const userData = await this.getAnItem({itemtype: ITEMTYPE.User, id: fullSession.session.glpiID})
                const userEmails = await this.getSubItems({itemtype: ITEMTYPE.User, id: fullSession.session.glpiID, subItemtype: ITEMTYPE.UserEmail})

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
    
    getUsers () {
        return new Promise( async (resolve, reject) => {
            try {
                resolve (
                    await this.getAllItems({itemtype: ITEMTYPE.User})
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
                    delete: (emailsDelete.length > 0) ? await this.deleteItem({itemtype:'UserEmail', input: emailsDelete}) : [],
                    update: (emailsUpdate.length > 0) ? await this.updateItem({itemtype:'UserEmail', input: emailsUpdate}) : [],
                    add: (emailsAdd.length > 0) ? await this.addItem({itemtype:'UserEmail', input: emailsAdd}) : []
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
                requestParams = requestParams ? requestParams : {}
                const data = {
                    function: 'genericRequest',
                    path,
                    queryString,
                    requestParams
                }

                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
            }
            catch (err) {
                reject(err)
            }
        }) 
    }

    uploadFile ({itemtype, queryString, input}) {
        return new Promise((resolve, reject) => {
            try {
                const data = {
                    function: 'uploadFile',
                    itemtype,
                    queryString,
                    input
                }

                this._makeRequest({ myRequest: prepareRequest(data), resolve, reject })
            }
            catch (err) {
                reject(err)
            }
        }) 
    }
}

export default GlpiApiClient
