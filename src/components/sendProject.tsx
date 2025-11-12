import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "@/trpc/api";
import type { TParticipation } from "@/types/participation.type";

import { inputStyles } from "@/ui/input";
import { Alert, Button, Tip } from "@/ui";
import confetti from "canvas-confetti";

interface iSendProject {
  id: string;
  url: string;
  name: string;
  description?: string;
  is_finished: boolean;
}

const SendProject = (hackathonProps: iSendProject) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TParticipation>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { mutate } = api.participation.createParticipation.useMutation({
    onSuccess: () => {
      router.push(`/app`);
      setLoading(false);
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 100,
      });
    },
    onError: () => {
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<TParticipation> = (data) => {
    try {
      setLoading(true);
      mutate({
        title: data.title,
        description: data.description,
        project_url: data.project_url,
        launch_post_url: data.launch_post_url,
        video_url: data.video_url,
        joining_type: data.joining_type,
        hackathon_url: hackathonProps.url,
        hackathon_name: hackathonProps.name,
      });
      toast.success("Your project has been successfully submitted");
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
    {!hackathonProps.is_finished ? (
      <form
      className="flex w-120 flex-col space-y-4 rounded-md border border-neutral-800 p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="border-b border-neutral-800 pb-3">
        <h1 className="text-2xl font-medium">{hackathonProps.name}</h1>
        {hackathonProps.description && (
          <p className="text-gray-400">{hackathonProps.description}</p>
        )}
      </div>
      <div className="mt-4">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          placeholder="Title (max. 50 characters)"
          type="text"
          className={inputStyles}
          {...register("title", {
            required: "Title is required",
            maxLength: {
              value: 50,
              message: "Title must be less than 50 characters",
            },
          })}
        />
        {errors.title && <Alert>{errors.title?.message}</Alert>}
      </div>
      <div className="mt-4">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Description (max. 300 characters)"
          className={inputStyles}
          {...register("description", {
            required: "Description is required",
            maxLength: {
              value: 300,
              message: "Description must be less than 300 characters",
            },
          })}
        />
        {errors.description && <Alert>{errors.description?.message}</Alert>}
      </div>
      <div className="mt-4">
        <label htmlFor="project_url">Project URL:</label>
        <input
          id="project_url"
          className={inputStyles}
          placeholder="https://"
          {...register("project_url", {
            required: "Project URL is required",
            pattern: {
              value: /^(http|https):\/\/[^ "]+$/,
              message: "The url must start with http:// or https://",
            },
          })}
        />
        {errors.project_url && <Alert>{errors.project_url?.message}</Alert>}
      </div>
      <div className="mt-4">
        <label htmlFor="joining_type">How are you joining?</label>
        <select
          id="joining_type"
          className={inputStyles}
          {...register("joining_type", {
            required: "Please select how you are joining",
          })}
        >
          <option value="">Select...</option>
          <option value="in-person">In-person</option>
          <option value="remote">Remote</option>
        </select>
        {errors.joining_type && <Alert>{errors.joining_type?.message}</Alert>}
      </div>
      <div className="mt-4">
        <label htmlFor="launch_post_url">Launch Post URL (optional):</label>
        <input
          id="launch_post_url"
          className={inputStyles}
          placeholder="https://"
          {...register("launch_post_url", {
            pattern: {
              value: /^(http|https):\/\/[^ "]+$/,
              message: "The url must start with http:// or https://",
            },
          })}
        />
        {errors.launch_post_url && <Alert>{errors.launch_post_url?.message}</Alert>}
      </div>
      <div className="mt-4">
        <label htmlFor="video_url">30 Second Video URL (optional):</label>
        <input
          id="video_url"
          className={inputStyles}
          placeholder="https://youtube.com/..."
          {...register("video_url", {
            pattern: {
              value: /^(http|https):\/\/[^ "]+$/,
              message: "The url must start with http:// or https://",
            },
          })}
        />
        {errors.video_url && <Alert>{errors.video_url?.message}</Alert>}
      </div>
      <Button type="submit" loadingstatus={loading}>
        {loading ? "Submitting..." : "Submit Project"}
      </Button>
      <Tip>You can only submit 1 project per hackathon.</Tip>
    </form>
    ) : (
      <div className="flex w-120 flex-col space-y-4 rounded-md border border-neutral-800 p-5">
        <div className="border-b border-neutral-800 pb-3">
          <h1 className="text-2xl font-medium">{hackathonProps.name}</h1>
          {hackathonProps.description && (
            <p className="text-gray-400">{hackathonProps.description}</p>
          )}
          </div>
          <p className="text-gray-400">
            🎉 This hackathon is finished. You can no longer submit projects.
          </p>
        </div>
    )}
    </>
  );
};

export default SendProject;
