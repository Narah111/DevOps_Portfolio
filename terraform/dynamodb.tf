# DynamoDB table to store bugs
resource "aws_dynamodb_table" "bugs" {
  name         = "bugs"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Project = var.project_name
  }
}