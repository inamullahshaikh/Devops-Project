# Global
variable "namespace" {
  description = "Kubernetes namespace for all resources"
  default     = "microservice-app"
}

# MongoDB
variable "mongo" {
  default = "mongo"
}

variable "mongo_image" {
  default = "mongo"
}

variable "mongo_port" {
  default = 27017
}

# Frontend
variable "frontend_name" {
  default = "frontend"
}

variable "frontend_image" {
  default = "22i0857/frontend:latest"
}

variable "frontend_port" {
  default = 80
}

variable "frontend_replicas" {
  default = 1
}

# User Service
variable "user_service_name" {
  default = "user-service"
}

variable "user_service_image" {
  default = "22i0857/user-service:latest"
}

variable "user_service_port" {
  default = 3001
}

# Task Service
variable "task_service_name" {
  default = "task-service"
}

variable "task_service_image" {
  default = "22i0857/task-service:latest"
}

variable "task_service_port" {
  default = 3002
}

# Comment Service
variable "comment_service_name" {
  default = "comment-service"
}

variable "comment_service_image" {
  default = "22i0857/comment-service:latest"
}

variable "comment_service_port" {
  default = 3003
}
