#!/usr/bin/env bash

set -e

cd $(dirname "$0")

bundle exec rake test
bundle exec ruby scrape.rb
