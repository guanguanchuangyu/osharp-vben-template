<template>
  <BasicDrawer @register="registerDrawer" v-bind="$attrs">
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { osharpFunctionViewDrawerProps } from './props';
  import { defHttp } from '/@/utils/http/axios';
  import { defPageRequest } from '..';
  import { PageData } from '/@/utils/osharp/types';
  import { Result } from '/#/axios';
  import { accessTypeTags, TagRender } from '/@/utils/osharp';

  const props = defineProps(osharpFunctionViewDrawerProps);
  const module = computed(() => props.module).value;

  const [registerDrawer] = useDrawerInner((data) => {
    const paramName = module?.moduleName.toLowerCase().includes('role') ? 'roleId' : 'moduleId';
    const url = `/${module?.areaName.toLowerCase()}/${module?.moduleName.toLowerCase()}/readfunctions?${paramName}=${data.id}`;
    tableMethods.setProps({ api: (args) => readData(url, args) });
    tableMethods.setPagination({ current: 1 });
    tableMethods.reload();
  });

  const [registerTable, tableMethods] = useTable({
    columns: [
      { title: '功能名称', dataIndex: 'name', sorter: true, align: 'left' },
      { title: '功能类型', dataIndex: 'accessType', sorter: true, width: 100, customRender: ({ text }) => TagRender(text, accessTypeTags) },
      { title: '区域', dataIndex: 'area', sorter: true, align: 'left', width: 80 },
      { title: '控制器', dataIndex: 'controller', sorter: true, align: 'left', width: 100 },
    ],
    title: '功能列表',
    clickToRowSelect: false,
    showTableSetting: true,
    showIndexColumn: true,
    immediate: false,
  });

  async function readData(url: string, { pageIndex, pageSize }) {
    const result = await defHttp.post<Result<PageData>>({
      url: url,
      params: getPageRequest(pageIndex, pageSize),
    });
    return result.data;
  }

  function getPageRequest(pageIndex: number, pageSize: number) {
    let req = defPageRequest;
    req.pageCondition.pageIndex = pageIndex;
    req.pageCondition.pageSize = pageSize;
    return req;
  }
</script>
