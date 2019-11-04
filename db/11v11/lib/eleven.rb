require "hashids"

module Eleven
  module IdEncoder
    private 

    def encode(id)
      return if id.nil?
      encoder.encode(id)
    end

    def encoder
      @_encoder ||= Hashids.new('Albicelestes', 4, 'abcdefghijklmnopqrstuvwxyz1234567890')
    end
  end
end

require_relative "./eleven/row"
require_relative "./eleven/match"
