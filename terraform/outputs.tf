output "api_url" {
  description = "The URL of the API Gateway"
  value       = "${aws_api_gateway_stage.prod.invoke_url}/bugs"
}

output "frontend_url" {
  description = "The URL of the frontend"
  value       = "https://www.bugtracker.se"
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

output "cognito_user_pool_id" {
  description = "The ID of the Cognito User Pool"
  value       = aws_cognito_user_pool.main.id
}

output "cognito_client_id" {
  description = "The ID of the Cognito App Client"
  value       = aws_cognito_user_pool_client.main.id
}