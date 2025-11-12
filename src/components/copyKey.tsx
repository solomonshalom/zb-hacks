import { Button } from "@/ui";
import { KeyAltPlus } from "@/ui/icons";
import { toast } from "sonner";

interface CopyKeyProps {
  url: string;
  is_finished?: boolean;
}

const CopyKey = (props: CopyKeyProps) => {
  const copyToClipboard = async (txt: string) => {
    if (props.is_finished) {
      toast.error("Cannot copy key for a finished hackathon");
      return;
    }
    
    try {
      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob([txt], { type: "text/plain" }),
      });
      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      await navigator.clipboard.writeText(txt);
    }
    toast.success("Copied successfully");
  };

  return (
    <Button
      icon={<KeyAltPlus width={18} />}
      onClick={() => copyToClipboard(props.url)}
      disabled={props.is_finished}
    >
      {props.is_finished ? "Hackathon Finished" : "Copy key"}
    </Button>
  );
};

export default CopyKey;
