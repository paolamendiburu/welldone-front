export function GetUser(user, token) {
    return fetch(process.env.REACT_APP_REST_API_LOCATION+'users/?username='+user,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token '+token
        }
    })
    .then((response) => response.json())
    .then(responseData =>{
        return responseData
    }).catch(err => err);
}
