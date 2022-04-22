#!/bin/bash

smname=''

print_usage() {
  echo 'Usage: ./deleteEnvWithRecWinFromSm.sh -n [AWS secret manager name] -d [recovery-window-in-days]' >&2
}

while getopts "n:d:" opt; do
  case $opt in
    n) 
      smname=$OPTARG 
      ;;

    d) 
      days=$OPTARG 
      ;;  
    *) 
      print_usage
      exit 1 
      ;;
  esac
done

if [ -z $smname ] || [ -z $days ]; then
  print_usage
  exit 1
fi

aws secretsmanager delete-secret --secret-id $smname --recovery-window-in-days $days