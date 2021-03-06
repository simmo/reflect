export const toMbps = integer => `${(integer / 1000).toFixed(1)} Mbps`
export const toUppercaseFirst = string => string.charAt(0).toUpperCase() + string.slice(1)
export const pluralise = (integer, singular, plural) => integer === 1 ? singular : plural
