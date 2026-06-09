"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const SendOtp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await fetch(`${BASE_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setIsOtpSent(true);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "OTP verification failed.");
        return;
      }

      // Pass email forward via URL parameters instead of routing state
      router.push(`/admin/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            {isOtpSent ? "Verify your email" : "Forgot password"}
          </CardTitle>
          <CardDescription>
            {isOtpSent
              ? `We sent a code to ${email}`
              : "Enter your email to receive a verification code"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}
            className="space-y-4"
          >
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email-address">Email address</Label>
              <Input
                id="email-address"
                type="email"
                placeholder="you@example.com"
                required
                disabled={isOtpSent}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={isOtpSent ? "bg-muted text-muted-foreground" : ""}
              />
            </div>

            {isOtpSent && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto p-0 text-xs"
                    onClick={handleSendOtp}
                  >
                    Resend Code
                  </Button>
                </div>
                <Input
                  id="otp"
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="text-center text-xl font-semibold tracking-widest"
                  placeholder="••••••"
                />
              </div>
            )}

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Please wait…" : isOtpSent ? "Verify OTP" : "Send OTP"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Link
            href="/admin"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SendOtp;
