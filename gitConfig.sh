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
	echo 'Enter your full name (this is required in order to use git)'
	read USER_NAME
	git config --global user.name "$USER_NAME"
fi
if [[ -z $(git config --global user.email) ]]; then
	echo 'Enter your email address (this is also required in order to use git)'
	read USER_EMAIL
	git config --global user.name "$USER_EMAIL"
fi

# Checking for params, and prompting if were not given

REMOTE_NAME=$1
if [[ -z $REMOTE_NAME ]]; then
	echo Enter the name you wish to use as a shortcut for the repository
	read REMOTE_NAME
fi
if [[ -z $2 ]]; then
	echo Enter the amount of hours you wish your credential to be cached for
	read EXPIRE_TIME
fi
EXPIRE_TIME=$(( $2 * 3600 ))

# Doing all the other stuff

if [[ -z $(git remote show | grep origin) ]]; then
	git remote add $REMOTE_NAME $REMOTE_URL
else
	git remote rename origin $REMOTE_NAME
fi
if [[ -z $(git config --global credential.helper) ]]; then
	git config credential.helper "cache --timeout $EXPIRE_TIME"
fi
if [[ -z $(git config --global push.default) ]]; then
	git config push.default current
fi
git push -u $REMOTE_NAME
