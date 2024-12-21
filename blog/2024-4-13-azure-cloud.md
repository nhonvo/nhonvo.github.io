---
layout:     post
title:      "Azure Exam 1"
subtitle:   "Azure cloud practitioner exam"
date:       2024-4-13 00:00:00
author:     "Truong Nhon"
published: false
hidden: true
catalog: true
tags:
  - azure
---

<!--truncate-->

2. Your users want to sign-in to devices, apps, and services from anywhere. They want to sign-in using an organizational work or school account instead of a personal account. You must ensure corporate assets are protected and that devices meet standards for security and compliance. Specifically, you need to be able to enable or disable a device. What should you do? (1 Point)

a. Enable the device in Azure AD.
b. Join the device to Azure AD.
c. Register the device with Azure AD.

**Correct Answer**: b. Join the device to Azure AD.

3. A dedicated and trusted instance of Azure AD is referred to as: (1 Point)

a. An Azure tenant
b. An Azure identity
c. An Azure account

**Correct Answer**: a. An Azure tenant

4. You are configuring Self-service Password Reset. Which of the following is not a validation method? (1 Point)

a. An email notification.
b. A text or code sent to a user's mobile or office phone
c. A paging service.
d. A set of security questions

**Correct Answer**: c. A paging service.

5. You would like to add a user who has a Microsoft account to your subscription. Which type of user account is this? (1 Point)

a. Cloud identity
b. Directory-Synchronized identity
c. Guest User

**Correct Answer**: c. Guest User

6. If you delete a user account by mistake, can it be restored? (1 Point)

a. When a user account is deleted, it's gone forever and can't be restored.
b. The user account can be restored, but only when it's created within the last 30 days.
c. The user account can be restored, but only when it's deleted within the last 30 days.

**Correct Answer**: c. The user account can be restored, but only when it's deleted within the last 30 days.

7. Your company financial comptroller wants to be notified whenever the company is halfway to spending the money allocated for cloud services. What should you do? (1 Point)

a. Create an Azure reservation.
b. Create a budget and a spending threshold.
c. Create a management group.
d. Enter workloads in the Total Cost of Ownership calculator.

**Correct Answer**: b. Create a budget and a spending threshold.

8. What tool can you use to gain greater visibility into your spending patterns? (1 Point)

a. Cost Insights
b. Cost Analysis
c. Your invoice

**Correct Answer**: b. Cost Analysis

9. Your company is concerned about cost and provisioning too many virtual machines at once. What's the best way to control resource provisioning? (1 Point)

a. Change your subscription to pay as you go.
b. Apply spending limits to the development team's Azure subscription.
c. Verbally give the managers a budget and hold them accountable for overages.

**Correct Answer**: b. Apply spending limits to the development team's Azure subscription.

10. The leadership team wants information on resource costs by departments. What's the best way to categorize costs by department? (1 Point)

a. Apply a tag to each resource that identifies the appropriate billing department.
b. Split the cost evenly between departments.
c. Keep a spreadsheet that lists each team's resources

**Correct Answer**: a. Apply a tag to each resource that identifies the appropriate billing department.

11. An Azure subscription ................................... (1 Point)

a. is a logical container used to provision resources in Azure
b. is associated with a single department or organization
c. represents a single domain

**Correct Answer**: a. is a logical container used to provision resources in Azure

12. Your organization has several Azure policies that they would like to create and enforce for a new branch office. What should you do? (1 Point)

a. Create a policy initiative
b. Create a management group
c. Create a new subscription

**Correct Answer**: b. Create a management group

13. You would like to categorize resources and billing for different departments like IT and HR. The billing needs to be consolidated across multiple resource groups and you need to ensure everyone complies with the solution. You have created tags for each department, like department:HR. What should you do next? (1 Point)

a. Create a billing group for each department
b. Create an Azure policy
c. Create a subscription account rule

**Correct Answer**: b. Create an Azure policy

14. Your company wants to ensure that only cost-effective virtual machine SKU sizes are deployed. What should you do? (1 Point)

a. Periodically inspect the deployment to see which SKU sizes are used
b. Create an Azure RBAC role that defines the allowed virtual machine SKU sizes
c. Create a policy in Azure Policy that specifies the allowed SKU sizes

**Correct Answer**: c. Create a policy in Azure Policy that specifies the allowed SKU sizes

15. Which of the following can be used to manage governance across multiple Azure subscriptions? (1 Point)

a. Azure initiatives
b. Resource groups
c. Management groups

**Correct Answer**: c. Management groups

16. Your company hires a new IT administrator. She needs to manage a resource group with first-tier web servers including assigning permissions. However, she should not have access to other resource groups inside the subscription. You need to configure role-based access. What should you do? (1 Point)

a. Assign her as a Subscription Contributor.
b. Assign her as a Resource Group Owner.
c. Assign her as a Resource Group Contributor.

**Correct Answer**: c. Assign her as a Resource Group Contributor.

17. You have three virtual machines (VM1, VM2, and VM3) in a resource group. The Helpdesk hires a new employee. The new employee must be able to modify the settings on VM3, but not on VM1 and VM2. Your solution must minimize administrative overhead. What should you do? (1 Point)

a. Assign the user to the Contributor role on the resource group
b. Assign the user to the Contributor role on VM3.
c. Move VM3 to a new resource group and assign the user to the Contributor role on VM3.

**Correct Answer**: b. Assign the user to the Contributor role on VM3.

