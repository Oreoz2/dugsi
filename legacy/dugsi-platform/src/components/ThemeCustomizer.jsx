import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Palette, 
  Type, 
  Layout, 
  Image, 
  Save, 
  RotateCcw,
  Eye,
  Download,
  Upload
} from 'lucide-react'

const colorPresets = [
  {
    name: "Ocean Blue",
    primary: "oklch(0.45 0.25 240)",
    secondary: "oklch(0.96 0.02 240)",
    accent: "oklch(0.55 0.18 220)"
  },
  {
    name: "Forest Green", 
    primary: "oklch(0.45 0.25 160)",
    secondary: "oklch(0.96 0.02 160)",
    accent: "oklch(0.55 0.18 140)"
  },
  {
    name: "Royal Purple",
    primary: "oklch(0.5 0.22 280)",
    secondary: "oklch(0.96 0.02 280)",
    accent: "oklch(0.6 0.16 260)"
  },
  {
    name: "Sunset Orange",
    primary: "oklch(0.48 0.24 20)",
    secondary: "oklch(0.96 0.02 20)",
    accent: "oklch(0.58 0.18 40)"
  },
  {
    name: "Rose Gold",
    primary: "oklch(0.52 0.2 350)",
    secondary: "oklch(0.96 0.02 350)",
    accent: "oklch(0.6 0.15 330)"
  },
  {
    name: "Emerald",
    primary: "oklch(0.46 0.23 180)",
    secondary: "oklch(0.96 0.02 180)",
    accent: "oklch(0.56 0.17 160)"
  }
]

const fontPresets = [
  {
    name: "Modern Sans",
    family: "Inter, system-ui, sans-serif",
    headingSize: "2.5rem",
    bodySize: "1rem"
  },
  {
    name: "Classic Serif",
    family: "Georgia, serif",
    headingSize: "2.75rem", 
    bodySize: "1.1rem"
  },
  {
    name: "Elegant Display",
    family: "Playfair Display, serif",
    headingSize: "3rem",
    bodySize: "1rem"
  },
  {
    name: "Clean Minimal",
    family: "Helvetica Neue, sans-serif",
    headingSize: "2.25rem",
    bodySize: "0.95rem"
  }
]

const radiusPresets = [
  { name: "Subtle", value: "0.5rem" },
  { name: "Modern", value: "1rem" },
  { name: "Rounded", value: "1.5rem" },
  { name: "Super Round", value: "2rem" },
  { name: "Pill", value: "9999px" }
]

