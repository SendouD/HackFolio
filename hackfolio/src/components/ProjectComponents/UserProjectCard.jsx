import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // shadcn Card component

const ProjectCard = ({ project }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex justify-between items-center pt-6">
        <div className="flex items-center flex-grow min-w-0">
          {/* Logo */}
          <img
            src={project.logoUrl} // Assuming the logo URL is part of the project data
            alt={`${project.projectName} logo`}
            className="w-12 h-12 rounded-full mr-4 flex-shrink-0" // Added flex-shrink-0 to prevent logo from shrinking
          />
          <div className="overflow-hidden min-w-0">
            <h3 className="text-xl font-semibold text-violet-900 truncate">{project.projectName}</h3>
            <p className="text-muted-foreground mt-1 truncate">{project.tagline}</p>
          </div>
        </div>
        <span className="bg-gray-100 text-sm px-3 py-1 rounded-full font-medium text-gray-700 ml-2 whitespace-nowrap flex-shrink-0">
          {project.teamName}
        </span>
      </CardContent>
      <CardContent className="mt-4 flex justify-between items-center text-gray-600">
        <div>
          <p className="text-sm">Views: <span className="font-medium">{project.views}</span></p>
          <p className="text-sm">Likes: <span className="font-medium">{project.likes}</span></p>
        </div>
      </CardContent>
      <CardContent className="mt-auto text-xs text-muted-foreground pb-6">
        Last updated: {new Date(project.createdAt).toLocaleDateString()}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;