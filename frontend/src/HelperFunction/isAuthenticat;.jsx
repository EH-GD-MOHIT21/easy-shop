import axios from "axios";
function isAuthenticat(setAuth){
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        withCredentials: true 
    };
    
    axios.get('http://127.0.0.1:8000/isauthenticated', options)
    .then(response => {
        setAuth(response);
    })
    .catch(error => console.log(error));
}

export default isAuthenticat;