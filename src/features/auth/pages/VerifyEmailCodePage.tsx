import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

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
import { useVerifyEmailVerification } from "../hooks/useAuth";
import { emailCodeSchema, type EmailCodeFormValues } from "../schemas/auth.schemas";

const EMAIL_STORAGE_KEY = "emailForVerification";

const VerifyEmailCodePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verifyEmailVerificationMutation = useVerifyEmailVerification();

  const emailFromUrl = searchParams.get("email");

  const email = useMemo(() => {
    if (emailFromUrl) return emailFromUrl;
    const stored = localStorage.getItem(EMAIL_STORAGE_KEY);
    return stored ?? "";
  }, [emailFromUrl]);

  useEffect(() => {
    if (!email) {
      toast.error("No email found for verification. Please enter your email again.");
      navigate("/verify-email", { replace: true });
    }
  }, [email, navigate]);

  const form = useForm<EmailCodeFormValues>({
    resolver: zodResolver(emailCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: EmailCodeFormValues) => {
    if (!email) return;

    verifyEmailVerificationMutation.mutate(
      { email, code: values.code },
      {
        onSuccess: () => {
          toast.success("Email verified successfully");
          localStorage.removeItem(EMAIL_STORAGE_KEY);
          navigate("/", { replace: true });
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl pt-0 rounded-xl overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground text-center p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Enter verification code</h1>
          <p className="text-sm text-primary-foreground/80">
            We sent a 6-digit code to your email. Enter it below to verify.
          </p>
        </CardHeader>

        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification code</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={6}
                        placeholder="••••••"
                        className="text-center tracking-[0.4em]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoaderButton
                type="submit"
                className="w-full"
                isLoading={verifyEmailVerificationMutation.isPending}
                loadingText="Verifying email..."
              >
                Verify email
              </LoaderButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailCodePage;
