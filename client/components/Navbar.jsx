import { SignIn, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="  px-6 md:px-20 lg:px-40 bg-gray-400  py-6 flex justify-between items-center rounded-md  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-800">
      <Link href="/" className="text-2xl text-gray-200 font-bold">
        Slack Chat GPT
      </Link>
      <div className="flex gap-2 md:gap-6 items-center">
        <div className="hidden sm:block">
        </div>
        <div className="flex gap-2 md:gap-4 items-center">
          <SignedOut>
            <SignInButton className=" text-xs md:text-md  border-[2px] bg-white border-white text-black px-2 py-1 rounded-md" />
            <SignUpButton className=" text-xs md:text-md text-white border-[2px] border-white px-2 py-1 rounded-md" />
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  )
}

export default Navbar