export function ThemeCustomizer({ currentTheme, onThemeChange, onSave }) {
  const [activeTab, setActiveTab] = useState("colors")
  const [customTheme, setCustomTheme] = useState({
    name: "Custom Theme",
    primary: "oklch(0.4 0.2 240)",
    secondary: "oklch(0.96 0.015 240)",
    accent: "oklch(0.5 0.15 200)",
    fontFamily: "Inter, system-ui, sans-serif",
    headingSize: "2.5rem",
    bodySize: "1rem",
    radius: "1rem",
    logo: ""
  })

  const applyTheme = (theme) => {
    const root = document.documentElement
    root.style.setProperty('--tenant-primary', theme.primary)
    root.style.setProperty('--tenant-secondary', theme.secondary)
    root.style.setProperty('--tenant-accent', theme.accent)
    root.style.setProperty('--radius', theme.radius)
    
    if (onThemeChange) {
      onThemeChange(theme)
    }
  }

  const handleColorPreset = (preset) => {
    const newTheme = {
      ...customTheme,
      ...preset
    }
    setCustomTheme(newTheme)
    applyTheme(newTheme)
  }

  const handleFontPreset = (preset) => {
    const newTheme = {
      ...customTheme,
      fontFamily: preset.family,
      headingSize: preset.headingSize,
      bodySize: preset.bodySize
    }
    setCustomTheme(newTheme)
    applyTheme(newTheme)
  }

  const handleRadiusPreset = (preset) => {
    const newTheme = {
      ...customTheme,
      radius: preset.value
    }
    setCustomTheme(newTheme)
    applyTheme(newTheme)
  }

  const handleCustomColorChange = (colorType, value) => {
    const newTheme = {
      ...customTheme,
      [colorType]: value
    }
    setCustomTheme(newTheme)
    applyTheme(newTheme)
  }

  const resetToDefault = () => {
    const defaultTheme = {
      name: "Default Theme",
      primary: "oklch(0.4 0.2 240)",
      secondary: "oklch(0.96 0.015 240)",
      accent: "oklch(0.5 0.15 200)",
      fontFamily: "Inter, system-ui, sans-serif",
      headingSize: "2.5rem",
      bodySize: "1rem",
      radius: "1rem",
      logo: ""
    }
    setCustomTheme(defaultTheme)
    applyTheme(defaultTheme)
  }

  const exportTheme = () => {
    const themeData = JSON.stringify(customTheme, null, 2)
    const blob = new Blob([themeData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${customTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importTheme = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const importedTheme = JSON.parse(e.target.result)
            setCustomTheme(importedTheme)
            alert(`Theme "${importedTheme.name}" imported successfully!`)
          } catch (error) {
            alert('Invalid theme file. Please select a valid JSON theme file.')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-card shadow-modal">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-6 h-6 text-primary" />
          Theme Customizer
        </CardTitle>
        <CardDescription>
          Customize your madrasah's branding and visual identity
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-modern">
            <TabsTrigger value="colors" className="rounded-button">
              <Palette className="w-4 h-4 mr-2" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="rounded-button">
              <Type className="w-4 h-4 mr-2" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="layout" className="rounded-button">
              <Layout className="w-4 h-4 mr-2" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="branding" className="rounded-button">
              <Image className="w-4 h-4 mr-2" />
              Branding
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Color Presets</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {colorPresets.map((preset, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover-lift transition-modern rounded-card"
                    onClick={() => handleColorPreset(preset)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div 
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <p className="font-medium text-sm">{preset.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2 mt-2">
                    <div 
                      className="w-10 h-10 rounded-modern border border-border"
                      style={{ backgroundColor: customTheme.primary }}
                    />
                    <Input
                      id="primary-color"
                      value={customTheme.primary}
                      onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                      className="rounded-input"
                      placeholder="oklch(0.4 0.2 240)"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex gap-2 mt-2">
                    <div 
                      className="w-10 h-10 rounded-modern border border-border"
                      style={{ backgroundColor: customTheme.secondary }}
                    />
                    <Input
                      id="secondary-color"
                      value={customTheme.secondary}
                      onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                      className="rounded-input"
                      placeholder="oklch(0.96 0.015 240)"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex gap-2 mt-2">
                    <div 
                      className="w-10 h-10 rounded-modern border border-border"
                      style={{ backgroundColor: customTheme.accent }}
                    />
                    <Input
                      id="accent-color"
                      value={customTheme.accent}
                      onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                      className="rounded-input"
                      placeholder="oklch(0.5 0.15 200)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Font Presets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fontPresets.map((preset, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover-lift transition-modern rounded-card"
                    onClick={() => handleFontPreset(preset)}
                  >
                    <CardContent className="p-4">
                      <div style={{ fontFamily: preset.family }}>
                        <h4 className="font-bold text-lg mb-1">{preset.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          The quick brown fox jumps over the lazy dog
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Border Radius</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {radiusPresets.map((preset, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover-lift transition-modern"
                    style={{ borderRadius: preset.value }}
                    onClick={() => handleRadiusPreset(preset)}
                  >
                    <CardContent className="p-4 text-center">
                      <div 
                        className="w-8 h-8 bg-primary mx-auto mb-2"
                        style={{ borderRadius: preset.value }}
                      />
                      <p className="font-medium text-sm">{preset.name}</p>
                      <p className="text-xs text-muted-foreground">{preset.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Logo & Branding</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="theme-name">Theme Name</Label>
                  <Input
                    id="theme-name"
                    value={customTheme.name}
                    onChange={(e) => setCustomTheme({...customTheme, name: e.target.value})}
                    className="rounded-input mt-2"
                    placeholder="My Custom Theme"
                  />
                </div>
                
                <div>
                  <Label htmlFor="logo-url">Logo URL</Label>
                  <Input
                    id="logo-url"
                    value={customTheme.logo}
                    onChange={(e) => setCustomTheme({...customTheme, logo: e.target.value})}
                    className="rounded-input mt-2"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-border">
          <Button onClick={() => onSave && onSave(customTheme)} className="rounded-button">
            <Save className="w-4 h-4 mr-2" />
            Save Theme
          </Button>
          
          <Button variant="outline" onClick={resetToDefault} className="rounded-button">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
          
          <Button variant="outline" onClick={exportTheme} className="rounded-button">
            <Download className="w-4 h-4 mr-2" />
            Export Theme
          </Button>
          
          <Button variant="outline" onClick={importTheme} className="rounded-button">
            <Upload className="w-4 h-4 mr-2" />
            Import Theme
          </Button>
          
          <div className="ml-auto">
            <Badge variant="secondary" className="rounded-button">
              <Eye className="w-3 h-3 mr-1" />
              Live Preview
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ThemeCustomizer

