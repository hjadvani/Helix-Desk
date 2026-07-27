import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { initials } from "@/lib/lookups"

type UserAvatarProps = {
  name: string | undefined
  className?: string
}

export function UserAvatar({ name, className }: UserAvatarProps) {
  if (!name) {
    return (
      <Avatar className={cn("size-7", className)}>
        <AvatarFallback className="bg-muted text-[0.65rem] font-medium text-muted-foreground">
          —
        </AvatarFallback>
      </Avatar>
    )
  }
  return (
    <Avatar className={cn("size-7", className)}>
      <AvatarFallback className="bg-secondary text-[0.65rem] font-semibold text-secondary-foreground">
        {initials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
