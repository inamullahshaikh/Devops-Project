resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = var.frontend_name
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
    labels = {
      app = var.frontend_name
    }
  }

  spec {
    replicas = var.frontend_replicas
    selector {
      match_labels = {
        app = var.frontend_name
      }
    }

    template {
      metadata {
        labels = {
          app = var.frontend_name
        }
      }

      spec {
        container {
          name  = var.frontend_name
          image = var.frontend_image

          port {
            container_port = var.frontend_port
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name      = var.frontend_name
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
  }

  spec {
    selector = {
      app = var.frontend_name
    }

    port {
      port        = var.frontend_port
      target_port = var.frontend_port
    }

    type = "ClusterIP"
  }
}
