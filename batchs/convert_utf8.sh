#!/bin/bash

cd data
for file in `*.tab`
	do
		iconv -f ISO-8859-1 $i -t UTF-8 -o $i_utf8.tab
		rm $i.tab
		mv $i_utf8.tab $i.tab
	done
done
cd ..