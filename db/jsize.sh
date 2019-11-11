#!/usr/bin/env ruby

#
# Converts and minifies data.js to data.json
#

require "json"
require "uglifier"

puts "Reading json file..."
content = JSON.parse(File.read("#{__dir__}/data.json"))

puts "generating js file..."
File.write("#{__dir__}/data.js", "export default #{JSON.fast_generate(content)}")

puts "uglyfing js file..."
File.write("#{__dir__}/data.js", Uglifier.compile(File.read("#{__dir__}/data.js"), harmony: true))

puts "done."
