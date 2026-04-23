terraform {
  backend "s3" {
    bucket = "bug-tracker-tfstate-narah111"
    key    = "terraform.tfstate"
    region = "eu-north-1"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "aws"{
  alias  = "us_east_1"
  region = "us-east-1"
}