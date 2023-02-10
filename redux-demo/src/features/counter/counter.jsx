import React, { useState } from 'react';
import { increment, decrement, reset, incrementByAmount } from './counterSlice';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const count = useSelector(state => state.counter.count)
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(5)
  const addValue = Number(amount) || 0

  const resetAll = () => {
    setAmount(0)
    dispatch(reset())
  }

  return (
    <div>
      <section>
        <p>{count}</p>
        <div>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} /> <br />
          <button onClick={() => dispatch(incrementByAmount(addValue))}>Add amount</button>
          <button onClick={resetAll}>Reset</button>
        </div>
      </section>
    </div>
  )
}

export default Counter;