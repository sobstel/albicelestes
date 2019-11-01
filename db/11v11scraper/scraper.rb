require "http"
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

  if with
    puts "applying #{with.to_s}..."
    result.collect! { |item| with.new(item) }
  end
  puts "...done.\n\n"

  result
end

matches = scrape("/teams/argentina/tab/matches/", "#season li a").collect do |link|
  scrape(link.attr("href"), "tbody tr", with: Eleven::Row).collect do |row|
    match = scrape(row.path, ".match-report", with: Eleven::Match).first

    output = {
      id: row.id,
      date: row.date,
      competition_name: row.competition_name,
      teams: match.teams,
      ft: row.score,
      goals: match.goals,
      cards: match.cards,
      coaches: match.coaches,
      lineups: match.lineups,
      subs: match.subs,
    }
    puts output
    break
  end
  break
end
