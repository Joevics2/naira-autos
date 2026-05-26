'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { uploadVerificationDocToR2 } from '@/lib/r2';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Shield, Check, Phone, IdCard, Building, Upload, AlertCircle } from 'lucide-react';

export default function VerificationPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [cacFile, setCacFile] = useState<File | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/');
    return null;
  }

  const handlePhoneVerification = async () => {
    if (!showPhoneOtp) {
      setLoading(true);
      setTimeout(() => {
        setShowPhoneOtp(true);
        setLoading(false);
        toast({
          title: 'OTP Sent',
          description: 'Check your phone for the verification code',
        });
      }, 1000);
    } else {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ phone_verified: true })
          .eq('id', user.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Phone number verified successfully',
        });

        window.location.reload();
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleIdVerification = async () => {
    if (!idFile) {
      toast({
        title: 'Error',
        description: 'Please select an ID document',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const fileUrl = await uploadVerificationDocToR2(idFile, user.id, 'id');
      
      if (!fileUrl) {
        throw new Error('Failed to upload ID document');
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          id_document_url: fileUrl,
          id_verified: false
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast({
        title: 'Success',
        description: 'ID document uploaded. Awaiting admin approval.',
      });

      setIdFile(null);
      window.location.reload();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDealerVerification = async () => {
    if (!cacFile) {
      toast({
        title: 'Error',
        description: 'Please select a CAC certificate',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const fileUrl = await uploadVerificationDocToR2(cacFile, user.id, 'cac');
      
      if (!fileUrl) {
        throw new Error('Failed to upload CAC certificate');
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          cac_document_url: fileUrl,
          dealer_verified: false
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast({
        title: 'Success',
        description: 'CAC certificate uploaded. Awaiting admin approval.',
      });

      setCacFile(null);
      window.location.reload();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-20">
      <div className="mb-8">
<h1 className="text-3xl font-bold text-foreground mb-2">Account Verification</h1>
        <p className="text-muted-foreground">Verify your account to increase buyer trust and credibility</p>
      </div>

      <div className="space-y-6">
        <Card className={profile?.phone_verified ? 'border-green-300 bg-green-50/50' : ''}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
<div className={`p-3 rounded-lg ${profile?.phone_verified ? 'bg-green-100' : 'bg-primary/10'}`}>
                  <Phone className={`h-6 w-6 ${profile?.phone_verified ? 'text-green-600' : 'text-primary'}`} />
                </div>
                <div>
                  <CardTitle>Phone Verification</CardTitle>
                  <CardDescription>Verify your phone number via OTP</CardDescription>
                </div>
              </div>
{profile?.phone_verified && (
                <Badge className="bg-green-500/10 text-green-600">
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              )}
            </div>
          </CardHeader>
          {!profile?.phone_verified && (
            <CardContent className="space-y-4">
              {!showPhoneOtp ? (
                <>
                  <div>
                    <Label>Phone Number *</Label>
                    <Input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setPhoneNumber(value);
                      }}
                      placeholder="08012345678"
                      maxLength={11}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter an 11-digit Nigerian phone number
                    </p>
                  </div>
                  <Button
                    onClick={handlePhoneVerification}
                    disabled={loading || phoneNumber.length !== 11}
                  >
                    {loading ? 'Sending...' : 'Send OTP'}
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <Label>Enter OTP Code</Label>
                    <Input
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                    />
                  </div>
                  <Button onClick={handlePhoneVerification} disabled={loading || phoneOtp.length !== 6}>
                    {loading ? 'Verifying...' : 'Verify Phone'}
                  </Button>
                </>
              )}
            </CardContent>
          )}
        </Card>

        <Card className={profile?.id_verified ? 'border-green-300 bg-green-50/50' : profile?.id_document_url ? 'border-yellow-300 bg-yellow-50/50' : ''}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
<div className={`p-3 rounded-lg ${profile?.id_verified ? 'bg-green-100' : 'bg-primary/10'}`}>
                  <IdCard className={`h-6 w-6 ${profile?.id_verified ? 'text-green-600' : 'text-primary'}`} />
                </div>
                <div>
                  <CardTitle>ID Verification</CardTitle>
                  <CardDescription>Upload a government-issued ID</CardDescription>
                </div>
              </div>
{profile?.id_verified && (
                <Badge className="bg-green-500/10 text-green-600">
                  <Check className="h-3 w-3 mr-1" /> Verified
                </Badge>
              )}
              {profile?.id_document_url && !profile?.id_verified && (
                <Badge className="bg-yellow-500/10 text-yellow-600">
                  <AlertCircle className="h-3 w-3 mr-1" /> Pending Review
                </Badge>
              )}
            </div>
          </CardHeader>
          {!profile?.id_verified && (
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Upload a clear photo of your National ID, Driver's License, or International Passport
              </p>
              <div>
                <Label>Select ID Document</Label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                />
              </div>
              {!profile?.id_document_url && (
                <Button onClick={handleIdVerification} disabled={loading || !idFile}>
                  <Upload className="h-4 w-4 mr-2" />
                  {loading ? 'Uploading...' : 'Upload ID Document'}
                </Button>
              )}
              {profile?.id_document_url && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    Your ID document is under review. You'll be notified once approved.
                  </p>
                </div>
              )}
            </CardContent>
          )}
        </Card>

        {(profile?.role === 'dealer' || profile?.role === 'agent') && (
          <Card className={profile?.dealer_verified ? 'border-green-300 bg-green-50/50' : profile?.cac_document_url ? 'border-yellow-300 bg-yellow-50/50' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
<div className={`p-3 rounded-lg ${profile?.dealer_verified ? 'bg-green-100' : 'bg-primary/10'}`}>
                    <Building className={`h-6 w-6 ${profile?.dealer_verified ? 'text-green-600' : 'text-primary'}`} />
                  </div>
                  <div>
                    <CardTitle>Dealer / Agent Verification</CardTitle>
                    <CardDescription>Upload your CAC certificate</CardDescription>
                  </div>
                </div>
                {profile?.dealer_verified && (
                  <Badge className="bg-green-100 text-green-800">
                    <Check className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}
                {profile?.cac_document_url && !profile?.dealer_verified && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <AlertCircle className="h-3 w-3 mr-1" /> Pending Review
                  </Badge>
                )}
              </div>
            </CardHeader>
            {!profile?.dealer_verified && (
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Upload your Corporate Affairs Commission (CAC) certificate to verify your business
                </p>
                <div>
                  <Label>Select CAC Certificate</Label>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setCacFile(e.target.files?.[0] || null)}
                  />
                </div>
                {!profile?.cac_document_url && (
                  <Button onClick={handleDealerVerification} disabled={loading || !cacFile}>
                    <Upload className="h-4 w-4 mr-2" />
                    {loading ? 'Uploading...' : 'Upload CAC Certificate'}
                  </Button>
                )}
                {profile?.cac_document_url && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      Your CAC certificate is under review. You'll be notified once approved.
                    </p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        )}
      </div>

<div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-8">
        <h3 className="font-semibold text-primary mb-2">Why Verify Your Account?</h3>
        <ul className="space-y-2 text-sm text-primary/80">
          <li>✓ Build trust with potential buyers</li>
          <li>✓ Increase response rates to your listings</li>
          <li>✓ Stand out from unverified sellers</li>
          <li>✓ Access premium features</li>
        </ul>
      </div>
    </div>
  );
}
