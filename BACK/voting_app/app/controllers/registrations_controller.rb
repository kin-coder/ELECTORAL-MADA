class RegistrationsController < RailsJwtAuth::RegistrationsController
  def create
    user = RailsJwtAuth.model.new(create_params)
    user.do_something_custom
  end
end
