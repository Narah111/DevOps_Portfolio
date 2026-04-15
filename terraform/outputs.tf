output "api_url" {
  description = "The URL of the API Gateway"
  value       = "${aws_api_gateway_stage.prod.invoke_url}/bugs"
}

output "frontend_url" {
  description = "The URL of the frontend (CloudFront)"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "github_actions_role_arn" {
  description = "The ARN of the IAM role for GitHub Actions"
  value       = aws_iam_role.github_actions.arn
}

output "frontend_bucket_name" {
  description = "The name of the S3 bucket hosting the frontend"
  value       = aws_s3_bucket.frontend.bucket
}

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.frontend.id
}