
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Play } from "lucide-react";

interface VideoUploadSectionProps {
  videoUploaded: boolean;
  onVideoUpload: () => void;
}

export const VideoUploadSection = ({ videoUploaded, onVideoUpload }: VideoUploadSectionProps) => {
  return (
    <Card className="border-blue-200 shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-blue-900">Video Input</CardTitle>
        <CardDescription className="text-blue-600">
          Upload a video file to generate your SOPs
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button
          variant={videoUploaded ? "default" : "outline"}
          className={`h-32 flex-col space-y-2 min-w-64 ${
            videoUploaded 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "border-blue-200 text-blue-700 hover:bg-blue-50"
          }`}
          onClick={onVideoUpload}
        >
          <Upload className="w-8 h-8" />
          <span>Upload Video File</span>
          <span className="text-xs">Drag & drop or browse</span>
        </Button>
      </CardContent>
      {videoUploaded && (
        <CardContent className="pt-0">
          <div className="p-4 border-2 border-dashed border-blue-300 rounded-lg text-center bg-blue-50/30">
            <Play className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <p className="text-sm text-blue-600">
              Video uploaded successfully! Ready to generate SOP.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

