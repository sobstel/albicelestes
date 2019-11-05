require 'minitest/spec'
require 'minitest/autorun'
require 'nokogiri'
require_relative '../../lib/eleven'

describe Eleven::Match do
  let(:match) do
    content = File.read "#{__dir__}/../_fixtures/match/#{fixture}.html"
    Eleven::Match.new Nokogiri::HTML(content)
  end

  describe ".teams" do
    describe "unlinked team" do
      let(:fixture) { '1972-concacaf' }

      specify "team name only (with no slug)" do
        teams = match.teams
        assert_equal({ slug: 'argentina', name: 'Argentina'}, teams.first)
        assert_equal({ name: 'CONCACAF'}, teams.last)
      end
    end
  end

  describe ".venue" do
    let(:fixture) { '1972-concacaf' }

    specify "happy path" do
      assert_equal({ name: "Estadio Alagoas, Maceio" }, match.venue)
    end
  end
end
