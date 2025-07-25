import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, CheckCircle, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const RoleTraining = () => {
  const navigate = useNavigate();
  const { roleId } = useParams();

  // Mock data for role training (randomized for digital-based content)
  const roleData = {
    title: "Content Creator Training",
    description: "Master digital content production, publishing, and analytics to boost your online presence.",
    progress: 60,
    sops: [
      {
        id: "sop1",
        title: "SEO Optimization Best Practices",
        status: "completed",
      },
      {
        id: "sop2",
        title: "Social Media Scheduling Tools",
        status: "completed",
      },
      {
        id: "sop3",
        title: "Engagement Analytics Overview",
        status: "in-progress",
      },
      {
        id: "sop4",
        title: "Video Content Editing Workflow",
        status: "not-started",
      },
    ],
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Play className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      default:
        return "Not Started";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate("/employee-dashboard")} className="text-blue-700 hover:bg-blue-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-blue-900">{roleData.title}</h1>
                <p className="text-sm text-blue-600">{roleData.description}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-blue-600 mb-1">Progress</div>
              <div className="text-2xl font-bold text-blue-600">{roleData.progress}%</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Overview */}
        <Card className="mb-6 border-blue-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-800">Overall Progress</span>
                <span className="text-sm text-blue-600">{roleData.progress}%</span>
              </div>
              <Progress value={roleData.progress} className="w-full [&>div]:bg-blue-600" />
            </div>
            <p className="text-sm text-blue-600">
              Complete all SOP's to finish your {roleData.title} training
            </p>
          </CardContent>
        </Card>

        {/* SOP List */}
        <Card className="border-blue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-blue-900">Training Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roleData.sops.map((sop, index) => (
                <div key={sop.id} className="flex items-center justify-between p-4 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow bg-blue-50/30">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(sop.status)}
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-900">{sop.title}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(sop.status)}`}>
                          {getStatusText(sop.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {sop.status === "completed" ? (
                      <Button variant="outline" size="sm" onClick={() => navigate(`/sop-viewer/${sop.id}`)} className="border-blue-200 text-blue-700 hover:bg-blue-50">
                        Review
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => navigate(`/sop-viewer/${sop.id}`)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {sop.status === "in-progress" ? "Continue" : "Start"}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleTraining;
