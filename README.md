# Personalizzatore-Prosac
This tool allows users to customize their papillons

## Git Configuration
The gitConfig.sh script will automatize the most commonly
used config settings for this repository.
Its usage is:
	bash gitConfig.sh <remote repository name> <expire timeout in hours>

More precisely, it does the following:
- Creates a remote shortcut with the provided name
- Enables username and password caching
- Sets up cache expire time to the given amount of hours
- Sets the push branch to the one with the same name of the current one
- Performs the first push to set upstream, that is binds this repo to the one on github, and store username and password
