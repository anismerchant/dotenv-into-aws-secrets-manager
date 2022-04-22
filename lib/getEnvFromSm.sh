#!/bin/bash

smname=''

print_usage() {
  echo 'Usage: ./getEnvFromSm.sh -n [AWS secret manager name]' >&2
}

while getopts "n:" opt; do
  case $opt in
    n) 
      smname=$OPTARG 
      ;;
    *) 
      print_usage
      exit 1 
      ;;
  esac
done

if [ -z $smname ]; then
  print_usage
  exit 1
fi

aws secretsmanager get-secret-value --secret-id $smname