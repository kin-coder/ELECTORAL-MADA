class Voter
  include Mongoid::Document
  include Mongoid::Search
  include Mongoid::Timestamps

  field :first_name, type: String
  field :last_name, type: String
  field :cin, type: String

  field :fokotany, type: String
  field :commune, type: String
  field :district, type: String
  field :region, type: String

  field :voted, type: Integer

  belongs_to :candidate, optional: true
  has_many :surveys
  # has_one :session_vote, optional: true

  search_in :first_name, :last_name, :cin
end
