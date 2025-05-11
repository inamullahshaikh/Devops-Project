# Namespace
output "namespace" {
  value = kubernetes_namespace.app_namespace.metadata[0].name
}

# Mongo
output "mongo_service_name" {
  value = kubernetes_service.mongo.metadata[0].name
}

# Frontend
output "frontend_deployment" {
  value = kubernetes_deployment.frontend.metadata[0].name
}

output "frontend_service" {
  value = kubernetes_service.frontend.metadata[0].name
}

# User Service
output "user_service_deployment" {
  value = kubernetes_deployment.user_service.metadata[0].name
}

output "user_service_name" {
  value = kubernetes_service.user_service.metadata[0].name
}

# Task Service
output "task_service_deployment" {
  value = kubernetes_deployment.task_service.metadata[0].name
}

output "task_service_name" {
  value = kubernetes_service.task_service.metadata[0].name
}

# Comment Service
output "comment_service_deployment" {
  value = kubernetes_deployment.comment_service.metadata[0].name
}

output "comment_service_name" {
  value = kubernetes_service.comment_service.metadata[0].name
}
