class Candidate
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :number, type: Integer
  field :first_name, type: String
  field :last_name, type: String
  field :avatar, type: String
  
  has_many :voters
  has_many :surveys
end

