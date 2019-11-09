class Candidate
  include Mongoid::Document
  field :number, type: Integer
  field :first_name, type: String
  field :last_name, type: String
  field :avatar, type: String
  
  field :fokotany, type: String
  field :commune, type: String
  field :district, type: String
  field :region, type: String

  has_many :voters
end