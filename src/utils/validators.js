const numericRe = /[0-9]+/
export const isNumericString = (value) => numericRe.test(value)

const date1Re = /^(0?[1-9]|[12][0-9]|3[01])[/\-](0?[1-9]|1[012])[/\-]\d{4}$/
const date2Re= /^\d{4}[/\-](0?[1-9]|1[012])[/\-](0?[1-9]|[12][0-9]|3[01])$/
const date3Re= /[\d-]*/
export const isDate = (value) => date1Re.test(value) || date2Re.test(value) || date3Re.test(value)

export const isUrl = (value) => true