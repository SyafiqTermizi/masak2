resource "digitalocean_droplet" "masak2_web" {
  image              = "ubuntu-18-04-x64"
  name               = "masak2web"
  region             = "sgp1"
  size               = "s-1vcpu-1gb"
  private_networking = true
  ssh_keys = [
    data.digitalocean_ssh_key.desktop_2020.id
  ]
}
