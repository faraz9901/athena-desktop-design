import { HardHat, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSendOtp, useVerifyOtp } from '@/features/auth/useAuth';

const LoginPage = () => {
    const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const sendOtpMutation = useSendOtp();
    const verifyOtpMutation = useVerifyOtp();
    const navigate = useNavigate();

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mobileNumber) return;
        sendOtpMutation.mutate(
            { mobileNumber },
            {
                onSuccess: () => setStep('otp'),
            }
        );
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mobileNumber || !otp) return;
        verifyOtpMutation.mutate(
            { mobileNumber, otp },
            {
                onSuccess: () => {
                    navigate('/');
                },
            }
        );
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="bg-primary p-8 text-center text-primary-foreground">
                    <div className="bg-primary-foreground/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <HardHat className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground/80">Login with your mobile number</p>
                </div>

                <div className="p-8">
                    {step === 'mobile' && (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
                                    placeholder="+919876543210"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={sendOtpMutation.isPending}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                            >
                                {sendOtpMutation.isPending ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    'Send OTP'
                                )}
                            </button>
                        </form>
                    )}

                    {step === 'otp' && (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Enter OTP</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={6}
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground tracking-[0.4em] text-center"
                                    placeholder="••••••"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={verifyOtpMutation.isPending}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                            >
                                {verifyOtpMutation.isPending ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    'Verify OTP'
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Need help?{' '}
                        <Link to="/signup" className="text-primary hover:text-primary/90 font-semibold">
                            Contact support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
