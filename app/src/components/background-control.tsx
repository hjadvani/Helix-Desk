import { useRef } from "react"
import { Image as ImageIcon, Upload, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUiStore } from "@/lib/ui-store"

const MAX_BYTES = 5 * 1024 * 1024

export function BackgroundControl() {
  const inputRef = useRef<HTMLInputElement>(null)
  const backgroundImage = useUiStore((s) => s.backgroundImage)
  const setBackgroundImage = useUiStore((s) => s.setBackgroundImage)

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file")
      return
    }
    if (file.size > MAX_BYTES) {
      toast.error("Image is too large — pick one under 5 MB")
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setBackgroundImage(String(reader.result))
      toast.success("Background updated")
    }
    reader.onerror = () => toast.error("Could not read that image")
    reader.readAsDataURL(file)
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
        aria-hidden
        tabIndex={-1}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Background image">
            <ImageIcon className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>Background image</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => inputRef.current?.click()}>
            <Upload className="size-4" />
            {backgroundImage ? "Replace image" : "Upload image"}
          </DropdownMenuItem>
          {backgroundImage ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setBackgroundImage(null)}>
                <X className="size-4" />
                Remove background
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
