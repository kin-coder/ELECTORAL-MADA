class CandidateManagerController < ActionController::API
  include RailsJwtAuth::AuthenticableHelper
  before_action :authenticate!

  def all_candidates
    candidates = Candidate.all
    render json: candidates
  end

  def all_vote_details
    results = []
    candidates = Candidate.all
    total_voter = Voter.where(voted: 1).length
    total_subscribed = Voter.all.length
    candidates.each do |c|
      results.push({ 
        :candidate_first_name => c.first_name, 
        :candidate_last_name => c.last_name, 
        :candidate_number => c.number, 
        :avatar => c.avatar,
        :percent => (c.voters.length * 100)/total_voter,
        :nb_votes => c.voters.length
      })
    end
    render json: {:results => results, :participation => (total_voter * 100) / total_subscribed, :total_voter => total_voter }
  end

  def create_candidate
    candidate = Candidate.new
    candidate.first_name = params[:first_name]
    candidate.last_name = params[:last_name]
    candidate.number = params[:number]
    candidate.avatar = params[:avatar]
    if(candidate.save)
      render json: { :created_candidate => "success" }
    else
      render json: { :created_candidate => "error" }
    end
  end

end
