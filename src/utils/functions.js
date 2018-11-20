export function getUser(info){
    return fetch(process.env.REACT_APP_REST_API_LOCATION+'users/?search='+info)
        .then(resolve => {
            return resolve.json();
        }).then(data =>{
            return Object.keys(data)[0];
        });
}