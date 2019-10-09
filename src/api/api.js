import axios from 'axios'
let baseUrl = 'http://elm.cangdu.org'
export default async function ajax(url, data={}, type='GET'){
    url = baseUrl + url
    type = type.toUpperCase()
    if(type === 'GET'){
        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        if(paramStr){
            paramStr = paramStr.substring(0, paramStr.length -1)
        }
        const response = await axios.get(url + '?' + paramStr)
        return response
    }else {
        const response = await axios.post(url, data)
        return response
    }
}