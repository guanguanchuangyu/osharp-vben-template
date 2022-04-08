import { ModuleInfo } from '/@/utils/osharp/types';
import { ActionItem, BasicTableProps, EditRecordRow, FormProps } from '/@/components/Table';

export const osharpAdminTableProps = {
  /** 模块信息 */
  module: {
    type: Object as PropType<ModuleInfo>,
    required: true,
  },
  /** BasicTableProps 的转换函数，用于按需转换默认的Props配置 */
  tablePropsFn: {
    type: Function as PropType<(p: BasicTableProps) => BasicTableProps>,
    default: (p: BasicTableProps) => p,
  },
  /** TableActions的转换函数，用于转换行操作入口配置 */
  tableActionsFn: {
    type: Function as PropType<(items: ActionItem[], record: EditRecordRow) => ActionItem[]>,
  },
  /** TableAction的下拉配置转换，用于转换行操作的下拉操作入口配置 */
  tableDropDownActionsFn: {
    type: Function as PropType<(items: ActionItem[], record: EditRecordRow) => ActionItem[]>,
  },
  /** 编辑表单属性转换函数 */
  editFormPropsFn: {
    type: Function as PropType<(p: FormProps) => FormProps>,
  },
};

export const osharpAdminEditModalProps = {
  /** 模块信息 */
  module: {
    type: Object as PropType<ModuleInfo>,
    required: true,
  },
  /** 编辑表单属性转换函数 */
  editFormPropsFn: {
    type: Function as PropType<(p: FormProps) => FormProps>,
  },
  transportSubmitData: {
    type: Function as PropType<(p: Recordable) => Recordable>,
  },
};

export const osharpFunctionViewDrawerProps = {
  module: {
    type: Object as PropType<ModuleInfo>,
    required: true,
  },
  tableProps: {
    type: Object as PropType<BasicTableProps>,
  },
};
