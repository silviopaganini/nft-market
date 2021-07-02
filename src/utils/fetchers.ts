export const fetcherETHUSD = (url: string) =>
  fetch(url).then(r => r.json().then(r => r.result.ethusd))

export const fetcherMetadata = async (url: string) => {
  try {
    return await (await fetch(url)).json()
  } catch (e) {
    return { error: e.message }
  }
}
