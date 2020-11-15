import React from 'react'
import { ReactComponent as Gauge1 } from "../assets/icons/Gauge1.svg";
import { ReactComponent as Gauge2 } from "../assets/icons/Gauge2.svg";
import { ReactComponent as Gauge3 } from "../assets/icons/Gauge3.svg";
import { ReactComponent as Gauge4 } from "../assets/icons/Gauge4.svg";
import { ReactComponent as Gauge5 } from "../assets/icons/Gauge5.svg";

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

  const Icon = ({lvl, style}) => {
    switch (lvl) {
      case 1:
        return <Gauge1 style={style}/>
      case 2:
        return <Gauge2 style={style}/>
      case 3:
        return <Gauge3 style={style}/>
      case 4:
        return <Gauge4 style={style}/>
      case 5:
        return <Gauge5 style={style}/>
      default:
        return <></>
    }
  }

  return (
    !!lvl &&
    <>
      <h3>Precision: {lvl} - {level(lvl).rank} <Icon lvl={lvl} style={{width: 50, height: 50, position: 'relative', marginBottom: '15px'}}/></h3>
      <p>{level(lvl).detail}</p>
    </>
  )
}

export default Precision