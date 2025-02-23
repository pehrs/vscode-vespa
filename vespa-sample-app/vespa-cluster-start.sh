#!/bin/bash
rm -rf $(pwd)/logs
mkdir -p $(pwd)/logs
docker compose up -d
