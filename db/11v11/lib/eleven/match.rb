require "active_support/core_ext/string"

module Eleven
  class Match
    include IdEncoder

    def initialize(element)
      @element = element
    end

    def teams
      @_teams ||= %w[home away].collect do |type|
        wrapper = element.css(".teams-new .#{type} .teamname")
        link = wrapper.css("a").presence
        slug = link ? link.attr("href").to_s.split("/").last : nil
        name = link ? link.text.to_s : wrapper.children.last.text.strip
        {
          slug: slug,
          name: name,
        }.compact
      end
    end

    def coaches
      %w[home away].collect do |type|
        name_el = element.css(".teams-new .#{type} p b")
        {
          name: name_el.text.to_s.presence
        }.compact.presence
      end
    end

    def goals
      %w[home away].collect do |type|
        element.css(".goals .#{type} tr").collect do |row|
          columns = row.css("td")
          name = columns[0].text.to_s
          goal_type = columns[3].css("img").attr("alt").to_s.presence
          id = if arg_type?(type)
                 player_id_from_name(type, name) 
               elsif goal_type == "OG"
                 player_id_from_name(type == "home" ? "away" : "home", name)
               else
                 nil
               end
          {
            id: encode(id),
            name: name,
            min: columns[2].text.to_s.presence,
            type: goal_type,
          }.compact
        end
      end
    end

    def lineups
      %w[home away].collect do |type|
        element.css(".lineup:first-of-type .#{type} .player a").each_with_object([]) do |link, lineup|
          name = link.text.to_s
          lineup << {
            id: (encode(player_id_from_link(link)) if arg_type?(type)),
            name: name,
          }.compact

          sub = subs_index(type)[name]
          if sub
            lineup.last[:out] = sub[:min]
            lineup <<  {
              id: (encode(player_id_from_name(type, sub[:name])) if arg_type?(type)),
              name: sub[:name],
              in: sub[:min],
            }.compact
          end
        end
      end
    end

    def cards
      %w[home away].collect do |type|
        element.css(".cards .#{type} tr").collect do |row|
          columns = row.css("td")
          name = columns[0].text.to_s
          {
            id: (encode(player_id_from_name(type, name)) if arg_type?(type)),
            name: columns[0].text.to_s,
            min: columns[1].text.to_s.presence,
            type: columns[2].css('span').text.to_s.presence,
          }.compact
        end
      end
    end

    def venue
      venue_row = element.css('.basicData tr').to_a.find do |tr|
        tr.children.first.text.downcase.include? 'venue'
      end
      return nil unless venue_row
      {
        name: venue_row.children.last.text.strip,
      }
    end

    private

    def player_id_from_link(link)
      link.attr('href').delete_suffix('/').match(/(\d+)$/).to_s.to_i
    end

    def player_id_from_name(type, name)
      player_index(type)[name]
    end

    def player_index(type)
      @_player_index ||= {}
      @_player_index[type] ||= Hash[
        element.css(".lineup .#{type} .player a").collect do |link|
          [
            link.text.to_s,
            player_id_from_link(link),
          ]
        end
      ]
    end

    def subs_index(type)
      @_subs_index ||= {}
      @_subs_index[type] ||= Hash[
        element.css(".substitutions .#{type} tr").collect do |row|
          columns = row.css("td")
          substituted = columns[0].css("span.substituted").text.strip.to_s
          min = columns[1].text.to_s.presence
          min = "" if min.to_i == 0
          [
            substituted,
            {
              name: columns[0].css("span.substitute").text.strip.to_s,
              min:  min,
            }
          ]
        end
      ]
    end

    def arg_type
      @_arg_type ||= teams[0][:slug] == 'argentina' ? 'home' : 'away'
    end

    def arg_type?(type)
      arg_type == type
    end

    attr_reader :element
  end
end

