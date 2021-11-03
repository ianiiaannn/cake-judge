# cake judge

## Building

sudo docker build . -t cake-judge\
sudo docker network create cake-judge --subnet=172.18.0.0/16\

## Startup

sudo docker run -d --network cake-judge --network-alias db --ip 172.18.0.2 --name db -e MYSQL_ROOT_PASSWORD=serect -e MYSQL_DATABASE=cake-judge mariadb\
sudo docker run --rm --network cake-judge --network-alias node --name node -p 80:80 --link db cake-judge

CREATE DATABASE cake_judge
