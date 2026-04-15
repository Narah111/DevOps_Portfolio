output "api_url" {
  description = "The URL of the API Gateway"
  value       = "${aws_api_gateway_deployment.api_deployment.invoke_url}/bugs"
}

output "frontend_url" {
  description = "The URL of the frontend (CloudFront)"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}