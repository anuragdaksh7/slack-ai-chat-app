"use client"
import BotIcon from '@/components/BotIcon'
import { BotMessage, UserMessage } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'

const Page = () => {
  const [generating, setGenerating] = useState(false)
  const [aiContent, setAiContent] = useState("")
  const [currMessage, setCurrMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "user",
      content: "Hi"
    },
    {
      role: "bot",
      content: "NaCl stands for sodium chloride. It is a chemical compound that is commonly known as table salt. NaCl is made up of equal proportions of sodium (Na) and chloride (Cl) ions. It is a white crystalline solid that is widely used as a seasoning and preservative for food, as well as in various industrial applications."
    },
  ])
  const sendMessage = async (text) => {
    setMessages([
      ...messages,
      {
        role: "user",
        content: text
      }
    ])
    setGenerating(true)
    const response = await axios.post("/api/generate-message", { text: text })
    const data = await response.data;
    console.log(data)
    setMessages([
      ...messages,
      {
        role: "user",
        content: text
      },
      {
        role: "bot",
        content: data.message
      }
    ])
    setGenerating(false)

  }
  return (
    <div className='text-gray-200 px-40 py-6'>
      <div className='h-[80lvh] flex flex-col justify-between px-6 py-4 w-full bg-gray-800 rounded-md'>
        <div className=' overflow-y-scroll flex flex-col gap-2 py-2'>
          {
            messages.map((message, index) => {
              return (
                <div key={index}>
                  {
                    message.role === 'user' ? <UserMessage message={message.content} /> : <BotMessage message={message.content} />
                  }
                </div>
              )
            })
          }
        </div>
        <div>
          <div className='flex gap-4'>
            <Input disabled={generating} className="text-black" value={currMessage} onChange={(e) => {
              setCurrMessage(e.target.value)
            }} type='text' placeholder='type here' />
            <Button onClick={(e) => {

              sendMessage(currMessage)
              setCurrMessage("")
            }}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page