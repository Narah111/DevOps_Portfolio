# Create the REST API
resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.project_name}-api"
  description = "Bug Tracker API"

  tags = {
    Project = var.project_name
  }
}

# /bugs resource
resource "aws_api_gateway_resource" "bugs" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "bugs"
}

# /bugs/{id} resource
resource "aws_api_gateway_resource" "bug_id" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.bugs.id
  path_part   = "{id}"
}

# Allow all HTTP methods on /bugs
resource "aws_api_gateway_method" "bugs_method" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.bugs.id
  http_method   = "ANY"
  authorization = "NONE"
}

# Allow all HTTP methods on /bugs/{id}
resource "aws_api_gateway_method" "bug_id_method" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.bug_id.id
  http_method   = "ANY"
  authorization = "NONE"
}

# Connect /bugs to Lambda
resource "aws_api_gateway_integration" "bugs_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.bugs.id
  http_method             = aws_api_gateway_method.bugs_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.bug_tracker.invoke_arn
}

# Connect /bugs/{id} to Lambda
resource "aws_api_gateway_integration" "bug_id_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.bug_id.id
  http_method             = aws_api_gateway_method.bug_id_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.bug_tracker.invoke_arn
}

# Deploy the API
resource "aws_api_gateway_deployment" "api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  depends_on = [
    aws_api_gateway_integration.bugs_integration,
    aws_api_gateway_integration.bug_id_integration
  ]
}

# Create a stage called "prod"
resource "aws_api_gateway_stage" "prod" {
  deployment_id = aws_api_gateway_deployment.api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = "prod"
}

# Allow API Gateway to invoke Lambda
resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.bug_tracker.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}