#!/bin/bash

# Usage: bash gitConfig.sh <remote repository name> <expire timeout in hours>

# Basic git configuration for edospi20/Personalizzatore-Prosac
# repository:
#	- sets user.name and user.email if not already set
# 	- creates a remote shortcut with the provided name
# 	- sets up cache for username and password
# 	- sets up cache expire time to the given amount of hours
# 	- sets the push branch to the one with the same name
#			of the current one
# 	- performs the first push to set upstream, that is bind
#			this repo to the one on github, and store username and password

REMOTE_URL='https://github.com/edospi20/Personalizzatore-Prosac.git'

# Checking for user.name and user.email

if [[ -z $(git config --global user.name) ]]; then
	read -p 'Enter your full name (this is required in order to use git): ' USER_NAME
	git config --global user.name "$USER_NAME"
fi
if [[ -z $(git config --global user.email) ]]; then
	read -p 'Enter your email address (this is also required in order to use git): ' USER_EMAIL
	git config --global user.name "$USER_EMAIL"
fi

# Checking for params, and prompting if were not given

REMOTE_NAME=$1
[[ -z $REMOTE_NAME ]] &&
		read -p 'Enter the name you wish to use as a shortcut for the repository: ' REMOTE_NAME

EXPIRE_TIME=$2
[[ -z $EXPIRE_TIME ]] &&
		read -p 'Enter the amount of hours you wish your credential to be cached for: ' EXPIRE_TIME
EXPIRE_TIME=$(( $EXPIRE_TIME * 3600 ))

# Doing all the other stuff

[[ -n $(git remote show | grep origin) ]] && git remote remove origin

if [[ -n $(git remote show | grep $REMOTE_NAME) ]]; then
	git remote set-url $REMOTE_NAME $REMOTE_URL
else
	git remote add $REMOTE_NAME $REMOTE_URL
fi

[[ -z $(git config --global credential.helper) ]] &&
		git config credential.helper "cache --timeout $EXPIRE_TIME"

[[ -z $(git config --global push.default) ]] &&
		git config push.default current

git push -u $REMOTE_NAME
