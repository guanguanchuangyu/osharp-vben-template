<!--
 <once-generated>
    这个文件只生成一次，再次生成不会被覆盖。
 </once-generated>
 <copyright file="src/views/osharp/identity/user.vue" company="LiuliuSoft">
    OSHARP.ORG@2021
 </copyright>
 <site>https://www.osharp.org</site>
 <last-editor>郭明锋</last-editor> -->

<template>
  <div>
    <OSharpAdminTable @register="registerTable" v-bind="tableProps" />
    <OSharpFunctionViewDrawer @register="registerFunctionViewDrawer" v-bind="functionViewProps" width="800" />
    <OSharpAdminEditModal
      @register="registerSetRolesModal"
      :module="module"
      :edit-form-props-fn="setRolesFormFn"
      :transport-submit-data="transportSetRoleData"
      @on-close="tableMethods.reload()"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, h } from 'vue';
  import { ActionItem, BasicColumn, BasicTableProps, FormSchema, FormProps, useTable } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { EditModalDataWrap, ModuleInfo } from '/@/utils/osharp/types';
  import { CheckboxRender, TagRender, defaultModuleInfo, expandAndToString } from '/@/utils/osharp';
  import { OSharpAdminTableProps, OSharpFunctionViewDrawerProps } from '/@/components/osharp/OSharpTable';
  import OSharpAdminTable from '/@/components/osharp/OSharpTable/src/OSharpAdminTable.vue';
  import OSharpFunctionViewDrawer from '/@/components/osharp/OSharpTable/src/OSharpFunctionViewDrawer.vue';
  import OSharpAdminEditModal from '/@/components/osharp/OSharpTable/src/OSharpAdminEditModal.vue';
  import { useModal } from '/@/components/Modal';
  import { defHttp } from '/@/utils/http/axios';
  import { Result } from '/#/axios';
  import { CheckboxGroup, Empty } from 'ant-design-vue';

  const module: ModuleInfo = {
    ...defaultModuleInfo,
    moduleName: 'Identity',
    moduleDisplay: '身份认证',
    entityName: 'User',
    entityDisplay: '用户',
  };
  const authPath = computed(() => `Root.${module.areaName}.${module.moduleName}.${module.entityName}`).value;

  const { createMessage } = useMessage();
  const [registerTable, tableMethods] = useTable();
  const [registerSetRolesModal, setRolesModalMethods] = useModal();

  const columns: BasicColumn[] = [
    { title: '编号', dataIndex: 'id', width: 50 },
    { title: '用户名', dataIndex: 'userName', align: 'left', sorter: true, width: 150 },
    { title: '用户昵称', dataIndex: 'nickName', align: 'left', sorter: true, width: 150 },
    { title: '邮箱', dataIndex: 'email', align: 'left', sorter: true, width: 150 },
    { title: '邮箱确认', dataIndex: 'emailConfirmed', sorter: true, width: 100, customRender: ({ text }) => CheckboxRender(text) },
    { title: '手机号', dataIndex: 'phoneNumber', align: 'left', sorter: true, width: 150 },
    { title: '手机确认', dataIndex: 'phoneNumberConfirmed', sorter: true, width: 100, customRender: ({ text }) => CheckboxRender(text) },
    { title: '锁定', dataIndex: 'isLocked', sorter: true, width: 100, customRender: ({ text }) => CheckboxRender(text) },
    { title: '角色', dataIndex: 'roles', width: 150, customRender: ({ text }) => expandAndToString(text) },
    { title: '创建时间', dataIndex: 'createdTime', sorter: true, width: 130, format: 'date|YYYY/MM/DD HH:mm' },
  ];

  const schemas: FormSchema[] = [
    { label: '编号', field: 'id', component: 'Input', render: ({ values }) => values?.id || '自动生成' },
    { label: '用户名', field: 'userName', component: 'Input' },
    { label: '用户昵称', field: 'nickName', component: 'Input' },
    { label: '邮箱', field: 'email', component: 'Input' },
    { label: '邮箱确认', field: 'emailConfirmed', component: 'Switch', colProps: { span: 12 } },
    { label: '手机号', field: 'phoneNumber', component: 'Input' },
    { label: '手机号确认', field: 'phoneNumberConfirmed', component: 'Switch', colProps: { span: 12 } },
    { label: '是否锁定', field: 'isLocked', component: 'Switch', colProps: { span: 12 } },
  ];

  const tableProps: OSharpAdminTableProps = {
    module: module,
    tablePropsFn: tablePropsFn,
    tableActionsFn: tableActionsFn,
    tableDropDownActionsFn: tableDropDownActionsFn,
    editFormPropsFn: editFormPropsFn,
  };

  function tablePropsFn(p: BasicTableProps): BasicTableProps {
    p.title = `${module.entityDisplay}管理`;
    p.columns = columns;
    return p;
  }

  function tableActionsFn(items: ActionItem[], record: Recordable) {
    items[1].ifShow = () => record.deletable && record.id != 1;
    return items;
  }

  function tableDropDownActionsFn(items: ActionItem[], record: Recordable) {
    items.push(
      { icon: 'ant-design:usergroup-add-outlined', label: '设置角色', auth: `${authPath}.SetRoles`, onClick: setRoles.bind(null, record) },
      { icon: 'ant-design:safety-certificate-outlined', label: '设置权限', auth: `${authPath}.SetModules`, onClick: setModules.bind(null, record) },
      {
        icon: 'ant-design:security-scan-outlined',
        label: '查看功能',
        auth: 'Root.Admin.Auth.UserFunction.ReadFunctions',
        onClick: readFunctions.bind(null, record),
      },
    );

    return items;
  }

  function editFormPropsFn(p: FormProps): FormProps {
    p.schemas = schemas;
    return p;
  }

  // #region FunctionViewDrawer
  const functionViewProps: OSharpFunctionViewDrawerProps = {
    module: { ...module, moduleName: 'UserFunction', moduleDisplay: '用户功能', entityName: 'Function', entityDisplay: '功能' },
  };
  const [registerFunctionViewDrawer, functionViewMethods] = useDrawer();
  function readFunctions(record: Recordable) {
    functionViewMethods.setDrawerProps({ title: `查看用户功能 - ${record.nickName}[${record.userName}]` });
    functionViewMethods.openDrawer(true, record);
  }

  // #endregion

  // #region SetRoles

  function setRolesFormFn(p: FormProps): FormProps {
    p.schemas = [
      { label: '编号', field: 'userId', component: 'Input', dynamicDisabled: true },
      {
        label: '角色',
        field: 'roleIds',
        component: 'CheckboxGroup',
        render: ({ model, field }) => {
          const data = model.roleNodes;
          if (!data) {
            return h(Empty, { description: '没有角色选项' });
          }
          return h(CheckboxGroup, {
            options: data?.options,
            defaultValue: data?.checkeds,
            onChange: (e: ChangeEvent) => {
              model[field] = e;
            },
          });
        },
      },
      { label: '', field: 'roleNodes', component: 'Input', show: false },
    ];
    return p;
  }

  function transportSetRoleData(p: Recordable): Recordable {
    delete p.roleNodes;
    return p;
  }

  async function setRoles(record: Recordable) {
    setRolesModalMethods.setModalProps({ title: `设置用户的角色 - ${record.nickName}[${record.userName}]` });
    const result = await defHttp.get<Result>({ url: `/admin/role/readuserroles?userId=${record.id}` });
    const nodes: any[] = result.data;
    const checkeds = nodes.filter((m) => m.isChecked === true).map((m) => m.id);
    const options = nodes.map((m) => ({ value: m.id, label: m.name }));
    const data: Recordable = {
      userId: record.id,
      roleIds: [],
      roleNodes: { options, checkeds },
    };
    const url = `/admin/user/setroles`;
    setRolesModalMethods.openModal<EditModalDataWrap>(true, { submitUrl: url, record: data });
  }
  // #endregion

  // #region SetModules
  function setModules(record: Recordable) {}
  // #endregion
</script>
