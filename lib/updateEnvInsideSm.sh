#!/bin/bash

smname=''
filename=''

print_usage() {
  echo 'Usage: ./updateEnvInsideSm.sh -n [AWS secret manager name] -f [filename]' >&2
}

while getopts "n:f:" opt; do
  case $opt in
    n) 
      smname=$OPTARG 
      ;;
    f) 
      filename=$OPTARG 
      ;;
    *) 
      print_usage
      exit 1 
      ;;
  esac
done

if [ -z $smname ] || [ -z $filename ]; then
  print_usage
  exit 1
fi

aws secretsmanager update-secret --secret-id $smname --secret-string "file://${filename}"