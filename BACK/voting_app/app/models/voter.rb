class Voter
  include Mongoid::Document
  include Mongoid::Search

  field :first_name, type: String
  field :last_name, type: String
  field :cin, type: String

  search_in :first_name, :last_name, :cin
end
