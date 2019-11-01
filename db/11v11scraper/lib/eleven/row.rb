module Eleven
  class Row
    def initialize(element)
      @rows = element.css("td")
    end

    def id
      path.to_s.delete_suffix('/').match(/(\d+)$/).to_s.to_i
    end

    def path
      rows[1].css("a").attr("href").to_s
    end

    def date
      Date.parse(rows[0].text).to_s
    end

    def result
      rows[2].text
    end

    def score
      rows[3].text.strip.split("-").collect(&:to_i)
    end

    def competition_name
      rows[4].text.to_s
    end

    private

    attr_reader :rows
  end
end
