import type { ExtractPropTypes } from 'vue';
import { osharpAdminTableProps, osharpAdminEditModalProps, osharpFunctionViewDrawerProps } from './src/props';
import { PageRequest, FilterOperate } from '/@/utils/osharp/types';

export declare type OSharpAdminTableProps = Partial<ExtractPropTypes<typeof osharpAdminTableProps>>;
export declare type OSharpAdminEditModalProps = Partial<ExtractPropTypes<typeof osharpAdminEditModalProps>>;
export declare type OSharpFunctionViewDrawerProps = Partial<ExtractPropTypes<typeof osharpFunctionViewDrawerProps>>;

export const defPageRequest: PageRequest = {
  pageCondition: {
    pageIndex: 1,
    pageSize: 20,
    sortCondition: [],
  },
  filterGroup: {
    rules: [],
    operate: FilterOperate.And,
    groups: [],
    level: 1,
  },
};
