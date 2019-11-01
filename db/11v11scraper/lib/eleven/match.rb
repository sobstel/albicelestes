module Eleven
  class Match
    def initialize(element)
      @element = element
    end

    def teams
      %w[home away].collect do |type|
        link = element.css(".teams-new .#{type} .teamname a")
        {
          slug: link.attr("href").to_s.split("/").last,
          name: link.text.to_s
        }
      end
    end

    def coaches
      %w[home away].collect do |type|
        name_el = element.css(".teams-new .#{type} p b")
        {
          name: name_el.text.to_s
        }
      end
    end

    def goals
      %w[home away].collect do |type|
        element.css(".goals .#{type} tr").collect do |row|
          columns = row.css("td")
          {
            # TODO: person id
            name: columns[0].text.to_s,
            # TODO: goal qualifiers? [1]
            min: columns[2].text.to_s,
            # TODO: type: [3]
          }
        end
      end
    end

    def lineups
      %w[home away].collect do |type|
        element.css(".lineup:first-of-type .#{type} .player a").collect do |link|
          {
            id: link.attr('href').delete_suffix('/').match(/(\d+)$/).to_s.to_i,
            name: link.text.to_s,
          }
        end
      end
    end

    def subs
      %w[home away].collect do |type|
        element.css(".substitutions .#{type} tr").collect do |row|
          columns = row.css("td")
          {
            name_in: columns[0].css("span.substitute").text.strip.to_s,
            name_out: columns[0].css("span.substituted").text.strip.to_s,
            min: columns[1].text.to_s,
          }
        end
      end
    end

    def cards
      %w[home away].collect do |type|
        element.css(".cards .#{type} tr").collect do |row|
          columns = row.css("td")
          {
            # TODO: person id
            name: columns[0].text.to_s,
            min: columns[1].text.to_s,
            type: columns[2].css('span').text.to_s,
          }
        end
      end
    end

    private

    attr_reader :element
  end
end

