# Create the REST API
resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.project_name}-api"
  description = "Bug Tracker API"

  tags = {
    Project = var.project_name
  }
}

# /auth resource
resource "aws_api_gateway_resource" "auth" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "auth"
}

# /auth/{proxy+} - catches all auth routes
resource "aws_api_gateway_resource" "auth_proxy" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.auth.id
  path_part   = "{proxy+}"
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

# Allow all HTTP methods on /auth/{proxy+}
resource "aws_api_gateway_method" "auth_proxy_method" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.auth_proxy.id
  http_method   = "ANY"
  authorization = "NONE"
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

# Connect /auth/{proxy+} to Lambda
resource "aws_api_gateway_integration" "auth_proxy_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.auth_proxy.id
  http_method             = aws_api_gateway_method.auth_proxy_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.bug_tracker.invoke_arn
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

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.auth.id,
      aws_api_gateway_resource.auth_proxy.id,
      aws_api_gateway_resource.bugs.id,
      aws_api_gateway_resource.bug_id.id,
      aws_api_gateway_method.auth_proxy_method.id,
      aws_api_gateway_method.bugs_method.id,
      aws_api_gateway_method.bug_id_method.id,
    ]))
  }

  depends_on = [
    aws_api_gateway_integration.auth_proxy_integration,
    aws_api_gateway_integration.bugs_integration,
    aws_api_gateway_integration.bug_id_integration
  ]

  lifecycle {
    create_before_destroy = true
  }
}

# Create a stage "prod"
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