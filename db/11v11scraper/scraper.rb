require "http"
require "nokogiri"

MATCHES_URL = 'https://www.11v11.com/teams/argentina/tab/matches/'

def doc(url)
  Nokogiri::HTML(HTTP.get(url).to_s)
end

doc(MATCHES_URL).css('#season li a').map do |link|
  puts link
  # TODO: each season -> list of matches -> match
  # TODO: alraedy imported detection?
end
