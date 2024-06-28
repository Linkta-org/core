#!/usr/bin/env bash 

# Function to nuke and install packages in a directory
nuke_and_install() {
  local dir=$1
  if [ -d "$dir/node_modules" ]; then
    echo "┏━━━ ☢️ 🧨 ☢️ 🧨 NUKE NODE MODULES IN $dir ━━━━━━━━━━━━━━"
    rm -rf "$dir/node_modules"
    (cd "$dir" && npm install)
  else
    echo "🚫 No node_modules directory found in $dir"
  fi
}

nuke_and_install "."
nuke_and_install "./client"
nuke_and_install "./server" 

echo "🎉 All node_modules and fresh packages installed!" 
