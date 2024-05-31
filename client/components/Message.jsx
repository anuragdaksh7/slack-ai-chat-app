import React, { useEffect } from 'react'
import BotIcon from './BotIcon'
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import axios from 'axios';


export function BotMessage(props) {
  return (
    <div className='flex w-full items-center gap-3'>
      <div>
      <BotIcon size={18} />
      </div>
      <p className=' max-w-[80%] bg-indigo-700 p-2 py-1 rounded-t-md rounded-r-md '>{props.message}</p>
    </div>
  )
}

export  function UserMessage(props) {
  // const user = currentUser();
  // const image = user.imageUrl
  // console.log(user.imageUrl)
  
  return (
    <div className='flex flex-row-reverse w-full items-center gap-3'>
      <div>
      {/* <Image width={18} height={18} src={image} alt={""} /> */}
      </div>
      <p className=' bg-green-500 text-black p-2 py-1 rounded-t-md rounded-l-md '>{props.message}</p>
    </div>
  )
}