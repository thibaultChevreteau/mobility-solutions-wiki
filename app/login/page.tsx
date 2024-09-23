"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import React from "react"
import { SignupButton } from "@/ui/signup-button"
import { LoginButton } from "@/ui/login-buton"
import { LogoutButton } from "@/ui/logout-button"

export default function Page() {
  const { user } = useUser()

  return (
    <div>
      {!user && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {user && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  )
}
