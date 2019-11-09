class User
  include Mongoid::Document
  field :email, type: String
  field :name, type: String
  # field :password, type: String

  include RailsJwtAuth::Authenticatable
  # include RailsJwtAuth::Confirmable
  # include RailsJwtAuth::Recoverable
  # include RailsJwtAuth::Trackable
  # include RailsJwtAuth::Invitable
  # include RailsJwtAuth::Lockable

  validates :email, presence: true,
                    uniqueness: true,
                    format: URI::MailTo::EMAIL_REGEXP
end
