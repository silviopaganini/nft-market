import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { Card, Flex, Spinner } from 'theme-ui'
import { useAppState } from '../../state'
import { toShort } from '../../utils'

const TransactionProgress = () => {
  const { transaction, user, setTransaction, setUser, updateTokensOnSale } = useAppState()

  const { library } = useWeb3React()

  useEffect(() => {
    const loadTransaction = async () => {
      if (!user || !user.address || !transaction) return

      const receipt = await transaction.wait()
      if (receipt.confirmations >= 1) {
        await setUser(library)
        setTransaction(undefined)
        updateTokensOnSale()
      } else {
        throw new Error(receipt)
      }
    }

    loadTransaction()
  }, [transaction, library, user, setTransaction, setUser, updateTokensOnSale])

  console.log('asdasdasd', transaction)

  if (!transaction) return null

  return (
    <Card variant="transaction">
      <Flex sx={{ alignItems: 'center' }}>
        <Spinner size={20} color="white" sx={{ mr: 2 }} /> Transaction: {toShort(transaction.hash)}
      </Flex>
    </Card>
  )
}

export { TransactionProgress }
