export function handleFormat(value: string | undefined | number) {
  if (value === "" || value === "-") {
    return value;
  }
  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  if (!isNaN(Number(value)) && reg.test(`${value}`)) {
    return `${value}`;
  }
  return "";
}

export function handleParser(value: string | undefined | number) {
  if (value === "" || value === "-") {
    return value;
  }
  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  if (reg.test(`${value}`)) {
    return Number(`${value}`);
  }
  return NaN;
}
