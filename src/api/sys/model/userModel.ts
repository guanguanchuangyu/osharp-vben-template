/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account?: string;
  password?: string;
  grantType?: GrantTypeEnum;
  verifyCode?: string;
  clientType?: number;
  refreshToken?: string | any;
}

export enum GrantTypeEnum {
  password = 'password',
  refreshToken = 'refresh_token',
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  accessToken: string;
  refreshToken: string;
  refreshUctExpires: number;
}

export interface Profile {
  id: number;
  userName: string;
  nickName: string;
  email?: string;
  headImg?: string;
  isAdmin: boolean;
  isRefreshNext: boolean;
  roles: string[];
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar?: string;
  // 介绍
  desc?: string;
}

export interface RegisterParams {
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  policy?: boolean;
}

export interface RegisterResultModel {
  userName: string;
  nickName: string;
  email?: string;
}
