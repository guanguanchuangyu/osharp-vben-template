import { RegisterResultModel, RoleInfo } from '/@/api/sys/model/userModel';
import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel, Profile, RegisterParams } from './model/userModel';

import { ErrorMessageMode, Result } from '/#/axios';

enum Api {
  RegisterApi = '/identity/register',
  Login = '/identity/token',
  Logout = '/identity/logout',
  GetUserInfo = '/identity/profile',
  GetPermCode = '/auth/getauthinfo',
}

export async function registerApi(params: RegisterParams) {
  const result = await defHttp.post<Result<RegisterResultModel>>({
    url: Api.RegisterApi,
    params,
  });
  return result.data;
}

/**
 * @description: user login api
 */
export async function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  const result = await defHttp.post<Result<LoginResultModel>>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
  return result.data;
}

/**
 * @description: getUserInfo
 */
export async function getUserInfo(): Promise<GetUserInfoModel | null> {
  const data = await defHttp.get<Profile>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
  if (!data) {
    return null;
  }
  return {
    userId: data.id,
    username: data.userName,
    realName: data.nickName,
    avatar: data.headImg,
    roles: data.roles.map((m) => {
      const role: RoleInfo = { roleName: m, value: m };
      return role;
    }) as RoleInfo[],
  };
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.post({ url: Api.Logout });
}
