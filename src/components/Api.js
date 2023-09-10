export default class Api {
    constructor(options){
        this._url = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

_checkResponse(res){ return res.ok ? res.json() : Promise.reject   
}
    

getInfo(){
    return fetch(`${this._url}/users/me`,{
        headers: {
            authorization: this._authorization
        }
    })
    .then(this._checkResponse)
}


getCards(){
    return fetch(`${this._url}/cards`,{
        headers: {
            authorization: this._authorization
        }
    })
    .then(this._checkResponse)
}


setUserInfo(data){
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: data.name,
            about: data.about,
        })
    })
    .then(res => res.ok ? res.json() : Promise.reject)

}

setAvatar(data){
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar: data.avatar,
            
        })
    })
    .then(res => res.ok ? res.json() : Promise.reject)

}

addCard(data){
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            name: data.title,
            link: data.link
            
        })
    })
    .then(res => res.ok ? res.json() : Promise.reject)

}

deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject())
}


addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes/`, {
        method: 'PUT',
        headers: this._headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject())
}

removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject())
}

}

