"use client";
import React, { useState } from "react";
import { FileIcon } from "lucide-react";
import { toast } from "sonner";

interface MediaUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  disabled?: boolean;
  required?: boolean;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  onFileSelect,
  accept = ".jpg,.jpeg,.png,.mp4",
  disabled = false,
  required = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must not exceed 5MB.");
        ("File size must not exceed 5MB.");
        return;
      }

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPG, PNG, are allowed.");
        return;
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onFileSelect(file);
    }
  };


  return (
    <div
      className={`border-2 border-dashed border-[#174D4F] rounded-xl text-center transition-colors overflow-hidden
        ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-300" : "hover:border-gray-400 cursor-pointer"}
        ${previewUrl ? "h-52" : "p-10"}
      `}
      style={
        previewUrl
          ? {
            backgroundImage: `url(${previewUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
          : {}
      }
    >
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="media-upload"
        accept={accept}
        required={required}
        disabled={disabled}
      />

      {!previewUrl && (
        <label
          htmlFor="media-upload"
          className={`flex flex-col items-center justify-center gap-3 ${disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
        >
          <FileIcon className="w-12 h-12 text-[#174D4F]" />
          <span
            className={`text-sm sm:text-base font-medium ${disabled ? "text-gray-400" : "text-teal-600"
              }`}
          >
            Upload Image
          </span>
          <p className="text-xs text-gray-500">PNG or JPEG (2 mb max)</p>
        </label>
      )}
    </div>
  );
};

export default MediaUpload;
