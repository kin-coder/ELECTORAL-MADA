class Avatar
  include Mongoid::Document

  mount_uploader :image, AvatarUploader
end
