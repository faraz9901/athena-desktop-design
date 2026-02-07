import { zodResolver } from "@hookform/resolvers/zod";
import { HardHat } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { LoaderButton } from "@/components/ui/loader-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OtpForm } from "../components/OtpForm";
import { useSendOtp } from "../hooks/useAuth";
import { mobileSchema, type MobileFormValues } from "../schemas/auth.schemas";



const LoginPage = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [step, setStep] = useState<"mobile" | "otp">("mobile");

    const sendOtpMutation = useSendOtp();
    const navigate = useNavigate();

    const form = useForm<MobileFormValues>({
        resolver: zodResolver(mobileSchema),
        defaultValues: {
            mobileNumber: "",
        },
    });

    const onSubmit = (values: MobileFormValues) => {
        sendOtpMutation.mutate(
            { mobileNumber: values.mobileNumber },
            {
                onSuccess: () => {
                    setMobileNumber(values.mobileNumber);
                    setStep("otp");
                },
            }
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md shadow-xl pt-0 rounded-xl overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground text-center p-8">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
                        <HardHat className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-sm text-primary-foreground/80">
                        Login with your mobile number
                    </p>
                </CardHeader>

                <CardContent className="p-8">
                    {step === "mobile" && (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="mobileNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+919876543210" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <LoaderButton
                                    type="submit"
                                    className="w-full"
                                    isLoading={sendOtpMutation.isPending}
                                    loadingText="Sending OTP..."
                                >
                                    Send OTP
                                </LoaderButton>
                            </form>
                        </Form>
                    )}

                    {step === "otp" && (
                        <OtpForm
                            mobileNumber={mobileNumber}
                            onSuccess={() => navigate("/")}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
