. ./source.sh
rm -rf $1
mkdir -p $1

docker-compose -f dc.main.yaml -f dc.service.yaml config > $2
