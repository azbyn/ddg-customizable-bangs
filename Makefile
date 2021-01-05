main: merge build

#if you have a better solution feel free to add a pull request
merge:
	cat bang.js background.js > gen.js
build:
	web-ext build --overwrite-dest
genBang:
	wget 'https://duckduckgo.com/bang.js' && sed -i '1s/^/const bang = /' bang.js
	echo 'you might want to format bang.js, it\'s one line now'
