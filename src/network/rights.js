import axiosins from './request'

//获取 权限列表
export function getRightsList(){
    return axiosins.get('rights/list');
}


//删除权限的 函数

export function removeRight(roleid,rightid)
{
    return axiosins.delete(`roles/${roleid}/rights/${rightid}`)
}

//获取 所有可设置 的 权限，树形
export function getAllRights()
{
     return  axiosins.get('rights/tree');
}

//提交 新分配的角色 权限

export function uploadRights(id,rids){
   return axiosins.post(`roles/${id}/rights`,{rids})
}