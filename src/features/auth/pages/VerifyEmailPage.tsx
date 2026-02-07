import { zodResolver } from "@hookform/resolvers/zod";
import { MailCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { useAuthState, useSendEmailVerification } from "../hooks/useAuth";
import { emailVerificationSchema, type EmailVerificationFormValues } from "../schemas/auth.schemas";

const EMAIL_STORAGE_KEY = "emailForVerification";

const VerifyEmailPage = () => {
  const { user } = useAuthState();
  const navigate = useNavigate();

  const sendEmailVerificationMutation = useSendEmailVerification();

  const emailForm = useForm<EmailVerificationFormValues>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      name: "",
      email: user?.email ?? "",
    },
  });

  const onSendEmail = (values: EmailVerificationFormValues) => {
    sendEmailVerificationMutation.mutate(
      { name: values.name, email: values.email },
      {
        onSuccess: () => {
          localStorage.setItem(EMAIL_STORAGE_KEY, values.email);
          toast.success("Verification email sent");
          navigate(`/verify-email/code?email=${encodeURIComponent(values.email)}`);
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl pt-0 rounded-xl overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground text-center p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
            <MailCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Verify your email</h1>
          <p className="text-sm text-primary-foreground/80">
            We've sent a verification code to your email address
          </p>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onSendEmail)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoaderButton
                type="submit"
                className="w-full"
                isLoading={sendEmailVerificationMutation.isPending}
                loadingText="Sending verification email..."
              >
                Send verification code
              </LoaderButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
