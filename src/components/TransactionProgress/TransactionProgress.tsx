import { useCallback, useEffect, useRef, useState } from 'react'
import { Card, Flex, Spinner } from 'theme-ui'
import { useAppState } from '../../state'
import { toShort } from '../../utils'

const TransactionProgress = () => {
  const { setTransaction, setUser, updateTokensOnSale } = useAppState(
    useCallback(
      ({ setTransaction, setUser, updateTokensOnSale }) => ({
        setTransaction,
        setUser,
        updateTokensOnSale,
      }),
      []
    )
  )

  const transactionRef = useRef(useAppState.getState().transaction)
  const [loading, setLoading] = useState<boolean>(false)

  const update = useCallback(async () => {
    await setUser()
    setTransaction(undefined)
    updateTokensOnSale()
    setLoading(false)
  }, [setTransaction, setUser, updateTokensOnSale])

  useEffect(() => {
    useAppState.subscribe(async ({ transaction }) => {
      try {
        transactionRef.current = transaction
        if (!transaction) return
        setLoading(true)
        const receipt = await transaction.wait()
        if (receipt.confirmations >= 1) {
          update()
        }
      } catch (e) {
        console.log('transaction', e)
        setLoading(false)
      }
    })

    return () => {
      useAppState.destroy()
    }
  }, [update])

  if (!loading) return null

  return (
    <Card variant="transaction">
      <Flex sx={{ alignItems: 'center' }}>
        <Spinner size={20} color="white" sx={{ mr: 2 }} /> Transaction:{' '}
        {toShort(transactionRef.current.hash)}
      </Flex>
    </Card>
  )
}

export { TransactionProgress }
