#!/bin/bash

# LINUX Version
# cd data
# for file in `*.tab`
# 	do
# 		iconv -f ISO-8859-1 $i -t UTF-8 -o $i_utf8.tab
# 		rm $i.tab
# 		mv $i_utf8.tab $i.tab
# 	done
# done
# cd ..

# MacOSX Version
for file in `ls ./data/*.tab`
do
	iconv -f ISO-8859-1 -t UTF-8 $file > $file_utf8
	# rm $file
	# mv $file_utf8 $file
done
cd ..