import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function ErrorDialog({
  isOpen,
  onClose,
  title = "Erro!",
  message = "Ocorreu um erro durante a operação."
}: ErrorDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {message}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}