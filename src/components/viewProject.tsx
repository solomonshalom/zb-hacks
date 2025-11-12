import { Button, ExternalLink, Input, Modal } from "@/ui";
import { ButtonStyles } from "@/ui/button";
import { FrameSimple } from "@/ui/icons";

interface ViewProjectProps {
  title: string;
  description: string;
  project_url: string;
  launch_post_url?: string;
  video_url?: string;
  joining_type: string;
}

const ViewProject = (props: ViewProjectProps) => {
  return (
    <Modal
      btn={<Button icon={<FrameSimple width={14} />}>View</Button>}
      title={props.title}
    >
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="w-full border-b border-neutral-800 pb-3">
          <p>{props.description}</p>
        </div>
        <div className="w-full">
          <label className="text-sm text-gray-400">Joining Type:</label>
          <p className="capitalize">{props.joining_type}</p>
        </div>
        <div className="w-full">
          <label className="text-sm text-gray-400">Project URL:</label>
          <Input value={props.project_url} disabled />
          <ExternalLink
            href={props.project_url}
            className={`mt-2 w-full ${ButtonStyles}`}
          >
            <div className="flex w-full items-center justify-center space-x-2">
              <span>View Project</span>
            </div>
          </ExternalLink>
        </div>
        {props.launch_post_url && (
          <div className="w-full">
            <label className="text-sm text-gray-400">Launch Post URL:</label>
            <Input value={props.launch_post_url} disabled />
            <ExternalLink
              href={props.launch_post_url}
              className={`mt-2 w-full ${ButtonStyles}`}
            >
              <div className="flex w-full items-center justify-center space-x-2">
                <span>View Launch Post</span>
              </div>
            </ExternalLink>
          </div>
        )}
        {props.video_url && (
          <div className="w-full">
            <label className="text-sm text-gray-400">Video URL:</label>
            <Input value={props.video_url} disabled />
            <ExternalLink
              href={props.video_url}
              className={`mt-2 w-full ${ButtonStyles}`}
            >
              <div className="flex w-full items-center justify-center space-x-2">
                <span>Watch Video</span>
              </div>
            </ExternalLink>
          </div>
        )}
        <p className="text-gray-400">
          The links you see above do not belong to Zerobase
          and may not be secure.
        </p>
      </div>
    </Modal>
  );
};

export default ViewProject;
