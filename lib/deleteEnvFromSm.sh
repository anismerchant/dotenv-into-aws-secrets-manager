#!/bin/bash

smname=''

print_usage() {
  echo 'Usage: ./deleteEnvFromSm.sh -n [AWS secret manager name]' >&2
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

aws secretsmanager delete-secret --secret-id $smname --force-delete-without-recovery