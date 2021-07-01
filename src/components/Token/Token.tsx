import { FormEvent, MouseEvent, useState, useEffect } from 'react'
import { utils, BigNumber, constants } from 'ethers'
import {
  Spinner,
  Box,
  Flex,
  Card,
  Button,
  Image,
  Input,
  Text,
  Heading,
  Divider,
  NavLink,
} from 'theme-ui'
import useSWR from 'swr'
import { useStateContext } from '../../state'
import { fetcherMetadata } from '../../utils/fetchers'
import { METADATA_API, toShort } from '../../utils'

export type TokenProps = {
  id: string
  uri: string
  price: BigNumber
  name: string
}

export type TokenCompProps = {
  token: TokenProps
  isOnSale?: boolean
  onTransfer?({ id, address }: { id: string; address: string }): Promise<boolean>
  onBuy?({ id, price }: { id: string; price: BigNumber }): void
  onSale?({
    id,
    price,
    onSale,
  }: {
    id: string
    price: BigNumber
    onSale?: boolean
  }): Promise<boolean>
}

const Token = ({ token, isOnSale, onTransfer, onBuy, onSale }: TokenCompProps) => {
  const [transfer, setTransfer] = useState<boolean>(false)
  const [onSaleActive, setOnSale] = useState<boolean>(false)
  const [address, setAddress] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [owner, setOwner] = useState<string>('')
  const {
    state: { user, ethPrice, contract },
  } = useStateContext()

  const onTransferClick = async (e: FormEvent | MouseEvent) => {
    e.preventDefault()
    try {
      if (utils.isAddress(address) && onTransfer) {
        const result = await onTransfer({ id: token.id, address })
        if (result) {
          setOnSale(false)
        }
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  const onBuyClick = (e: MouseEvent) => {
    e.preventDefault()
    onBuy && onBuy({ id: token.id, price: token.price })
  }

  const onSaleClick = async (e: MouseEvent) => {
    e.preventDefault()
    if (!onSale) return
    try {
      const result = await onSale({ id: token.id, price: utils.parseEther(price), onSale: true })
      if (result) {
        setOnSale(false)
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  useEffect(() => {
    const loadOwner = async () => {
      try {
        const owner = await contract?.payload.ownerOf(token.id)
        setOwner(owner)
      } catch (e) {
        throw new Error(e)
      }
    }

    loadOwner()
  }, [contract, token.id])

  const { data } = useSWR(`${METADATA_API}/token/${token.id}`, fetcherMetadata)

  const tokenPriceEth = new Intl.NumberFormat('us-GB', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(utils.formatEther(token.price)) * Number(ethPrice))

  if (!data)
    return (
      <Card variant="nft">
        <Spinner />
      </Card>
    )

  return (
    <Card variant="nft">
      <Image
        sx={{ width: '100%', bg: 'white', borderBottom: '1px solid black' }}
        src={data.image}
      />
      <Box p={3} pt={2}>
        <Heading as="h2">{data.name}</Heading>
        <Divider variant="divider.nft" />
        <Box>
          <Text sx={{ color: 'lightBlue', fontSize: 1, fontWeight: 'bold' }}>Price</Text>
          <Heading as="h3" sx={{ color: 'green', m: 0, fontWeight: 'bold' }}>
            {constants.EtherSymbol} {Number(utils.formatEther(token.price)).toFixed(2)}{' '}
            <Text sx={{ color: 'navy' }} as="span" variant="text.body">
              ({tokenPriceEth})
            </Text>
          </Heading>
          <Box mt={2}>
            <Text as="p" sx={{ color: 'lightBlue', fontSize: 1, fontWeight: 'bold' }}>
              Owner
            </Text>
            <NavLink
              target="_blank"
              href={`https://rinkeby.etherscan.io/address/${owner}`}
              variant="owner"
              style={{
                textOverflow: 'ellipsis',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {toShort(owner)}
            </NavLink>
          </Box>
          <Box mt={2}>
            <NavLink
              target="_blank"
              href={`https://testnets.opensea.io/assets/${contract?.details.address}/${token.id}`}
              variant="openSea"
            >
              View on Opensea.io
            </NavLink>
          </Box>
        </Box>

        {onTransfer && (
          <Flex mt={3} sx={{ justifyContent: 'center' }}>
            {transfer && (
              <Box sx={{ width: '100%' }}>
                <Flex
                  onSubmit={onTransferClick}
                  sx={{ width: '100%', flexDirection: 'column' }}
                  as="form"
                >
                  <Input
                    onChange={e => setAddress(e.currentTarget.value)}
                    placeholder="ETH Address 0x0..."
                  />
                </Flex>
                <Flex mt={2}>
                  <Button sx={{ bg: 'green' }} onClick={onTransferClick} variant="quartiary">
                    Confirm
                  </Button>
                  <Button
                    sx={{ bg: 'red' }}
                    ml={2}
                    onClick={() => setTransfer(false)}
                    variant="quartiary"
                  >
                    Cancel
                  </Button>
                </Flex>
              </Box>
            )}
            {onSaleActive && (
              <Box sx={{ width: '100%' }}>
                <Flex
                  onSubmit={onTransferClick}
                  sx={{ width: '100%', flexDirection: 'column' }}
                  as="form"
                >
                  <Input
                    onChange={e => setPrice(e.currentTarget.value)}
                    placeholder="Token Price in ETH"
                  />
                </Flex>
                <Flex mt={2}>
                  <Button sx={{ bg: 'green' }} onClick={onSaleClick} variant="quartiary">
                    Confirm
                  </Button>
                  <Button
                    sx={{ bg: 'red' }}
                    ml={2}
                    onClick={() => setOnSale(false)}
                    variant="quartiary"
                  >
                    Cancel
                  </Button>
                </Flex>
              </Box>
            )}
            {!transfer && !onSaleActive && (
              <Flex sx={{ flexDirection: 'column', width: '100%', justifyContent: 'center' }}>
                <Button onClick={() => setTransfer(!transfer)} variant="tertiary">
                  Transfer
                </Button>
                {isOnSale ? (
                  <Button
                    mt={2}
                    onClick={() =>
                      onSale &&
                      onSale({
                        id: token.id,
                        price: token.price,
                        onSale: false,
                      })
                    }
                    variant="tertiary"
                  >
                    Remove from Sale
                  </Button>
                ) : (
                  <Button mt={2} onClick={() => setOnSale(!onSaleActive)} variant="tertiary">
                    Put Token for Sale
                  </Button>
                )}
              </Flex>
            )}
          </Flex>
        )}
        {onBuy && (
          <Flex mt={3} sx={{ justifyContent: 'center', width: '100%' }}>
            <Button
              sx={{
                opacity: !!user?.ownedTokens.find(
                  a => utils.formatUnits(a.id) === utils.formatUnits(token.id)
                )
                  ? 0.5
                  : 1,
                pointerEvents: !!user?.ownedTokens.find(
                  a => utils.formatUnits(a.id) === utils.formatUnits(token.id)
                )
                  ? 'none'
                  : 'visible',
              }}
              onClick={onBuyClick}
              variant="quartiary"
            >
              Buy Token
            </Button>
          </Flex>
        )}
      </Box>
    </Card>
  )
}

export default Token
