export const fetcherETHUSD = (url: string) =>
  fetch(url).then(r => r.json().then(r => r.result.ethusd))

export const fetcherMetadata = (url: string) => fetch(url).then(r => r.json())
