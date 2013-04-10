#!/bin/sh

PROJECT = "Start Up a Microsite Now"
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m

install:
	@echo "Installing ${PROJECT}..."
	@npm install
	@volo add
	@npm link
	@mv -i ./lib/config/user.tmp.json ./lib/user.json
	@echo "\n"
	@echo "${CHECK} Installation complete!"
	@echo "\n"
	@echo "Now open './lib/config/user.json' and enter credentials"