import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
import { onError } from "@/lib/utils";
import { useVerifyEmailVerification } from "../hooks/useAuth";
import { emailCodeSchema, type EmailCodeFormValues } from "../schemas/auth.schemas";

const EMAIL_STORAGE_KEY = "emailForVerification";

const VerifyEmailCodePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verifyEmailVerificationMutation = useVerifyEmailVerification();

  const emailFromUrl = searchParams.get("email");

  const onBack = () => {
    localStorage.removeItem(EMAIL_STORAGE_KEY);
    navigate("/verify-email", { replace: true });
  };

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
          navigate("/onboarding", { replace: true });
        },
        onError: onError
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-2xl pt-0 rounded-2xl overflow-hidden border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 px-8 pt-8 pb-4 border-b">
          <h1 className="text-3xl text-primary font-bold">Enter verification code</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sent to <span className="font-semibold text-foreground">{email}</span>
          </p>
        </CardHeader>

        <CardContent className="px-8 py-6">
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
                        className="text-center tracking-[0.4em] h-12 text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoaderButton
                type="submit"
                className="w-full h-11"
                isLoading={verifyEmailVerificationMutation.isPending}
                loadingText="Verifying email..."
              >
                Verify email
              </LoaderButton>


              <Button
                type="button"
                className="w-full h-11"
                onClick={onBack}
                variant={"secondary"}
              >
                Back to Email
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailCodePage;
