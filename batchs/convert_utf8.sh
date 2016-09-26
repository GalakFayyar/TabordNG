#!/bin/bash

cd data
for file in `*.tab`
	do
		iconv -f ISO-8859-1 $i -t UTF-8 -o $i_utf8.csv
		rm $i.csv
		mv $i_utf8.csv $i.csv
	done
done
cd ..