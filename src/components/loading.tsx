import { Ring } from "@uiball/loaders";
import { memo } from "react";

interface LoadingProps {
  text?: string;
}

const Loading = memo((props: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <span>{props.text || "Loading..."}</span>
      <div>
        <Ring size={25} color="#22c55e" />
      </div>
    </div>
  );
});

Loading.displayName = "Loading";

export default Loading;
