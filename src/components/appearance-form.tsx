'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Check, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const themes = [
  { name: 'orange', label: 'Default Orange', color: 'hsl(33 100% 50%)' },
  { name: 'blue', label: 'Ocean Blue', color: 'hsl(221.2 83.2% 53.3%)' },
  { name: 'rose', label: 'Wild Rose', color: 'hsl(346.8 77.2% 49.8%)' },
  { name: 'green', label: 'Forest Green', color: 'hsl(142.1 76.2% 36.3%)' },
]

export function AppearanceForm() {
  const { theme, setTheme } = useTheme()

  const [currentColor, currentMode] = React.useMemo(() => {
    if (!theme) return ['orange', 'light']
    const parts = theme.split('-')
    return [parts[0], parts[1]]
  }, [theme])

  const handleModeChange = (checked: boolean) => {
    const newMode = checked ? 'dark' : 'light'
    setTheme(`${currentColor}-${newMode}`)
  }

  const handleColorChange = (newColor: string) => {
    setTheme(`${newColor}-${currentMode}`)
  }

  return (
    <Card id="appearance">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Palette className="h-6 w-6 text-primary" />
          <CardTitle>Appearance</CardTitle>
        </div>
        <CardDescription>Customize the look and feel of the app.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1.5">
            <Label>Color Scheme</Label>
            <p className="text-sm text-muted-foreground">Select an accent color for the UI.</p>
            <div className="flex items-center gap-2 pt-2">
            {themes.map((t) => {
                const isActive = currentColor === t.name
                return (
                    <button
                        key={t.name}
                        className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-full border-2 text-white',
                            isActive ? 'border-foreground' : 'border-transparent'
                        )}
                        style={{ backgroundColor: t.color }}
                        onClick={() => handleColorChange(t.name)}
                        title={t.label}
                    >
                        {isActive && <Check className="h-5 w-5" />}
                        <span className="sr-only">{t.label}</span>
                    </button>
                )
            })}
            </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                <span>Dark Mode</span>
                <span className="font-normal leading-snug text-muted-foreground">
                    Switch between light and dark themes.
                </span>
            </Label>
            <Switch
                id="dark-mode"
                checked={currentMode === 'dark'}
                onCheckedChange={handleModeChange}
            />
        </div>
      </CardContent>
    </Card>
  )
}