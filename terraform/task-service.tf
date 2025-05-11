resource "kubernetes_deployment" "task_service" {
  metadata {
    name      = "task-service"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
  }

  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "task-service"
      }
    }
    template {
      metadata {
        labels = {
          app = "task-service"
        }
      }
      spec {
        container {
          name  = "task-service"
          image = "22i0857/task-service:latest" # Replace with your image name
          port {
            container_port = 3002
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "task_service" {
  metadata {
    name      = "task-service"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
  }

  spec {
    selector = {
      app = "task-service"
    }

    port {
      port = 3002
      target_port = 3002
    }
  }
}
