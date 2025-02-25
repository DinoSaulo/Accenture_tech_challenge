class AccountRoutes {
  post_autorizedUser = () => { return '/Account/v1/Authorized' }
  post_generateToken = () => { return '/Account/v1/GenerateToken' }
  post_createUser = () => { return '/Account/v1/User' }
  delete_user = (UUID) => { return `/Account/v1/User/${UUID}` }
  get_user = (UUID) => { return `/Account/v1/User/${UUID}` }
}
  
export default AccountRoutes;