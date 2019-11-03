require "http"
require "json"
require "nokogiri"
require_relative "./lib/eleven"

BASE_URL = "https://www.11v11.com"

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

matches = scrape("/teams/argentina/tab/matches/", "#season li a").collect do |link|
  scrape(link.attr("href"), "tbody tr", with: Eleven::Row).reverse.collect do |row|
    match = scrape(row.path, ".match-report", with: Eleven::Match).first
    {
      id: row.id,
      date: row.date,
      competition: row.competition,
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
  matches: matches.flatten.reverse
  # sort_by { |m| m.date }
}

File.write("#{__dir__}/../11v11.json", JSON.pretty_generate(content));
File.write("#{__dir__}/../11v11.js", "export default #{JSON.generate(content)}");
