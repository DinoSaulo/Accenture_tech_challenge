class AccountRoutes {
    autorizeUdrt = () => { return '/Account/v1/Authorized' }
    generateUserToken = () => { return '/Account/v1/GenerateToken' }
    createUser = () => { return '/Account/v1/User' }
    DeleteUser = () => { return '/Account/v1/User/{UUID}' }
    GetUser = () => { return '/Account/v1/User/{UUID}' }
  }
  
  export default AccountRoutes;