import React, { useState } from 'react'
import { increment, decrement, toggleTruth, toggleUntruth, addByAmount} from './counterSlice'
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter.counter)
  const truth = useSelector(state => state.counter.truth)
  const [amount, setAmount] = useState(0)
  

  const incrementHandler = () => dispatch(increment())
  const decrementHandler = () => dispatch(decrement())
  const toggleTruthHandler = () => truth === true ? dispatch(toggleUntruth()) : dispatch(toggleTruth())

  return (
    <div>
        <div style={{ border: '1px solid black', padding: '5px', margin:'5px' }}>
            <button onClick={incrementHandler}>Increment</button>
            <span>{counter}</span>
            <button onClick={decrementHandler}>Decrement</button>
            <div>
                <button onClick={() => dispatch(addByAmount(Number(amount)))}>Add by amount</button>
                <input value={amount} onChange={e => setAmount(e.target.value)} type="number" />
            </div>
        </div>
        <div style={{ border: '1px solid black', padding: '5px', margin:'5px' }}>
            <span>{truth.toString()}</span>
            <button onClick={toggleTruthHandler}>Toggle truth</button>
        </div>
    </div>
  )
}

export default Counter