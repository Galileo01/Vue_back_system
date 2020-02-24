import axiosins from './request'

export function getRoleslist(){
    return axiosins.get('roles');
}

export function addRole(newRole)
{
    return axiosins.post('roles',newRole);
}

//
export function getRole(id)
{
    return axiosins.get('roles/'+id);
}

export function editRole(id,editedRole){
    const {roleName,roleDesc} =editedRole;
    // console.log(id);
    
    return axiosins.put('roles/'+id,{roleName,roleDesc});
}
export function deleteRole(id){
  return axiosins.delete('roles/'+id);
}
