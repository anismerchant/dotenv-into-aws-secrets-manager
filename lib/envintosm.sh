#!/bin/bash

smname=''
smdesc=''
filename=''

print_usage() {
  echo 'Usage: ./envtosm.sh -n [AWS secret manager name] -d "[AWS secret manager description]" -f [filename]' >&2
}

while getopts "n:d:f:" opt; do
  case $opt in
    n) 
      smname=$OPTARG 
      ;;
    d)
      smdesc=$OPTARG
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

if [ -z $smname ] || [ -z "$smdesc" ] || [ -z $filename ]; then
  print_usage
  exit 1
fi

aws secretsmanager create-secret --name $smname --description "${smdesc}" --secret-string "file://${filename}"