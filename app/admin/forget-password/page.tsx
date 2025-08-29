"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Gamepad2, Loader2, AlertCircle, Mail } from "lucide-react"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [resetError, setResetError] = useState("")
    const [resetSuccess, setResetSuccess] = useState(false)

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!email) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setResetError("")

        if (!validateForm()) return

        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))
            setResetSuccess(true)
        } catch (error) {
            setResetError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (value: string) => {
        setEmail(value)
        if (errors.email) {
            setErrors((prev) => ({ ...prev, email: "" }))
        }
    }

    if (resetSuccess) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center space-y-2">
                        <div className="flex justify-center">
                            <div className="w-12 h-12 bg-gaming-gradient rounded-xl flex items-center justify-center">
                                <Gamepad2 className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">AIEXCH Admin</h1>
                    </div>

                    <Card className="border-accent/20 shadow-lg">
                        <CardContent className="pt-6 text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                                    <Mail className="w-8 h-8 text-accent" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-foreground">Check your email</h2>
                                <p className="text-muted-foreground">
                                    We've sent a password reset link to <strong>{email}</strong>
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Didn't receive the email? Check your spam folder or try again.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href="/admin/login">Back to Login</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full bg-transparent"
                                    onClick={() => {
                                        setResetSuccess(false)
                                        setEmail("")
                                    }}
                                >
                                    Try different email
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <div className="w-12 h-12 bg-gaming-gradient rounded-xl flex items-center justify-center">
                            <Gamepad2 className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">AIEXCH Admin</h1>
                    <p className="text-muted-foreground">Reset your password</p>
                </div>

                {/* Reset Form */}
                <Card className="border-border/50 shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl">Forgot password?</CardTitle>
                        <CardDescription>
                            Enter your email address and we'll send you a link to reset your password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {resetError && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{resetError}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@aiexch.com"
                                    value={email}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    className={errors.email ? "border-destructive" : ""}
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending reset link...
                                    </>
                                ) : (
                                    "Send reset link"
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link href="/admin/login" className="inline-flex items-center text-sm text-primary hover:underline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
