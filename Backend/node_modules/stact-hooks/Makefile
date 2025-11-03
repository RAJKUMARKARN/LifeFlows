test:
	@./node_modules/.bin/mocha \
		--reporter spec \
		--bail \
		--timeout 5s \
		--require test/common.js

bench:
	node ./bench/bench.js

.PHONY: test
.PHONY: bench