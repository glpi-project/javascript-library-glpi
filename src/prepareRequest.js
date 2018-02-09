import config from './config'
import createQueryString from './createQueryString'

function prepareRequest (data) {

    let headers = {'Content-Type': 'application/json'}
    let method = 'GET'
    let url = config.url
    let queryString = null
    let body = {}  
    let responseType = 'text'  

    if (config.appToken) {
        headers = {
            ...headers,
            'App-Token': config.appToken
        }
    }
                         
    if (data.queryString) {
        queryString = `?${createQueryString({items: data.queryString})}`
    }

    switch (data.function) {

        case 'initSessionByCredentials': 
            headers = {
                ...headers,
                'Authorization': `Basic ${Buffer.from(`${data.userName}:${data.userPassword}`).toString('base64')}`
            }
            url = `${url}/initSession`
        break

        case 'initSessionByUserToken': 
            headers = {
                ...headers,
                'Authorization': `user_token ${data.userToken}`
            }     
            url = `${url}/initSession`
        break

        case 'killSession': 
            url = `${url}/killSession`
        break

        case 'addItem':
            url = `${url}/${data.itemtype}`
            method = 'POST'
            body = JSON.stringify({input: data.input})
        break

        case 'getFullSession':
            url = `${url}/getFullSession`
        break

        case 'getActiveProfile':
            url = `${url}/getActiveProfile`
        break

        case 'getMyProfiles':
            url = `${url}/getMyProfiles`
        break

        case 'getMyEntities':
            url = `${url}/getMyEntities`
        break

        case 'getActiveEntities':
            url = `${url}/getActiveEntities`
        break

        case 'getGlpiConfig':
            url = `${url}/getGlpiConfig`
        break
        
        case 'getAllItems': 
            url = `${url}/${data.itemtype}/${queryString ? queryString : ''}`
        break

        case 'getAnItem': 
            url = `${url}/${data.itemtype}/${data.id}${queryString ? queryString : ''}`
        break

        case 'getSubItems': 
            url = `${url}/${data.itemtype}/${data.id}/${data.subItemtype}${queryString ? queryString : ''}`
        break

        case 'deleteItem': 
            url = `${url}/${data.itemtype}/${data.id ? data.id : ''}${ queryString ? queryString : '' }`
            method = 'DELETE'
            body = JSON.stringify({input: data.input})
        break
        
        case 'updateItem':
            url = `${url}/${data.itemtype}/${data.id ? data.id : ''}`
            method = 'PUT'
            body = JSON.stringify({input: data.input})
        break
        
        case 'changeActiveEntities':
            url = `${url}/changeActiveEntities/`
            body = {}
            if (data.entitiesId) body = {"entities_id": data.entitiesId}
            if (data.isRecursive) body = {...body, "is_recursive": data.isRecursive}
            method = 'POST'
            body = JSON.stringify(body)
        break

        case 'changeActiveProfile':
            url = `${url}/changeActiveProfile/`
            body = data.profilesId ? {"profiles_id": data.profilesId} : {}
            method = 'POST'
            body = JSON.stringify(body)
        break

        case 'getMultipleItems':
            queryString = `?${createQueryString({items: data.items})}${createQueryString({items: data.options})}`
            url = `${url}/getMultipleItems${queryString}`
        break

        case 'searchItems':
            queryString = `?${createQueryString({criteria: data.criteria})}${createQueryString({metacriteria: data.metacriteria})}${createQueryString({items: data.options})}`
            url = `${url}/search/${data.itemtype}/${queryString}`
        break

        case 'listSearchOptions':
            url = `${url}/listSearchOptions/${data.itemtype}/${ queryString ? queryString : '' }`
        break

        case 'genericRequest':
            url = `${url}/${data.path}${ queryString ? queryString : '' }`
            method = data.requestParams.method ? data.requestParams.method : method
            body = data.requestParams.body ? data.requestParams.body : body
            headers = data.requestParams.headers ? data.requestParams.headers : headers
            responseType = data.requestParams.responseType ? data.requestParams.responseType : responseType
        break

        case 'uploadFile':
            url = `${url}/${data.itemtype}/${ queryString ? queryString : '' }`
            body = data.input
            method = 'POST'
            delete headers['Content-Type']
        break

        default:
        break
    }

    if (data.function !== 'initSessionByCredentials' && data.function !== 'initSessionByUserToken') {
        headers = {
            ...headers,
            'Session-Token': config.sessionToken
        }
    }

    return {url, headers, method, body, responseType}
}

export default prepareRequest
