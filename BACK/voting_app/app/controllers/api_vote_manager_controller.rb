class ApiVoteManagerController < ActionController::API
  include RailsJwtAuth::AuthenticableHelper
  before_action :authenticate!

  def begin_session
    agent = User.where(email: params[:email])[0]
    voter = Voter.find(params[:voter])
    session_vote = SessionVote.new 
    session_vote.created_at = DateTime.new
    session_vote.status_vote = 0
    session_vote.voter_id = voter._id
    session_vote.user = agent

    if(session_vote.save)
      render json: { :session_vote => session_vote._id, :agent => agent._id, :email_agent => agent.email, :voter => voter }
    end
  end

  def check_session_vote
    agent = User.where(email: params[:email])[0]
    session_vote = SessionVote.where(user: agent, status_vote: 0)[0]
    voter = Voter.find(session_vote.voter_id)
    render json: { :session_vote_id => session_vote._id, :agent_id => agent._id, :voter_id => voter._id, :first_name_voter => voter.first_name, :last_name_voter => voter.last_name, :email_agent => agent.email }
  end

  def end_session
    session_vote = SessionVote.find(params[:session_vote])
    candidate = Candidate.find(params[:candidate])

    session_vote.status_vote = 1
    if(session_vote.save)
      voter = Voter.find(params[:voter])
      voter.voted = 1
      voter.candidate = candidate
      voter.save

      render json: { :status => "success"}
    end

  end
end
