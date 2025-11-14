import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "@/trpc/api";
import type { newParticipation } from "@/schema/participation";

import { inputStyles } from "@/ui/input";
import { Alert, Button } from "@/ui";
import confetti from "canvas-confetti";

interface SendProjectProps {
  prefilledEmail?: string;
}

const SendProject = ({ prefilledEmail }: SendProjectProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<newParticipation>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (prefilledEmail) {
      setValue("email", prefilledEmail);
    }
  }, [prefilledEmail, setValue]);

  const { mutate } = api.participation.createParticipation.useMutation({
    onSuccess: () => {
      setLoading(false);
      reset();
      toast.success("Your project has been successfully submitted");
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 100,
      });
      router.push("/wall");
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit: SubmitHandler<newParticipation> = (data) => {
    try {
      setLoading(true);
      mutate(data);
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      className="flex w-full max-w-md flex-col space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mt-4">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Your name"
          type="text"
          className={inputStyles}
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && <Alert>{errors.name?.message}</Alert>}
      </div>
      <div className="mt-4">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="your@email.com"
          type="email"
          className={inputStyles}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <Alert>{errors.email?.message}</Alert>}
      </div>
      <div className="mt-4">
        <label htmlFor="title">Project Title</label>
        <input
          id="title"
          placeholder="Project title (max. 100 characters)"
          type="text"
          className={inputStyles}
          {...register("title", {
            required: "Title is required",
            maxLength: {
              value: 100,
              message: "Title must be less than 100 characters",
            },
          })}
        />
        {errors.title && <Alert>{errors.title?.message}</Alert>}
      </div>
      <div className="mt-4">
        <label htmlFor="oneLiner">One Liner</label>
        <input
          id="oneLiner"
          placeholder="One liner (max. 100 characters)"
          type="text"
          className={inputStyles}
          {...register("oneLiner", {
            required: "One liner is required",
            maxLength: {
              value: 100,
              message: "One liner must be less than 100 characters",
            },
          })}
        />
        {errors.oneLiner && <Alert>{errors.oneLiner?.message}</Alert>}
      </div>
      <div className="mt-4">
        <label htmlFor="link">Link</label>
        <input
          id="link"
          className={inputStyles}
          placeholder="https://"
          {...register("link", {
            required: "Link is required",
            pattern: {
              value: /^(http|https):\/\/[^ "]+$/,
              message: "The url must start with http:// or https://",
            },
          })}
        />
        {errors.link && <Alert>{errors.link?.message}</Alert>}
      </div>
      <div className="mt-4">
        <label htmlFor="results">Results & Achievements</label>
        <textarea
          id="results"
          placeholder="Tell us about your results (e.g., 100 users, features launched, etc.)"
          className={inputStyles + " min-h-[150px]"}
          {...register("results", {
            required: "Results description is required",
          })}
        />
        {errors.results && <Alert>{errors.results?.message}</Alert>}
      </div>
      <Button type="submit" loadingstatus={loading}>
        {loading ? "Submitting..." : "Submit Project"}
      </Button>
    </form>
  );
};

export default SendProject;