18. Your company wants to allow some users to control the virtual machines in each environment. These users should be prevented from modifying networking and other resources in the same resource group or Azure subscription. What should you do? (1 Point)

a. Create a policy in Azure Policy that audits resource usage
b. Split the environment into separate resource groups
c. Create a role assignment through Azure RBAC

**Correct Answer**: c. Create a role assignment through Azure RBAC

19. Suppose a team member can't view resources in a resource group. Where would the administrator go to check the team member's access? (1 Point)

a. Check the team member's permissions by going to their Azure profile > My permissions
b. Go to the resource group and select Access control (IAM) > Role assignments.
c. Go to one of the resources in the resource group and select Role assignments.

**Correct Answer**: b. Go to the resource group and select Access control (IAM) > Role assignments.

20. A user who had Owner access to a subscription is leaving the company. No one else has access to this subscription. How can you grant another employee access to this subscription? (1 Point)

a. Use the Azure portal to elevate your own access
b. Ask the former employee for their password.
c. Ask the former employee to sign in and select a different employee to grant their permissions to.

**Correct Answer**: a. Use the Azure portal to elevate your own access

21. Which of the following is not true about the Cloud Shell? (1 Point)

a. Authenticates automatically for instant access to your resources.
b. Cloud Shell is assigned multiple machines per user account.
c. Provides both Bash and PowerShell sessions.

**Correct Answer**: b. Cloud Shell is assigned multiple machines per user account.

22. You are managing Azure locally using PowerShell. You have launched the app as an Administrator. Which of the following commands would you do first? (1 Point)

a. Connect-AzAccount
b. Get-AzResourceGroup
c. Get-AzSubscription

**Correct Answer**: a. Connect-AzAccount

23. Suppose you are building a video-editing application that will offer online storage for user-generated video content. You will store the videos in Azure Blobs, so you need to create an Azure storage account to contain the blobs. Once the storage account is in place, it is unlikely you would remove and recreate it because this would delete all the user videos. Which tool is likely to offer the quickest and easiest way to create the storage account? (1 Point)

a. Azure portal
b. Azure CLI
c. Azure PowerShell

**Correct Answer**: a. Azure portal

24. You have a new Azure subscription and need to move resources to that subscription. Which of the following resources cannot be moved? (1 Point)

a. Key vault
b. Storage account
c. Tenant

**Correct Answer**: c. Tenant

25. You are reviewing your virtual machine usage. You notice that you have reached the limit for virtual machines in the US East region. Which of the following provides the easiest solution? (1 Point)

a. Add another resource group
b. Change your subscription plan
c. Request support increase your limit

**Correct Answer**: c. Request support increase your limit

26. Which of the following would be a good example of when to use a resource lock? (1 Point)

a. A ExpressRoute circuit with connectivity back to your on-premises network.
b. A non-production virtual machine used to test occasional application builds.
c. A storage account used to temporarily store images processed in a development environment

**Correct Answer**: a. A ExpressRoute circuit with connectivity back to your on-premises network.

27. Your manager asks you to explain how Azure uses resource groups. You provide all of the following information, except? (1 Point)

a. Resources can be in only one resource group.
b. Resources can be moved from one resource group to another resource group.
c. Resource groups can be nested.

**Correct Answer**: c. Resource groups can be nested.

28. Which of the following best describes the format of an Azure Resource Manager template? (1 Point)

a. A JSON document with key-value pairs
b. A TXT document with key-value pairs
c. An XML document with element-value pairs

**Correct Answer**: a. A JSON document with key-value pairs

29. Azure Resource Manager templates are idempotent. This means that if you run a template with no changes a second time ... (1 Point)

a. Azure Resource Manager will deploy new resources as copies of the previously deployed resources.
b. Azure Resource Manager won't make any changes to the deployed resources.
c. Azure Resource Manager will delete the previously deployed resources and redeploy them.

**Correct Answer**: b. Azure Resource Manager won't make any changes to the deployed resources.

30. You are planning your Azure network implementation to support your company's migration to Azure. Your first task is to prepare for the deployment of the first set of VMs. For these machines, consumers on the internet must be able to communicate directly with the web application on the VMs. Also, the IP configuration must be zone redundant. You should minimize costs, whenever possible, while still meeting the requirements. What should you do? (1 Point)

a. Create a standard public IP address. During the creation of the first VM, associate the public IP address with the VM's NIC.
b. Create a standard public IP address. After the first VM is created, remove the private IP address and assign the public IP address to the NIC.
c. Create a basic public IP address. During the creation of the first VM, associate the public IP address with the VM.

**Correct Answer**: a. Create a standard public IP address. During the creation of the first VM, associate the public IP address with the VM's NIC.

31. You have a VM with two NICs named NIC1 and NIC2. NIC1 is connected to the 10.10.8.0/24 subnet. NIC2 is connected to the 10.20.8.0/24 subnet. You plan enable direct communication from the internet to TCP port 443. You would like to maintain existing communication across the 10.10.8.0/24 and 10.20.8.0/24 subnets. To support the new functionality and keep things simple. What should you do? (1 Point)

a. Remove the private IP address from NIC2 and then assign a public IP address to it. Then, create an inbound security rule.
b. Associate a public IP address to NIC2 and create an inbound security rule.
c. Create an inbound security rule for TCP port 443.

**Correct Answer**: b. Associate a public IP address to NIC2 and create an inbound security rule.
