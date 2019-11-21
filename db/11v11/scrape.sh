set -e

bundle exec rake test
bundle exec ruby scrape.rb
