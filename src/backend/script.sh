#!/bin/bash
for f in */*
do
	ext="${f##*.}"
	name="${f%.*}"
	if [ $f != "script.sh" ] && [ $ext = "js" ]; then
		cp $f ${name}.mjs
		echo "${f} -> ${name}.mjs"
	fi
done
echo ".mjs files built"
