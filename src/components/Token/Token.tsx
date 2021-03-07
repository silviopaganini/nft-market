import { FormEvent, MouseEvent, useState } from 'react'
import { Box, Flex, Card, Button, Image, Input, Text } from 'theme-ui'
import Web3 from 'web3'
import { useStateContext } from '../../state'

export type TokenProps = {
  id: string
  uri: string
  price: string
}

export type TokenCompProps = {
  token: TokenProps
  isOnSale?: boolean
  onTransfer?({ id, address }: { id: string; address: string }): void
  onBuy?({ id, price }: { id: string; price: string }): void
  onSale?({ id, price, onSale }: { id: string; price: string; onSale?: boolean }): void
}

const Token = ({ token, isOnSale, onTransfer, onBuy, onSale }: TokenCompProps) => {
  const [transfer, setTransfer] = useState<boolean>(false)
  const [onSaleActive, setOnSale] = useState<boolean>(false)
  const [address, setAddress] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const {
    state: { user },
  } = useStateContext()

  const onTransferClick = (e: FormEvent | MouseEvent) => {
    e.preventDefault()
    if (Web3.utils.isAddress(address) && onTransfer) {
      onTransfer({ id: token.id, address })
    }
  }

  const onBuyClick = (e: MouseEvent) => {
    e.preventDefault()
    onBuy && onBuy({ id: token.id, price: token.price })
  }

  const onSaleClick = (e: MouseEvent) => {
    e.preventDefault()
    onSale && onSale({ id: token.id, price, onSale: true })
  }

  return (
    <Card variant="nft">
      <Image
        sx={{ width: 150, height: 150, mb: 3 }}
        src={`https://robohash.org/${token.uri}.png`}
      />
      <Text>
        UID:{' '}
        <Text as="span" variant="text.bold">
          {token.id}
        </Text>
      </Text>
      <Text>
        NFT Name:{' '}
        <Text as="span" variant="text.bold">
          {token.uri}
        </Text>
      </Text>
      <Text>
        Price:{' '}
        <Text as="span" variant="text.bold">
          Ξ {Number(Web3.utils.fromWei(token.price)).toFixed(2)}
        </Text>
      </Text>
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
            <>
              <Button onClick={() => setTransfer(!transfer)} variant="tertiary">
                Transfer
              </Button>
              {isOnSale ? (
                <Button
                  ml={2}
                  onClick={() =>
                    onSale &&
                    onSale({ id: token.id, price: Web3.utils.fromWei(token.price), onSale: false })
                  }
                  variant="tertiary"
                >
                  Remove from Sale
                </Button>
              ) : (
                <Button ml={2} onClick={() => setOnSale(!onSaleActive)} variant="tertiary">
                  Put Token for Sale
                </Button>
              )}
            </>
          )}
        </Flex>
      )}
      {onBuy && (
        <Flex mt={3} sx={{ justifyContent: 'center' }}>
          <Flex mt={2}>
            <Button
              sx={{
                bg: 'green',
                opacity: !!user?.ownedTokens.find(a => a.id === token.id) ? 0.5 : 1,
                pointerEvents: !!user?.ownedTokens.find(a => a.id === token.id)
                  ? 'none'
                  : 'visible',
              }}
              onClick={onBuyClick}
              variant="quartiary"
            >
              Buy Token
            </Button>
          </Flex>
        </Flex>
      )}
    </Card>
  )
}

export default Token
