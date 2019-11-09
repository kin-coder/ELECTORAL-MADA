class Candidate
  include Mongoid::Document
  field :number, type: Integer
  field :first_name, type: String
  field :last_name, type: String
  field :avatar, type: String
  
  has_many :voters
end