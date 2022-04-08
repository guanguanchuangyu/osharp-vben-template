<!--
 <once-generated>
    这个文件只生成一次，再次生成不会被覆盖。
 </once-generated>
 <copyright file="src/views/osharp/auth/entityInfo.vue" company="LiuliuSoft">
    OSHARP.ORG@2021
 </copyright>
 <site>https://www.osharp.org</site>
 <last-editor>郭明锋</last-editor> -->

<template>
  <div>
    <OSharpAdminTable v-bind="tableProps" />
  </div>
</template>

<script lang="ts" setup>
  import { ActionItem, BasicColumn, BasicTableProps, FormSchema, FormProps } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ModuleInfo } from '/@/utils/osharp/types';
  import { CheckboxRender, TagRender } from '/@/utils/osharp';
  import { OSharpAdminTableProps } from '/@/components/osharp/OSharpTable';
  import OSharpAdminTable from '/@/components/osharp/OSharpTable/src/OSharpAdminTable.vue';
  
  const module: ModuleInfo = {
    areaName: 'Admin',
    areaDisplay: '后台管理',
    moduleName: 'Auth',
    moduleDisplay: '权限授权',
    entityName: 'EntityInfo',
    entityDisplay: '实体',
  };

  const { createMessage } = useMessage();

  const columns: BasicColumn[] = [
    { title: '编号', dataIndex: 'id', width: 300 },
  ];

  const schemas: FormSchema[] = [
    { label: '编号', field: 'id', component: 'Input', render: ({ values }) => values?.id || '自动生成' },
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
    return items;
  }

  function tableDropDownActionsFn(items: ActionItem[], record: Recordable) {
    return items;
  }

  function editFormPropsFn(p: FormProps): FormProps {
    p.schemas = schemas;
    return p;
  }
</script>
