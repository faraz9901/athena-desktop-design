import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
import { LoaderButton } from "@/components/ui/loader-button";
import { cn, onError } from "@/lib/utils";
import { toast } from "sonner";
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
                    toast.success("OTP sent successfully");
                    setStep("otp");
                },
                onError: onError
            }
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md shadow-xl pt-0 rounded-xl overflow-hidden">
                <CardHeader className={cn(" text-primary px-8 pt-8", step === "otp" ? "pb-0" : "pb-4")}>
                    <h1 className="text-3xl font-bold">Welcome to E-Thekedar</h1>
                    <p className="text-sm text-muted-foreground">
                        {step === "mobile" && "We will send an OTP to this number for verification."}
                        {step === "otp" && "Please enter the OTP sent to your mobile number."}
                    </p>
                </CardHeader>

                <CardContent className="">
                    {step === "mobile" && (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="mobileNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium">Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="9876543210" {...field} />
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
                                    Get OTP
                                </LoaderButton>
                            </form>
                        </Form>
                    )}

                    {step === "otp" && (
                        <OtpForm
                            mobileNumber={mobileNumber}
                            onSuccess={() => navigate("/")}
                            onBack={() => setStep("mobile")}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
