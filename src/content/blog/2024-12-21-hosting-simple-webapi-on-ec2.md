---
title: Hosting simple API on EC2
description: Deploy a webapi app on EC2 with terraform
pubDate: "12 21 2024"
published: true
authors:
  - truongnhon
tags: [webapi, c#, aws]
---

- [**Cost Breakdown for EC2**](#cost-breakdown-for-ec2)
- [**Example Setup**](#example-setup)
- [**Step 1: Prepare AWS Environment**](#step-1-prepare-aws-environment)
  - [**1.1 Install Terraform**](#11-install-terraform)
  - [**1.2 Configure AWS CLI**](#12-configure-aws-cli)
  - [**1.3 Set Up AWS Resources with Terraform**](#13-set-up-aws-resources-with-terraform)
- [**Step 1.1: Generate the key pem in local**](#step-11-generate-the-key-pem-in-local)
- [**Step 2: SSH into the EC2 Instance**](#step-2-ssh-into-the-ec2-instance)
- [**Step 3: Install NGINX and .NET on CentOS 7 EC2 Instance**](#step-3-install-nginx-and-net-on-centos-7-ec2-instance)
  - [**3.1 Install NGINX**](#31-install-nginx)
  - [**3.2 Install .NET SDK**](#32-install-net-sdk)
- [**Step 5: Set Up Your .NET Web API**](#step-5-set-up-your-net-web-api)
  - [**5.1 Clone the .NET API Repository (if available)**](#51-clone-the-net-api-repository-if-available)
  - [**5.2 Publish and Run the Web API**](#52-publish-and-run-the-web-api)
- [**Step 6: Test the Web API**](#step-6-test-the-web-api)
- [**Step 7: Automate Web API Startup (Optional)**](#step-7-automate-web-api-startup-optional)
- [**Step 8: Clean Up Resources (Optional)**](#step-8-clean-up-resources-optional)
- [Upcoming content](#upcoming-content)


<!--truncate-->

### **Cost Breakdown for EC2**

| **Component**           | **Details**                                   | **Cost (Estimate)**                           |
| ----------------------- | --------------------------------------------- | --------------------------------------------- |
| **EC2 Instance**        | t4g.micro (1 vCPU, 0.5 GiB RAM, ARM-based)    | ~~$0.0104/hour (~~$7.49/month if 24/7 usage). |
|                         | t2.micro (1 vCPU, 1 GiB RAM, x86-based)       | ~~$0.0116/hour (~~$8.35/month if 24/7 usage). |
| **Elastic IP**          | Free when associated with a running instance. | $0.005/hour when idle (~$3.60/month).         |
| **EBS Storage**         | 8 GB General Purpose SSD                      | $0.10/GB/month (~$0.80/month).                |
| **Data Transfer**       | Free for the first 1 GB outbound traffic.     | $0.09/GB after 1 GB.                          |
| **Route 53 (Optional)** | Domain management                             | $0.50/month per hosted zone.                  |

### **Example Setup**

- **Instance Type**: t4g.micro or t2.micro.
- **EBS Storage**: 8 GB GP3.
- **Networking**: Elastic IP (associated), allow HTTP/HTTPS and SSH from specific IPs.
- **Data Transfer**: Within Free Tier (1 GB outbound).
- **OS**: Amazon Linux 2.
- **Logs**: Only application-level logging enabled.

**Final Estimated Cost**: **$8-10/month**, with additional savings possible by running the instance only during active periods.

### **Step 1: Prepare AWS Environment**

Before you can deploy your Web API, you need to set up your AWS environment. We'll be using **Terraform** to automate the creation of the necessary resources.

#### **1.1 Install Terraform**

1. Download and install **Terraform** on your local machine. Follow the instructions from the official Terraform website.

#### **1.2 Configure AWS CLI**

Ensure you have the **AWS CLI** installed and configured on your local machine to allow Terraform to interact with AWS.

1. Install AWS CLI: [AWS CLI Installation](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).

2. Configure AWS CLI:

```bash
aws configure
```

Provide your AWS Access Key ID, Secret Access Key, and region when prompted.

3. Or use environment variables:

```bash
export AWS_ACCESS_KEY_ID="your_access_key_id"
export AWS_SECRET_ACCESS_KEY="your_secret_access_key"
export AWS_DEFAULT_REGION="your_default_region"
```

4. Verify Setup

```bash
aws s3 ls
```

#### **1.3 Set Up AWS Resources with Terraform**

Create a `main.tf` file that will set up your AWS EC2 instance along with security groups, key pair, etc.

Here’s an example `main.tf`:

<details>
<summary>Click to view full code !</summary>

```bash
provider "aws" {
  region = "us-east-1" # Update to your preferred region
}

# Key Pair for EC2
resource "aws_key_pair" "webapi_key" {
  key_name   = "webapi-key"
  public_key = file("~/.ssh/id_rsa.pub") # Replace with your actual public key file
}

# Security Group
resource "aws_security_group" "webapi_sg" {
  name        = "webapi-sg"
  description = "Allow HTTP, HTTPS, and SSH access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Restrict this to your IP for SSH
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance
resource "aws_instance" "webapi_instance" {
  ami           = "ami-0c02fb55956c7d316" # Amazon Linux 2 AMI
  instance_type = "t2.micro"

  key_name      = aws_key_pair.webapi_key.key_name
  security_groups = [aws_security_group.webapi_sg.name]

  user_data = <<-EOF
    #!/bin/bash
    yum update -y
    amazon-linux-extras enable dotnet7
    yum install -y dotnet-sdk-7.0 nginx
    systemctl start nginx
    systemctl enable nginx
  EOF

  tags = {
    Name = "WebAPI-Demo"
  }
}

# Elastic IP for EC2
resource "aws_eip" "webapi_eip" {
  instance = aws_instance.webapi_instance.id
}

# # CloudFront Distribution
# resource "aws_cloudfront_distribution" "webapi_cf" {
#   origin {
#     domain_name = aws_eip.webapi_eip.public_ip # Replace with your actual domain name
#     origin_id   = "webapi-origin"

#     custom_origin_config {
#       http_port              = 80
#       https_port             = 443
#       origin_protocol_policy = "http-only"
#       origin_ssl_protocols     = ["TLSv1.2"]
#     }
#   }

#   enabled             = true
#   is_ipv6_enabled     = true
#   default_root_object = "index.html"

#   default_cache_behavior {
#     target_origin_id       = "webapi-origin"
#     viewer_protocol_policy = "redirect-to-https"

#     allowed_methods = ["GET", "HEAD", "OPTIONS"]
#     cached_methods  = ["GET", "HEAD"]

#     forwarded_values {
#       query_string = false
#       cookies {
#         forward = "none"
#       }
#     }

#     min_ttl     = 0
#     default_ttl = 3600
#     max_ttl     = 86400
#   }

#   restrictions {
#     geo_restriction {
#       restriction_type = "none"
#     }
#   }

#   viewer_certificate {
#     cloudfront_default_certificate = true
#   }

#   tags = {
#     Environment = "Demo"
#   }
# }
```

</details>

1. **Run Terraform Commands**:

```bash
terraform init   # Initialize the Terraform environment
terraform validate # Validate Configuration
terraform apply  # Apply the configuration and create resources
```

2. After the deployment completes, Terraform will output the EC2 instance’s **public IP address**.

---

### **Step 1.1: Generate the key pem in local**

```bash
ssh-keygen -i -f webapi-key.pem > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
```

------

### **Step 2: SSH into the EC2 Instance**

You can now SSH into your EC2 instance using the SSH key generated during the Terraform setup.

1. Use the public IP output by Terraform to SSH into the instance:

```bash
ssh -i ~/.ssh/id_rsa ec2-user@<your-ec2-public-ip>
```

------

### **Step 3: Install NGINX and .NET on CentOS 7 EC2 Instance**

Now that you're inside the EC2 instance, let's install **NGINX**, **.NET SDK**, and set up your environment.

#### **3.1 Install NGINX**

Amazon Linux 2 uses **Amazon Linux Extras** to manage packages like NGINX.

1. Install NGINX:

```bash
sudo amazon-linux-extras install nginx1 -y
# Start and Enable NGINX
sudo systemctl start nginx
sudo systemctl enable nginx
# Verify NGINX Installation
sudo systemctl status nginx
```

2. Start and enable NGINX:

```bash
sudo nano /etc/nginx/conf.d/webapi.conf

server {
    listen 80;
    server_name your-ec2-public-ip;

    location / {
        proxy_pass http://127.0.0.1:5000;  # Change to the port your .NET API is running on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Restart NGINX to Apply the Configuration

```bash
sudo systemctl restart nginx
```

#### **3.2 Install .NET SDK**

1. Install the **.NET SDK** to host the Web API:

```bash
sudo yum install -y dotnet-sdk-8.0  # Install .NET SDK
```

2. Verify the installation:

```bash
dotnet --version
```

------

### **Step 5: Set Up Your .NET Web API**

#### **5.1 Clone the .NET API Repository (if available)**

You can clone your repository (or use a local code deployment if the code is ready).

1. Install **Git** on the EC2 instance if it's not already installed:

```bash
sudo yum install git -y
```

2. Clone your repository:

```bash
git clone https://github.com/yourusername/your-webapi-repo.git
cd your-webapi-repo
```

#### **5.2 Publish and Run the Web API**

1. Publish the Web API to the directory on the EC2 instance:

```bash
dotnet publish -c Release -o /var/www/webapi
```

2. Run the Web API:

```bash
dotnet /var/www/webapi/your-api.dll
```

Ensure it’s running on port 5000.

3. Or Copy publish file from local

```bash
scp -i "your-key.pem" -r /path/to/your/webapi ec2-user@<your-ec2-public-ip>:/var/www/webapi
```

------

### **Step 6: Test the Web API**

After completing all the setup, test the Web API by accessing it via the public IP of your EC2 instance:

```bash
http://<your-ec2-public-ip>/weatherforecast
```

You should see the output of your Web API’s response.

------

### **Step 7: Automate Web API Startup (Optional)**

To ensure your Web API runs even after a reboot, you can set it up as a systemd service.

1. Create a service file for your Web API:

```bash
sudo nano /etc/systemd/system/webapi.service
```

2. Add the following content:

```bash
[Unit]
Description=Web API

[Service]
ExecStart=/usr/bin/dotnet /var/www/webapi/your-api.dll
WorkingDirectory=/var/www/webapi
Restart=always
User=ec2-user

[Install]
WantedBy=multi-user.target
```

3. Enable and start the service:

```bash
sudo systemctl enable webapi
sudo systemctl start webapi
```

------

### **Step 8: Clean Up Resources (Optional)**

After testing, you may want to destroy the AWS resources created by Terraform:

```bash
terraform destroy
```

### Upcoming content

1. Scaling the Web API with Auto Scaling Groups
2. Deploying Multiple Versions of the Web API Using Blue/Green Deployment
3. CI/CD Pipeline with Terraform, AWS, and GitHub Actions
4. Implementing HTTPS with SSL/TLS using Let’s Encrypt
5. Monitoring and Logging with CloudWatch and NGINX
6. Adding API Authentication with JWT
7. Using Amazon RDS for a Database Backend
8. Private Networking with VPC and Subnets
9. Caching with Amazon CloudFront
10. Backup and Disaster Recovery with S3 and EC2 Snapshots
11. Implementing Rate Limiting with API Gateway
12. Integrating with AWS SQS for Asynchronous Processing
