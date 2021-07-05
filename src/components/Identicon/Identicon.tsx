import { useEffect, useRef } from 'react'
import { Flex } from 'theme-ui'
import jazzicon from 'jazzicon'

export type IdenticonProps = {
  address: string
  size?: number
}

const Identicon = ({ address, size = 16 }: IdenticonProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    try {
      ref.current.innerHTML = ''
      ref.current.appendChild(jazzicon(size, parseInt(address.slice(2, 10), 16)))
    } catch (e) {
      console.log(e)
    }
  }, [address, size])

  return (
    <Flex
      ref={ref}
      sx={{
        justifyContent: 'center',
        width: size + 2,
      }}
    />
  )
}

export { Identicon }
