# /bin/bash
git submodule update --init --recursive
docker-compose -f docker-compose.yml up -d --build --force-recreate --remove-orphans
