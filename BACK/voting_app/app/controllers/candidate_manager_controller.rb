class CandidateManagerController < ActionController::API
  include RailsJwtAuth::AuthenticableHelper
  before_action :authenticate!

  def all_candidates
    candidates = Candidate.all
    render json: candidates
  end

  def all_vote_details
    results = nil
    candidates = Candidate.all
    total_voter = Voter.all.length
    candidates.each do |c|
      results.push({ :candidate => c, :percent => (c.voters.length * 100)/total_voter })
    end
    render json: results
  end
end
