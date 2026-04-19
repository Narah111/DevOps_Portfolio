# Zip the Python code so Lambda can use it
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../lambda"
  output_path = "${path.module}/../lambda.zip"
  excludes    = ["lambda.zip", "__pycache__"]
}

# The Lambda function itself
resource "aws_lambda_function" "bug_tracker" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = "${var.project_name}-function"
  role             = aws_iam_role.lambda_role.arn
  handler          = "handler.lambda_handler"
  runtime          = "python3.12"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  environment {
    variables = {
      TABLE_NAME        = aws_dynamodb_table.bugs.name
      USER_POOL_ID      = aws_cognito_user_pool.main.id
      CLIENT_ID         = aws_cognito_user_pool_client.main.id
      FRONTEND_URL      = "https://${aws_cloudfront_distribution.frontend.domain_name}"
    }
  }

  tags = {
    Project = var.project_name
  }
}