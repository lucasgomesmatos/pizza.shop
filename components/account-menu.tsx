import { Building, ChevronDown, LogOut } from 'lucide-react'

import { getProfile } from '@/http/get-profile'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function AccountMenu() {
  await getProfile()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {'oi'}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Lucas Gomes Matos</span>
          <span className="text-sm font-normal text-muted-foreground">
            {' '}
            lucas@gmail.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Building className="size-4" />
          <span>Perfil da loja</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
          <LogOut className="size-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
