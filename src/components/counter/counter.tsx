import React from 'react'

type CounterProps = {
	comparisonCount: number;
	swapCount: number;
}

const Counter = ({ comparisonCount, swapCount }: CounterProps) => {
  return (
    <div className="counter_container">
			<p>Comparisons: {comparisonCount}</p>
			<p>Swaps: {swapCount}</p>
    </div>
  )
}

export default Counter