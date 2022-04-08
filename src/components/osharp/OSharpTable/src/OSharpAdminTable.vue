<template>
  <div ref="wrapRef">
    <slot name="beforeTable"></slot>
    <BasicTable @register="registerTable" v-bind="$attrs">
      <template #toolbar>
        <Authority :value="`${authPath}.Create`">
          <a-button type="primary" @click="createRow">新建</a-button>
        </Authority>
        <Authority :value="`${authPath}.Delete`">
          <a-button type="primary" @click="deleteRows">批量删除</a-button>
        </Authority>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableActions(record)" :drop-down-actions="getTableDropDownActions(record)" />
      </template>
      <slot name="tableTemplates"></slot>
    </BasicTable>
    <slot name="afterTable"></slot>
    <OSharpAdminEditModal @register="registerModal" @on-close="onModalClose" :module="props.module" :edit-form-props-fn="props.editFormPropsFn" />
  </div>
</template>

<script lang="ts" setup>
  import { ActionItem, BasicTable, BasicTableProps, useTable, TableAction, FormProps } from '/@/components/Table';
  import { computed } from 'vue';
  import { Result } from '/#/axios';
  import { Authority } from '/@/components/Authority';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { osharpAdminTableProps } from './props';
  import { defHttp } from '/@/utils/http/axios';
  import { EditModalDataWrap, PageData } from '/@/utils/osharp/types';
  import { ResultEnum } from '/@/enums/httpEnum';
  import { defPageRequest } from '/@/components/osharp/OSharpTable';
  import OSharpAdminEditModal from '/@/components/osharp/OSharpTable/src/OSharpAdminEditModal.vue';
  import { List } from 'linqts';

  const { createMessage, createConfirm } = useMessage();
  const props = defineProps(osharpAdminTableProps);
  const module = computed(() => props.module).value;
  const authPath = computed(() => `Root.${module?.areaName}.${module?.moduleName}.${module?.entityName}`).value;
  const lowerEntity = computed(() => module?.entityName.toLowerCase());

  const [registerTable, tableMethods] = useTable(getTableProps());
  const [registerModal, modalMethods] = useModal();

  function getTableProps(): BasicTableProps {
    let p: BasicTableProps = {
      columns: [],
      api: readData,
      clickToRowSelect: false,
      showTableSetting: true,
      showIndexColumn: false,
      rowSelection: { type: 'checkbox' },
      actionColumn: {
        width: 100,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
        fixed: 'right',
      },
    };
    if (props.tablePropsFn) {
      p = props.tablePropsFn(p);
    }
    return p;
  }

  function getEditFormProps(): FormProps {
    let p: FormProps = {
      labelWidth: 100,
      showActionButtonGroup: false,
    };
    if (props.editFormPropsFn) {
      p = props.editFormPropsFn(p);
    }
    return p;
  }

  async function readData({ pageIndex, pageSize }) {
    const result = await defHttp.post<Result<PageData>>({
      url: `/admin/${lowerEntity.value}/read`,
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

  function getTableActions(record: Recordable): ActionItem[] {
    let items: ActionItem[] = [];
    items.push(
      { icon: 'ant-design:edit-outlined', onClick: updateRow.bind(null, record), auth: `${authPath}.Update`, ifShow: () => record.updatable },
      {
        icon: 'ant-design:delete-outlined',
        auth: `${authPath}.Delete`,
        ifShow: () => record.deletable,
        popConfirm: { title: '是否确认删除？', confirm: deleteRow.bind(null, record) },
      },
    );
    if (props.tableActionsFn) {
      items = props.tableActionsFn(items, record);
    }
    return items;
  }

  function getTableDropDownActions(record: Recordable): ActionItem[] {
    let items: ActionItem[] = [];
    if (props.tableDropDownActionsFn) {
      items = props.tableDropDownActionsFn(items, record);
    }
    return items;
  }
  function createRow() {
    modalMethods.setModalProps({ title: `新建${module?.entityDisplay}` });
    const url = `/admin/${module?.entityName}/create`;
    const record: Recordable = {};
    modalMethods.openModal<EditModalDataWrap>(true, { submitUrl: url, record });
  }

  function updateRow(record: Recordable) {
    modalMethods.setModalProps({ title: `更新${module?.entityDisplay}` });
    const url = `/admin/${module?.entityName}/update`;
    modalMethods.openModal<EditModalDataWrap>(true, { submitUrl: url, record });
  }

  function onModalClose() {
    tableMethods.reload();
  }

  async function deleteRow(record: Recordable) {
    const ids = [record.id];
    const result = await defHttp.post({
      url: `/admin/${module?.entityName.toLowerCase()}/delete`,
      params: ids,
    });
    if (result.type == ResultEnum.SUCCESS) {
      tableMethods.reload();
      return;
    }
  }

  async function deleteRows() {
    const rows = tableMethods.getSelectRows();
    const ids = new List(rows).Select((m) => m.id).ToArray();
    if (ids.length == 0) {
      createMessage.warn('请选择要删除的数据行');
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: '请确认',
      content: `是否确定要删除选中的 ${ids.length} 条数据？`,
      onOk: async () => {
        const result = await defHttp.post<Result>({
          url: `/admin/${lowerEntity.value}/delete`,
          params: ids,
        });
        if (result.type == ResultEnum.SUCCESS) {
          tableMethods.reload();
          tableMethods.clearSelectedRowKeys();
          return false;
        }
      },
    });
  }
</script>
