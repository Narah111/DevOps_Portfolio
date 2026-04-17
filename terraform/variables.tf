variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "eu-north-1"
}

variable "project_name" {
  description = "Name prefix for all resources"
  type        = string
  default     = "bug-tracker"
}

variable "github_username" {
  description = "Your GitHub username"
  type        = string
  default     = "Narah111"
}

variable "github_repo" {
  description = "Your GitHub repository name"
  type        = string
  default     = "DevOps_Portfolio"
}