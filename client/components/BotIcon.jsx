import Image from 'next/image'
import React from 'react'

const BotIcon = (props) => {
  return (
    <Image className=' rounded-full' src={"https://yt3.googleusercontent.com/ytc/AIdro_nD88Qel1sWfD2NQ8tM1Ja2BJZuV-jgmUxc-VbpZX7XnkQ=s900-c-k-c0x00ffffff-no-rj"} width={props.size} height={props.size} alt="" />
  )
}

export default BotIcon