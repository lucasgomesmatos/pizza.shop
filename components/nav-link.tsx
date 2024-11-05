'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type NavLinkProps = LinkProps & {
  children: React.ReactNode
}

export const NavLink = ({ children, ...props }: NavLinkProps) => {
  const pathname = usePathname()
  const current = pathname.startsWith(String(props.href))

  return (
    <Link
      data-current={current}
      className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:text-foreground data-[current=true]:bg-muted data-[current=true]:text-foreground"
      {...props}
    >
      {children}
    </Link>
  )
}
