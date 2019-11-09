class ApiVoterController < ActionController::API
  include RailsJwtAuth::AuthenticableHelper
  before_action :authenticate!
  def all_voters
    voters = Voter.all
    render json: voters
  end

  def search_voters
    voters = Voter.full_text_search(params[:search])
    render json: voters
  end

  def voter_test

    my_string = "coucou";

    render json: { :encrypt => Digest::MD5.hexdigest(my_string)}
  end
end
