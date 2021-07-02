import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { Card, Flex, Spinner } from 'theme-ui'
import { updateUser } from '../../actions'
import { ActionType, useStateContext } from '../../state'
import { toShort } from '../../utils'

const TransactionProgress = () => {
  const {
    dispatch,
    state: { transaction, user, contract },
  } = useStateContext()

  const { library } = useWeb3React()

  useEffect(() => {
    const loadTransaction = async () => {
      if (!user || !user.address || !transaction) return

      const receipt = await transaction.wait()
      if (receipt.confirmations >= 1) {
        await updateUser({
          contract: contract?.payload,
          userAccount: user.address,
          library,
          dispatch,
        })

        dispatch({ type: ActionType.SET_TRANSACTION, payload: undefined })
      } else {
        throw new Error(receipt)
      }
    }

    loadTransaction()
  }, [dispatch, library, transaction, contract, user])

  if (!transaction) return null

  return (
    <Card variant="transaction">
      <Flex sx={{ alignItems: 'center' }}>
        <Spinner size={20} color="white" sx={{ mr: 2 }} /> Transaction: {toShort(transaction.hash)}
      </Flex>
    </Card>
  )
}

export default TransactionProgress
