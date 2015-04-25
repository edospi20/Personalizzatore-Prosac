#!/bin/bash

# Usage: bash gitConfig.sh <remote repository name> <expire timeout in hours>

# Basic git configuration for edospi20/Personalizzatore-Prosac
# repository:
# 	- creates a remote shortcut with the provided name
# 	- sets up cache for username and password
# 	- sets up cache expire time to the given amount of hours
# 	- sets the push branch to the one with the same name
#			of the current one
# 	- performs the first push to set upstream, that is bind
#			this repo to the one on github, and store username and password

REMOTE_NAME=$1
EXPIRE_TIME=$(( $2 * 3600 ))
REMOTE_URL='https://github.com/edospi20/Personalizzatore-Prosac.git Personalizzatore\ Prosac'

if [[ -n $(git remote show | grep origin) ]]; then
	git remote add $REMOTE_NAME $REMOTE_URL
else
	git remote rename origin $REMOTE_NAME
fi
git config credential.helper store
git config credential.helper "cache --timeout $EXPIRE_TIME"
git config push.default current
git push -u $REMOTE_NAME
