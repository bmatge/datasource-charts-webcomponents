#!/bin/sh
# Docker entrypoint: periodic beacon log parsing + nginx
# Runs parse-beacon-logs.sh every 5 minutes in background, then starts nginx

PARSE_SCRIPT="/usr/local/bin/parse-beacon-logs.sh"
INTERVAL=300  # 5 minutes

# Background loop: parse beacon logs periodically
(
  while true; do
    sleep "$INTERVAL"
    sh "$PARSE_SCRIPT" 2>&1
  done
) &

# Start nginx in foreground
exec nginx -g "daemon off;"
