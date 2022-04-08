// -----------------------------------------------------------------------
//  <once-generated>
//     这个文件只生成一次，再次生成不会被覆盖。
//  </once-generated>
//
//  <copyright file="src/router/routes/modules/osharp.ts" company="LiuliuSoft">
//      OSHARP.ORG@2021
//  </copyright>
//  <site>https://www.osharp.org</site>
//  <last-editor>郭明锋</last-editor>
// -----------------------------------------------------------------------
import type { AppRouteModule } from '/@/router/types';
import { LAYOUT, getParentLayout } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const osharp: AppRouteModule = {
  path: '/system',
  name: 'OSharp',
  component: LAYOUT,
  redirect: '/system',
  meta: {
    orderNo: 1000,
    icon: 'ion:settings-outline',
    title: t('routes.osharp.system'),
    acl: ['Root.Admin'],
  },
  children: [
    {
      path: 'identity',
      name: 'Identity',
      component: getParentLayout('Identity'),
      redirect: '/system/identity/user',
      meta: {
        title: t('routes.osharp.identity.identity'),
        acl: ['Root.Admin.Identity'],
      },
      children: [
        {
          path: 'user',
          name: 'User',
          component: () => import('/@/views/osharp/identity/user.vue'),
          meta: {
            title: t('routes.osharp.identity.user'),
            acl: ['Root.Admin.Identity.User'],
          },
        },
        {
          path: 'role',
          name: 'Role',
          component: () => import('/@/views/osharp/identity/role.vue'),
          meta: {
            title: t('routes.osharp.identity.role'),
            acl: ['Root.Admin.Identity.Role'],
          },
        },
        {
          path: 'user-role',
          name: 'UserRole',
          component: () => import('/@/views/osharp/identity/userRole.vue'),
          meta: {
            title: t('routes.osharp.identity.userRole'),
            acl: ['Root.Admin.Identity.UserRole'],
          },
        },
      ],
    },
    {
      path: 'auth',
      name: 'Auth',
      component: getParentLayout('Auth'),
      redirect: '/system/auth/module',
      meta: {
        title: t('routes.osharp.auth.auth'),
        acl: ['Root.Admin.Auth'],
      },
      children: [
        {
          path: 'module',
          name: 'Module',
          component: () => import('/@/views/osharp/auth/module.vue'),
          meta: {
            title: t('routes.osharp.auth.module'),
            acl: ['Root.Admin.Auth.Module'],
          },
        },
        {
          path: 'function',
          name: 'Function',
          component: () => import('/@/views/osharp/auth/function.vue'),
          meta: {
            title: t('routes.osharp.auth.function'),
            acl: ['Root.Admin.Auth.Function'],
          },
        },
        {
          path: 'entity-info',
          name: 'EntityInfo',
          component: () => import('/@/views/osharp/auth/entityInfo.vue'),
          meta: {
            title: t('routes.osharp.auth.entityInfo'),
            acl: ['Root.Admin.Auth.EntityInfo'],
          },
        },
      ],
    },
    {
      path: 'infos',
      name: 'Infos',
      component: getParentLayout('Infos'),
      redirect: '/system/infos/article',
      meta: {
        title: t('routes.osharp.infos.infos'),
        acl: ['Root.Admin.Infos'],
      },
      children: [
        {
          path: 'article',
          name: 'Article',
          component: () => import('/@/views/osharp/infos/article.vue'),
          meta: {
            title: t('routes.osharp.infos.article'),
            acl: ['Root.Admin.Infos.Article'],
          },
        },
        {
          path: 'message',
          name: 'Message',
          component: () => import('/@/views/osharp/infos/message.vue'),
          meta: {
            title: t('routes.osharp.infos.message'),
            acl: ['Root.Admin.Infos.Message'],
          },
        },
      ],
    },
  ],
};

export default osharp;
