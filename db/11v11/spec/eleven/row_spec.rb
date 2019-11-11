require 'minitest/spec'
require 'minitest/autorun'
require 'nokogiri'
require_relative 'lib/eleven'

describe Eleven::Row do
  let(:rows) do
    content = File.read "#{__dir__}/../_fixtures/row/#{fixture}.html"
    Nokogiri::HTML(content).css("tbody tr")
  end
  let(:row) { Eleven::Row.new(rows[row_index]) }

  describe ".score" do
    let(:fixture) { '1978' }

    describe "arg-yug" do
      let(:row_index) { 0 }
      specify "regular time" do
        assert_equal([1, 0], row.score)
      end
    end

    describe "arg-ned" do
      let(:row_index) { -1 }
      specify "after aet" do
        assert_equal([3, 1], row.score)
      end
    end
  end

  describe ".pen" do
    let(:fixture) { '1998' }

    describe "arg-eng" do
      let(:row_index) { -2 }
      specify "pen" do
        assert_equal([2, 2], row.score)
        assert_equal([4, 3], row.pen)
      end
    end
  end
end
