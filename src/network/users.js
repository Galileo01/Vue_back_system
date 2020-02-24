import axiosins from './request'
//获取 用户列表
export function getUsers({query,pagenum,pagesize})
{
    return axiosins.get('users',{
        params:{
            query,
            pagenum,
            pagesize
        }
    })
}
// 更改 指定 的用户 状态
export function changeUserState(uid,type){
    return axiosins.put(`users/${uid}/state/${type}`)
}

export  function addUser(newUser){
        return axiosins.post('users',newUser);
}

//根据id 查询用户，用户修改信息
export function getUser(id)
{   
        return axiosins.get('users/'+id);
}
// 提交 更改好的数据
export function loadEditedUser(id,email,mobile){
    return axiosins.put('users/'+id,{email,mobile})
}
//删除 用户 的函数
export function deleteUser(id)
{
    return axiosins.delete('users/'+id);
}

//提交 新分配的 角色
export function uploadSetRole(id,rid){
    return axiosins.put(`users/${id}/role`,{rid});
}