install: install-deps
install-deps:
	npm ci
brain-games:
	node bin/brain-games.js
brain-even:
	node bin/brain-even.js
brain-calc:
	node bin/brain-calc.js
brain-gcd:
	node bin/brain-gcd.js
brain-progression:
	node bin/brain-progression.js
publish:
	npm publish --dry-run
link:
	npm link
fix:
	npm audit fix
lint:
	npx eslint .
.PHONY: bin
