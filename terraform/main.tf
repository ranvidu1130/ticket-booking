provider "aws" {
  region = "us-east-2"
}

# Security Group
resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh"
  description = "Allow SSH, App Ports"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_app_ports"
  }
}

# Temporary Builder VM
resource "aws_instance" "docker_vm" {
  ami           = "ami-0b9064170e32bde34" # Ubuntu 22.04 (us-east-2)
  instance_type = "t3.small"
  key_name      = "ranvidu"

  vpc_security_group_ids = [aws_security_group.allow_ssh.id]

  tags = {
    Name = "docker-builder"
  }
}
