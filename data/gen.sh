#!/bin/bash

sed 's/^\s*./  "/g' data/raw.txt | sed 's/.$/",/' | sed '$ s/.$//' > data/tmp

echo "[" > data/data.json
cat data/tmp >> data/data.json
echo "]" >> data/data.json

rm data/tmp
