import { useToast } from '@/hooks/use-toast';

export function useKeyboardClipboard() {
  const { toast } = useToast();

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
      return true;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
      return false;
    }
  };

  const pasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      toast({
        title: "Pasted!",
        description: "Text pasted from clipboard",
      });
      return text;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to paste text",
        variant: "destructive",
      });
      return null;
    }
  };

  return { copyText, pasteText };
}