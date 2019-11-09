class Voter
  include Mongoid::Document
  include Mongoid::Search

  field :first_name, type: String
  field :last_name, type: String
  field :cin, type: String

  field :fokotany, type: String
  field :commune, type: String
  field :district, type: String
  field :region, type: String

  belongs_to :candidate

  search_in :first_name, :last_name, :cin
end
