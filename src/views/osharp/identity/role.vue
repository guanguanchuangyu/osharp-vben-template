<!--
 <once-generated>
    这个文件只生成一次，再次生成不会被覆盖。
 </once-generated>
 <copyright file="src/views/osharp/identity/role.vue" company="LiuliuSoft">
    OSHARP.ORG@2021
 </copyright>
 <site>https://www.osharp.org</site>
 <last-editor>郭明锋</last-editor> -->

<template>
  <div>
    <OSharpAdminTable v-bind="tableProps" />
    <OSharpFunctionViewDrawer @register="registerFunctionViewDrawer" v-bind="functionViewProps" width="800" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { ActionItem, BasicColumn, BasicTableProps, FormSchema, FormProps } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ModuleInfo } from '/@/utils/osharp/types';
  import { CheckboxRender, defaultModuleInfo } from '/@/utils/osharp';
  import { OSharpAdminTableProps, OSharpFunctionViewDrawerProps } from '/@/components/osharp/OSharpTable';
  import OSharpAdminTable from '/@/components/osharp/OSharpTable/src/OSharpAdminTable.vue';
  import OSharpFunctionViewDrawer from '/@/components/osharp/OSharpTable/src/OSharpFunctionViewDrawer.vue';

  const module: ModuleInfo = { ...defaultModuleInfo };
  const authPath = computed(() => `Root.${module.areaName}.${module.moduleName}.${module.entityName}`).value;

  const { createMessage } = useMessage();

  const columns: BasicColumn[] = [
    { title: '编号', dataIndex: 'id', width: 50 },
    { title: '名称', dataIndex: 'name', sorter: true, align: 'left', width: 150 },
    { title: '备注', dataIndex: 'remark', sorter: true, align: 'left', width: 200 },
    { title: '是否管理', dataIndex: 'isAdmin', sorter: true, width: 110, customRender: ({ text }) => CheckboxRender(text) },
    { title: '是否默认', dataIndex: 'isDefault', sorter: true, width: 110, customRender: ({ text }) => CheckboxRender(text) },
    { title: '是否锁定', dataIndex: 'isLocked', sorter: true, width: 110, customRender: ({ text }) => CheckboxRender(text) },
    { title: '创建时间', dataIndex: 'createdTime', sorter: true, width: 130, format: 'date|YYYY/MM/DD HH:mm' },
  ];

  const schemas: FormSchema[] = [
    { label: '编号', field: 'id', component: 'Input', render: ({ values }) => values?.id || '自动生成' },
    { label: '名称', field: 'name', component: 'Input', required: true },
    { label: '备注', field: 'remark', component: 'InputTextArea' },
    { label: '是否管理', field: 'isAdmin', component: 'Switch', colProps: { span: 12 } },
    { label: '是否默认', field: 'isDefault', component: 'Switch', colProps: { span: 12 } },
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
    items[1].ifShow = () => record.deletable && !record.isSystem;
    return items;
  }

  function tableDropDownActionsFn(items: ActionItem[], record: Recordable) {
    items.push(
      { icon: 'ant-design:safety-certificate-outlined', label: '设置权限', auth: `${authPath}.SetModules`, onClick: setModules.bind(null, record) },
      {
        icon: 'ant-design:security-scan-outlined',
        label: '查看功能',
        auth: 'Root.Admin.Auth.RoleFunction.ReadFunctions',
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

  const [registerFunctionViewDrawer, functionViewMethods] = useDrawer();

  const functionViewProps: OSharpFunctionViewDrawerProps = {
    module: { ...module, moduleName: 'RoleFunction', moduleDisplay: '角色功能', entityName: 'Function', entityDisplay: '功能' },
  };

  function setModules(record: Recordable) {
    createMessage.info(`${record.name} setModules`);
  }

  function readFunctions(record: Recordable) {
    functionViewMethods.setDrawerProps({ title: `查看角色功能 - ${record.name}` });
    functionViewMethods.openDrawer(true, record);
  }

  // #endregion
</script>
