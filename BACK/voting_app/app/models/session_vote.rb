class SessionVote
  include Mongoid::Document
  field :created_at, type: Time
  field :status_vote, type: Integer
  field :voter_id, type: String

  belongs_to :user
end
