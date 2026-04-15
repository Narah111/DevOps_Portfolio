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
  description = "Narah111"
  type        = string
}

variable "github_repo" {
  description = "DevOps Portfolio"
  type        = string
  default     = "aws-serverless-api"
}