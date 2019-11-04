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
      rows[3].text.strip.split("-", 2).collect(&:to_i)
    end

    def pen
      text = rows[3].text.strip.tr("()", "")
      return nil unless text.include?(" ")

      text.split(" ", 2).last.split("-", 2).collect(&:to_i)
    end

    def competition
      name = rows[4].text.to_s
      return "Friendly" if ['International Friendly', 'FIFA 90 World Cup'].include?(name)
      return "World Cup" if name == "FIFA World Cup"

      name
    end

    private

    attr_reader :rows
  end
end
