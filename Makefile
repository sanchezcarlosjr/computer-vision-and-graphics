all:
	ls | grep -E "e[0-9]+" | xargs -I PREFIX yarn --cwd PREFIX install --frozen-lockfile
	ls | grep -E "e[0-9]+" | xargs -I PREFIX yarn --cwd PREFIX build
