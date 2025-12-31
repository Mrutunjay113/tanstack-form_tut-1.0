"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z, { check } from "zod";
import { fi } from "zod/locales";
import { isValid } from "zod/v3";

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
  skills: [
    { name: "HTML", id: crypto.randomUUID(), level: "beginner" },

    { name: "CSS", id: crypto.randomUUID(), level: "beginner" },
    { name: "JavaScript", id: crypto.randomUUID(), level: "beginner" },
  ],
  acceptTerms: false,
};

const formScheam = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  // acceptTeerms: z.boolean().refine((val) => val === true, {
  //   message: "You must accept the terms and conditions",
  // }),
});

export default function RegisterForm() {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: formScheam,
    },
    onSubmit: async ({ value }) => {
      await new Promise((r) => setTimeout(r, 1000));
      console.log("Form Values:", value);
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
                      name={Field.name}
                      placeholder="First Name"
                      arial-invalid={isInvalid ? "true" : "false"}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError>{field.state.meta.errors}</FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="lastName">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                    <Input
                      type="text"
                      id={Field.name}
                      name={Field.name}
                      placeholder="Last Name"
                      arial-invalid={isInvalid ? "true" : "false"}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError>{field.state.meta.errors}</FieldError>
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* <form.Field name="address.street">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Street Address</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    placeholder="Street Address"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </Field>
              )}
            </form.Field> */}

            {/* Skills Array Field */}
            {/* <form.Field name="skills" mode="array">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Skills</FieldLabel>

                  <span>
                    <Button
                      type="button"
                      variant="outline"
                      size={"icon-sm"}
                      onClick={() =>
                        field.pushValue({
                          name: "New Skill",
                          id: crypto.randomUUID(),
                          level: "beginner",
                        })
                      }
                    >
                      +
                    </Button>
                  </span>
                  <div className="flex flex-col gap-1">
                    {field.state.value.map((skill, index) => (
                      <div key={skill.id} className="flex items-center gap-2">
                        <span key={skill.id}>{skill.name}</span>
                        <form.Field name={`skills[${index}].level`}>
                          {(subField) => (
                            <select
                              value={subField.state.value}
                              onBlur={subField.handleBlur}
                              onChange={(e) => {
                                subField.handleChange(e.target.value as any);
                              }}
                              className="border p-1 rounded "
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="expert">Expert</option>
                            </select>
                          )}
                        </form.Field>

                        <Button
                          type="button"
                          variant="outline"
                          size={"icon-sm"}
                          onClick={() => field.removeValue(index)}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>
                </Field>
              )}
            </form.Field> */}

            <form.Field name="acceptTerms">
              {(field) => (
                <Field>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="terms"
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.handleChange(true);
                        }
                      }}
                    />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                  {!field.state.meta.isValid && (
                    <FieldError>
                      {field.state.meta.errors.join(", ")}
                    </FieldError>
                  )}
                </Field>
              )}
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
