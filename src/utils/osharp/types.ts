export interface ModuleInfo {
  areaName: string;
  areaDisplay: string;
  moduleName: string;
  moduleDisplay: string;
  entityName: string;
  entityDisplay: string;
}

/** 页数据 */
export interface PageData<T = any> {
  /** 行数据 */
  row: T[];
  /** 总行数 */
  total: number;
}

/** 比较操作枚举 */
export enum FilterOperate {
  And = 1,
  Or = 2,
  Equal = 3,
  NotEqual = 4,
  Less = 5,
  LessOrEqual = 6,
  Greater = 7,
  GreaterOrEqual = 8,
  StartsWith = 9,
  EndsWith = 10,
  Contains = 11,
  NotContains = 12,
}

export enum ListSortDirection {
  Ascending,
  Descending,
}

export interface SortCondition {
  sortField: string;
  listSortDirection: ListSortDirection;
}

export interface PageCondition {
  pageIndex: number;
  pageSize: number;
  sortCondition: SortCondition[];
}

export interface FilterRule {
  /** 属性名 */
  field: string;
  /** 属性值 */
  value: any;
  /** 对比操作 */
  operate: FilterOperate;
  /** 是否将属性名称驼峰(lowerCase)写法转换为帕斯卡(UpperCase)写法 */
  isLowerCaseToUpperCase: boolean;
  /** 其他数据字典 */
  [key: string]: any;
}

export interface FilterGroup {
  /** 条件集合 */
  rules: FilterRule[];
  /** 条件间操作 */
  operate: FilterOperate;
  /** 条件组集合 */
  groups: FilterGroup[];
  level: number;
}

/** 分布请求 */
export interface PageRequest {
  /** 分布条件 */
  pageCondition: PageCondition;
  /** 数据过滤条件组 */
  filterGroup: FilterGroup;
}

export interface OSharpTag {
  [key: number]: OSharpTagValue;
  [key: string]: OSharpTagValue;
}

export interface OSharpTagValue {
  text?: string;
  color?: 'geekblue' | 'blue' | 'purple' | 'success' | 'red' | 'volcano' | 'orange' | 'gold' | 'lime' | 'green' | 'cyan' | string;
}

export interface EditModalDataWrap {
  submitUrl: string;
  record: Recordable;
}
