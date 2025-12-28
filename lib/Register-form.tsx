"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";

interface RegisterForm {
  firstName: string;
  lastName: string;
  age: number | undefined;
  email: string;
  password: string;
  confirmPassword: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  skills: Array<{
    name: string;
    id: string;
    level: "beginner" | "intermediate" | "expert";
  }>;
  acceptTerms: boolean;
}

const defaultValues: RegisterForm = {
  firstName: "",
  lastName: "",
  age: undefined,
  email: "",
  password: "",
  confirmPassword: "",
  address: { street: "", city: "", state: "", zipCode: "" },
  skills: [],
  acceptTerms: false,
};

const formScheam = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
});

export default function RegisterForm() {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: formScheam,
    },
    onSubmit: async ({ value }) => {
      await new Promise((r) => setTimeout(r, 1000));
      form.state.isValid
        ? toast.success("Registered successfully!")
        : toast.error("Failed to register.");
    },
  });

  return (
    <Card className="w-full max-w-md ">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Please fill in the form to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <FieldGroup>
            <form.Field name="firstName">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                    <Input
                      type="text"
                      id={Field.name}
                      placeholder="first Name"
                      arial-invalid={isInvalid}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner /> Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                  {}
                </Button>
                <Button
                  type="reset"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    form.reset();
                  }}
                >
                  Reset
                </Button>
              </>
            )}
          ></form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
