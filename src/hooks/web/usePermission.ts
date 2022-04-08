import type { RouteRecordRaw } from 'vue-router';

import { useAppStore } from '/@/store/modules/app';
import { usePermissionStore } from '/@/store/modules/permission';
import { useUserStore } from '/@/store/modules/user';

import { useTabs } from './useTabs';

import { router, resetRouter } from '/@/router';
// import { RootRoute } from '/@/router/routes';

import projectSetting from '/@/settings/projectSetting';
import { PermissionModeEnum } from '/@/enums/appEnum';
import { RoleEnum } from '/@/enums/roleEnum';

import { isArray } from '/@/utils/is';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';

// User permissions related operations
export function usePermission() {
  const userStore = useUserStore();
  const appStore = useAppStore();
  const permissionStore = usePermissionStore();
  const { closeAll } = useTabs(router);

  /**
   * Change permission mode
   */
  async function togglePermissionMode() {
    appStore.setProjectConfig({
      permissionMode:
        projectSetting.permissionMode === PermissionModeEnum.BACK
          ? PermissionModeEnum.ROUTE_MAPPING
          : PermissionModeEnum.BACK,
    });
    location.reload();
  }

  /**
   * Reset and regain authority resource information
   * @param id
   */
  async function resume() {
    const tabStore = useMultipleTabStore();
    tabStore.clearCacheTabs();
    resetRouter();
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    permissionStore.setLastBuildMenuTime();
    closeAll();
  }

  /**
   * Determine whether there is permission
   */
  function hasPermission(
    value?: RoleEnum | RoleEnum[] | string | string[] | Array<RoleEnum | string>,
    def = true,
  ): boolean {
    // Visible by default
    if (!value) {
      return def;
    }

    let roleList: RoleEnum[] | null = null;
    let codeList: string[] | null = null;

    const array: Array<RoleEnum | string> = !isArray(value) ? [value] : value;
    if (array.length == 0) {
      return def;
    }

    const isPermCode = (val: RoleEnum | string) => val && val.startsWith('Root');

    // 逐个判断，不是RoleEnum就是PermCode，只要有一个成立，就判断为true
    let flag = false;
    for (const item of array) {
      if (!isPermCode(item)) {
        roleList = roleList || userStore.getRoleList;
        const role: RoleEnum = item as RoleEnum;
        if (roleList.includes(role)) {
          flag = true;
          break;
        }
      } else {
        const code: string = item as string;
        codeList = codeList || (permissionStore.getPermCodeList as string[]);
        if (codeList.includes(code)) {
          flag = true;
          break;
        }
      }
    }
    return flag;
  }

  /**
   * Change roles
   * @param roles
   */
  async function changeRole(roles: RoleEnum | RoleEnum[]): Promise<void> {
    if (projectSetting.permissionMode !== PermissionModeEnum.ROUTE_MAPPING) {
      throw new Error(
        'Please switch PermissionModeEnum to ROUTE_MAPPING mode in the configuration to operate!',
      );
    }

    if (!isArray(roles)) {
      roles = [roles];
    }
    userStore.setRoleList(roles);
    await resume();
  }

  /**
   * refresh menu data
   */
  async function refreshMenu() {
    resume();
  }

  return { changeRole, hasPermission, togglePermissionMode, refreshMenu };
}
