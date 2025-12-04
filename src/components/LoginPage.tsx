'use client'

import { useState, useRef, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  Mail,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Clock
} from 'lucide-react'

interface PinInputProps {
  value: string
  onChange: (value: string) => void
  disabled: boolean
  error?: string
}

const PinInput = ({ value, onChange, disabled, error }: PinInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [showPin, setShowPin] = useState(false)

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus()
    }
  }, [])

  const handleChange = (index: number, newValue: string) => {
    if (newValue.length > 1) return

    const newPin = value.split('')
    newPin[index] = newValue
    onChange(newPin.join(''))

    // Auto-focus next input
    if (newValue && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      onChange(pastedData.padEnd(6, ''))
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus()
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="pin-input">6-Digit PIN</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowPin(!showPin)}
          className="rounded-button text-muted-foreground hover:text-foreground"
        >
          {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex gap-2 justify-center">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el }}
            type={showPin ? 'text' : 'password'}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`w-12 h-12 text-center text-lg font-bold border rounded-md focus:outline-none focus:ring-2 transition-all ${error
                ? 'border-destructive focus:ring-destructive'
                : 'border-input focus:ring-primary'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            maxLength={1}
            pattern="[0-9]"
            inputMode="numeric"
          />
        ))}
      </div>

      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}
    </div>
  )
}

interface OtpVerificationProps {
  phone?: string
  email?: string
  onVerify: (otp: string) => void
  onBack: () => void
  loading: boolean
}

const OtpVerification = ({ phone, email, onVerify, onBack, loading }: OtpVerificationProps) => {
  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleResend = () => {
    setTimeLeft(300)
    setCanResend(false)
    setOtp('')
    // In real app, trigger OTP resend API call
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Smartphone className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Verify Your Identity</h3>
        <p className="text-sm text-muted-foreground">
          We've sent a verification code to:
        </p>
        <div className="space-y-1">
          {phone && (
            <Badge variant="secondary" className="rounded-button">
              <Smartphone className="w-3 h-3 mr-1" />
              {phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
            </Badge>
          )}
          {email && (
            <Badge variant="secondary" className="rounded-button">
              <Mail className="w-3 h-3 mr-1" />
              {email.replace(/(.{2}).*(@.*)/, '$1****$2')}
            </Badge>
          )}
        </div>
      </div>

      <PinInput
        value={otp}
        onChange={setOtp}
        disabled={loading}
      />

      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Code expires in {formatTime(timeLeft)}</span>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={loading}
            className="flex-1 rounded-button"
          >
            Back
          </Button>

          <Button
            onClick={() => onVerify(otp)}
            disabled={otp.length !== 6 || loading}
            className="flex-1 rounded-button"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4 mr-2" />
            )}
            Verify
          </Button>
        </div>

        {canResend && (
          <Button
            variant="ghost"
            onClick={handleResend}
            className="rounded-button text-primary"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Resend Code
          </Button>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'login' | 'reset' | 'otp'>('login')
  const [formData, setFormData] = useState({
    username: '',
    pin: '',
    resetUsername: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [lockoutTime, setLockoutTime] = useState(0)

  // Tenant info would typically come from a context or prop in a real app
  // For now we'll hardcode or fetch from an API if needed
  const tenant = {
    name: "Al-Noor Academy",
    logo: "🕌"
  }

  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setTimeout(() => setLockoutTime(lockoutTime - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [lockoutTime])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (lockoutTime > 0) return

    setLoading(true)
    setError('')

    try {
      // Use NextAuth signIn
      const result = await signIn('credentials', {
        email: formData.username, // Using username field as email for now, or we can adjust the form
        password: formData.pin,
        redirect: false
      })

      if (result?.error) {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)

        if (newAttempts >= 5) {
          setLockoutTime(300) // 5 minutes lockout
          setError('Too many failed attempts. Account locked for 5 minutes.')
        } else {
          setError(`Invalid credentials. ${5 - newAttempts} attempts remaining.`)
        }
      } else {
        // Successful login
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStep('otp')
    } catch (err) {
      setError('Failed to send reset code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpVerify = async (otp: string) => {
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (otp === '123456') {
        alert('OTP verified! Redirect to PIN reset form.')
        setStep('login')
      } else {
        setError('Invalid verification code.')
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isLocked = lockoutTime > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
            <span className="text-3xl">{tenant?.logo || '🕌'}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {tenant?.name || 'Madrasah Management'}
            </h1>
            <p className="text-muted-foreground">Secure Access Portal</p>
          </div>
        </div>

        {/* Main Card */}
        <Card className="rounded-xl shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              {step === 'login' && <Lock className="w-5 h-5" />}
              {step === 'reset' && <Shield className="w-5 h-5" />}
              {step === 'otp' && <Smartphone className="w-5 h-5" />}

              {step === 'login' && 'Sign In'}
              {step === 'reset' && 'Reset PIN'}
              {step === 'otp' && 'Verification'}
            </CardTitle>
            <CardDescription>
              {step === 'login' && 'Enter your credentials to access the system'}
              {step === 'reset' && 'Enter your username to reset your PIN'}
              {step === 'otp' && 'Enter the verification code sent to you'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="rounded-md">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isLocked && (
              <Alert className="rounded-md border-orange-200 bg-orange-50">
                <Clock className="w-4 h-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  Account locked. Try again in {Math.floor(lockoutTime / 60)}:
                  {(lockoutTime % 60).toString().padStart(2, '0')}
                </AlertDescription>
              </Alert>
            )}

            {step === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username">Email / Username</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="pl-10 rounded-md"
                      placeholder="Enter your email"
                      disabled={loading || isLocked}
                      required
                    />
                  </div>
                </div>

                <PinInput
                  value={formData.pin}
                  onChange={(pin) => setFormData({ ...formData, pin })}
                  disabled={loading || isLocked}
                  error={error && attempts > 0 ? '' : undefined}
                />

                <Button
                  type="submit"
                  className="w-full rounded-md"
                  disabled={loading || isLocked || !formData.username || formData.pin.length !== 6}
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4 mr-2" />
                  )}
                  Sign In
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep('reset')}
                    disabled={loading}
                    className="rounded-md text-primary"
                  >
                    Forgot your PIN?
                  </Button>
                </div>
              </form>
            )}

            {step === 'reset' && (
              <form onSubmit={handleResetRequest} className="space-y-4">
                <div>
                  <Label htmlFor="reset-username">Username</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="reset-username"
                      type="text"
                      value={formData.resetUsername}
                      onChange={(e) => setFormData({ ...formData, resetUsername: e.target.value })}
                      className="pl-10 rounded-md"
                      placeholder="Enter your username"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('login')}
                    disabled={loading}
                    className="flex-1 rounded-md"
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading || !formData.resetUsername}
                    className="flex-1 rounded-md"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4 mr-2" />
                    )}
                    Send Code
                  </Button>
                </div>
              </form>
            )}

            {step === 'otp' && (
              <OtpVerification
                phone="+44 20 1234 5678"
                email="user@example.com"
                onVerify={handleOtpVerify}
                onBack={() => setStep('reset')}
                loading={loading}
              />
            )}
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="rounded-xl bg-muted/50 border-dashed">
          <CardContent className="p-4">
            <h4 className="font-medium text-sm mb-2">Demo Credentials:</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div><strong>Super Admin:</strong> username: <code>admin</code>, PIN: <code>123456</code></div>
              <div><strong>Principal:</strong> username: <code>principal</code>, PIN: <code>123456</code></div>
              <div><strong>Teacher:</strong> username: <code>teacher1</code>, PIN: <code>123456</code></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
