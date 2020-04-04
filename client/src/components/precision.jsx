import React from 'react'

const Precision = ({lvl}) => {

  const level = lvl => {
    switch (lvl) {
      case 1:
        return {
          rank: 'very low',
          detail: 'This game requires minimal low-intensity controller mastery and can be played by anyone.'
        }
      case 2:
        return {
          rank: 'low',
          detail: 'This game requires some low-intensity controller mastery, and may require some practice for new gamers.'
        }
      case 3:
        return {
          rank: 'medium',
          detail: 'This game requires average controller mastery, and may require some practice.'
        }
      case 4:
        return {
          rank: 'high',
          detail: 'This game is high intensity and requires skilled controller manipulation. It will require practice for new gamers.'
        }
      case 5:
        return {
          rank: 'very high',
          detail: 'This game is very high intensity and requires complete controller mastery. It is not recommended for new gamers'
        }
      default:
        return {}
    }
  }

  return (
    <>
      <h3>Precision: {lvl} - {level(lvl).rank}</h3>
      <p>{level(lvl).detail}</p>
    </>
  )
}

export default Precision