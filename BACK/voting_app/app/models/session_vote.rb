class SessionVote
  include Mongoid::Document
  field :created_at, type: Time
  field :status_vote, type: Integer

  belongs_to :voter
  belongs_to :user
end
