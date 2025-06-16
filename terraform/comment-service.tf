resource "kubernetes_deployment" "comment_service" {
  metadata {
    name      = var.comment_service_name
    namespace = var.namespace
  }

  spec {
    replicas = 3
    selector {
      match_labels = {
        app = var.comment_service_name
      }
    }
    template {
      metadata {
        labels = {
          app = var.comment_service_name
        }
      }
      spec {
        container {
          name  = var.comment_service_name
          image = var.comment_service_image
          port {
            container_port = var.comment_service_port
          }
        }
      }
    }
  }
}


resource "kubernetes_service" "comment_service" {
  metadata {
    name      = "comment-service"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
  }

  spec {
    selector = {
      app = var.comment_service_name
    }

    port {
      port = var.comment_service_port
      target_port = var.comment_service_port
    }
  }
}
