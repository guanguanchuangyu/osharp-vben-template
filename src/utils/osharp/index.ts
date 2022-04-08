import { ModuleInfo, OSharpTag } from './types';
import { h } from 'vue';
import { formatToDateTime } from '/@/utils/dateUtil';
import { Checkbox, Switch, Tag } from 'ant-design-vue';
//# region Render

export const CheckboxRender = (value, text?: string) => h(Checkbox, { checked: value, style: 'pointer-events:none;' }, () => text);
export const SwitchRender = (value) => h(Switch, { checked: value, style: 'pointer-events:none;' });
export const TagRender = (value: string | number, source: OSharpTag) => {
  const item = source[value];
  if (!item) {
    return 'N/A';
  }
  return h(Tag, { color: item.color }, () => item.text);
};
export const dataTimeRender = (value: any, format: string | undefined) => {
  format = format || 'YYYY/MM/DD HH:mm';
  return value ? formatToDateTime(value, format) : '';
};

//#endregion

//#region Tools

/** 将小驼峰字符串的第一个字符小写 */
export function toLowerCaseFirst(str: string): string {
  if (!str) {
    return str;
  }
  if (str.length == 1) {
    return str[0].toLowerCase();
  }
  return `${str[0].toLowerCase()}${str.substring(1)}`;
}

/** 将字符串第一个字符大写 */
export function toUpperCaseFirst(str: string): string {
  if (!str) {
    return str;
  }
  if (str.length == 1) {
    return str[0].toUpperCase();
  }
  return `${str[0].toUpperCase()}${str.substring(1, str.length - 1)}`;
}

/**
 * 展开集合拼接字符串
 * @param array 待展开的集合
 * @param separator 分隔符
 */
export function expandAndToString(array: Array<any>, separator = ',') {
  let result = '';
  if (!array || !array.length) {
    return result;
  }
  array.forEach((item) => {
    result = result + item.toString() + separator;
  });
  return result.substr(0, result.length - separator.length);
}
/**
 * 提供首尾字符串截取中间的字符串
 * @param str 待截取的字符串
 * @param start 起始的字符串
 * @param end 结束的字符串
 */
export function subStr(str: string, start?: string, end?: string): string {
  let startIndex = 0;
  let endIndex = str.length;
  if (start) {
    startIndex = str.indexOf(start) + start.length;
  }
  if (end) {
    endIndex = str.indexOf(end);
  }
  return str.substr(startIndex, endIndex - startIndex);
}
//#endregion

//#region DataSource
export const ajaxResultTypeTags: OSharpTag = {
  200: { text: '成功', color: 'green' },
  203: { text: '消息', color: '' },
  401: { text: '未登录', color: 'orange' },
  403: { text: '无权操作', color: 'orange' },
  404: { text: '不存在', color: 'orange' },
  423: { text: '锁定', color: 'orange' },
  500: { text: '错误', color: 'red' },
};

export const accessTypeTags: OSharpTag = {
  0: { text: '匿名访问', color: 'green' },
  1: { text: '登录访问', color: 'blue' },
  2: { text: '角色访问', color: 'orange' },
};

export const dataAuthOperationTags: OSharpTag = {
  0: { text: '读取', color: 'green' },
  1: { text: '更新', color: 'blue' },
  2: { text: '删除', color: 'orange' },
};

export const operateTypeTags: OSharpTag = {
  0: { text: '读取', color: '' },
  1: { text: '新增', color: 'green' },
  2: { text: '更新', color: 'blue' },
  3: { text: '删除', color: 'orange' },
};

export const packLevelTags: OSharpTag = {
  1: { text: 'Core', color: 'red' },
  10: { text: 'Framework', color: 'orange' },
  20: { text: 'Application', color: 'blue' },
  30: { text: 'Business', color: 'green' },
};

export const defaultModuleInfo: ModuleInfo = {
  areaName: 'Admin',
  areaDisplay: '后台管理',
  moduleName: 'Identity',
  moduleDisplay: '身份认证',
  entityName: 'Role',
  entityDisplay: '角色',
};
//#endregion
