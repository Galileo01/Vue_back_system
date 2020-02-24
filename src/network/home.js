import axios from './request'

export function getMenuList()
{
   return axios.get('menus')
}
