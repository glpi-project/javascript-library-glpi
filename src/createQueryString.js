function createQueryString ({items, criteria, metacriteria}) {
    let queryString = ''
    let query = {items, criteria, metacriteria}

    for (const type in query) {
        if (query.hasOwnProperty(type)) {
            const queryElement = query[type]
            if (Array.isArray(queryElement)) {
                for (let index = 0; index < queryElement.length; index++) {
                    const element = queryElement[index]
                    for (const key in element) {
                        if (element.hasOwnProperty(key)) {
                            const element2 = element[key]
                            queryString += `${type}[${index}][${key}]=${element2}&`
                        }
                    }
                }
            } else {
                for (const key in queryElement) {
                    if (queryElement.hasOwnProperty(key)) {
                        const element = queryElement[key]
                        if (Array.isArray(element)) {
                            for (let index = 0; index < element.length; index++) {
                                const element2 = element[index]
                                queryString+= `${key}[${index}]=${element2}&`
                            }
                        } else {
                            queryString+= `${key}=${element}&`
                        }
                    }
                }
            }
        }
    }

    return queryString
}

export default createQueryString