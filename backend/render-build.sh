#!/usr/bin/env bash
# exit on error
set -o errexit

# Install build dependencies
pip install --upgrade pip
pip install wheel

# Install system dependencies for cryptography
apt-get update && apt-get install -y build-essential libssl-dev libffi-dev


# Install Python dependencies
pip install -r requirements.txt