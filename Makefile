install: install-deps
install-deps:
	npm ci
publish:
	npm publish --dry-run
link:
	npm link
fix:
	npm audit fix
lint:
	npx eslint .
.PHONY: bin
