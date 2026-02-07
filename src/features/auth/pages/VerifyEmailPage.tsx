import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { GoogleIcon } from "@/assets/Icons";
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
        onError: onError
      },
    );
  };

  const onGoogleSignIn = () => {
    toast.info("Google sign-in is not supported yet");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-2xl pt-0 rounded-2xl overflow-hidden border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 px-8 pt-8 pb-4 border-b">
          <h1 className="text-3xl text-primary font-bold">Verify your email</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Required for new accounts.
          </p>
        </CardHeader>

        <CardContent className="px-8 py-6 space-y-6">
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onSendEmail)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" className="h-11" {...field} />
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
                      <Input type="email" placeholder="you@example.com" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoaderButton
                type="submit"
                className="w-full h-11"
                isLoading={sendEmailVerificationMutation.isPending}
                loadingText="Sending verification email..."
              >
                Send verification code
              </LoaderButton>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              onClick={onGoogleSignIn}
              className="w-full h-11 gap-3"
            >
              <GoogleIcon className="fill-primary h-5 w-5 text-primary" />
              Verify with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
