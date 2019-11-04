require 'minitest/spec'
require 'minitest/autorun'
require_relative '../../lib/eleven'

describe Eleven::Match do
  describe ".teams" do 
    it "can be created" do
      Eleven::Match.new(nil)
    end
  end
end
