terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "1.22.2"
    }
    docker = {
      source  = "terraform-providers/docker"
      version = "2.7.1"
    }
  }
}
variable "pvt_key" {}
variable "do_token" {}

provider "digitalocean" {
  token = var.do_token
}

data "digitalocean_ssh_key" "desktop_2020" {
  name = "desktop_2020"
}
