"use client"

import type React from "react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, Link, Check } from "lucide-react"
import { toast } from "sonner"

interface AvatarSelectorProps {
  currentAvatar?: string
  fallbackText: string
  onAvatarChange: (avatarUrl: string) => void
}

const predefinedAvatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Edward",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Fluffy",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Garfield",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Harley",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Izzy",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jack",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Kiki",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Luna",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Max",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Nala",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Oscar",
]

export function AvatarSelector({ currentAvatar, fallbackText, onAvatarChange }: AvatarSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || "")
  const [customUrl, setCustomUrl] = useState("")
  const [uploadedFile, setUploadedFile] = useState<string>("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Arquivo muito grande. Máximo 5MB.")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedFile(result)
        setSelectedAvatar(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlSubmit = () => {
    if (customUrl) {
      try {
        new URL(customUrl)
        setSelectedAvatar(customUrl)
        toast.success("URL do avatar adicionada!")
      } catch {
        toast.error("URL inválida. Verifique o link.")
      }
    }
  }

  const handleSaveAvatar = () => {
    if (selectedAvatar) {
      onAvatarChange(selectedAvatar)
      setIsOpen(false)
      toast.success("Avatar atualizado com sucesso!")
    }
  }

  const handleRemoveAvatar = () => {
    setSelectedAvatar("")
    onAvatarChange("")
    setIsOpen(false)
    toast.success("Avatar removido!")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={currentAvatar} alt="Avatar do usuário" />
          <AvatarFallback className="text-lg">{fallbackText}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Camera className="h-4 w-4" />
              {currentAvatar ? "Alterar Avatar" : "Adicionar Avatar"}
            </Button>
          </DialogTrigger>
          {currentAvatar && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveAvatar}
              className="text-destructive hover:text-destructive"
            >
              Remover Avatar
            </Button>
          )}
        </div>
      </div>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Escolher Avatar</DialogTitle>
          <DialogDescription>
            Selecione um avatar pré-definido, faça upload de uma imagem ou use um link
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="predefined" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="predefined">Pré-definidos</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
          </TabsList>

          <TabsContent value="predefined" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {predefinedAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg border-2 p-2 transition-all hover:border-primary ${
                    selectedAvatar === avatar ? "border-primary bg-primary/10" : "border-border"
                  }`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  <Avatar className="h-16 w-16 mx-auto">
                    <AvatarImage src={avatar || "/placeholder.svg"} alt={`Avatar ${index + 1}`} />
                    <AvatarFallback>A{index + 1}</AvatarFallback>
                  </Avatar>
                  {selectedAvatar === avatar && (
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <div className="space-y-2">
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <span className="text-sm font-medium">Clique para fazer upload</span>
                  <br />
                  <span className="text-xs text-muted-foreground">PNG, JPG, GIF até 5MB</span>
                </Label>
                <Input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </div>
            </div>
            {uploadedFile && (
              <div className="flex items-center justify-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={uploadedFile || "/placeholder.svg"} alt="Avatar carregado" />
                  <AvatarFallback>UP</AvatarFallback>
                </Avatar>
              </div>
            )}
          </TabsContent>

          <TabsContent value="url" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="avatar-url">URL da Imagem</Label>
                <div className="flex gap-2">
                  <Input
                    id="avatar-url"
                    placeholder="https://exemplo.com/avatar.jpg"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                  />
                  <Button onClick={handleUrlSubmit} variant="outline">
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {selectedAvatar && selectedAvatar.startsWith("http") && (
                <div className="flex items-center justify-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedAvatar || "/placeholder.svg"} alt="Avatar da URL" />
                    <AvatarFallback>URL</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSaveAvatar} disabled={!selectedAvatar}>
            Salvar Avatar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
