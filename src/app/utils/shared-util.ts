import moment from 'moment';

/* eslint-disable @typescript-eslint/ban-types */
export const isUndefined = (obj: any): obj is undefined =>
  typeof obj === 'undefined';

export const isObject = (fn: any): fn is object =>
  !isNil(fn) && typeof fn === 'object';

export const isPlainObject = (fn: any): fn is object => {
  if (!isObject(fn)) {
    return false;
  }
  const proto = Object.getPrototypeOf(fn);
  if (proto === null) {
    return true;
  }
  const ctor =
    Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
    proto.constructor;
  return (
    typeof ctor === 'function' &&
    ctor instanceof ctor &&
    Function.prototype.toString.call(ctor) ===
      Function.prototype.toString.call(Object)
  );
};

export const addLeadingSlash = (path?: string): string =>
  path && typeof path === 'string'
    ? path.charAt(0) !== '/'
      ? '/' + path
      : path
    : '';

export const normalizePath = (path?: string): string =>
  path
    ? path.startsWith('/')
      ? ('/' + path.replace(/\/+$/, '')).replace(/\/+/g, '/')
      : '/' + path.replace(/\/+$/, '')
    : '/';

export const stripEndSlash = (path: string) =>
  path[path.length - 1] === '/' ? path.slice(0, path.length - 1) : path;

export const isFunction = (val: any): val is Function =>
  typeof val === 'function';
export const isString = (val: any): val is string => typeof val === 'string';
export const isNumber = (val: any): val is number => typeof val === 'number';
export const isConstructor = (val: any): boolean => val === 'constructor';
export const isNil = (val: any): val is null | undefined =>
  isUndefined(val) || val === null;
export const isEmpty = (array: any): boolean => !(array && array.length > 0);
export const isSymbol = (val: any): val is symbol => typeof val === 'symbol';

export const addMinutesToTime = (
  time: string,
  minutesToAdd: number,
  locale = 'es',
): string => {
  moment.locale(locale);

  const timeMoment = moment(time, 'HH:mm');
  const updatedTimeMoment = timeMoment.add(minutesToAdd, 'minutes');

  return updatedTimeMoment.format('HH:mm');
};

export const getCumulativeArray = (data: number[]): number[] => {
  return data.reduce((acc, curr, index) => {
    const previousSum = index > 0 ? acc[index - 1] : 0;
    acc.push(previousSum + curr);
    return acc;
  }, [] as number[]);
};

export const formatTime = (minutes: number, locale = 'es'): string => {
  if (minutes < 1) {
    const seconds = Math.round(minutes * 60);
    return `${seconds} ${locale === 'es' ? 's' : 's'}`;
  } else if (minutes >= 60) {
    const hours = (minutes / 60).toFixed(1);
    return `${hours} ${locale === 'es' ? 'h' : 'h'}`;
  } else {
    return `${Math.round(minutes)} ${locale === 'es' ? 'm' : 'm'}`;
  }
};

export const formatDistance = (distance: number, locale = 'es'): string => {
  if (distance < 1) {
    const meters = Math.round(distance * 1000);
    return `${meters} ${locale === 'es' ? 'm' : 'm'}`;
  } else {
    return `${Math.round(distance)} ${locale === 'es' ? 'km' : 'km'}`;
  }
};
