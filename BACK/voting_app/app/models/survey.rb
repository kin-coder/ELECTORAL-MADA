class Survey
  include Mongoid::Document
  include Mongoid::Timestamps

  field :title, type: String
  field :description, type: String
  field :maded, type: Integer

  belongs_to :candidate
  belongs_to :voter

  mount_uploader :media, SurveyUploader
end
