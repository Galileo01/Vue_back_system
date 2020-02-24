import axios from './request'

export function login(username,password)
{
    return  axios.post('login',{username,password});
}