const toShort = (value: string, factor: number = 5) => {
  const slice = Math.round(value.length / factor)
  return `${value.substr(0, slice)}...${value.substr(value.length - slice, value.length)}`
}

export { toShort }
