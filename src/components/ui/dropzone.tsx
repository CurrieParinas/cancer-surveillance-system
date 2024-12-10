import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudUploadIcon, Upload } from 'lucide-react';

// Define the props expected by the Dropzone component
interface DropzoneProps {
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  setLabfile: React.Dispatch<React.SetStateAction<File | null>>;
  resetDropzone: boolean;  // Add the resetDropzone prop
}

// Create the Dropzone component receiving props
function Dropzone({
  onChange,
  className,
  setLabfile, // Receive state setter for labfile
  resetDropzone,
  ...props
}: DropzoneProps) {
  // Initialize state variables using the useState hook
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to file input element
  const [fileInfo, setFileInfo] = useState<string | null>(null); // Information about the uploaded file
  const [error, setError] = useState<string | null>(null); // Error message state

  useEffect(() => {
    if (resetDropzone) {
      setFileInfo("");     // Clear the file information
      setLabfile(null);      // Clear the lab file state
      onChange([]);          // Reset the file list in the parent
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input element
      }
    }
  }, [resetDropzone, setLabfile, onChange]);


  // Function to handle drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Function to handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    handleFiles(files);
  };

  // Function to handle file input change event (modified to set the lab file)
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      handleFiles(files);
    }
  };

  // Function to handle processing of uploaded files
  const handleFiles = (files: FileList) => {
    const uploadedFile = files[0];

    // Check if the file size exceeds 15 MB (15 * 1024 * 1024 bytes)
    if (uploadedFile.size > 15 * 1024 * 1024) {
      setError("File size exceeds the 15 MB limit. Please select a smaller file.");
      setFileInfo(null);  // Clear any previous file info
      return;
    }

    const fileSizeInKB = Math.round(uploadedFile.size / 1024); // Convert to KB

    const fileList = Array.from(files).map((file) => URL.createObjectURL(file));
    onChange((prevFiles) => [...prevFiles, ...fileList]);

    // Set lab file state with the selected file
    setLabfile(uploadedFile);

    // Display file information
    setFileInfo(`Uploaded file: ${uploadedFile.name} (${fileSizeInKB} KB)`);
    setError(null); // Reset error state
  };


  // Function to simulate a click on the file input element
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card
      className={`border rounded-lg bg-muted transition-all duration-200 hover:cursor-pointer hover:border-muted-foreground/70 ${className}`}
      {...props}
    >
      <CardContent
        className="flex flex-col min-h-96 items-center justify-center space-y-4 px-4 py-6 text-sm"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <CloudUploadIcon size={80} strokeWidth={1} className='text-zinc-500' />
        <div className="flex flex-col items-center text-center text-muted-foreground space-y-2">
          <span className="font-semibold text-base">Drag & Drop Files to Upload</span>
          <span className="text-xs text-muted-foreground/70">or</span>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-xs"
            onClick={handleButtonClick}
          >
            <span>Choose Files</span>
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileInputChange}
            className="hidden"
            multiple
          />
        </div>
        {fileInfo && (
          <p className="text-muted-foreground text-sm font-medium">{fileInfo}</p>
        )}
        {error && <span className="text-red-500 text-xs font-medium">{error}</span>}
      </CardContent>
    </Card>
  );
}

export default Dropzone;
