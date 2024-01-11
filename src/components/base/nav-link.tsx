import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export const NavLink = (props: NavLinkProps) => {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      {...props}
      className="items flex gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground data-[current=true]:text-foreground"
    />
  )
}
