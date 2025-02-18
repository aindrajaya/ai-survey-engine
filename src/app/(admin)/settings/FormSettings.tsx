"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

type FormSettingsType = {
  id: number
  name: string
  description: string
  published: boolean
}

type Props = {
  formId: number
}

const FormSettings = ({ formId }: Props) => {
  const [settings, setSettings] = useState<FormSettingsType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchFormSettings = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/form-settings?formId=${formId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch form settings")
        }
        const data = await response.json()
        setSettings(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFormSettings()
  }, [formId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSwitchChange = (checked: boolean) => {
    setSettings((prev) => (prev ? { ...prev, published: checked } : null))
  }

  const handleSave = async () => {
    if (settings) {
      setIsSaving(true)
      try {
        const response = await fetch("/api/form-settings", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        })
        if (!response.ok) {
          throw new Error("Failed to update form settings")
        }
        const updatedSettings = await response.json()
        setSettings(updatedSettings)
        // You might want to show a success message here
      } catch (err) {
        setError((err as Error).message)
        // You might want to show an error message here
      } finally {
        setIsSaving(false)
      }
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error}</div>
  if (!settings) return null

  return (
    <div className="space-y-4 mt-4">
      <div>
        <Label htmlFor="name">Form Name</Label>
        <Input id="name" name="name" value={settings.name} onChange={handleInputChange} />
      </div>

      <div>
        <Label htmlFor="description">Form Description</Label>
        <Textarea id="description" name="description" value={settings.description || ""} onChange={handleInputChange} />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="published" checked={settings.published} onCheckedChange={handleSwitchChange} />
        <Label htmlFor="published">Published</Label>
      </div>

      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Form Settings"}
      </Button>
    </div>
  )
}

export default FormSettings

