resource "kubernetes_config_map" "mongo_config" {
  metadata {
    name      = "mongo-config"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
  }

  data = {
    database_url = "mongodb://mongo:27017"
  }
}

resource "kubernetes_deployment" "mongo" {
  metadata {
    name      = var.mongo
    namespace = var.namespace
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = var.mongo
      }
    }
    template {
      metadata {
        labels = {
          app = var.mongo
        }
      }
      spec {
        container {
          name  = var.mongo
          image = var.mongo_image
          port {
            container_port = var.mongo_port
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "mongo" {
  metadata {
    name      = "mongo"
    namespace = kubernetes_namespace.app_namespace.metadata[0].name
  }

  spec {
    selector = {
      app = "mongo"
    }

    port {
      port        = 27017
      target_port = 27017
    }
  }
}
