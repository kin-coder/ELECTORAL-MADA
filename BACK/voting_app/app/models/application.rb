class Application
  include Mongoid::Document
  field :secret, type: String
  field :entitled, type: String

  has_many :authorizations
end
