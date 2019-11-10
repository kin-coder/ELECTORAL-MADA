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

  def create_voter
    
  end
end
