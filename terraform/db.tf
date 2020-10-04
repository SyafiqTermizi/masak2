resource "digitalocean_database_cluster" "masak2_db_cluster" {
  name       = "masak2cluster"
  engine     = "pg"
  version    = "12"
  size       = "db-s-1vcpu-1gb"
  region     = "sgp1"
  node_count = 1
}

resource "digitalocean_database_user" "masak2_user" {
  cluster_id = digitalocean_database_cluster.masak2_db_cluster.id
  name       = "masak2user"
}

resource "digitalocean_database_db" "masak2_db" {
  cluster_id = digitalocean_database_cluster.masak2_db_cluster.id
  name       = "masak2db"
}

resource "digitalocean_database_firewall" "masak2_fw" {
  cluster_id = digitalocean_database_cluster.masak2_db_cluster.id

  rule {
    type  = "droplet"
    value = digitalocean_droplet.masakweb.id
  }
}
