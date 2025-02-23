#!/bin/bash

tmp=$(mktemp)
jq .[] $(pwd)/books.json -c | less | {
  while read line; do
    id=$(echo "$line" | jq .id -r)
    fields=$(echo "$line" | jq .fields)
    echo "id: ${id}"
    echo "${line}" > ${tmp}

    doc_id=$(echo $id | cut -d':' -f5)
    
    curl < /dev/null \
         -s \
          -X POST \
          -H "Content-Type:application/json" \
          --data @${tmp} \
          http://localhost:9080/document/v1/embeddings/books/docid/${doc_id} | jq . -c    
  done
}

rm -f ${tmp}
