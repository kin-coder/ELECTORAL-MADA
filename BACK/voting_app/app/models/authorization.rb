class Authorization
  include Mongoid::Document
  field :authenticity_token, type: String
  field :validity, type: Integer

  belongs_to :application
end
