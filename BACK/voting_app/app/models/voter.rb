class Voter
  include Mongoid::Document
  include Mongoid::Search

  field :first_name, type: String
  field :last_name, type: String
  field :cin, type: String

  belongs_to :candidate

  search_in :first_name, :last_name, :cin
end
