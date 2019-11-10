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
    voter = Voter.new
    voter.first_name = params[:first_name]
    voter.last_name = params[:last_name]
    voter.cin = params[:cin]
    if(voter.save)
      render json: { :created_voter => "success" }
    else
      render json: { :created_voter => "error" }
    end
  end

end
