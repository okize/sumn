#!/bin/sh

PROJECT = "Start Up a Microsite Now"
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m

install:
	@echo "Installing ${PROJECT}..."
	npm install
	@npm link
	@mv -i ./lib/config.tmp.json ./lib/config.json
	@echo "\n"
	@echo "${CHECK} Installation complete!"
	@echo "\n"
	@echo "Now open './lib/config.json' and enter credentials"

update:
	@echo "Updating ${PROJECT}..."
	npm update