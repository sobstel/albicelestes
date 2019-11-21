require "http"
require "json"
require "nokogiri"
require_relative "./lib/eleven"

BASE_URL = "https://www.11v11.com"

def error(message)
  puts "ERROR: #{message}"
  exit
end

def doc(content)
  Nokogiri::HTML(content)
end

def scrape(url, css, with: nil)
  normalized_url = url
  normalized_url += "/" unless normalized_url.end_with?("/")
  normalized_url = "#{BASE_URL}#{normalized_url}" unless normalized_url.start_with?("http")

  puts "Scraping #{normalized_url}..."
  content = HTTP.follow.get(normalized_url).to_s

  puts "extracting content..."
  result = doc(content).css(css).to_a
  puts "#{result.count} elements found"

  result.collect! { |item| with.new(item) } if with
  puts "...done.\n\n"

  result
end

data = JSON.parse(File.read("#{__dir__}/../data.json"))
error('Failed to read data') unless data

matches = data.dig('matches')
last_match = matches.last
last_year = last_match['date'][0..3].to_i

new_matches = scrape("/teams/argentina/tab/matches/", "#season li a").collect do |link|
  year = (link.content[0..1] + link.content[5..6]).to_i - 1
  next if year < last_year

  scrape(link.attr("href"), "tbody tr", with: Eleven::Row).collect do |row|
    next if year === last_year && row.date <= last_match['date']

    match = scrape(row.path, ".match-report", with: Eleven::Match).first
    {
      id: row.id,
      date: row.date,
      competition: row.competition,
      venue: match.venue,
      teams: match.teams,
      score: row.score,
      pen: row.pen,
      result: row.result,
      goals: match.goals,
      cards: match.cards,
      coaches: match.coaches,
      lineups: match.lineups,
    }.compact
  end
end

content = {
  matches: matches.concat(new_matches.flatten.compact)
}

File.write("#{__dir__}/../data.json", JSON.pretty_generate(content));
