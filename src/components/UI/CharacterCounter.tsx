import React from 'react'
import { max } from 'date-fns'

type Props = {
    maxCount: number,
    currentCount: number,
}



const CharacterCounter: React.FC<Props> = ({maxCount, currentCount}) => {
    const remainingCharacter = maxCount - currentCount

    const isHigherMedian = () => remainingCharacter > ((maxCount / 2) / maxCount) * maxCount
    const isHigherLowerMedian = () => remainingCharacter > ((maxCount / 3) / maxCount) * maxCount

   
    return (
        <span style={{height: 0, color: isHigherMedian() ? 'green' : isHigherLowerMedian() ? 'orange' : 'red' }}>{remainingCharacter}</span>

    )
}

export default CharacterCounter
